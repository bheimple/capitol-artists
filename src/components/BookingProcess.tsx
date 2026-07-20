export default function BookingProcess() {
  const steps = [
    {
      number: "01",
      title: "Select Your Artist",
      description:
        "Browse our roster, explore schedules, and find the artist whose sound and ministry align with your event's vision.",
    },
    {
      number: "02",
      title: "Secure the Date",
      description:
        "We handle contracts, travel logistics, and staging requirements with full transparency — no surprises, just clear terms.",
    },
    {
      number: "03",
      title: "Promote Your Concert",
      description:
        "Receive promotional toolkits including posters, social media templates, and video promos to help fill your venue.",
    },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-accent" />
            <span className="text-xs font-semibold tracking-[0.15em] text-accent uppercase">
              How It Works
            </span>
            <span className="w-8 h-px bg-accent" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">
            A Seamless Booking Process
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            We make it simple to bring world-class Gospel music to your church
            or venue.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-surface border border-border rounded-2xl p-8 h-full transition-all hover:border-accent/30 hover:bg-surface-hover">
                <div className="flex items-baseline gap-4 mb-6">
                  <span className="text-4xl font-serif font-black text-gradient-gold">
                    {step.number}
                  </span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <h3 className="text-xl font-serif font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
