import { Link } from "react-router-dom";
import { ArrowRight, Ship, Plane, Truck, Warehouse, ShieldCheck, Globe2, Clock, Users, MapPin, Search, Quote, FileCheck } from "lucide-react";
import heroPort from "@/assets/hero-port.jpg";
import globalMap from "@/assets/global-map.jpg";
import serviceTrucks from "@/assets/service-trucks.jpg";
import serviceWarehouse from "@/assets/service-warehouse.jpg";
import serviceAir from "@/assets/service-air.jpg";
import serviceSea from "@/assets/service-sea.jpg";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import PartnerMarquee from "@/components/PartnerMarquee";

const services = [
  { icon: Ship, title: "Ocean Freight", desc: "FCL & LCL shipping across 180+ ports worldwide.", img: serviceSea },
  { icon: Plane, title: "Air Cargo", desc: "Express airfreight with priority handling and tracking.", img: serviceAir },
  { icon: Truck, title: "Road Transportation", desc: "Cross-border trucking and last-mile delivery.", img: serviceTrucks },
  { icon: Warehouse, title: "Warehousing", desc: "Bonded storage, distribution, and 3PL solutions.", img: serviceWarehouse },
];

const stats = [
  { n: 180, suffix: "+", l: "Global Ports" },
  { n: 65, suffix: "", l: "Countries Served" },
  { n: 27, suffix: " yrs", l: "In Business" },
  { n: 12000, suffix: "+", l: "Clients Worldwide" },
];

const reasons = [
  { icon: ShieldCheck, t: "End-to-End Security", d: "Real-time visibility, certified handling, and full insurance on every shipment." },
  { icon: Clock, t: "On-Time, Every Time", d: "98.7% on-time performance with proactive milestone alerts and ETA management." },
  { icon: Globe2, t: "True Global Reach", d: "Owned offices and trusted partners across 65 countries on six continents." },
  { icon: Users, t: "Dedicated Experts", d: "A named account manager and 24/7 multilingual support team for every client." },
];

const branches = [
  { city: "Singapore", country: "HQ", phone: "+65 6500 1234" },
  { city: "Rotterdam", country: "Netherlands", phone: "+31 10 200 3456" },
  { city: "Dubai", country: "UAE", phone: "+971 4 555 7788" },
  { city: "Los Angeles", country: "USA", phone: "+1 213 555 4400" },
];

const testimonials = [
  { q: "LEO transformed our supply chain. Lead times dropped 22% in the first quarter alone.", a: "Linnea Holst", r: "VP Operations, Nordvest Manufacturing" },
  { q: "The most reliable freight partner we've worked with in 15 years. Their visibility platform is best-in-class.", a: "Marcus Chen", r: "Head of Logistics, Pacifica Trade Co." },
  { q: "When customs got complicated in three regions at once, LEO's team handled it without a single delay.", a: "Amara Okafor", r: "Director, Continental Imports Ltd." },
];

