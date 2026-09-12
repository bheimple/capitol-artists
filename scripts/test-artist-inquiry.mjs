import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

// Exercise the actual compiled component handler without a browser or real requests.
// React/JSX, FormData and timers are minimal stubs; DOM behavior is checked separately.
const source = fs.readFileSync(new URL("../src/components/ArtistInquiryForm.tsx", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  reportDiagnostics: true,
});
assert.equal(compiled.diagnostics.length, 0);
const analyticsCompiled = ts.transpileModule(fs.readFileSync(new URL("../src/lib/analytics.ts", import.meta.url), "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

const fixture = {
  artistName: " Test Quartet ",
  contactName: " Test Contact ",
  email: "test@example.invalid",
  phone: "",
  homeLocation: "Test City, CO",
  musicalStyle: "Southern Gospel",
  website: "https://example.invalid/test-quartet",
  performanceVideo: "https://example.invalid/live",
  introduction: "Test ministry introduction.",
};

function harness(fetchImpl, analyticsBlocked = false) {
  let stateIndex = 0;
  let refIndex = 0;
  const states = [], refs = [], timers = [], requests = [];
  const analyticsCalls = [];
  const jsx = (type, props) => ({ type, props });
  const react = {
    useState(initial) {
      const i = stateIndex++;
      if (!(i in states)) states[i] = initial;
      return [states[i], value => { states[i] = value; }];
    },
    useRef(initial) { return refs[refIndex++] ||= { current: initial }; },
    useEffect() {},
  };
  const context = {
    exports: {},
    require(name) {
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "@/lib/analytics") return analyticsContext.exports;
      throw new Error(`Unexpected module: ${name}`);
    },
    FormData: class {
      constructor(data) { this.data = data; }
      get(name) { return this.data[name] ?? null; }
    },
    AbortController,
    window: {
      location: { protocol: "https:", host: "capitol-artists.com", origin: "https://capitol-artists.com", pathname: "/artist-representation", search: "?email=test@example.invalid", hash: "#private" },
      gtag(...args) { if (analyticsBlocked) throw new Error("Analytics blocked"); analyticsCalls.push(args); },
      setTimeout(callback, delay) { timers.push({ callback, delay, cleared: false }); return timers.length - 1; },
      clearTimeout(id) { timers[id].cleared = true; },
    },
    fetch(url, options) { requests.push({ url, options }); return fetchImpl(url, options); },
  };
  const analyticsContext = {
    exports: {}, window: context.window, URL,
    document: { referrer: "https://example.invalid/prior?email=test@example.invalid#private" },
    process: { env: { NODE_ENV: "production", NEXT_PUBLIC_GA_MEASUREMENT_ID: "G-TEST123456" } },
  };
  vm.runInNewContext(analyticsCompiled, analyticsContext);
  vm.runInNewContext(compiled.outputText, context);
  return {
    states, timers, requests,
    leads: () => JSON.parse(JSON.stringify(analyticsCalls.filter(args => args[0] === "event" && args[1] === "generate_lead"))),
    render() { stateIndex = refIndex = 0; return context.exports.default(); },
  };
}

function find(node, type) {
  if (!node || typeof node !== "object") return null;
  if (node.type === type) return node;
  const children = Array.isArray(node.props?.children) ? node.props.children : [node.props?.children];
  for (const child of children.flat()) {
    const match = find(child, type);
    if (match) return match;
  }
  return null;
}

const event = (values = fixture) => ({ preventDefault() {}, currentTarget: values });

let resolveRequest;
const success = harness(() => new Promise(resolve => { resolveRequest = resolve; }));
const submit = find(success.render(), "form").props.onSubmit;
const pending = submit(event());
await submit(event());
assert.equal(success.requests.length, 1, "duplicate submission must not send another request");
assert.equal(success.leads().length, 0, "attempts are not leads before confirmed receipt");
const request = success.requests[0];
assert.equal(request.url, "https://formsubmit.co/ajax/mike@capitol-artists.com");
assert.equal(request.options.method, "POST");
const data = JSON.parse(request.options.body);
assert.deepEqual(Object.keys(data).sort(), ["_subject", "_template", "_url", "email", "message", "name", "phone"]);
assert.equal(data.name, "Test Contact");
assert.equal(data.email, fixture.email);
assert.equal(data.phone, "");
assert.ok(data.message.startsWith("ARTIST REPRESENTATION INQUIRY\n"));
for (const detail of [
  "Artist / group: Test Quartet", "Home city / state: Test City, CO", "Musical style: Southern Gospel",
  "Website / social link: https://example.invalid/test-quartet", "Performance video: https://example.invalid/live", fixture.introduction,
]) assert.ok(data.message.includes(detail), detail);
resolveRequest({ ok: true, json: async () => ({ success: "true" }) });
await pending;
assert.equal(success.states[0], "success");
assert.deepEqual(success.leads(), [["event", "generate_lead", {
  inquiry_type: "artist_representation", page_location: "https://capitol-artists.com/artist-representation", page_referrer: "https://example.invalid/prior",
}]], "one confirmed inquiry emits one lead with no form values or raw query/hash");
assert.ok(JSON.stringify(success.render()).includes("Your introduction has been received. Thank you for sharing your music with Capitol Artists."));
assert.equal(success.timers[0].cleared, true);

for (const performanceVideo of ["", " \n\t "]) {
  const withoutVideo = harness(async () => ({ ok: true, json: async () => ({ success: "true" }) }));
  await find(withoutVideo.render(), "form").props.onSubmit(event({ ...fixture, performanceVideo }));
  assert.equal(withoutVideo.states[0], "success", "a performance video is optional");
  assert.equal(withoutVideo.leads().length, 1);
  assert.equal(withoutVideo.requests.length, 1);
  const submitted = JSON.parse(withoutVideo.requests[0].options.body);
  assert.ok(submitted.message.includes("Performance video: Not provided"));
  assert.ok(submitted.message.includes(`Website / social link: ${fixture.website}`));
}

for (const failure of [async () => ({ ok: true, json: async () => ({ success: "false", message: "Activation required" }) }), async () => ({ ok: true, json: async () => ({}) }), async () => ({ ok: true, json: async () => { throw new SyntaxError("Invalid JSON"); } }), async () => ({ ok: false }), async () => { throw new TypeError("Network unavailable"); }]) {
  const failed = harness(failure);
  await find(failed.render(), "form").props.onSubmit(event());
  assert.equal(failed.states[0], "error");
  assert.equal(failed.leads().length, 0, "unconfirmed inquiries must not count as leads");
  assert.ok(find(failed.render(), "form"), "the form must remain available after failure");
  assert.ok(JSON.stringify(failed.render()).includes("tel:719-260-1151"));
  assert.equal(failed.timers[0].cleared, true);
}

const timedOut = harness((url, options) => new Promise((resolve, reject) => {
  options.signal.addEventListener("abort", () => reject(new Error("Aborted")));
}));
const timedSubmit = find(timedOut.render(), "form").props.onSubmit(event());
assert.equal(timedOut.timers[0].delay, 20_000);
timedOut.timers[0].callback();
await timedSubmit;
assert.equal(timedOut.states[0], "error");
assert.equal(timedOut.leads().length, 0);
assert.ok(timedOut.states[1].includes("timed out"));
assert.equal(timedOut.timers[0].cleared, true);

for (const field of ["artistName", "contactName", "email", "homeLocation", "musicalStyle", "website", "introduction"]) {
  const invalid = harness(async () => ({ ok: true, json: async () => ({ success: "true" }) }));
  const values = { ...fixture, [field]: " \n\t " };
  const before = { ...values };
  await find(invalid.render(), "form").props.onSubmit(event(values));
  assert.equal(invalid.requests.length, 0, `${field}: whitespace must not reach the endpoint`);
  assert.equal(invalid.leads().length, 0);
  assert.equal(invalid.states[0], "error");
  assert.ok(invalid.states[1].startsWith("Please complete the "));
  assert.deepEqual(values, before, "validation must not mutate or reset supplied values");
  assert.ok(find(invalid.render(), "form"));
  await find(invalid.render(), "form").props.onSubmit(event());
  assert.equal(invalid.states[0], "success", "corrected input can be submitted after validation failure");
  assert.equal(invalid.leads().length, 1);
}

const blockedAnalytics = harness(async () => ({ ok: true, json: async () => ({ success: true }) }), true);
await find(blockedAnalytics.render(), "form").props.onSubmit(event());
assert.equal(blockedAnalytics.states[0], "success", "an analytics exception cannot turn a confirmed inquiry into an error");
assert.equal(blockedAnalytics.requests.length, 1);
assert.ok(JSON.stringify(blockedAnalytics.render()).includes("Your introduction has been received."));

console.log("PASS: actual artist inquiry handler — email routing, trimming, optional video, confirmed-success analytics only, blocked analytics, duplicate guard, activation rejection, malformed responses, HTTP/network errors, timeout, fallback and seven whitespace validations. All requests mocked.");
