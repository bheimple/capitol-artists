import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import * as React from "react";
import * as jsxRuntime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/components/ScrollReveal.tsx", import.meta.url), "utf8");
const code = ts.transpileModule(source, {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function load(react, browserGlobals = {}) {
  const context = { exports: {}, ...browserGlobals, require(name) {
    if (name === "react") return react;
    if (name === "react/jsx-runtime") return jsxRuntime;
    throw new Error(`Unexpected import: ${name}`);
  } };
  vm.runInNewContext(code, context);
  return context.exports.default;
}

// Real React server rendering, with no browser globals or hydration.
const html = renderToStaticMarkup(React.createElement(load(React), { className: "section" }, "Artist biography"));
assert.ok(html.includes("Artist biography"));
assert.ok(!/style=|hidden|aria-hidden|opacity-0|invisible/.test(html), "server markup leaves content visible without JavaScript");

function mount({ reduced = false, observerAvailable = true, animationAvailable = true, matchMediaAvailable = true, once = true } = {}) {
  let effect;
  const animations = [], observers = [], listeners = new Set();
  const preference = { matches: reduced, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  const element = animationAvailable ? { animate(frames, options) {
    const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true; } };
    animations.push(animation);
    return animation;
  } } : {};
  const window = {};
  if (matchMediaAvailable) window.matchMedia = () => preference;
  if (observerAvailable) window.IntersectionObserver = class {
    constructor(callback) { this.callback = callback; observers.push(this); }
    observe(target) { assert.equal(target, element); this.connected = true; }
    disconnect() { this.connected = false; }
  };
  const Component = load({ useRef: () => ({ current: element }), useEffect: (fn) => { effect = fn; } }, { window });
  const tree = Component({ children: "Artist biography", once });
  assert.equal(tree.props.style, undefined, "client render also has no hidden baseline style");
  const cleanup = effect();
  return {
    animations,
    get observed() { return observers[0]?.connected ?? false; },
    enter(isIntersecting = true) { observers[0].callback([{ isIntersecting }]); },
    motion(matches) { preference.matches = matches; for (const listener of listeners) listener(); },
    unmount() {
      cleanup?.();
      assert.ok(!observers[0]?.connected, "unmount disconnects observer");
      assert.equal(listeners.size, 0, "unmount removes preference listener");
      assert.ok(animations.every(animation => animation.cancelled), "unmount cancels active animations");
    },
  };
}

for (const options of [{ reduced: true }, { observerAvailable: false }, { animationAvailable: false }, { matchMediaAvailable: false }]) {
  const staticContent = mount(options);
  assert.equal(staticContent.observed, false, "unsupported APIs or reduced motion leave visible static content");
  assert.equal(staticContent.animations.length, 0);
  staticContent.unmount();
}

const reveal = mount();
assert.equal(reveal.observed, true);
reveal.enter(false);
assert.equal(reveal.animations.length, 0, "offscreen content needs no hiding or animation");
reveal.enter();
assert.equal(reveal.animations.length, 1);
assert.equal(reveal.observed, false, "default animation stops observing after first entry");
assert.ok(reveal.animations[0].frames.every(frame => frame.opacity > 0), "even animation frames retain visible content");
assert.equal(reveal.animations[0].options.fill, "backwards", "completed animation returns to visible baseline styles");
reveal.unmount();

const repeated = mount({ once: false });
repeated.enter();
repeated.enter(false);
repeated.enter();
assert.equal(repeated.observed, true);
assert.equal(repeated.animations.length, 2);
assert.equal(repeated.animations[0].cancelled, true, "re-entry cancels prior animation instead of stacking effects");
repeated.motion(true);
assert.equal(repeated.observed, false, "enabling reduced motion disconnects ongoing observation");
assert.equal(repeated.animations[1].cancelled, true, "enabling reduced motion immediately clears motion");
repeated.unmount();

console.log("PASS: actual ScrollReveal server rendering stays visible; missing APIs and reduced motion fall back to static content; entry/re-entry, motion changes, animation cancellation, and observer/listener cleanup work.");
