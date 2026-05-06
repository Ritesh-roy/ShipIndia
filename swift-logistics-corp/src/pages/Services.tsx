import PageHero from "@/components/PageHero";
import FAQ from "@/components/FAQ";
import { Link } from "react-router-dom";
import { Ship, Plane, Truck, Warehouse, FileCheck, PackageCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import serviceSea from "@/assets/service-sea.jpg";
import serviceAir from "@/assets/service-air.jpg";
import serviceTrucks from "@/assets/service-trucks.jpg";
import serviceWarehouse from "@/assets/service-warehouse.jpg";

const services = [
  { icon: Ship, t: "Ocean Freight", d: "FCL, LCL, and project cargo across 180+ ports. Reliable schedules, competitive rates, and dedicated capacity on key trade lanes.", img: serviceSea, f: ["Full & Less-than-Container Loads", "Reefer & dangerous goods", "Project & break-bulk cargo", "Direct port-pair coverage"] },
  { icon: Plane, t: "Air Cargo", d: "Express and standard airfreight with priority handling, charters, and white-glove for high-value shipments.", img: serviceAir, f: ["Next-flight-out service", "Charter & on-board courier", "Temperature-controlled", "Aerospace & pharma certified"] },
  { icon: Truck, t: "Road Transportation", d: "Cross-border trucking, FTL/LTL, and last-mile distribution backed by GPS-tracked fleet partners.", img: serviceTrucks, f: ["FTL, LTL & intermodal", "Cross-border permits handled", "Real-time GPS tracking", "Dedicated lane contracts"] },
  { icon: Warehouse, t: "Warehousing & Distribution", d: "Bonded and non-bonded storage, pick & pack, value-added services, and fulfillment from strategic global hubs.", img: serviceWarehouse, f: ["Bonded & FTZ storage", "Pick, pack & kitting", "E-commerce fulfillment", "Inventory management"] },
];

const support = [
  { icon: FileCheck, t: "Customs Clearance & Trade Compliance", d: "Licensed brokers across 65 countries handle classification, valuation, and duty optimization so your goods clear faster." },
  { icon: PackageCheck, t: "Last-Mile Delivery Solutions", d: "Scheduled, white-glove, and reverse logistics — designed to delight your end customer and protect your brand." },
];

const Services = () => (
  <>
    <PageHero eyebrow="Our Services" title="Multimodal logistics, engineered around your supply chain." subtitle="From port to door, every service is delivered by specialists with full visibility and a single point of accountability." />

    {services.map((s, i) => (
      <section key={s.t} className={`section ${i % 2 ? 'bg-muted' : ''}`}>
        <div className={`container-pro grid lg:grid-cols-2 gap-14 items-center ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          <img src={s.img} alt={s.t} loading="lazy" className="rounded-xl shadow-xl w-full h-[460px] object-cover" />
          <div>
            <div className="w-14 h-14 rounded-md bg-gradient-gold flex items-center justify-center text-primary mb-5">
              <s.icon className="w-7 h-7" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl text-primary font-bold text-balance">{s.t}</h2>
            <div className="gold-bar my-5" />
            <p className="text-muted-foreground text-lg leading-relaxed">{s.d}</p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {s.f.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground/85">{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-outline-navy mt-8">Get a Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
    ))}

    <section className="section bg-gradient-navy text-primary-foreground">
      <div className="container-pro">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow justify-center inline-flex mb-5">Support Services</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">Beyond freight — total supply chain support.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {support.map(({ icon: Icon, t, d }) => (
            <div key={t} className="bg-white/5 backdrop-blur p-8 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-md bg-accent/20 text-accent flex items-center justify-center mb-5">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl">{t}</h3>
              <p className="text-white/75 mt-3 leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <FAQ />
  </>
);

export default Services;
