"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { trackInquirySuccess } from "@/lib/analytics";

const fieldClass = "w-full rounded-lg border border-[#8e948f] bg-[#f9f6ef] px-4 py-3 text-[#062653] placeholder:text-[#60685f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653] disabled:cursor-wait";
const labelClass = "mb-2 block text-base font-semibold text-[#062653]";

export default function ArtistInquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "success" || status === "error") {
      feedbackRef.current?.focus();
    }
  }, [status, errorMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const requiredFields = [
      ["artistName", "artist or group name"],
      ["contactName", "contact name"],
      ["email", "email"],
      ["homeLocation", "home city and state"],
      ["musicalStyle", "musical style"],
      ["website", "website or social link"],
      ["introduction", "ministry introduction"],
    ];
    const missingField = requiredFields.find(([name]) => !value(name));
    if (missingField) {
      setErrorMessage(`Please complete the ${missingField[1]} field. Your other details are still here.`);
      setStatus("error");
      return;
    }

    const data = {
      name: value("contactName"),
      email: value("email"),
      phone: value("phone"),
      _subject: "Capitol Artists — Artist Representation Inquiry",
      _template: "table",
      _url: "https://capitol-artists.com/",
      message: [
        "ARTIST REPRESENTATION INQUIRY",
        "",
        `Artist / group: ${value("artistName")}`,
        `Contact name: ${value("contactName")}`,
        `Email: ${value("email")}`,
        `Phone: ${value("phone") || "Not provided"}`,
        `Home city / state: ${value("homeLocation")}`,
        `Musical style: ${value("musicalStyle")}`,
        `Website / social link: ${value("website")}`,
        `Performance video: ${value("performanceVideo") || "Not provided"}`,
        "",
        "Ministry introduction:",
        value("introduction"),
      ].join("\n"),
    };

    submittingRef.current = true;
    setStatus("submitting");
    setErrorMessage("");

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch("https://formsubmit.co/ajax/mike@capitol-artists.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      trackInquirySuccess("artist_representation");
    } catch {
      setErrorMessage(controller.signal.aborted
        ? "The connection timed out, so we could not confirm receipt. Your details are still here. Please call Mike before trying again."
        : "We could not confirm that your introduction was received. Your details are still here. Please email mike@capitol-artists.com or call Mike for help.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      submittingRef.current = false;
    }
  }

  return (
    <div>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === "submitting" ? "Sending your artist introduction." : ""}
      </p>

      {status === "success" ? (
        <div ref={feedbackRef} tabIndex={-1} className="rounded-xl border border-[#8e948f] bg-[#f9f6ef] p-6 text-[#062653] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
          <h3 className="mb-3 font-serif text-2xl font-bold">Introduction received</h3>
          <p className="leading-relaxed">Your introduction has been received. Thank you for sharing your music with Capitol Artists.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={status === "submitting"} aria-describedby="artist-inquiry-required" className="space-y-6">
          <p id="artist-inquiry-required" className="text-base leading-relaxed text-[#475248]">
            All fields are required unless marked optional. Share links to your music; no uploads are needed.
          </p>

          <fieldset disabled={status === "submitting"} className="grid min-w-0 gap-5 sm:grid-cols-2">
            <legend className="sr-only">Artist introduction details</legend>
            <div>
              <label htmlFor="artist-inquiry-name" className={labelClass}>Artist or group name</label>
              <input id="artist-inquiry-name" name="artistName" type="text" autoComplete="organization" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="artist-inquiry-contact" className={labelClass}>Contact name</label>
              <input id="artist-inquiry-contact" name="contactName" type="text" autoComplete="name" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="artist-inquiry-email" className={labelClass}>Email</label>
              <input id="artist-inquiry-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="artist-inquiry-phone" className={labelClass}>Phone <span className="font-normal">(optional)</span></label>
              <input id="artist-inquiry-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="artist-inquiry-location" className={labelClass}>Home city and state</label>
              <input id="artist-inquiry-location" name="homeLocation" type="text" placeholder="City, State" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="artist-inquiry-style" className={labelClass}>Musical style</label>
              <input id="artist-inquiry-style" name="musicalStyle" type="text" placeholder="For example, Southern Gospel quartet" required className={fieldClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="artist-inquiry-website" className={labelClass}>Website or social link</label>
              <input id="artist-inquiry-website" name="website" type="url" autoComplete="url" inputMode="url" pattern="https?://.+" title="Enter a full link beginning with https:// or http://." placeholder="https://" required className={fieldClass} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="artist-inquiry-video" className={labelClass}>Performance video link <span className="font-normal">(optional)</span></label>
              <input id="artist-inquiry-video" name="performanceVideo" type="url" inputMode="url" pattern="https?://.+" title="Enter a full link beginning with https:// or http://." placeholder="https://" aria-describedby="artist-inquiry-video-help" className={fieldClass} />
              <p id="artist-inquiry-video-help" className="mt-2 text-base leading-relaxed text-[#475248]">Share a link we can watch without a login or access request, such as a public or unlisted YouTube video of a live performance.</p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="artist-inquiry-introduction" className={labelClass}>Tell us about your ministry</label>
              <textarea id="artist-inquiry-introduction" name="introduction" rows={5} placeholder="Introduce your group, your church-concert experience, your usual travel area and what you are looking for in booking representation." required className={`${fieldClass} resize-y`} />
            </div>
          </fieldset>

          <p className="text-base leading-relaxed text-[#475248]">Your introduction starts a conversation with Mike. You will discuss the fit, travel area, and representation arrangements together.</p>

          {status === "error" && (
            <div ref={feedbackRef} role="alert" tabIndex={-1} className="rounded-lg border border-[#9b3131] bg-[#fff4f0] p-4 text-[#742222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#742222]">
              <p className="leading-relaxed">{errorMessage}</p>
              <a href="tel:719-260-1151" className="mt-2 inline-block font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#742222]">Call 719-260-1151</a>
            </div>
          )}

          <button type="submit" disabled={status === "submitting"} className="cta-gold w-full">
            {status === "submitting" ? "Sending introduction…" : "Send Artist Introduction"}
          </button>
        </form>
      )}
    </div>
  );
}
