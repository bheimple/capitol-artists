import { testimonials } from "@/data/testimonials";

export default function ChurchTestimonial() {
  const review = testimonials.find(({ id }) => id === "chris-heldt")!;

  return (
    <section
      aria-labelledby="church-testimonial-heading"
      className="border-t border-[#b68a3a] bg-[#efe0bd] p-7 text-[#062653] sm:p-9"
    >
      <h3 id="church-testimonial-heading" className="text-lg font-semibold">
        A pastor’s experience
      </h3>
      <figure className="mt-5">
        <blockquote className="font-serif text-xl leading-relaxed">
          <p>“{review.excerpt}”</p>
        </blockquote>
        <figcaption className="mt-6 text-sm leading-relaxed">
          <p className="font-semibold">{review.author}</p>
          <p>{review.church}</p>
          <p>{review.location}</p>
        </figcaption>
      </figure>
      <details className="group mt-4">
        <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold underline underline-offset-4 hover:text-[#123d70] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#062653]">
          <span className="group-open:hidden">Read full review</span>
          <span className="hidden group-open:inline">Close full review</span>
        </summary>
        <blockquote className="mt-3 border-t border-[#b68a3a] pt-5 text-base leading-relaxed">
          <p>“{review.quote}”</p>
        </blockquote>
      </details>
    </section>
  );
}
