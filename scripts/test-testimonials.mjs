import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

// Execute the actual component and data with deterministic React/browser stubs.
// No network, dependency additions, DOM snapshots, or duplicated carousel logic.
function compile(path) {
  const result = ts.transpileModule(fs.readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  });
  assert.equal(result.diagnostics.length, 0);
  return result.outputText;
}
const data = { exports: {} };
vm.runInNewContext(compile("../src/data/testimonials.ts"), data);
const { testimonials } = data.exports;
const code = compile("../src/components/Testimonials.tsx");
const flatten = (node) => Array.isArray(node) ? node.flatMap(flatten) : node && typeof node === "object" ? [node, ...flatten(node.props.children)] : [];
const textContent = (node) => Array.isArray(node) ? node.map(textContent).join("") : node && typeof node === "object" ? textContent(node.props.children) : node === null || node === undefined || typeof node === "boolean" ? "" : String(node);

function harness({ reduced = false, visible = true, observerAvailable = true } = {}) {
  const hooks = [], timers = new Map(), motionListeners = new Set(), visibilityListeners = new Set(), observers = [];
  let cursor = 0, jobs = [], dirty = true, tree, now = 0, nextTimer = 0;
  const preference = { matches: reduced, addEventListener: (_, fn) => motionListeners.add(fn), removeEventListener: (_, fn) => motionListeners.delete(fn) };
  const document = { visibilityState: visible ? "visible" : "hidden", addEventListener: (_, fn) => visibilityListeners.add(fn), removeEventListener: (_, fn) => visibilityListeners.delete(fn) };
  const window = {
    matchMedia: () => preference,
    setInterval(fn, delay) { assert.equal(delay, 25000, "rotation interval allows 25 seconds to read the complete shorter reviews"); const id = ++nextTimer; timers.set(id, { fn, delay, at: now + delay }); return id; },
    clearInterval: (id) => timers.delete(id),
  };
  class IntersectionObserver {
    constructor(callback, options) { this.callback = callback; this.options = options; observers.push(this); }
    observe(target) { assert.ok(target); this.connected = true; }
    disconnect() { this.connected = false; }
  }
  if (observerAvailable) window.IntersectionObserver = IntersectionObserver;
  const react = {
    useState(initial) {
      const index = cursor++;
      hooks[index] ??= { value: initial };
      return [hooks[index].value, (update) => {
        const value = typeof update === "function" ? update(hooks[index].value) : update;
        if (!Object.is(value, hooks[index].value)) { hooks[index].value = value; dirty = true; }
      }];
    },
    useRef(initial) { const index = cursor++; hooks[index] ??= { current: initial }; return hooks[index]; },
    useEffect(effect, dependencies) {
      const index = cursor++, previous = hooks[index];
      if (!previous || dependencies.some((value, i) => !Object.is(value, previous.dependencies[i]))) {
        jobs.push(() => { previous?.cleanup?.(); hooks[index] = { dependencies, cleanup: effect() }; });
      }
    },
    useSyncExternalStore(subscribe, snapshot) {
      const index = cursor++;
      if (!hooks[index]) { hooks[index] = {}; jobs.push(() => { hooks[index].cleanup = subscribe(() => { dirty = true; }); }); }
      return snapshot();
    },
  };
  const context = { exports: {}, window, document, IntersectionObserver, require(name) {
    if (name === "react") return react;
    if (name === "@/data/testimonials") return data.exports;
    if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
    throw new Error(`Unexpected module: ${name}`);
  } };
  vm.runInNewContext(code, context);
  function flush() {
    for (let renders = 0; dirty; renders++) {
      assert.ok(renders < 20, "component settles after state/effect updates");
      dirty = false; cursor = 0; jobs = []; tree = context.exports.default();
      for (const node of flatten(tree)) if (node.props.ref) node.props.ref.current = {};
      for (const job of jobs) job();
    }
    assert.ok(timers.size <= 1, "at most one rotation timer exists");
  }
  flush();
  return {
    get tree() { return tree; },
    get nodes() { return flatten(tree); },
    get timerCount() { return timers.size; },
    get slides() { return this.nodes.filter(node => node.props["aria-roledescription"] === "slide"); },
    get index() { return this.slides.findIndex(node => node.props["aria-hidden"] === false); },
    button(label) { const button = this.nodes.find(node => node.type === "button" && (node.props["aria-label"] === label || textContent(node) === label)); assert.ok(button, `button exists: ${label}`); return button; },
    event(node, name, event = {}) { assert.equal(typeof node.props[name], "function", `${name} handler exists`); node.props[name](event); flush(); },
    click(label) { this.event(this.button(label), "onClick"); },
    intersect(ratio) { const observer = observers[0]; assert.ok(observer?.connected); assert.equal(observer.options.threshold, 0.25); observer.callback([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]); flush(); },
    motion(matches) { preference.matches = matches; for (const callback of motionListeners) callback(); flush(); },
    visibility(state) { document.visibilityState = state; for (const callback of visibilityListeners) callback(); flush(); },
    advance(ms) {
      const end = now + ms;
      while (true) {
        const next = [...timers.values()].sort((a, b) => a.at - b.at)[0];
        if (!next || next.at > end) break;
        now = next.at; next.at += next.delay; next.fn(); flush();
      }
      now = end;
    },
    unmount() {
      for (const hook of hooks) hook?.cleanup?.();
      assert.equal(timers.size, 0, "unmount clears interval");
      assert.equal(motionListeners.size + visibilityListeners.size, 0, "unmount removes external subscriptions");
      assert.ok(observers.every(observer => !observer.connected), "unmount disconnects intersection observer");
    },
  };
}

