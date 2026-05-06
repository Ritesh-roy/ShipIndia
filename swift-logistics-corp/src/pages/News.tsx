import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import b1 from "@/assets/blog-1.jpg";
import b2 from "@/assets/blog-2.jpg";
import b3 from "@/assets/blog-3.jpg";
import serviceSea from "@/assets/service-sea.jpg";
import serviceAir from "@/assets/service-air.jpg";
import serviceWarehouse from "@/assets/service-warehouse.jpg";

export const posts = [
  { slug: "global-shipping-2026", title: "The State of Global Shipping in 2026", category: "Industry Trends", date: "Apr 22, 2026", read: "8 min", author: "Linnea Holst", img: b1, excerpt: "Capacity, rates, and the geopolitical shifts that will shape ocean freight this year — and how shippers should prepare.", featured: true },
  { slug: "supply-chain-visibility", title: "Why Real-Time Visibility Is Now Table Stakes", category: "Technology", date: "Apr 15, 2026", read: "6 min", author: "Marcus Chen", img: b2, excerpt: "Customers no longer ask whether you have tracking — they ask how good it is. Here's what to look for in a modern visibility platform." },
  { slug: "customs-2026", title: "Navigating New Customs Regulations in 2026", category: "Customs", date: "Apr 08, 2026", read: "5 min", author: "Amara Okafor", img: b3, excerpt: "Major regulatory updates in the EU, UK, and US — and what they mean for your import-export workflow." },
  { slug: "ocean-vs-air", title: "Ocean vs. Air: When to Use Each Mode", category: "Guides", date: "Mar 30, 2026", read: "7 min", author: "Yuki Tanaka", img: serviceSea, excerpt: "A practical decision framework for choosing between ocean and air freight — covering cost, transit time, and risk." },
  { slug: "cold-chain-pharma", title: "Inside Our Pharma Cold Chain Operations", category: "Industries", date: "Mar 22, 2026", read: "6 min", author: "Sofia Reyes", img: serviceAir, excerpt: "How we deliver life-saving medicines across continents while maintaining strict temperature control." },
  { slug: "warehouse-automation", title: "Warehouse Automation: ROI Beyond the Hype", category: "Technology", date: "Mar 14, 2026", read: "9 min", author: "Daniel Park", img: serviceWarehouse, excerpt: "Robotics, WMS, and AI are reshaping fulfillment — but only when deployed strategically. Here's our playbook." },
];

const categories = ["All", "Industry Trends", "Technology", "Customs", "Guides", "Industries"];

import { useState } from "react";

const News = () => {
  const [cat, setCat] = useState("All");
  const featured = posts.find(p => p.featured)!;
  const filtered = posts.filter(p => !p.featured && (cat === "All" || p.category === cat));

  return (
    <>
      <PageHero eyebrow="News & Insights" title="Logistics intelligence, delivered." subtitle="Industry analysis, practical guides, and inside stories from our specialists across the globe." />

      <section className="section">
        <div className="container-pro">
          {/* Featured */}
          <Reveal>
            <Link to={`/news/${featured.slug}`} className="group grid lg:grid-cols-2 gap-10 items-center mb-20">
              <div className="relative overflow-hidden rounded-xl">
                <img src={featured.img} alt={featured.title} className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-5 left-5 bg-gradient-gold text-primary text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded">Featured</span>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-accent font-semibold">{featured.category}</div>
                <h2 className="font-display text-4xl md:text-5xl text-primary font-bold mt-4 text-balance group-hover:text-secondary transition-colors">{featured.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mt-5">{featured.excerpt}</p>
                <div className="flex items-center gap-5 mt-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {featured.author}</span>
                  <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {featured.date}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {featured.read}</span>
                </div>
                <div className="mt-7 inline-flex items-center gap-2 text-secondary font-semibold group-hover:text-accent transition-colors">
                  Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </Reveal>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  cat === c ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70 hover:bg-border"
                }`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link to={`/news/${p.slug}`} className="group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full">
                  <div className="overflow-hidden aspect-[16/10]">
                    <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs uppercase tracking-widest text-accent font-semibold">{p.category}</div>
                    <h3 className="font-display text-xl text-primary mt-3 group-hover:text-secondary transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground mt-3 leading-relaxed line-clamp-2">{p.excerpt}</p>
                    <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.read}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default News;
