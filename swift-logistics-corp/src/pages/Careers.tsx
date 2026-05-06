import PageHero from "@/components/PageHero";
import { Briefcase, MapPin, Clock, Users, Heart, TrendingUp, Globe } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const jobs = [
  { t: "Senior Freight Forwarder", l: "Singapore, SG", type: "Full-time", d: "Lead complex multimodal shipments for our key Asia-Pacific accounts." },
  { t: "Customs Compliance Manager", l: "Rotterdam, NL", type: "Full-time", d: "Own EU customs strategy and ensure regulatory excellence across regions." },
  { t: "Operations Analyst", l: "Dubai, UAE", type: "Full-time", d: "Drive data-led optimization across our Middle East logistics network." },
  { t: "Warehouse Supervisor", l: "Los Angeles, USA", type: "Full-time", d: "Manage day-to-day operations of our 80,000 sqft LAX distribution hub." },
  { t: "Software Engineer, Visibility Platform", l: "Remote", type: "Full-time", d: "Build the tools that give thousands of customers real-time shipment insight." },
  { t: "Sales Executive", l: "Hamburg, DE", type: "Full-time", d: "Grow our customer base across the DACH region with consultative selling." },
];

const culture = [
  { i: Users, t: "People-first culture", d: "1,200+ teammates across 65 countries — diverse, ambitious, supportive." },
  { i: TrendingUp, t: "Growth without ceilings", d: "Internal mobility, mentorship, and tuition support for every career stage." },
  { i: Globe, t: "Global mobility", d: "Move between offices on six continents through our internal transfer program." },
  { i: Heart, t: "Wellbeing benefits", d: "Comprehensive health, parental leave, and mental health support worldwide." },
];

const Careers = () => {
  const [form, setForm] = useState({ name: "", email: "", role: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application received! We'll be in touch within 5 business days.");
    setForm({ name: "", email: "", role: "", message: "" });
  };

  return (
    <>
      <PageHero eyebrow="Careers" title="Build a career that crosses borders." subtitle="Join a team of logistics specialists, technologists, and operators shaping the future of global trade." />

      <section className="section">
        <div className="container-pro">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="eyebrow justify-center inline-flex mb-5">Why LEO</div>
            <h2 className="font-display text-4xl md:text-5xl text-primary font-bold text-balance">A place to grow your craft.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {culture.map(({ i: Icon, t, d }) => (
              <div key={t} className="card-pro text-center">
                <div className="w-14 h-14 mx-auto rounded-md bg-secondary/10 text-secondary flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="font-display text-lg text-primary">{t}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-muted">
        <div className="container-pro">
          <div className="flex justify-between flex-wrap items-end gap-4 mb-10">
            <div>
              <div className="eyebrow mb-5">Open Roles</div>
              <h2 className="font-display text-4xl md:text-5xl text-primary font-bold">Find your next role.</h2>
            </div>
            <div className="text-muted-foreground">{jobs.length} open positions</div>
          </div>
          <div className="space-y-3">
            {jobs.map((j) => (
              <div key={j.t} className="bg-card border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-lg transition-shadow">
                <div>
                  <h3 className="font-display text-xl text-primary">{j.t}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{j.d}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {j.l}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {j.type}</span>
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Logistics</span>
                  </div>
                </div>
                <button onClick={() => setForm(f => ({ ...f, role: j.t }))} className="btn-gold text-sm !py-2.5">Apply Now</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="section">
        <div className="container-pro max-w-3xl">
          <div className="text-center mb-12">
            <div className="eyebrow justify-center inline-flex mb-5">Apply</div>
            <h2 className="font-display text-4xl md:text-5xl text-primary font-bold">Tell us about yourself.</h2>
            <p className="text-muted-foreground mt-4">Don't see a perfect fit? Send us your CV and we'll keep you in mind.</p>
          </div>
          <form onSubmit={submit} className="card-pro space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            </div>
            <Field label="Role of interest" value={form.role} onChange={(v) => setForm({ ...form, role: v })} />
            <div>
            <label className="block text-sm font-semibold text-primary mb-2">Why LEO?</label>
              <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none transition" />
            </div>
            <button type="submit" className="btn-gold w-full justify-center">Submit Application</button>
          </form>
        </div>
      </section>
    </>
  );
};

const Field = ({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) => (
  <div>
    <label className="block text-sm font-semibold text-primary mb-2">{label}</label>
    <input required type={type} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none transition" />
  </div>
);

export default Careers;
