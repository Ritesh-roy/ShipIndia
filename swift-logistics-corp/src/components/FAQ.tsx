import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How quickly can you provide a freight quote?", a: "Most quotes are returned within 4 business hours. Complex multimodal or project-cargo shipments may take up to 24 hours so our specialists can secure the best rates." },
  { q: "Which modes of transport do you offer?", a: "We operate full ocean (FCL/LCL), air cargo (express, charter, on-board courier), road (FTL/LTL, cross-border), rail, and integrated multimodal solutions across 65 countries." },
  { q: "Can you handle customs clearance in every country you serve?", a: "Yes. We hold AEO and equivalent trusted-trader status in major markets and operate licensed in-house brokers across our hubs, plus a vetted partner network elsewhere." },
  { q: "Do you offer warehousing and fulfillment?", a: "Absolutely. We operate bonded and non-bonded facilities, free-trade-zone storage, pick-and-pack, kitting, and e-commerce fulfillment from strategic hubs near major ports and airports." },
  { q: "How do I track my shipment?", a: "Every customer gets free access to our Visibility Portal with real-time milestones, document downloads, ETA predictions, and proactive exception alerts via email or SMS." },
  { q: "Are my goods insured during transit?", a: "Standard carrier liability applies to every shipment. We also offer all-risk cargo insurance with coverage tailored to your declared value and commodity type." },
  { q: "Do you handle dangerous or temperature-controlled cargo?", a: "Yes — we are IATA DGR and IMDG certified for hazardous goods, and operate reefer ocean, cool-chain air, and pharma-grade warehousing for sensitive cargo." },
  { q: "What's the minimum shipment size you accept?", a: "We have no minimum. We move everything from a single LCL pallet to dedicated charter aircraft and project cargo weighing hundreds of tons." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="section">
      <div className="container-pro grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="eyebrow mb-5">FAQ</div>
          <h2 className="font-display text-4xl md:text-5xl text-primary font-bold text-balance">Answers to common questions.</h2>
          <div className="gold-bar my-6" />
          <p className="text-muted-foreground leading-relaxed">Don't see what you're looking for? Our specialists are happy to help — reach out anytime.</p>
        </div>
        <div className="lg:col-span-8 space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`bg-card border rounded-xl overflow-hidden transition-all ${isOpen ? "border-accent shadow-md" : "border-border"}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg text-primary">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 text-accent flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
