"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do I book an artist for our church or event?",
    answer:
      "Simply reach out through our contact form or call Mike Heimple at 719-260-1151. We'll discuss your event date, venue, budget, and which artists you're interested in. From there, we handle all the coordination to make it happen.",
  },
  {
    question: "What types of events do you book?",
    answer:
      "We book artists for church services, revivals, gospel concerts, multi-day events, conferences, camp meetings, fairs, and private functions. If you're looking for live Southern Gospel or Bluegrass Gospel music, we can help.",
  },
  {
    question: "How far in advance should we plan?",
    answer:
      "We recommend reaching out 3 to 6 months in advance for the best selection of dates, especially for weekend concerts. However, don't hesitate to call even if your event is sooner, we'll do our best to make it work.",
  },
  {
    question: "Do the artists travel to our location?",
    answer:
      "Yes. All of our artists travel regionally and nationally. Travel distance and associated costs are factored into the booking, and we'll be upfront about what's involved in bringing an artist to your area.",
  },
  {
    question: "Can we book multiple artists for one event?",
    answer:
      "Absolutely. Multi-artist concerts and all-day gospel events are a great way to draw a larger crowd. We can help you put together a lineup that flows well and fits your schedule and budget.",
  },
  {
    question: "What's the difference between Southern Gospel and Bluegrass Gospel?",
    answer:
      "Southern Gospel features tight four-part vocal harmonies rooted in quartet tradition, while Bluegrass Gospel blends acoustic string instruments like banjo, fiddle, and mandolin with gospel lyrics. Both traditions are deeply rooted in faith and church music heritage, and we represent artists in both styles.",
  },
  {
    question: "What does a typical concert look like?",
    answer:
      "Most concerts run 60 to 90 minutes, though this is flexible. The artist typically leads a program of gospel music with testimony and ministry woven throughout. For multi-artist events, each group performs their own set. We'll work with you on timing, stage setup, and sound requirements ahead of time.",
  },
  {
    question: "What do we need to provide on our end?",
    answer:
      "You'll need a venue with adequate seating, a stage or performance area, and a sound system capable of supporting live vocal and instrumental performance. Some artists travel with their own sound engineer. We'll provide a detailed tech rider and any specific requirements once the booking is confirmed, so there are no surprises.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing varies by artist, travel distance, date, and event type. Once we know your budget and what you're looking for, we'll give you clear pricing with no hidden fees. We're upfront about all costs, including travel and lodging when applicable, before you commit to anything.",
  },
  {
    question: "Can the artist tailor their program to our service or theme?",
    answer:
      "Yes. Many of our artists can customize their setlist, message, or program length to align with your service theme, sermon series, or special occasion. Just let us know what you're envisioning and we'll coordinate with the artist to make it happen.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              Questions & Answers
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">
            Frequently Asked
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-surface border border-border overflow-hidden transition-all duration-300 hover:border-accent/20"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left"
              >
                <span className="text-base font-semibold text-foreground">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === i ? "rotate-45" : ""
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="text-accent"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === i
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-muted mb-4">Still have questions?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
          >
            Get in touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