const pauseLabel = "Pause rotation", resumeLabel = "Resume rotation";
function assertState(carousel, index, rotating) {
  assert.equal(carousel.index, index);
  assert.equal(carousel.timerCount, rotating ? 1 : 0);
  assert.equal(carousel.nodes.find(node => "aria-live" in node.props).props["aria-live"], rotating ? "off" : "polite");
  carousel.slides.forEach((slide, i) => {
    assert.equal(slide.props.inert, i !== index, "inactive slides cannot receive focus or interaction");
    assert.equal(slide.props["aria-hidden"], i !== index, "inactive slides are hidden from assistive technology");
    assert.equal(slide.props.hidden, i !== index, "inactive reviews do not reserve space beneath the current review");
    assert.ok(slide.props["aria-label"].includes(testimonials[i].author));
    assert.equal(carousel.button(`Show review from ${testimonials[i].author}`).props["aria-disabled"], i === index);
  });
}
function activeCarousel(options) { const carousel = harness(options); carousel.intersect(1); return carousel; }

const loop = harness();
assertState(loop, 0, false);
assert.equal(loop.nodes.find(node => node.type === "button").props["aria-label"], pauseLabel, "rotation control is first in DOM/tab order");
loop.intersect(0.24); assertState(loop, 0, false);
loop.intersect(0.25); assertState(loop, 0, true);
for (let i = 1; i <= testimonials.length; i++) {
  loop.advance(24999); assertState(loop, (i - 1) % testimonials.length, true);
  loop.advance(1); assertState(loop, i % testimonials.length, true);
}
loop.unmount();

for (const condition of ["hover", "offscreen", "hidden document", "reduced motion"]) {
  const carousel = activeCarousel();
  carousel.advance(24000);
  if (condition === "hover") carousel.event(carousel.tree, "onMouseEnter");
  if (condition === "offscreen") carousel.intersect(0);
  if (condition === "hidden document") carousel.visibility("hidden");
  if (condition === "reduced motion") carousel.motion(true);
  assertState(carousel, 0, false);
  carousel.advance(60000); assertState(carousel, 0, false);
  if (condition === "hover") carousel.event(carousel.tree, "onMouseLeave");
  if (condition === "offscreen") carousel.intersect(1);
  if (condition === "hidden document") carousel.visibility("visible");
  if (condition === "reduced motion") carousel.motion(false);
  assertState(carousel, 0, true);
  carousel.advance(24999); assertState(carousel, 0, true);
  carousel.advance(1); assertState(carousel, 1, true);
  carousel.unmount();
}

const focus = activeCarousel();
focus.event(focus.tree, "onFocusCapture"); assertState(focus, 0, false);
focus.advance(60000); assertState(focus, 0, false);
focus.intersect(0); focus.intersect(1); assertState(focus, 0, false);
focus.click(resumeLabel); assertState(focus, 0, true);
focus.click(pauseLabel); assertState(focus, 0, false);
focus.unmount();
const touch = activeCarousel();
touch.event(touch.nodes.find(node => "aria-live" in node.props), "onPointerDown");
touch.advance(60000); assertState(touch, 0, false); touch.unmount();

const pointer = activeCarousel();
pointer.event(pointer.tree, "onMouseEnter");
pointer.event(pointer.button(pauseLabel), "onPointerDown");
pointer.event(pointer.tree, "onFocusCapture");
pointer.click(resumeLabel); // Focus changed the label; the original pointer intent must still pause.
pointer.event(pointer.tree, "onMouseLeave"); assertState(pointer, 0, false);
pointer.event(pointer.button(resumeLabel), "onPointerDown");
pointer.event(pointer.tree, "onFocusCapture");
pointer.click(resumeLabel); assertState(pointer, 0, true);
pointer.event(pointer.button(pauseLabel), "onPointerDown");
pointer.event(pointer.tree, "onFocusCapture");
pointer.event(pointer.button(resumeLabel), "onPointerCancel");
pointer.click(resumeLabel); assertState(pointer, 0, true);
pointer.unmount();

