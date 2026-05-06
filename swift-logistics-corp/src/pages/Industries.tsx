import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import auto from "@/assets/industry-auto.jpg";
import pharma from "@/assets/industry-pharma.jpg";
import ecom from "@/assets/industry-ecom.jpg";
import energy from "@/assets/industry-energy.jpg";
import retail from "@/assets/industry-retail.jpg";
import food from "@/assets/industry-food.jpg";

const industries = [
  { t: "Automotive", img: auto, d: "JIT and JIS supply chains for OEMs and tier-1 suppliers — globally synchronized.", stats: "60+ OEMs served" },
  { t: "Pharmaceutical & Healthcare", img: pharma, d: "GDP-compliant cool-chain logistics with full chain-of-custody and validated lanes.", stats: "GDP & WDA certified" },
  { t: "Retail & Fashion", img: retail, d: "Seasonal volumes, hanging garments, and store-ready distribution at scale.", stats: "1B+ units / yr" },
  { t: "E-commerce", img: ecom, d: "Cross-border fulfillment, returns management, and last-mile network for D2C brands.", stats: "200+ D2C brands" },
  { t: "Energy & Resources", img: energy, d: "Project cargo, oversize/heavy-lift, and remote-site logistics for the energy sector.", stats: "Project cargo experts" },
  { t: "Food & Perishables", img: food, d: "Reefer ocean, temp-controlled air, and bonded cold storage from farm to shelf.", stats: "-25°C to +25°C" },
];

const Industries = () => (
  <>
    <PageHero eyebrow="Industries We Serve" title="Specialized logistics for every sector." subtitle="Deep vertical expertise lets us tailor every shipment to your industry's unique demands — from cold chain to project cargo." />

    <section className="section">
      <div className="container-pro grid md:grid-cols-2 lg:grid-cols-3 gap-7">
        {industries.map((ind, i) => (
          <Reveal key={ind.t} delay={i * 80}>
            <div className="group relative rounded-xl overflow-hidden bg-primary text-primary-foreground h-[420px] cursor-pointer">
              <img src={ind.img} alt={ind.t} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/10 group-hover:from-primary group-hover:via-primary/85" />
              <div className="relative h-full flex flex-col justify-end p-7">
                <div className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">{ind.stats}</div>
                <h3 className="font-display text-2xl">{ind.t}</h3>
                <p className="text-white/80 text-sm mt-3 leading-relaxed max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500">{ind.d}</p>
                <div className="flex items-center gap-2 mt-4 text-accent font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Talk to a specialist <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="section bg-gradient-navy text-primary-foreground">
      <div className="container-pro text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-balance max-w-3xl mx-auto">Don't see your industry?</h2>
        <p className="mt-5 text-white/80 max-w-xl mx-auto">We've shipped almost everything imaginable. Tell us what you move — we'll design a solution.</p>
        <Link to="/contact" className="btn-gold mt-10">Speak with a Specialist <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </section>
  </>
);

export default Industries;
