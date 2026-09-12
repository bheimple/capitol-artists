"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import type { Artist } from "@/data/artists";
import { trackInquirySuccess } from "@/lib/analytics";

const fieldClass = "w-full rounded-lg border border-[#8e948f] bg-[#f9f6ef] px-4 py-3 text-[#062653] placeholder:text-[#60685f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#062653] disabled:cursor-wait";
const labelClass = "mb-2 block text-sm font-semibold text-[#062653]";

type ContactFormProps = { artistOptions: readonly Pick<Artist, "slug" | "name">[] };

function ArtistQuerySelection({ artistOptions, onSelect }: ContactFormProps & { onSelect: (slug: string) => void }) {
  const requestedSlug = useSearchParams().get("artist");
  const artistSlug = artistOptions.some((artist) => artist.slug === requestedSlug) ? requestedSlug : null;

  useEffect(() => {
    if (artistSlug) {
      onSelect(artistSlug);
    }
  }, [artistSlug, onSelect]);

  return null;
}

export default function ContactForm({ artistOptions }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedArtist, setSelectedArtist] = useState("");
  const submittingRef = useRef(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const previousStatus = useRef(status);

  useEffect(() => {
    if (status === "success" || status === "error") {
      feedbackRef.current?.focus();
    } else if (status === "idle" && previousStatus.current === "success") {
      firstNameRef.current?.focus();
    }
    previousStatus.current = status;
  }, [status, errorMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingRef.current) return;

    const formData = new FormData(event.currentTarget);
    const value = (name: string) => String(formData.get(name) ?? "").trim();
    const requiredFields = [
      ["firstName", "first name"],
      ["lastName", "last name"],
      ["email", "email"],
      ["organization", "church or organization"],
      ["eventLocation", "city and state"],
    ];
    const missingField = requiredFields.find(([name]) => !value(name));
    if (missingField) {
      setErrorMessage(`Please complete the ${missingField[1]} field. Your other details are still here.`);
      setStatus("error");
      return;
    }

    const artist = artistOptions.find((entry) => entry.slug === value("artistInterest"));
    const name = `${value("firstName")} ${value("lastName")}`;
    const data = {
      name,
      email: value("email"),
      phone: value("phone"),
      message: [
        "CHURCH CONCERT INQUIRY",
        "",
        `Contact name: ${name}`,
        `Email: ${value("email")}`,
        `Phone: ${value("phone") || "Not provided"}`,
        `Church / organization: ${value("organization")}`,
        `Event city / state: ${value("eventLocation")}`,
        `Preferred dates / flexibility: ${value("preferredDates") || "Not specified"}`,
        `Artist interest: ${artist?.name || "Help us find a fit"}`,
        "",
        "Additional details:",
        value("message") || "None provided",
      ].join("\n"),
      _subject: "Capitol Artists — Church Booking Inquiry",
      _template: "table",
      _url: `${window.location.origin}${window.location.pathname}`,
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
      trackInquirySuccess("church_booking");
    } catch {
      setErrorMessage(controller.signal.aborted
        ? "The connection timed out, so we could not confirm receipt. Your details are still here. Please email or call Mike before trying again."
        : "We could not confirm your inquiry was received. Your details are still here. Please email or call Mike before trying again.");
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      submittingRef.current = false;
    }
  }

  return (
    <div>
      <Suspense fallback={null}>
        <ArtistQuerySelection artistOptions={artistOptions} onSelect={setSelectedArtist} />
      </Suspense>
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {status === "submitting" ? "Sending your church concert inquiry." : ""}
      </p>

      {status === "success" ? (
        <div ref={feedbackRef} tabIndex={-1} className="rounded-xl border border-[#8e948f] bg-[#f9f6ef] p-6 text-[#062653] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
          <h3 className="mb-3 font-serif text-2xl font-bold">Inquiry received</h3>
          <p className="leading-relaxed">We received your concert inquiry. Mike will follow up to discuss ministries and dates that fit your church.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-6 rounded-full border border-[#062653] px-5 py-3 text-sm font-semibold hover:bg-[#062653]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
            Submit Another Inquiry
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} aria-busy={status === "submitting"} aria-describedby="contact-required" className="space-y-6">
          <p id="contact-required" className="text-sm leading-relaxed text-[#475248]">Fields marked optional can stay open. Share any artist or date preferences; Mike will check touring routes and availability with your church’s location in mind.</p>

          <fieldset disabled={status === "submitting"} className="grid min-w-0 gap-5 sm:grid-cols-2">
            <legend className="sr-only">Church concert inquiry details</legend>
            <div>
              <label htmlFor="contact-first-name" className={labelClass}>First name</label>
              <input ref={firstNameRef} id="contact-first-name" name="firstName" type="text" autoComplete="given-name" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-last-name" className={labelClass}>Last name</label>
              <input id="contact-last-name" name="lastName" type="text" autoComplete="family-name" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className={labelClass}>Email</label>
              <input id="contact-email" name="email" type="email" autoComplete="email" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-phone" className={labelClass}>Phone <span className="font-normal">(optional)</span></label>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-organization" className={labelClass}>Church or organization</label>
              <input id="contact-organization" name="organization" type="text" autoComplete="organization" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-location" className={labelClass}>City and state</label>
              <input id="contact-location" name="eventLocation" type="text" placeholder="Where would you host the concert?" required className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-dates" className={labelClass}>Preferred dates <span className="font-normal">(optional)</span></label>
              <input id="contact-dates" name="preferredDates" type="text" placeholder="For example, this fall or flexible" aria-describedby="contact-dates-help" className={fieldClass} />
              <p id="contact-dates-help" className="mt-2 text-sm leading-relaxed text-[#475248]">Share a date, season, or flexible window for Mike to consider.</p>
            </div>
            <div>
              <label htmlFor="contact-artist" className={labelClass}>Artist interest <span className="font-normal">(optional)</span></label>
              <select id="contact-artist" name="artistInterest" value={selectedArtist} onChange={(event) => setSelectedArtist(event.target.value)} className={fieldClass}>
                <option value="">Help us find a fit</option>
                {artistOptions.map((artist) => <option key={artist.slug} value={artist.slug}>{artist.name}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className={labelClass}>Anything else we should know? <span className="font-normal">(optional)</span></label>
              <textarea id="contact-message" name="message" rows={4} placeholder="Tell us about your service, concert or special event." className={`${fieldClass} resize-y`} />
            </div>
          </fieldset>

          {status === "error" && (
            <div ref={feedbackRef} role="alert" tabIndex={-1} className="rounded-lg border border-[#9b3131] bg-[#fff4f0] p-4 text-[#742222] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#742222]">
              <p className="leading-relaxed">{errorMessage}</p>
              <div className="mt-3 flex flex-col items-start gap-2">
                <a href="mailto:mike@capitol-artists.com" className="break-all font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#742222]">Email mike@capitol-artists.com</a>
                <a href="tel:719-260-1151" className="font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#742222]">Call 719-260-1151</a>
              </div>
            </div>
          )}

          <p className="text-sm leading-relaxed text-[#475248]">Your details are emailed to Mike so he can respond to your concert inquiry.</p>

          <button type="submit" disabled={status === "submitting"} className="cta-gold w-full">
            {status === "submitting" ? "Sending inquiry…" : "Send Concert Inquiry"}
          </button>
        </form>
      )}
    </div>
  );
}
