const partners = [
  "MAERSK", "DHL", "FEDEX", "KUEHNE+NAGEL", "CMA CGM", "MSC",
  "EXPEDITORS", "NIPPON", "HAPAG-LLOYD", "EVERGREEN", "YANG MING", "ZIM"
];

const PartnerMarquee = () => (
  <section className="py-16 bg-background border-y border-border overflow-hidden">
    <div className="container-pro mb-10 text-center">
      <div className="eyebrow justify-center inline-flex mb-3">Trusted Partners</div>
      <h3 className="font-display text-2xl md:text-3xl text-primary">Powering supply chains for the world's leaders</h3>
    </div>
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...partners, ...partners].map((p, i) => (
          <div key={i} className="flex-shrink-0 mx-10 font-display text-2xl md:text-3xl text-muted-foreground/60 hover:text-primary transition-colors tracking-widest">
            {p}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PartnerMarquee;
