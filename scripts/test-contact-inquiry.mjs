import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

// Exercise the actual handler and URL-selection effect with local React/DOM stubs.
// No request reaches FormSubmit; native validation and layout need browser checks.
function compile(relativePath) {
  const source = fs.readFileSync(new URL(relativePath, import.meta.url), "utf8");
  const result = ts.transpileModule(source, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  });
  assert.equal(result.diagnostics.length, 0);
  return result.outputText;
}
const compiled = compile("../src/components/ContactForm.tsx");
const analyticsCompiled = compile("../src/lib/analytics.ts");
const artistContext = { exports: {} };
vm.runInNewContext(compile("../src/data/artists.ts"), artistContext);
const artistOptions = artistContext.exports.artists.map(({ slug, name }) => ({ slug, name }));

const fixture = {
  firstName: " Test ", lastName: " Contact ", email: "test@example.invalid", phone: "555-0100",
  organization: " Test Church ", eventLocation: "Test City, CO", preferredDates: "this fall / flexible",
  artistInterest: artistOptions[0].slug, message: "A Sunday evening church concert.",
};

function find(node, match) {
  if (!node || typeof node !== "object") return null;
  if (typeof match === "function" ? match(node) : node.type === match) return node;
  const children = Array.isArray(node.props?.children) ? node.props.children : [node.props?.children];
  for (const child of children.flat()) {
    const result = find(child, match);
    if (result) return result;
  }
  return null;
}

