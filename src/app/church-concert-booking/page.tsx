import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import ChurchTestimonial from "@/components/ChurchTestimonial";
import { artists } from "@/data/artists";
import { SITE_URL } from "@/lib/site";

const title = "Southern Gospel Concert Booking for Churches";
const description = "Host Southern Gospel ministry with a love offering and a meal. Talk with Mike at Capitol Artists about your church, touring artists, and available dates.";

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
  { number: "01", title: "Tell Mike about your church", body: "Share your location, the occasion, and any dates or season you have in mind. If a particular artist's music speaks to your congregation, let Mike know." },
  { number: "02", title: "Find a ministry and date that fit", body: "These groups travel by bus, so Mike checks their tour routes and availability alongside your church's plans. He can discuss the artist you asked about or suggest another ministry that could fit." },
  { number: "03", title: "Welcome the group", body: "Once you and the artist have agreed on a date, talk through the love offering, a meal, and the needs of the service or concert. Then invite your congregation and community to join you." },
];

const planningDetails = [
  { title: "The service or concert", body: "Describe the occasion, expected audience, and where music will fit in the program. Ask about timing and whether the artist's format suits your plans." },
  { title: "The room and sound", body: "Share your seating and performance space, available sound equipment, and who will run it. Ask what the artist needs and who will provide each item." },
  { title: "A love offering and a meal", body: "Our groups generally ask the church to receive a love offering and provide a meal. The offering supports their Gospel ministry and travel. Talk with Mike about what works for your church and the group." },
  { title: "Getting the word out", body: "After Mike and the artist confirm the date, share the concert time, church location, and love offering details with your congregation. Ask which artist photos and materials you can use to invite your community." },
];

const questions = [
  { question: "Can we ask about a particular Gospel group?", answer: "Yes. We would love to know whose music you enjoy. Mike will check whether that group's route and available dates fit your location, and he can suggest other ministries to consider too." },
  { question: "Do we need a firm date before contacting you?", answer: "A preferred date, a few options, or a general season are all helpful. A flexible window can give Mike more opportunities to connect your church with a group traveling in your area." },
  { question: "What does our church provide?", answer: "A love offering and a meal are the usual hosting arrangements. The offering helps sustain the group's ministry and travel, and a meal is a way to welcome them. Mike will discuss the arrangements and the needs of your space with you and the artist." },
  { question: "Do the groups come to our area?", answer: "Each ministry has its own travel area and tour schedule. Share your city and state with Mike, even if you are still exploring the idea. He can look into what may be possible for your church." },
  { question: "What happens after we inquire?", answer: "Mike will follow up to discuss your church and explore artists and dates that could work. You and the group will agree on the details with Mike before the concert is confirmed." },
];

export default function ChurchConcertBookingPage() {
  return (
    <div className="pt-20">
      <section className="landing-hero border-b border-[#062653] bg-[#062653] text-[#f5f1e8]">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 sm:pb-20 lg:px-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-[#e2d9c8] sm:mb-12">
            <ol className="flex items-center gap-3">
              <li><Link href="/" className="underline-offset-4 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">For Churches</li>
            </ol>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <div>
              <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold leading-[1.08] tracking-tight">Bring <span className="text-[#e8bd68]">Southern Gospel</span> music to your church.</h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#e2d9c8]">Welcome a traveling Gospel ministry to encourage your congregation and share the hope of Christ. Tell Mike where your church is and what you have in mind, and explore the artists and dates that could fit.</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#contact" className="cta-gold">Ask About a Concert <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
                <Link href="/#roster" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#b5c4d8] px-6 py-3 text-sm font-semibold text-[#f5f1e8] transition-colors hover:bg-[#123d70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Meet the Ministries</Link>
              </div>
            </div>
            <aside className="bg-[#efe0bd] px-7 py-9 text-[#062653] sm:p-10">
              <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">A love offering<br />and a meal.</h2>
              <p className="mt-5 leading-relaxed">That is what our groups generally ask of a host church. Your offering helps support their ministry on the road, and a meal gives your church a way to welcome them.</p>
              <p className="mt-4 leading-relaxed">Mike will talk through what works for your church and the group.</p>
              <a href="tel:719-260-1151" className="mt-7 inline-block text-xl font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">Call Mike: 719-260-1151</a>
              <Link href="/#about" className="mt-5 block text-sm font-semibold underline underline-offset-4">Get to Know Mike</Link>
            </aside>
          </div>
        </div>
      </section>

      <section aria-labelledby="planning-heading" className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        <h2 id="planning-heading" className="font-serif text-3xl font-semibold text-[#062653] sm:text-4xl">Plan a visit with Mike.</h2>
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
            <h2 id="details-heading" className="font-serif text-3xl font-semibold leading-tight text-[#062653] sm:text-4xl">What to talk through before the concert.</h2>
            <p className="mt-5 leading-relaxed text-muted">Mike will help your church and the artist talk through the plans so everyone knows how to prepare for the visit.</p>
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
        <div className="self-start">
          <div className="bg-[#062653] p-7 text-[#f5f1e8] sm:p-9">
            <h2 id="booking-heading" className="font-serif text-4xl font-semibold leading-tight">Tell us about<br className="hidden lg:block" /> your church.</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-[#e2d9c8]">A church location and a little about your plans are a good place to start. Mike will help you explore which ministries may be traveling your way.</p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#e2d9c8]">Prefer to talk? Call <a href="tel:719-260-1151" className="font-semibold text-[#e8bd68] underline underline-offset-4">719-260-1151</a>.</p>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#e2d9c8]">Are you an artist seeking representation? <Link href="/artist-representation" className="font-semibold text-[#e8bd68] underline underline-offset-4">Introduce your ministry here.</Link></p>
          </div>
          <ChurchTestimonial />
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
