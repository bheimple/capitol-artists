"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How do we begin planning a Gospel concert?",
    answer:
      "Send Mike Heimple a note through the contact form or call 719-260-1151. Tell him about your church, your location, and any groups or dates you have in mind. He will check touring routes and availability, then talk with you about the options.",
  },
  {
    question: "Can our small church host a group?",
    answer:
      "We would love to hear from your church. These ministries travel to share the Gospel and glorify God. Tell Mike about your congregation and location so he can look for a group and date that fit.",
  },
  {
    question: "Can we ask for a particular group or date?",
    answer:
      "Yes. Share your favorite group, preferred date, or a season that works for your church. Mike uses those preferences as he checks the artists' routes and availability. He will follow up with options for you to discuss together.",
  },
  {
    question: "Do the artists travel to our church?",
    answer:
      "The groups travel by bus from church to church. Mike checks your church's location against their touring routes and available dates to find a visit that works for the church and the ministry.",
  },
  {
    question: "How far ahead should we get in touch?",
    answer:
      "Reach out when you begin thinking about hosting a group. Share the dates or seasons you have in mind and how much flexibility you have. That helps Mike look for a place on an artist's touring route.",
  },
  {
    question: "What's the difference between Southern Gospel and Bluegrass Gospel?",
    answer:
      "Southern Gospel often centers on vocal harmonies, while Bluegrass Gospel features acoustic string instruments such as banjo, fiddle, and mandolin. Artists in both styles share the Gospel through song. Explore the roster and tell Mike about the music your church enjoys.",
  },
  {
    question: "What does a typical concert look like?",
    answer:
      "Your congregation and guests gather to hear Gospel music, encourage one another, and worship God. Talk with Mike about whether you have a church service or a concert in mind, then discuss the program and timing with the visiting ministry.",
  },
  {
    question: "What do we need to provide on our end?",
    answer:
      "Host churches generally receive a love offering and provide a meal for the group. As you plan the visit, discuss the gathering space, arrival time, sound needs, and a place to park the bus with Mike and the ministry.",
  },
  {
    question: "How does the love offering work?",
    answer:
      "Host churches generally receive a love offering during the concert and provide a meal for the group. The offering supports the visiting ministry as the group travels to share the Gospel. Mike can talk through the arrangements with your church.",
  },
  {
    question: "Can the artist tailor their program to our service or theme?",
    answer:
      "Share your service plans or theme with Mike. He can discuss them with the group as you work out the visit together.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 border-t border-border scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-[color:var(--accent-dark)] uppercase">
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
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--accent-dark)] hover:text-accent-hover transition-colors"
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
