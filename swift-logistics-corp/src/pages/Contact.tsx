import PageHero from "@/components/PageHero";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const [f, setF] = useState({ name: "", email: "", company: "", subject: "Quote Request", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! Our team will respond within 24 hours.");
    setF({ name: "", email: "", company: "", subject: "Quote Request", message: "" });
  };

  return (
    <>
      <PageHero eyebrow="Contact Us" title="Let's move your cargo together." subtitle="Speak with a logistics specialist or request a tailored quote — we typically respond within 24 hours." />

      <section className="section">
        <div className="container-pro grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 card-pro">
            <h2 className="font-display text-3xl text-primary">Send us a message</h2>
            <div className="gold-bar my-5" />
            <form onSubmit={submit} className="space-y-5 mt-6">
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Full name" v={f.name} on={(v) => setF({ ...f, name: v })} />
                <Input label="Email" type="email" v={f.email} on={(v) => setF({ ...f, email: v })} />
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <Input label="Company" v={f.company} on={(v) => setF({ ...f, company: v })} />
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Inquiry type</label>
                  <select value={f.subject} onChange={(e) => setF({ ...f, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none">
                    <option>Quote Request</option>
                    <option>General Inquiry</option>
                    <option>Customer Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Tell us about your shipment</label>
                <textarea required rows={6} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none transition" />
              </div>
              <button type="submit" className="btn-gold w-full justify-center">Send Message <Send className="w-4 h-4" /></button>
            </form>
          </div>

          <div className="space-y-5">
            {[
              { i: Phone, t: "Call us", d: "+1 800 555 1234", s: "Mon–Fri, 24/5 global desk" },
              { i: Mail, t: "Email us", d: "hello@leologistics.com", s: "We reply within 24 hours" },
              { i: MapPin, t: "HQ Address", d: "200 Harbor Drive", s: "Singapore 018956" },
              { i: Clock, t: "Operating Hours", d: "24/7 Customer Support", s: "Across all global hubs" },
            ].map(({ i: Icon, t, d, s }) => (
              <div key={t} className="card-pro flex gap-4">
                <div className="w-12 h-12 rounded-md bg-gradient-gold text-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{t}</div>
                  <div className="font-semibold text-primary mt-1">{d}</div>
                  <div className="text-sm text-muted-foreground">{s}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-pro">
          <div className="rounded-xl overflow-hidden shadow-xl border border-border h-[450px]">
            <iframe
              title="LEO HQ Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=103.83%2C1.27%2C103.87%2C1.30&layer=mapnik&marker=1.2842%2C103.8500"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const Input = ({ label, v, on, type = "text" }: { label: string; v: string; on: (v: string) => void; type?: string }) => (
  <div>
    <label className="block text-sm font-semibold text-primary mb-2">{label}</label>
    <input required type={type} value={v} onChange={(e) => on(e.target.value)}
      className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none transition" />
  </div>
);

export default Contact;