const Index = () => {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroPort} alt="Global container port at sunset" className="w-full h-full object-cover animate-ken-burns" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        <div className="container-pro relative pt-32 pb-20 z-10 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="eyebrow mb-6 animate-fade-in">Trusted since 1998</div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] text-balance animate-slide-up">
              Moving the world's<br/>
              <span className="text-accent italic">commerce</span> forward.
            </h1>
            <p className="mt-7 text-lg md:text-xl text-white/85 max-w-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              End-to-end transportation, import, and export solutions across 65 countries — engineered for speed, safety, and scale.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Link to="/quote" className="btn-gold">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link to="/track" className="btn-ghost-light"><Search className="w-4 h-4" /> Track Shipment</Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-primary/95 to-secondary/95 backdrop-blur-md border-t border-white/10">
          <div className="container-pro grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.l} className="py-6 text-center text-primary-foreground">
                <div className="font-display text-3xl md:text-4xl text-accent">
                  <CountUp to={s.n} suffix={s.suffix} />
                </div>
                <div className="text-xs uppercase tracking-widest text-white/70 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container-pro grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="eyebrow mb-5">Who We Are</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary leading-tight text-balance">
              A logistics partner built for a borderless economy.
            </h2>
            <div className="gold-bar my-6" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              For more than two decades, LEO Global Logistics has been the trusted backbone of international trade for manufacturers, retailers, and enterprises. We blend deep regional expertise with modern technology to keep your cargo moving — predictably, securely, and at the right cost.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[{ i: FileCheck, t: "ISO 9001 Certified" }, { i: ShieldCheck, t: "AEO Approved" }].map(({i: I, t}) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md bg-muted flex items-center justify-center text-secondary"><I className="w-5 h-5" /></div>
                  <div className="font-semibold text-primary">{t}</div>
                </div>
              ))}
            </div>
            <Link to="/about" className="btn-outline-navy mt-10">Discover Our Story <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent/20 rounded-lg" />
            <img src={serviceWarehouse} alt="Modern warehouse" loading="lazy" className="relative rounded-xl shadow-xl object-cover w-full h-[520px]" />
            <div className="absolute -bottom-8 -right-6 bg-card p-6 rounded-xl shadow-xl max-w-xs border border-border">
              <div className="font-display text-3xl text-primary">98.7%</div>
              <div className="text-sm text-muted-foreground mt-1">On-time delivery across all freight modes in 2025.</div>
            </div>
          </div>
        </div>
      </section>

      <PartnerMarquee />

      {/* SERVICES */}
      <section className="section bg-muted">
        <div className="container-pro">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow justify-center mb-5 inline-flex">What We Do</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">Featured Services</h2>
            <p className="mt-5 text-muted-foreground text-lg">Comprehensive solutions covering every link in your supply chain.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map(({ icon: Icon, title, desc, img }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="group bg-card rounded-xl overflow-hidden border border-border transition-all duration-500 hover:-translate-y-2 hover:shadow-xl h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img src={img} alt={title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 rounded-md bg-gradient-gold flex items-center justify-center text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl text-primary">{title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{desc}</p>
                    <Link to="/services" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-accent transition-colors">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section">
        <div className="container-pro grid lg:grid-cols-2 gap-16">
          <div>
            <div className="eyebrow mb-5">Why LEO</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">Reliability you can build a business on.</h2>
            <div className="gold-bar my-6" />
            <p className="text-muted-foreground text-lg leading-relaxed">
              We've earned the trust of over 12,000 shippers by treating every container, pallet, and parcel as if it were our own. Here's what sets us apart.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {reasons.map(({ icon: Icon, t, d }) => (
              <div key={t} className="card-pro">
                <div className="w-12 h-12 rounded-md bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg text-primary">{t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="relative py-28 overflow-hidden bg-primary text-primary-foreground">
        <img src={globalMap} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent" />
        <div className="container-pro relative grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="eyebrow mb-5">Global Coverage</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">One network. Every continent.</h2>
            <div className="gold-bar my-6" />
            <p className="text-white/80 text-lg leading-relaxed max-w-xl">
              From the Port of Singapore to the heart of Rotterdam, our owned hubs and vetted partners give you seamless visibility and accountability — wherever your cargo travels.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[{n:6, suffix:"", l:"Continents"}, {n:65, suffix:"", l:"Countries"}, {n:180, suffix:"+", l:"Ports"}].map(s => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-accent"><CountUp to={s.n} suffix={s.suffix} /></div>
                  <div className="text-xs uppercase tracking-widest text-white/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRANCH PREVIEW */}
      <section className="section bg-muted">
        <div className="container-pro">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <div className="eyebrow mb-5">Branch Locator</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">Find your nearest office.</h2>
            </div>
            <Link to="/branches" className="btn-outline-navy">View All Branches <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {branches.map(b => (
              <div key={b.city} className="card-pro flex items-start gap-4">
                <div className="w-11 h-11 rounded-md bg-accent/15 text-accent flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-primary">{b.city}</h3>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{b.country}</div>
                  <div className="text-sm text-foreground/80 mt-3">{b.phone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTAL PREVIEW */}
      <section className="section">
        <div className="container-pro">
          <div className="bg-gradient-navy rounded-2xl overflow-hidden grid lg:grid-cols-2 shadow-elegant" style={{ boxShadow: 'var(--shadow-elegant)'}}>
            <div className="p-12 lg:p-16 text-primary-foreground">
              <div className="eyebrow mb-5">Customer Portal</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-balance">Track. Manage. Optimize.</h2>
              <p className="mt-5 text-white/80 leading-relaxed">
                Real-time shipment tracking, downloadable invoices, document management, and analytics — all in one secure portal.
              </p>
              <Link to="/login" className="btn-gold mt-8">Customer Login <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="relative bg-white/5 p-10 flex items-center justify-center border-l border-white/10">
              <div className="bg-card rounded-xl shadow-2xl p-6 w-full max-w-sm">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Active Shipment</div>
                <div className="font-display text-2xl text-primary mt-1">MGL-883429</div>
                <div className="mt-4 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-gradient-gold w-2/3" />
                </div>
                <div className="flex justify-between text-xs mt-2 text-muted-foreground">
                  <span>Singapore</span><span className="text-secondary font-semibold">In Transit</span><span>Hamburg</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted rounded p-3"><div className="text-xs text-muted-foreground">ETA</div><div className="font-semibold text-primary">May 12</div></div>
                  <div className="bg-muted rounded p-3"><div className="text-xs text-muted-foreground">Mode</div><div className="font-semibold text-primary">Ocean FCL</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-muted">
        <div className="container-pro">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="eyebrow justify-center inline-flex mb-5">Client Trust</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary text-balance">Trusted by shippers worldwide.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="card-pro relative">
                <Quote className="w-10 h-10 text-accent/30 absolute top-5 right-5" />
                <p className="text-foreground/85 leading-relaxed italic">"{t.q}"</p>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="font-semibold text-primary">{t.a}</div>
                  <div className="text-sm text-muted-foreground">{t.r}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroPort} alt="" loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="container-pro relative text-center text-primary-foreground">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-balance max-w-3xl mx-auto">Ready to move your cargo with confidence?</h2>
          <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">Get a tailored quote within 24 hours from our global logistics specialists.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/quote" className="btn-gold">Request a Quote</Link>
            <Link to="/branches" className="btn-ghost-light">Find a Branch</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
