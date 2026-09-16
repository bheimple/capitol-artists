import type { Metadata } from "next";
import Link from "next/link";
import ArtistInquiryForm from "@/components/ArtistInquiryForm";
import { SITE_URL } from "@/lib/site";

const title = "Southern Gospel Artist Representation";
const description =
  "Looking for booking representation for your Southern Gospel group or solo ministry? Introduce your music, travel area, and goals to Capitol Artists.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${SITE_URL}/artist-representation` },
  openGraph: {
    title: `${title} | Capitol Artists`,
    description,
    type: "website",
    url: `${SITE_URL}/artist-representation`,
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

const introductionNotes = [
  {
    number: "01",
    title: "Your music and ministry",
    body: "Tell us about your group or solo ministry, your musical style, and the churches and audiences you sing for.",
  },
  {
    number: "02",
    title: "Where to find your music",
    body: "Share your website or social page so we can get to know your music. If you have a live-performance video, you are welcome to include it too.",
  },
  {
    number: "03",
    title: "Your home base and travel area",
    body: "Tell Mike which states you travel to, your usual routes, and the dates you have available. That helps him explore church visits that make sense for your ministry.",
  },
];

const questions = [
  {
    question: "How does booking with Capitol Artists work?",
    answer: "Mike connects Gospel ministries with churches for visits supported by a love offering and a meal. He works with your travel area and availability when exploring concert opportunities. The artist shares a portion of the concert offering with Capitol Artists for the booking work; Mike will discuss that arrangement with you.",
  },
  {
    question: "Is this the place to ask about booking representation?",
    answer: "Yes. This form is for Gospel artists and groups interested in discussing representation for live appearances. Tell us about your ministry and what you would like help with.",
  },
  {
    question: "What should I send with my introduction?",
    answer: "Include your website or social page and a short introduction. A live-performance video is optional. Use links we can open without a password, and tell us about your usual travel area.",
  },
  {
    question: "Does submitting an inquiry mean I am joining the roster?",
    answer: "An inquiry starts a conversation. Representation, availability, and the details of any working arrangement would need to be discussed and agreed separately.",
  },
];

export default function ArtistRepresentationPage() {
  return (
    <div className="pt-20">
      <section className="landing-hero border-b border-[#062653] bg-[#062653] text-[#f5f1e8]">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 sm:pb-20 lg:px-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-[#e2d9c8] sm:mb-12">
            <ol className="flex items-center gap-3">
              <li><Link href="/" className="underline-offset-4 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">For Artists</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
            <div>
              <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold leading-[1.08] tracking-tight">
                <span className="text-[#e8bd68]">Southern Gospel</span><br className="hidden sm:block" /> artist representation.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#e2d9c8]">
                You have a heart for sharing the Gospel through music. Tell Mike
                about your group or solo ministry, where you travel, and the
                churches you hope to serve.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a href="#representation-inquiry" className="cta-gold">
                  Introduce Your Ministry <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
                <Link href="/#roster" className="cta-navy">
                  Meet Our Artists
                </Link>
              </div>
            </div>

            <aside className="bg-[#efe0bd] px-7 py-9 text-[#062653] sm:p-10">
              <h2 className="max-w-sm font-serif text-3xl font-semibold leading-tight sm:text-4xl">A heart for<br />the local church.</h2>
              <p className="mt-5 max-w-sm leading-relaxed">
                Capitol Artists works with traveling Gospel ministries whose purpose
                is to share Christ and encourage the church. Mike helps connect
                artists and congregations through concerts supported by a love
                offering and a meal.
              </p>
              <p className="mt-4 max-w-sm leading-relaxed">Those relationships have been at the heart of Capitol Artists since 1992.</p>
              <Link href="/#about" className="mt-6 inline-block text-sm font-semibold underline underline-offset-4">Get to Know Mike</Link>
            </aside>
          </div>
        </div>
      </section>

      <section aria-labelledby="introduction-heading" className="mx-auto max-w-7xl px-6 py-14 sm:py-20 lg:px-8">
        <div className="mb-9 max-w-2xl">
          <h2 id="introduction-heading" className="font-serif text-3xl font-semibold text-[#062653] sm:text-4xl">Help us get to know you.</h2>
          <p className="mt-4 leading-relaxed text-muted">A few details give us a better picture of your music and the kind of booking relationship you have in mind.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {introductionNotes.map((note) => (
            <div key={note.number} className="border-t border-border pt-6">
              <p aria-hidden="true" className="mb-4 font-serif text-2xl text-[#90640a]">{note.number}</p>
              <h3 className="mb-3 text-lg font-semibold text-[#062653]">{note.title}</h3>
              <p className="leading-relaxed text-muted">{note.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="representation-inquiry" aria-labelledby="inquiry-heading" className="scroll-mt-24 border-y border-border bg-surface/50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20 lg:px-8">
          <div className="self-start bg-[#062653] p-7 text-[#f5f1e8] sm:p-9">
            <h2 id="inquiry-heading" className="font-serif text-4xl font-semibold leading-tight">Tell us about<br className="hidden lg:block" /> your ministry.</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-[#e2d9c8]">Introduce your music and the area you travel. Mike can get to know your ministry and talk with you about a booking relationship.</p>
            <div className="mt-8 border-t border-[#b5c4d8] pt-6">
              <p className="text-base text-[#e2d9c8]">Prefer a conversation?</p>
              <p className="mt-2 font-semibold">Mike Heimple</p>
              <a href="tel:719-260-1151" className="mt-2 inline-block text-lg font-semibold text-[#e8bd68] underline underline-offset-4">719-260-1151</a>
            </div>
            <p className="mt-8 max-w-sm text-base leading-relaxed text-[#e2d9c8]">
              Planning a concert for your church? <Link href="/church-concert-booking#contact" className="font-semibold text-[#e8bd68] underline underline-offset-4">Ask about hosting a Gospel ministry.</Link>
            </p>
          </div>
          <ArtistInquiryForm />
        </div>
      </section>

      <section aria-labelledby="questions-heading" className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:py-20 lg:grid-cols-[0.85fr_1.4fr] lg:gap-20 lg:px-8">
        <h2 id="questions-heading" className="font-serif text-3xl font-semibold text-[#062653] sm:text-4xl">Before you send.</h2>
        <div className="divide-y divide-border border-y border-border">
          {questions.map(({ question, answer }) => (
            <div key={question} className="py-6">
              <h3 className="mb-3 text-lg font-semibold text-[#062653]">{question}</h3>
              <p className="leading-relaxed text-muted">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