for (const [label, expected] of [["Next review", 1], ["Previous review", testimonials.length - 1], [`Show review from ${testimonials[2].author}`, 2]]) {
  const carousel = activeCarousel();
  carousel.click(label); assertState(carousel, expected, false);
  carousel.advance(60000); assertState(carousel, expected, false);
  if (label === "Previous review") { carousel.click("Next review"); assertState(carousel, 0, false); }
  carousel.unmount();
}

const reviews = activeCarousel();
assert.deepEqual(Array.from(testimonials.filter(review => review.excerpt), review => review.id), ["chris-heldt"], "only the long review uses an excerpt");
testimonials.forEach((review, index) => {
  const nodes = flatten(reviews.slides[index]);
  const full = nodes.find(node => node.props.id === `full-review-${review.id}`);
  assert.ok(nodes.some(node => node.type === "p" && textContent(node) === `“${review.excerpt ?? review.quote}”`), "each slide shows its excerpt or complete shorter review");
  if (review.excerpt) {
    assert.ok(review.quote.includes(review.excerpt), "published excerpt is a verbatim portion of the real full quote");
    assert.equal(textContent(full), review.quote, "full review retains the complete real quote without truncation or rewriting");
    assert.equal(full.props.hidden, true);
    assert.ok(nodes.some(node => node.type === "button" && node.props["aria-controls"] === full.props.id), "long review has a disclosure linked to the full text");
  } else {
    assert.equal(full, undefined, "short reviews have no separate duplicate full-review container");
    assert.ok(!nodes.some(node => node.type === "button"), "short reviews need no Read or Close full review control");
    assert.equal(nodes.filter(node => node.type === "blockquote").length, 1, "short reviews display the full quotation only once");
  }
});
reviews.event(flatten(reviews.slides[0]).find(node => node.type === "button"), "onClick");
assertState(reviews, 0, false);
assert.equal(reviews.button("Close full review").props["aria-expanded"], true);
assert.equal(reviews.nodes.find(node => node.props.id === `full-review-${testimonials[0].id}`).props.hidden, false);
reviews.advance(60000); assertState(reviews, 0, false);
reviews.click("Close full review"); assertState(reviews, 0, false);
assert.equal(reviews.nodes.find(node => node.props.id === `full-review-${testimonials[0].id}`).props.hidden, true);
reviews.click("Read full review"); assertState(reviews, 0, false);
reviews.click(resumeLabel); assertState(reviews, 0, true);
assert.ok(reviews.nodes.filter(node => node.props.id?.startsWith("full-review-")).every(node => node.props.hidden), "explicit Resume closes the full review before rotating");
reviews.event(flatten(reviews.slides[0]).find(node => node.type === "button"), "onClick");
assertState(reviews, 0, false);
reviews.click("Next review"); assertState(reviews, 1, false);
assert.ok(reviews.nodes.filter(node => node.props.id?.startsWith("full-review-")).every(node => node.props.hidden));
reviews.click("Previous review"); assert.equal(reviews.slides[0].props["aria-hidden"], false);
assert.ok(!flatten(reviews.slides[0]).some(node => node.props["aria-expanded"] === true), "returning to a review does not reopen it");
reviews.unmount();

const reduced = activeCarousel({ reduced: true });
assertState(reduced, 0, false);
assert.ok(!reduced.nodes.some(node => [pauseLabel, resumeLabel].includes(node.props["aria-label"])));
reduced.advance(60000); assertState(reduced, 0, false);
reduced.click("Next review"); assertState(reduced, 1, false);
reduced.unmount();
const hidden = activeCarousel({ visible: false });
assertState(hidden, 0, false); hidden.visibility("visible"); assertState(hidden, 0, true); hidden.unmount();
const unsupported = harness({ observerAvailable: false });
unsupported.advance(60000); assertState(unsupported, 0, false);
unsupported.click("Next review"); assertState(unsupported, 1, false); unsupported.unmount();

console.log("PASS: actual Testimonials component/data — 25-second loop/wrap, timer/subscription cleanup, hover/focus/pause/offscreen/visibility/motion gates, arrows/dots, long-review disclosure, complete short reviews, inactive slides removed from layout, inert/ARIA state, first rotation control, and pointer/focus/click pause intent. No network requests.");
