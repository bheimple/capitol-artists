"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: `${formData.get("firstName")} ${formData.get("lastName")}`,
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("https://koda-5f718eba.base44.app/functions/submitInquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Submission failed");
      }

      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please call 719-260-1151.");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold mb-2">Inquiry Received</h3>
        <p className="text-muted max-w-md mx-auto mb-8">
          Thank you for reaching out. Mike will get back to you shortly to discuss your concert booking.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="px-6 py-3 rounded-full border border-border bg-surface/50 text-foreground font-semibold text-sm hover:bg-surface hover:border-accent/30 transition-all"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
            First Name
          </label>
          <input
            name="firstName"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
            Last Name
          </label>
          <input
            name="lastName"
            type="text"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            placeholder="Doe"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            placeholder="john@example.com"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
            placeholder="(719) 260-1151"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-muted mb-2 tracking-wide uppercase">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={5}
          className="w-full px-4 py-3 rounded-lg bg-surface border border-border text-foreground placeholder:text-border focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none"
          placeholder="Tell us about your event, venue, and which artists you're interested in..."
        />
      </div>

      {status === "error" && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 rounded-full bg-accent text-background font-semibold text-base hover:bg-accent-hover transition-all hover:shadow-xl hover:shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
              <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit Inquiry"
        )}
      </button>
    </form>
  );
}
