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
    title: "Where you want to go",
    body: "Let us know where you are based, how far you travel, and what you are looking for in a booking relationship.",
  },
];

const questions = [
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
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 pb-14 pt-8 sm:pb-20 lg:px-8 lg:pt-10">
          <nav aria-label="Breadcrumb" className="mb-12 text-sm text-muted sm:mb-16">
            <ol className="flex items-center gap-3">
              <li><Link href="/" className="underline-offset-4 hover:underline">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">For Artists</li>
            </ol>
          </nav>

          <div className="grid items-end gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-20">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--accent-dark)]">For artists &amp; music ministries</p>
              <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,5.2vw,4.5rem)] font-bold leading-[1.08] tracking-tight text-[#062653]">
                Southern Gospel<br className="hidden sm:block" /> artist representation.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
                Looking for booking representation for your group or solo ministry?
                Introduce yourself to Capitol Artists. Share your music, where you
                travel, and what you hope to do next.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-5">
                <a href="#representation-inquiry" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#062653] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#123d70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
                  Introduce Your Ministry
                </a>
                <Link href="/#roster" className="text-sm font-semibold text-[#062653] underline decoration-[#a7770c] underline-offset-4 hover:decoration-[#062653]">
                  Meet Our Artists
                </Link>
              </div>
            </div>

            <aside className="border-l-2 border-[#a7770c] py-2 pl-6 sm:pl-8 lg:mb-2">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted">A personal connection</p>
              <h2 className="max-w-sm font-serif text-3xl font-semibold leading-tight text-[#062653]">Music. Ministry.<br />Relationships.</h2>
              <p className="mt-5 max-w-sm leading-relaxed text-muted">
                Since 1992, Capitol Artists has connected churches and organizations
                with Southern Gospel and Bluegrass Gospel music. Mike Heimple is
                the founder and booking agent behind those relationships.
              </p>
              <Link href="/#about" className="mt-6 inline-block text-sm font-semibold text-[#062653] underline underline-offset-4">Get to Know Mike</Link>
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
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--accent-dark)]">Start the conversation</p>
            <h2 id="inquiry-heading" className="font-serif text-4xl font-semibold leading-tight text-[#062653]">Tell us about<br className="hidden lg:block" /> your ministry.</h2>
            <p className="mt-5 max-w-sm leading-relaxed text-muted">Use this form to introduce your music and ask about booking representation. Your details will be sent to Capitol Artists as an artist inquiry.</p>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-sm text-muted">Prefer a conversation?</p>
              <p className="mt-2 font-semibold text-[#062653]">Mike Heimple</p>
              <a href="tel:719-260-1151" className="mt-2 inline-block text-lg font-semibold text-[#062653] underline underline-offset-4">719-260-1151</a>
            </div>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted">
              Planning a concert for your church? <Link href="/#contact" className="font-semibold text-[#062653] underline underline-offset-4">Ask about booking an artist.</Link>
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
