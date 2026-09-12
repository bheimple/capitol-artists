"use client";

import { useEffect, useId, useRef, useState } from "react";

const verses = [
  "Praise ye the LORD. Praise God in his sanctuary: praise him in the firmament of his power.",
  "Praise him for his mighty acts: praise him according to his excellent greatness.",
  "Praise him with the sound of the trumpet: praise him with the psaltery and harp.",
  "Praise him with the timbrel and dance: praise him with stringed instruments and organs.",
  "Praise him upon the loud cymbals: praise him upon the high sounding cymbals.",
  "Let every thing that hath breath praise the LORD. Praise ye the LORD.",
];

export default function Psalm150() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismiss(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      if (container.current?.contains(document.activeElement)) trigger.current?.focus();
    }
    function outside(event: PointerEvent) {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <div
      ref={container}
      className="absolute right-3 top-3 z-20 sm:right-6 sm:top-5 lg:right-8 lg:top-6"
      onPointerEnter={(event) => { if (event.pointerType === "mouse") setOpen(true); }}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") setOpen(false); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-sm bg-[#f9f6ef]/90 px-3 py-1 font-serif text-sm font-semibold italic text-[#062653] underline decoration-[#062653]/40 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653] sm:text-base lg:text-xl"
      >
        Psalm 150
      </button>
      <div id={id} hidden={!open} className="absolute right-0 top-full w-[min(24rem,calc(100vw-1.5rem))] pt-2">
        <section aria-labelledby={`${id}-heading`} className="max-h-[calc(100svh-10rem)] overflow-y-auto overscroll-contain rounded-xl border border-[#d8c9a6] bg-[#f9f6ef] p-5 text-[#062653] shadow-xl sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <h2 id={`${id}-heading`} className="font-serif text-xl font-semibold">Psalm 150</h2>
              <p className="mt-1 text-xs">King James Version (KJV)</p>
            </div>
            <button type="button" aria-label="Close Psalm 150" onClick={() => { setOpen(false); trigger.current?.focus(); }} className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[#062653]/20 text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653]">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed marker:font-semibold">
            {verses.map((verse) => <li key={verse} className="pl-1">{verse}</li>)}
          </ol>
        </section>
      </div>
    </div>
  );
}
