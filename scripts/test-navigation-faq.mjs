import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

// Exercise the real components' disclosure and modal lifecycle handlers.
// Native browser focus trapping and Escape dismissal are checked in browser QA.
const flatten = (node) => Array.isArray(node) ? node.flatMap(flatten) : node && typeof node === "object" ? [node, ...flatten(node.props.children)] : [];
function mount(component) {
  const hooks = [], listeners = new Set();
  const document = { body: { style: { overflow: "auto" } }, activeElement: null };
  let cursor = 0, dirty = true, jobs = [], tree;
  const react = {
    useState(initial) {
      const i = cursor++;
      hooks[i] ??= { value: initial };
      return [hooks[i].value, (value) => {
        if (!Object.is(hooks[i].value, value)) { hooks[i].value = value; dirty = true; }
      }];
    },
    useRef(initial) { const i = cursor++; hooks[i] ??= { current: initial }; return hooks[i]; },
    useEffect(effect, dependencies) {
      const i = cursor++, previous = hooks[i];
      if (!previous || dependencies.some((value, j) => !Object.is(value, previous.dependencies[j]))) {
        jobs.push(() => { previous?.cleanup?.(); hooks[i] = { dependencies, cleanup: effect() }; });
      }
    },
  };
  const context = {
    exports: {}, document,
    window: { matchMedia(query) {
      assert.equal(query, "(min-width: 1024px)");
      return { addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
    } },
    require(name) {
      if (name === "react") return react;
      if (name === "next/link") return { default: "a" };
      if (name === "@/components/BrandLogo") return { default: "BrandLogo" };
      if (name === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
      throw new Error(`Unexpected module: ${name}`);
    },
  };
  const compiled = ts.transpileModule(fs.readFileSync(new URL(`../src/components/${component}.tsx`, import.meta.url), "utf8"), {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    reportDiagnostics: true,
  });
  assert.equal(compiled.diagnostics.length, 0);
  vm.runInNewContext(compiled.outputText, context);
  function flush() {
    for (let renders = 0; dirty; renders++) {
      assert.ok(renders < 20);
      dirty = false; cursor = 0; jobs = []; tree = context.exports.default();
      for (const node of flatten(tree)) if (node.props.ref) {
        node.props.ref.current ??= {
          open: false,
          focus() { document.activeElement = this; },
          showModal() { assert.equal(this.open, false); this.open = true; },
          close() { this.open = false; flatten(tree).find(n => n.type === "dialog").props.onClose(); },
        };
      }
      for (const job of jobs) job();
    }
  }
  flush();
  return {
    get nodes() { return flatten(tree); }, document,
    button(label) { const node = this.nodes.find(n => n.type === "button" && n.props["aria-label"] === label); assert.ok(node); return node; },
    event(node, name) { node.props[name](); flush(); },
    breakpoint(matches) { for (const listener of listeners) listener({ matches }); flush(); },
    unmount() { for (const hook of hooks) hook?.cleanup?.(); assert.equal(listeners.size, 0); },
  };
}

const menu = mount("Navbar");
const dialog = () => menu.nodes.find(n => n.type === "dialog");
function assertClosed() {
  assert.equal(dialog().props.ref.current.open, false);
  assert.equal(menu.button("Open menu").props["aria-expanded"], false);
  assert.equal(menu.document.body.style.overflow, "auto", "previous overflow is restored");
}
function open() {
  menu.event(menu.button("Open menu"), "onClick");
  assert.equal(dialog().props.ref.current.open, true, "showModal is used");
  assert.equal(menu.button("Open menu").props["aria-expanded"], true);
  assert.equal(menu.document.body.style.overflow, "hidden");
  assert.equal(menu.document.activeElement, menu.button("Close menu").props.ref.current);
}
assertClosed();
assert.equal(menu.button("Open menu").props["aria-controls"], dialog().props.id);
open(); menu.event(menu.button("Close menu"), "onClick"); assertClosed();
open();
dialog().props.ref.current.open = false; // Native Escape dismisses the dialog, then emits close.
menu.event(dialog(), "onClose"); assertClosed();
for (const href of ["/#roster", "/church-concert-booking", "/#contact", "tel:719-260-1151"]) {
  open();
  menu.event(flatten(dialog()).find(n => n.props.href === href), "onClick");
  assertClosed();
}
open(); menu.breakpoint(false);
assert.equal(dialog().props.ref.current.open, true);
menu.breakpoint(true); assertClosed();
assert.equal(menu.document.activeElement, menu.nodes.find(n => n.props.href === "/" && n.props.ref).props.ref.current, "desktop resize focuses a visible desktop link");
open(); menu.unmount();
assert.equal(menu.document.body.style.overflow, "auto", "unmount restores page scrolling");

const faq = mount("FAQ");
function assertDisclosure(openIndex) {
  const buttons = faq.nodes.filter(n => n.type === "button");
  assert.equal(buttons.length, 10, "all existing questions are retained");
  buttons.forEach((button, index) => {
    const answer = faq.nodes.find(n => n.props.id === button.props["aria-controls"]);
    assert.ok(answer);
    assert.equal(answer.props["aria-labelledby"], button.props.id);
    assert.equal(button.props["aria-expanded"], index === openIndex);
    assert.equal(answer.props.hidden, index !== openIndex, "closed content is removed from layout and accessibility tree");
    assert.ok(faq.nodes.some(n => n.type === "h3" && n.props.children === button), "each question is a navigable heading");
  });
}
assertDisclosure(0);
for (let i = 0; i < 10; i++) {
  const buttons = () => faq.nodes.filter(n => n.type === "button");
  if (i === 0) { faq.event(buttons()[0], "onClick"); assertDisclosure(null); }
  faq.event(buttons()[i], "onClick"); assertDisclosure(i);
}
faq.event(faq.nodes.filter(n => n.type === "button")[9], "onClick"); assertDisclosure(null);
faq.unmount();
console.log("PASS: Navbar modal open/close/native-close synchronization, navigation close, scroll restoration, breakpoint cleanup/focus destination; FAQ first-open, single-open, collapse, linked ARIA state and hidden answers. Native focus trapping/Escape still require browser QA.");
