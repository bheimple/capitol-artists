import { testimonials } from "@/data/testimonials";

export default function ChurchTestimonial() {
  const review = testimonials.find(({ id }) => id === "chris-heldt")!;

  return (
    <section
      aria-labelledby="church-testimonial-heading"
      className="mt-5 rounded-2xl border bg-[#fffcf6] p-7 text-[#062653] sm:p-8"
      style={{ borderColor: "#e2d9c8" }}
    >
      <span aria-hidden="true" className="mb-5 block h-1 w-9 rounded-full bg-[#b68a3a]" />
      <h3 id="church-testimonial-heading" className="text-sm font-semibold text-[#526174]">
        A pastor’s experience
      </h3>
      <figure className="mt-5">
        <blockquote className="text-xl font-medium leading-relaxed tracking-[-0.02em]">
          <p>“{review.excerpt}”</p>
        </blockquote>
        <figcaption
          className="mt-7 border-t pt-5 text-sm leading-relaxed"
          style={{ borderColor: "#e2d9c8" }}
        >
          <p className="font-semibold text-[#062653]">{review.author}</p>
          <p className="mt-1 text-[#526174]">{review.church}</p>
          <p className="text-[#526174]">{review.location}</p>
        </figcaption>
      </figure>
      <details className="group mt-3">
        <summary className="min-h-11 cursor-pointer rounded-md py-3 text-sm font-semibold underline decoration-[#b68a3a] underline-offset-4 hover:text-[#123d70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
          <span className="group-open:hidden">Read full review</span>
          <span className="hidden group-open:inline">Close full review</span>
        </summary>
        <blockquote
          className="mt-3 border-t pt-5 text-base leading-7 text-[#364761]"
          style={{ borderColor: "#e2d9c8" }}
        >
          <p>“{review.quote}”</p>
        </blockquote>
      </details>
    </section>
  );
}