function harness(fetchImpl, initialQuery = "", analyticsBlocked = false, options = artistOptions) {
  let stateIndex = 0, refIndex = 0, effectIndex = 0, component = "form", changed = false, query = initialQuery;
  let currentOptions = options;
  const states = [], setters = [], refs = [], timers = [], requests = [], pendingEffects = [];
  const analyticsCalls = [];
  const effectDependencies = new Map();
  const jsx = (type, props) => ({ type, props });
  const react = {
    Suspense: Symbol("Suspense"),
    useState(initial) {
      const i = stateIndex++;
      if (!(i in states)) states[i] = initial;
      setters[i] ||= value => { if (!Object.is(states[i], value)) changed = true; states[i] = value; };
      return [states[i], setters[i]];
    },
    useRef(initial) { return refs[refIndex++] ||= { current: initial }; },
    useEffect(callback, dependencies) {
      const key = `${component}:${effectIndex++}`;
      const previous = effectDependencies.get(key);
      if (!previous || dependencies.some((value, index) => !Object.is(value, previous[index]))) {
        pendingEffects.push(callback);
      }
      effectDependencies.set(key, dependencies);
    },
  };
  const context = {
    exports: {},
    require(name) {
      if (name === "react") return react;
      if (name === "react/jsx-runtime") return { jsx, jsxs: jsx };
      if (name === "next/navigation") return { useSearchParams: () => new URLSearchParams(query) };
      if (name === "@/lib/analytics") return analyticsContext.exports;
      throw new Error(`Unexpected module: ${name}`);
    },
    FormData: class {
      constructor(data) { this.data = data; }
      get(name) { return this.data[name] ?? null; }
    },
    AbortController,
    window: {
      location: { protocol: "https:", host: "capitol-artists.com", origin: "https://capitol-artists.com", pathname: "/church-concert-booking", search: "?email=test@example.invalid", hash: "#contact" },
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
  vm.runInNewContext(compiled, context);
  return {
    states, timers, requests,
    leads: () => JSON.parse(JSON.stringify(analyticsCalls.filter(args => args[0] === "event" && args[1] === "generate_lead"))),
    setQuery(value) { query = value; },
    setArtistOptions(value) { currentOptions = value; },
    render() {
      let tree;
      for (let pass = 0; pass < 5; pass++) {
        stateIndex = refIndex = effectIndex = 0;
        component = "form";
        changed = false;
        tree = context.exports.default({ artistOptions: currentOptions });
        const queryReader = find(tree, node => typeof node.type === "function" && node.type.name === "ArtistQuerySelection");
        assert.ok(queryReader, "query handling remains inside its small component");
        component = "query";
        effectIndex = 0;
        queryReader.type(queryReader.props);
        for (const effect of pendingEffects.splice(0)) effect();
        if (!changed) return tree;
      }
      throw new Error("Unexpected repeated state updates");
    },
  };
}

const event = (values = fixture) => ({ preventDefault() {}, currentTarget: values });
const accepted = async () => ({ ok: true, json: async () => ({ success: true }) });
let resolveRequest;
const successful = harness(() => new Promise(resolve => { resolveRequest = resolve; }));
const handler = find(successful.render(), "form").props.onSubmit;
const pending = handler(event());
await handler(event());
assert.equal(successful.requests.length, 1, "duplicate submissions must not send twice");
assert.equal(successful.leads().length, 0, "attempts are not leads before confirmed receipt");
const request = successful.requests[0];
assert.equal(request.url, "https://formsubmit.co/ajax/mike@capitol-artists.com");
assert.equal(request.options.method, "POST");
assert.equal(request.options.headers.Accept, "application/json");
const payload = JSON.parse(request.options.body);
assert.deepEqual(Object.keys(payload).sort(), ["_subject", "_template", "_url", "email", "message", "name", "phone"]);
assert.equal(payload.name, "Test Contact");
assert.equal(payload.email, fixture.email);
assert.equal(payload.phone, fixture.phone);
assert.equal(payload._subject, "Capitol Artists — Church Booking Inquiry");
assert.equal(payload._template, "table");
assert.equal(payload._url, "https://capitol-artists.com/church-concert-booking");
assert.ok(payload.message.startsWith("CHURCH CONCERT INQUIRY\n"));
for (const detail of ["Church / organization: Test Church", "Event city / state: Test City, CO", "Preferred dates / flexibility: this fall / flexible", `Artist interest: ${artistOptions[0].name}`, fixture.message]) {
  assert.ok(payload.message.includes(detail), detail);
}
resolveRequest({ ok: true, json: async () => ({ success: "true" }) });
await pending;
assert.equal(successful.states[0], "success");
assert.deepEqual(successful.leads(), [["event", "generate_lead", {
  inquiry_type: "church_booking", page_location: "https://capitol-artists.com/church-concert-booking", page_referrer: "https://example.invalid/prior",
}]], "one confirmed inquiry emits one lead with no form values or raw query/hash");
assert.ok(JSON.stringify(successful.render()).includes("Your concert inquiry has been received."));
assert.equal(successful.timers[0].cleared, true);

const minimal = harness(accepted);
const minimalTree = minimal.render();
for (const name of ["phone", "preferredDates", "artistInterest", "message"]) {
  assert.ok(!find(minimalTree, node => node.props?.name === name).props.required, `${name} stays optional`);
}
await find(minimalTree, "form").props.onSubmit(event({ ...fixture, phone: "", preferredDates: "", artistInterest: "", message: "" }));
assert.equal(minimal.states[0], "success");
assert.equal(minimal.leads().length, 1);
const minimalMessage = JSON.parse(minimal.requests[0].options.body).message;
for (const detail of ["Phone: Not provided", "Preferred dates / flexibility: Not specified", "Artist interest: Help us choose", "None provided"]) assert.ok(minimalMessage.includes(detail));

for (const response of [
  async () => ({ ok: true, json: async () => ({ success: false }) }),
  async () => ({ ok: true, json: async () => ({ success: "false" }) }),
  async () => ({ ok: true, json: async () => ({ success: 1 }) }),
  async () => ({ ok: true, json: async () => ({}) }),
  async () => ({ ok: false, json: async () => ({ success: true }) }),
  async () => ({ ok: true, json: async () => { throw new SyntaxError("Invalid JSON"); } }),
  async () => { throw new TypeError("Network unavailable"); },
]) {
  const failed = harness(response);
  const values = { ...fixture };
  await find(failed.render(), "form").props.onSubmit(event(values));
  assert.equal(failed.states[0], "error");
  assert.equal(failed.leads().length, 0, "unconfirmed inquiries must not count as leads");
  assert.deepEqual(values, fixture, "failure must not reset or mutate details");
  const tree = failed.render();
  assert.ok(find(tree, "form"));
  assert.ok(JSON.stringify(tree).includes("tel:719-260-1151"));
  assert.ok(JSON.stringify(tree).includes("mailto:mike@capitol-artists.com"));
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

for (const field of ["firstName", "lastName", "email", "organization", "eventLocation"]) {
  const invalid = harness(accepted);
  await find(invalid.render(), "form").props.onSubmit(event({ ...fixture, [field]: " \n\t " }));
  assert.equal(invalid.requests.length, 0, `${field}: whitespace must not reach the endpoint`);
  assert.equal(invalid.leads().length, 0);
  assert.equal(invalid.states[0], "error");
  assert.ok(invalid.states[1].startsWith("Please complete the "));
  await find(invalid.render(), "form").props.onSubmit(event());
  assert.equal(invalid.states[0], "success", "a corrected inquiry can submit");
  assert.equal(invalid.leads().length, 1);
}

const blockedAnalytics = harness(accepted, "", true);
await find(blockedAnalytics.render(), "form").props.onSubmit(event());
assert.equal(blockedAnalytics.states[0], "success", "an analytics exception cannot turn a confirmed inquiry into an error");
assert.equal(blockedAnalytics.requests.length, 1);
assert.ok(JSON.stringify(blockedAnalytics.render()).includes("Your concert inquiry has been received."));

const preselected = harness(accepted, `artist=${artistOptions[0].slug}`);
assert.equal(find(preselected.render(), "select").props.value, artistOptions[0].slug);
find(preselected.render(), "select").props.onChange({ target: { value: artistOptions[1].slug } });
assert.equal(find(preselected.render(), "select").props.value, artistOptions[1].slug, "manual choice survives rerender");
preselected.setArtistOptions(artistOptions.map((artist) => ({ ...artist })));
assert.equal(find(preselected.render(), "select").props.value, artistOptions[1].slug, "equivalent reserialized options must not override manual choice");
preselected.setQuery(`artist=${artistOptions[0].slug}&utm_source=test`);
assert.equal(find(preselected.render(), "select").props.value, artistOptions[1].slug, "unrelated query change must not override choice");
preselected.setQuery(`artist=${artistOptions[2].slug}`);
assert.equal(find(preselected.render(), "select").props.value, artistOptions[2].slug, "a new valid artist query is applied");
preselected.setQuery("artist=unknown-artist");
assert.equal(find(preselected.render(), "select").props.value, artistOptions[2].slug, "unknown artist query is ignored");
const unknown = harness(accepted, "artist=unknown-artist");
assert.equal(find(unknown.render(), "select").props.value, "");
await find(unknown.render(), "form").props.onSubmit(event({ ...fixture, artistInterest: "unknown-artist" }));
assert.ok(JSON.parse(unknown.requests[0].options.body).message.includes("Artist interest: Help us choose"));

const limited = harness(accepted, `artist=${artistOptions[0].slug}`, false, [artistOptions[1]]);
const limitedSelect = find(limited.render(), "select");
assert.equal(limitedSelect.props.value, "", "prefill only accepts artists supplied by the server");
assert.ok(find(limitedSelect, node => node.type === "option" && node.props.value === artistOptions[1].slug));
assert.equal(find(limitedSelect, node => node.type === "option" && node.props.value === artistOptions[0].slug), null);
await find(limited.render(), "form").props.onSubmit(event());
assert.ok(JSON.parse(limited.requests[0].options.body).message.includes("Artist interest: Help us choose"), "submission lookup uses the supplied options");

console.log("PASS: actual church inquiry handler and query effect — FormSubmit routing, details, optional fields, confirmed-success analytics only, blocked analytics, duplicate guard, errors, timeout, whitespace, minimal artist props, artist preselection and manual-selection persistence. All requests mocked.");
