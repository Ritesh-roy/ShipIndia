import { Link } from "react-router-dom";
import { ShieldCheck, BarChart3, Globe2, Clock3, ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Compliance that moves with your freight.",
    description: "Automated customs screening, proactive duty validation, and audit-ready documentation for every shipment. Stay ahead of regulations in every market.",
  },
  {
    icon: BarChart3,
    title: "Visible performance, intelligent decisions.",
    description: "Live dashboards, predictive ETAs, and KPI alerts that turn shipment data into actionable logistics decisions across ocean, air, and ground.",
  },
  {
    icon: Globe2,
    title: "Global capacity with local expertise.",
    description: "A carefully curated network of carriers, warehouses, and customs brokers that keeps your goods moving without compromise.",
  },
  {
    icon: Clock3,
    title: "Speed without sacrifice.",
    description: "Rapid transit planning, exception triage, and fast-track solutions for time-sensitive freight and critical replenishment lanes.",
  },
];

const Solutions = () => (
  <>
    <PageHero
      eyebrow="Solutions"
      title="Scale your supply chain with smarter logistics orchestration."
      subtitle="A unified platform for end-to-end freight, warehousing, customs, and last-mile execution that grows with your business."
    >
      <div className="mt-10 flex flex-wrap gap-3">
        <Link to="/contact" className="btn-gold">Talk to an expert</Link>
        <Link to="/services" className="btn-outline-navy">Explore services</Link>
      </div>
    </PageHero>

    <section className="section">
      <div className="container-pro grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="eyebrow mb-5">Why choose LEO</div>
          <h2 className="font-display text-4xl md:text-5xl text-primary font-bold text-balance">A living logistics engine built for modern global trade.</h2>
          <div className="gold-bar my-6" />
          <p className="text-muted-foreground text-lg leading-relaxed">
            From quote to customs clearance, our solutions layer digital controls over proven operational execution. The result is faster decisions, fewer exceptions, and a supply chain that scales safely.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed mt-4">
            Every component is designed for visibility: centralized documents, automatic status updates, and a single point of accountability for all partners in the network.
          </p>
        </div>
        <div className="grid gap-6">
          {pillars.map((item) => (
            <div key={item.title} className="card-pro p-8 border border-border shadow-sm">
              <div className="w-14 h-14 rounded-md bg-gradient-gold text-primary flex items-center justify-center mb-5">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section bg-muted">
      <div className="container-pro text-center max-w-3xl mx-auto">
        <div className="eyebrow justify-center inline-flex mb-5">What we deliver</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">Integrated logistics solutions for every phase of your supply chain.</h2>
        <p className="text-muted-foreground mt-6 text-lg leading-relaxed">
          Our platform is built to connect planning, execution, and review so your teams can make decisions with confidence and move faster across every lane.
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { title: "Freight orchestration", description: "Book, consolidate, and manage shipments across ocean, air, and road from one platform." },
            { title: "Customs clearance", description: "Designed for complex regulatory flows with expert local brokerage support." },
            { title: "Customer success", description: "Dedicated account teams, 24/7 response, and proactive exception management." },
          ].map((item) => (
            <div key={item.title} className="bg-background/80 border border-border rounded-3xl p-8">
              <h3 className="font-semibold text-xl text-primary mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="section bg-gradient-navy text-primary-foreground">
      <div className="container-pro grid lg:grid-cols-3 gap-8 items-stretch">
        <div className="lg:col-span-2">
          <div className="text-4xl font-display font-bold">Launch your next global expansion with confidence.</div>
          <p className="mt-6 text-white/80 leading-relaxed text-lg max-w-xl">
            We help fast-growing enterprises standardize logistics across every channel, reduce time lost to exceptions, and make supply chain performance a competitive advantage.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="rounded-3xl bg-white/10 p-8 border border-white/10">
            <div className="text-sm uppercase tracking-[0.3em] text-white/60">Speed to market</div>
            <div className="mt-3 text-3xl font-bold text-accent">48 hrs</div>
            <p className="mt-3 text-white/80">Typical time to onboard new corridors and launch live route monitoring.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-8 border border-white/10">
            <div className="text-sm uppercase tracking-[0.3em] text-white/60">Availability</div>
            <div className="mt-3 text-3xl font-bold text-accent">24/7</div>
            <p className="mt-3 text-white/80">Proactive operations and customer care across all key markets.</p>
          </div>
          <Link to="/contact" className="btn-gold mt-4 justify-center">Schedule a consultation <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  </>
);

export default Solutions;
