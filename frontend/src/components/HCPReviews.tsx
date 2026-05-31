export default function HCPReviews() {
  return (
    <section className="py-20 md:py-28 bg-card/40 border-y border-border" data-testid="hcp-reviews-section">
      <div className="container mx-auto container-px">
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.2em] text-secondary/70 mb-3">Verified reviews</div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-balance">
            What our customers are saying.
          </h2>
        </div>
        <div className="w-full overflow-hidden rounded-2xl">
          <iframe
            src="https://client.housecallpro.com/reviews/widget/097cf23f-be1a-41ea-981b-8e6b9c7514eb"
            height="1000"
            width="100%"
            style={{ border: "none", display: "block" }}
            title="Accutek Solar Customer Reviews"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
