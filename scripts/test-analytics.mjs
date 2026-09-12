import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

// Compile the actual helper/component; React, next/script and browser globals are
// local stubs. No Google scripts load and no network requests are made.
function compile(path) {
  const result = ts.transpileModule(fs.readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  });
  assert.equal(result.diagnostics.length, 0);
  return result.outputText;
}
const helperCode = compile("../src/lib/analytics.ts");
const componentCode = compile("../src/components/Analytics.tsx");
const measurementId = "G-TEST123456";

function harness({ id = measurementId, mode = "production", url = "https://capitol-artists.com/?email=private@example.invalid#private", server = false } = {}) {
  const window = { location: new URL(url) };
  const helperContext = {
    exports: {}, URL,
    document: { referrer: "https://example.invalid/church?email=private@example.invalid#private" },
    process: { env: { NODE_ENV: mode, NEXT_PUBLIC_GA_MEASUREMENT_ID: id } },
    ...(!server && { window }),
  };
  vm.runInNewContext(helperCode, helperContext);
  const analytics = helperContext.exports;
  const componentContext = {
    exports: {},
    require(name) {
      if (name === "@/lib/analytics") return analytics;
      if (name === "react") return {
        useEffect(callback) { if (!server) callback(); },
        useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot) { return server ? serverSnapshot() : clientSnapshot(); },
      };
      if (name === "next/navigation") return { usePathname: () => window.location.pathname };
      if (name === "next/script") return { default: "Script" };
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }) };
      throw new Error(`Unexpected module: ${name}`);
    },
  };
  vm.runInNewContext(componentCode, componentContext);
  return {
    analytics, window,
    render: () => componentContext.exports.default(),
    calls: () => JSON.parse(JSON.stringify((window.dataLayer ?? []).map(entry => Array.from(entry)))),
    navigate(url) { window.location = new URL(url); },
  };
}

for (const options of [
  { id: "" }, { id: "UA-123456789-1" }, { id: "G-SHORT" }, { id: 'G-1234567890"><script>' },
  { mode: "development" }, { url: "http://localhost:3107/" }, { url: "https://preview.vercel.app/" },
  { url: "https://capitol-artists.com.example.invalid/" }, { url: "https://capitol-artists.com:3107/" },
  { url: "http://capitol-artists.com/" }, { server: true },
]) {
  const disabled = harness(options);
  assert.equal(disabled.render(), null, "missing/invalid config, nonproduction hosts and SSR render no Google tag");
  disabled.analytics.initializeAnalytics();
  disabled.analytics.trackPageView();
  disabled.analytics.trackInquirySuccess("church_booking");
  assert.deepEqual(disabled.calls(), [], "disabled analytics creates no queued events");
}

const active = harness();
const script = active.render();
assert.equal(Object.prototype.toString.call(active.window.dataLayer[0]), "[object Arguments]", "the queue uses Google's documented arguments objects");
assert.equal(script.type, "Script");
assert.equal(script.props.strategy, "lazyOnload");
assert.equal(script.props.src, `https://www.googletagmanager.com/gtag/js?id=${measurementId}`);
script.props.onReady();
active.render(); // StrictMode/remount repeats do not duplicate this route.
let calls = active.calls();
assert.equal(calls.filter(args => args[0] === "js").length, 1);
assert.equal(calls.filter(args => args[0] === "config").length, 1);
assert.equal(calls.find(args => args[0] === "config")[2].send_page_view, false);
assert.deepEqual(calls.filter(args => args[0] === "event"), [["event", "page_view", {
  page_location: "https://capitol-artists.com/", page_referrer: "https://example.invalid/church",
}]]);

active.navigate("https://capitol-artists.com/?artist=adoration&email=private@example.invalid#contact");
active.render();
assert.equal(active.calls().filter(args => args[1] === "page_view").length, 1, "query/hash-only changes do not count as new pages");
active.navigate("https://capitol-artists.com/church-concert-booking?email=private@example.invalid#inquiry");
active.render();
active.render();
calls = active.calls();
assert.deepEqual(calls.filter(args => args[1] === "page_view")[1], ["event", "page_view", {
  page_location: "https://capitol-artists.com/church-concert-booking", page_referrer: "https://capitol-artists.com/",
}]);
assert.equal(calls.filter(args => args[1] === "page_view").length, 2);

active.analytics.trackInquirySuccess("church_booking");
assert.deepEqual(active.calls().find(args => args[1] === "generate_lead"), ["event", "generate_lead", {
  inquiry_type: "church_booking", page_location: "https://capitol-artists.com/church-concert-booking", page_referrer: "https://capitol-artists.com/",
}]);
active.navigate("https://capitol-artists.com/");
active.render();
assert.equal(active.calls().filter(args => args[1] === "page_view").length, 3, "returning to a previous path counts once");
assert.equal(active.calls().filter(args => args[0] === "config").length, 1, "route changes do not reconfigure GA");
assert.ok(!JSON.stringify(active.calls()).includes("private"), "neither location nor referrer leaks query/hash content");

const deferred = harness();
const initialScript = deferred.render();
assert.equal(deferred.calls().filter(args => args[1] === "page_view").length, 1, "initial page view queues before the deferred tag is ready");
deferred.navigate("https://capitol-artists.com/church-concert-booking?email=private@example.invalid#inquiry");
const nextRouteScript = deferred.render();
deferred.analytics.trackInquirySuccess("church_booking");
const queuedCalls = deferred.calls();
assert.deepEqual(queuedCalls.filter(args => args[0] === "event"), [
  ["event", "page_view", { page_location: "https://capitol-artists.com/", page_referrer: "https://example.invalid/church" }],
  ["event", "page_view", { page_location: "https://capitol-artists.com/church-concert-booking", page_referrer: "https://capitol-artists.com/" }],
  ["event", "generate_lead", { inquiry_type: "church_booking", page_location: "https://capitol-artists.com/church-concert-booking", page_referrer: "https://capitol-artists.com/" }],
], "route changes and a confirmed early inquiry queue in order with sanitized page context before onReady");
assert.equal(queuedCalls.filter(args => args[0] === "js").length, 1);
assert.equal(queuedCalls.filter(args => args[0] === "config").length, 1);
assert.equal(queuedCalls.find(args => args[0] === "config")[2].send_page_view, false);
const originalQueue = deferred.window.dataLayer;
initialScript.props.onReady();
nextRouteScript.props.onReady();
deferred.render();
deferred.render();
assert.equal(deferred.window.dataLayer, originalQueue, "onReady must preserve the preexisting Google command queue");
assert.deepEqual(deferred.calls(), queuedCalls, "tag readiness and repeated renders neither discard early events nor duplicate config, page views, or leads");
assert.ok(!JSON.stringify(deferred.calls()).includes("private"), "early queued commands redact queries and hashes too");

const www = harness({ url: "https://www.capitol-artists.com/" });
assert.ok(www.render());
assert.equal(www.calls().filter(args => args[1] === "page_view").length, 1);

const blocked = harness();
blocked.window.gtag = () => { throw new Error("Blocked analytics"); };
assert.doesNotThrow(() => blocked.render());
assert.doesNotThrow(() => blocked.analytics.initializeAnalytics());
assert.doesNotThrow(() => blocked.analytics.trackPageView());
assert.doesNotThrow(() => blocked.analytics.trackInquirySuccess("artist_representation"));

console.log("PASS: actual GA4 helper/component — config validation, production host/SSR gating, lazyOnload Script, early page/route/lead queue preserved on readiness, config once, route page views once, query/hash redaction, distinct lead type, and blocked-tag isolation. No network requests.");
