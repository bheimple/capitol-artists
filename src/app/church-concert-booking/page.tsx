import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { artists } from "@/data/artists";
import { SITE_URL } from "@/lib/site";

const title = "Southern Gospel Concert Booking for Churches";
const description = "Plan a Southern Gospel or Bluegrass Gospel concert for your church. Explore Capitol Artists' roster and discuss artists, dates, and arrangements with Mike Heimple.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/church-concert-booking` },
  openGraph: {
    title: `${title} | Capitol Artists`,
    description,
    type: "website",
    url: `${SITE_URL}/church-concert-booking`,
    siteName: "Capitol Artists",
    images: [{ url: "/brand/hero-small-logo.webp", width: 1774, height: 887, alt: "Capitol Artists — Gospel concert booking since 1992" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Capitol Artists`,
    description,
    images: ["/brand/hero-small-logo.webp"],
  },
};

const planningSteps = [
  { number: "01", title: "Find the music that fits", body: "Browse the artist roster and think about your congregation, the occasion, and the kind of program you have in mind. You can ask about a particular group or let Mike know you would like help choosing." },
  { number: "02", title: "Share your church's plans", body: "Send your church name and location, any preferred dates, and the artist you are interested in. If the date is flexible or you are still working out the details, say so in your inquiry." },
  { number: "03", title: "Talk through the arrangements", body: "Discuss availability, the program, expenses, travel, and your venue with Mike. Agree on the details before announcing a confirmed concert to your congregation." },
];

const planningDetails = [
  { title: "The service or concert", body: "Describe the occasion, expected audience, and where music will fit in the program. Ask about timing and whether the artist's format suits your plans." },
  { title: "The room and sound", body: "Share your seating and performance space, available sound equipment, and who will run it. Ask what the artist needs and who will provide each item." },
  { title: "Travel and expenses", body: "Discuss your location, the artist's travel, and the financial arrangements for your event. Ask whether meals, lodging, or an offering need to be planned, and confirm responsibilities together." },
  { title: "Getting the word out", body: "Once the date is confirmed, agree on the artist name, location, start time, and any admission or offering information before sharing invitations. Ask which approved photos and promotional materials you can use." },
];

const questions = [
  { question: "Can you help us choose a Gospel group?", answer: "Start with the artist roster to get a sense of each ministry and musical style. If you are unsure, choose ‘Help us choose’ in the form and tell Mike about your congregation and the occasion." },
  { question: "Do we need a firm date before contacting you?", answer: "You can send an inquiry while you are still planning. Share a preferred date, a few options, or a general season. Availability needs to be discussed before a date is confirmed." },
  { question: "How much does it cost to host a concert?", answer: "Ask Mike about the arrangements for the artist and event you have in mind. Your first conversation is the place to discuss expenses, travel, and any offering arrangements so your church can plan with clear expectations." },
  { question: "What happens after we inquire?", answer: "Your inquiry gives Mike the church, location, timing, and artist details needed to discuss the next steps with you. Sending the form does not reserve an artist or confirm a concert date." },
];

export default function ChurchConcertBookingPage() {
  return (
    <div className="pt-20">
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 sm:pb-20 lg:px-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="mb-12 text-sm text-muted sm:mb-16">
            <ol className="flex items-center gap-3">
              <li><Link href="/" className="underline-offset-4 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">For Churches</li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-dark)]">For churches &amp; concert hosts</p>
              <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-[#062653]">Bring Southern Gospel music to your church.</h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">Plan a concert or musical ministry event with Capitol Artists. Explore Southern Gospel and Bluegrass Gospel artists, then talk with Mike Heimple about your congregation, your date, and the details.</p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
                <a href="#contact" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#062653] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#123d70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">Ask About a Concert</a>
                <Link href="/#roster" className="text-sm font-semibold text-[#062653] underline decoration-[#a7770c] underline-offset-4">Explore the Artists</Link>
              </div>
            </div>
            <aside className="border-t-2 border-[#a7770c] bg-[#062653] px-7 py-9 text-white sm:p-10">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-[#e5c98b]">A conversation with Mike</p>
              <h2 className="font-serif text-3xl font-semibold leading-tight">You don’t need every detail figured out.</h2>
              <p className="mt-5 leading-relaxed text-[#e7e9ed]">Start with your church, your location, and what you have in mind. Mike can discuss the artist and booking questions with you.</p>
              <a href="tel:719-260-1151" className="mt-7 inline-block text-xl font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">719-260-1151</a>
              <p className="mt-3 text-sm text-[#e7e9ed]">Mike Heimple · Founder &amp; Booking Agent</p>
              <Link href="/#about" className="mt-6 inline-block text-sm text-white underline underline-offset-4">Get to Know Mike</Link>
            </aside>
          </div>
        </div>
      </section>

      <section aria-labelledby="planning-heading" className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        <h2 id="planning-heading" className="font-serif text-3xl font-semibold text-[#062653] sm:text-4xl">Start with the music. Plan the details together.</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {planningSteps.map(({ number, title: stepTitle, body }) => (
            <div key={number} className="border-t border-border pt-6">
              <p aria-hidden="true" className="mb-4 font-serif text-2xl text-[#90640a]">{number}</p>
              <h3 className="mb-3 text-lg font-semibold text-[#062653]">{stepTitle}</h3>
              <p className="leading-relaxed text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="details-heading" className="border-y border-border bg-surface/50">
        <div className="mx-auto grid max-w-7xl gap-9 px-6 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20 lg:px-8">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-dark)]">A host’s planning checklist</p>
            <h2 id="details-heading" className="font-serif text-3xl font-semibold leading-tight text-[#062653] sm:text-4xl">What to talk through before the concert.</h2>
            <p className="mt-5 leading-relaxed text-muted">Use these topics to prepare for your conversation. The arrangements for your church and chosen artist should be confirmed directly with Mike.</p>
          </div>
          <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {planningDetails.map(({ title: detailTitle, body }) => (
              <div key={detailTitle}>
                <h3 className="mb-3 text-lg font-semibold text-[#062653]">{detailTitle}</h3>
                <p className="leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="booking-heading" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20 lg:px-8">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-dark)]">Tell us what you have in mind</p>
          <h2 id="booking-heading" className="font-serif text-4xl font-semibold leading-tight text-[#062653]">Let’s plan a concert.</h2>
          <p className="mt-5 max-w-sm leading-relaxed text-muted">Share a little about your church and the music you are looking for. You can leave the date open and ask for help choosing an artist.</p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">Prefer to talk? Call <a href="tel:719-260-1151" className="font-semibold text-[#062653] underline underline-offset-4">719-260-1151</a>.</p>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">Are you an artist seeking representation? <Link href="/artist-representation" className="font-semibold text-[#062653] underline underline-offset-4">Introduce your ministry here.</Link></p>
        </div>
        <ContactForm artistOptions={artists.map(({ slug, name }) => ({ slug, name }))} />
      </section>

      <section aria-labelledby="questions-heading" className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20 lg:px-8">
          <h2 id="questions-heading" className="font-serif text-3xl font-semibold text-[#062653] sm:text-4xl">Church booking questions.</h2>
          <div className="divide-y divide-border border-y border-border">
            {questions.map(({ question, answer }) => (
              <div key={question} className="py-6">
                <h3 className="mb-3 text-lg font-semibold text-[#062653]">{question}</h3>
                <p className="leading-relaxed text-muted">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
