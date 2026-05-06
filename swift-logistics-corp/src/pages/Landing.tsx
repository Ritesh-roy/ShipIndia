import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Package, Globe, Zap, Shield, BarChart3, MapPin, Clock, CheckCircle2, Star } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Trust />
      <Features />
      <Intelligence />
      <RolesShowcase />
      <Stats />
      <CTASection />
      <Footer />
    </div>
  );
}

const Nav = () => (
  <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
    <div className="container-pro flex items-center justify-between h-16">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-gradient-gold grid place-items-center">
          <Truck className="w-5 h-5 text-primary" />
        </div>
        <span className="font-display text-xl text-primary">LEO FLEX</span>
      </Link>
      <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-primary transition">Capabilities</a>
        <a href="#solutions" className="hover:text-primary transition">Solutions</a>
        <a href="#stats" className="hover:text-primary transition">Performance</a>
      </nav>
      <div className="flex items-center gap-3">
        <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary hidden sm:block">Sign in</Link>
        <Link to="/auth" className="btn-gold !py-2 !px-4 text-sm">Get started <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-navy text-white">
    <div className="absolute inset-0 opacity-[0.06]" style={{
      backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
      backgroundSize: '32px 32px',
    }} />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(42_75%_52%/0.15),transparent_60%)]" />

    <div className="container-pro relative grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <div className="eyebrow !text-accent mb-5">Logistics leadership</div>
        <h1 className="font-display text-5xl lg:text-7xl leading-[1.05] mb-6">
          Enterprise logistics engineered for<br />
          <span className="text-accent italic">precision, speed, and scale.</span>
        </h1>
        <p className="text-white/70 text-lg max-w-lg mb-8">
          The all-in-one logistics platform for supply chain teams, carriers, and dispatch operators. Drive faster decisions with live visibility, data-backed workflows, and global execution.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/auth" className="btn-gold">Request a demo <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/auth" className="btn-ghost-light">Explore driver tools</Link>
        </div>
        <div className="flex items-center gap-6 mt-10 text-sm text-white/60">
          <div className="flex items-center gap-2"><Star className="w-4 h-4 text-accent fill-accent" /> 4.9 rating</div>
          <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-accent" /> Bank-grade security</div>
        </div>
      </motion.div>

      {/* Hero card mock */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
        <div className="absolute -inset-8 bg-accent/20 blur-3xl rounded-full" />
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 text-foreground">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">Live tracking</div>
              <div className="font-display text-xl text-primary">SL241203-87421</div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> In transit
            </span>
          </div>

          <div className="h-44 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 relative overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 150">
              <motion.path d="M 30 110 Q 100 30 180 80 T 270 50" stroke="hsl(42 75% 52%)" strokeWidth="3" fill="none" strokeDasharray="6 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, repeat: Infinity, repeatType: "loop" }} />
              <circle cx="30" cy="110" r="6" fill="hsl(215 65% 22%)" />
              <circle cx="270" cy="50" r="6" fill="hsl(0 75% 50%)" />
              <motion.circle r="8" fill="hsl(42 75% 52%)" stroke="white" strokeWidth="3"
                animate={{ cx: [30, 100, 180, 270], cy: [110, 60, 80, 50] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
            </svg>
          </div>

          <div className="space-y-2 text-sm">
            {[
              { label: "Pickup confirmed", time: "10:24 AM", done: true },
              { label: "On the way", time: "10:58 AM", done: true },
              { label: "Estimated arrival", time: "11:42 AM", done: false },
            ].map((step) => (
              <div key={step.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${step.done ? "text-emerald-500" : "text-muted-foreground/40"}`} />
                  <span className={step.done ? "text-primary" : "text-muted-foreground"}>{step.label}</span>
                </div>
                <span className="text-xs text-muted-foreground">{step.time}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Trust = () => (
  <section className="py-12 border-b border-border bg-white">
    <div className="container-pro">
      <p className="text-center text-xs text-muted-foreground uppercase tracking-[0.3em] mb-6">Trusted by industry leaders and logistics teams</p>
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-60 grayscale">
        {["AERON", "Cargolux", "TransGlobe", "Velocity", "MeridianCo", "Skyline"].map(b => (
          <span key={b} className="font-display text-2xl text-primary">{b}</span>
        ))}
      </div>
    </div>
  </section>
);

const Features = () => {
  const items = [
    { icon: MapPin, title: "Global visibility", desc: "Live location, ETA updates, and route intelligence for every shipment." },
    { icon: Zap, title: "Automated operations", desc: "Smart dispatch, predictive scheduling, and exception handling in one workflow." },
    { icon: Shield, title: "Compliance & security", desc: "Certified handling, cargo insurance, and secure documentation coverage." },
    { icon: BarChart3, title: "Operational analytics", desc: "Actionable KPIs for cost, utilization, on-time performance, and risk." },
    { icon: Globe, title: "Multi-modal coverage", desc: "Ocean, air, road and warehousing in a single unified platform." },
    { icon: Clock, title: "24/7 global support", desc: "Dedicated operations teams available around the clock for critical shipments." },
  ];
  return (
    <section id="features" className="section">
      <div className="container-pro">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-4">Platform</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">Everything you need to deliver, faster.</h2>
          <p className="text-muted-foreground text-lg">From the first tap to the last mile, LEO FLEX powers every step.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card-pro">
              <div className="w-11 h-11 rounded-lg bg-accent/10 grid place-items-center mb-4">
                <it.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl text-primary mb-2">{it.title}</h3>
              <p className="text-muted-foreground text-sm">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Intelligence = () => (
  <section className="section bg-[radial-gradient(circle_at_top_left,_rgba(66,110,255,0.08),transparent_60%)]">
    <div className="container-pro">
      <div className="max-w-2xl mb-12">
        <div className="eyebrow mb-4">Insight</div>
        <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">Data-driven logistics for every decision.</h2>
        <p className="text-muted-foreground text-lg">Turn real-time shipment intelligence into faster customer responses, fewer exceptions, and better operational outcomes.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { title: "Predictive ETA", text: "Actionable delivery windows and exception alerts before they impact your schedule." },
          { title: "Compliance engine", text: "Automated customs, security, and cargo documentation across global trade lanes." },
          { title: "Account transparency", text: "Private dashboards, audit-ready reports, and SLA-backed performance tracking." },
        ].map((item) => (
          <div key={item.title} className="card-pro p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">{item.title}</div>
            <p className="text-muted-foreground leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RolesShowcase = () => {
  const roles = [
    { icon: Package, title: "For Shippers", desc: "Manage tenders, trace shipments, and benchmark performance with one central platform.", points: ["Streamlined quoting", "Traceable shipments", "Spend visibility"] },
    { icon: Truck, title: "For Drivers", desc: "Accept optimized routes, access real-time job details, and earn more with reliable settlement.", points: ["Smart route matching", "Proof of delivery", "Weekly payouts"] },
    { icon: BarChart3, title: "For Operations", desc: "Coordinate capacity, automate exceptions, and monitor compliance from a single command center.", points: ["Fleet coordination", "Performance dashboards", "Exception workflows"] },
  ];
  return (
    <section id="solutions" className="section bg-muted/40">
      <div className="container-pro">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="eyebrow mb-4 justify-center">Built for every role</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">Three roles. One seamless system.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {roles.map((r, i) => (
            <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-white border border-border rounded-2xl p-7 hover:border-accent transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-gradient-navy grid place-items-center mb-5">
                <r.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl text-primary mb-2">{r.title}</h3>
              <p className="text-muted-foreground text-sm mb-5">{r.desc}</p>
              <ul className="space-y-2 mb-6">
                {r.points.map(p => (
                  <li key={p} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="text-accent font-semibold text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                Get started <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Stats = () => (
  <section id="stats" className="section bg-gradient-navy text-white">
    <div className="container-pro">
      <div className="grid md:grid-cols-4 gap-8 text-center">
        {[
          { v: "2.4M+", l: "Deliveries completed" },
          { v: "12K+", l: "Active drivers" },
          { v: "98.7%", l: "On-time rate" },
          { v: "180+", l: "Cities served" },
        ].map(s => (
          <div key={s.l}>
            <div className="font-display text-5xl text-accent mb-2">{s.v}</div>
            <div className="text-sm text-white/60 uppercase tracking-wider">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="section">
    <div className="container-pro">
      <div className="bg-gradient-navy rounded-3xl p-10 lg:p-16 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(42_75%_52%/0.2),transparent_60%)]" />
        <div className="relative">
          <h2 className="font-display text-4xl lg:text-5xl mb-4">Ready to partner with a logistics platform built to deliver?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">LEO FLEX is the operational platform for teams that need real-time oversight, scalable execution, and accountable service.</p>
          <Link to="/auth" className="btn-gold">Request a demo <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border py-10 bg-white">
    <div className="container-pro flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-gold grid place-items-center">
          <Truck className="w-4 h-4 text-primary" />
        </div>
        <span className="font-display text-base text-primary">LEO FLEX</span>
        <span>© 2026</span>
      </div>
      <div className="flex gap-6">
        <a href="#" className="hover:text-primary">Privacy</a>
        <a href="#" className="hover:text-primary">Terms</a>
        <a href="#" className="hover:text-primary">Contact</a>
      </div>
    </div>
  </footer>
);
