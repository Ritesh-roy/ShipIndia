import PageHero from "@/components/PageHero";
import { useState } from "react";
import { toast } from "sonner";
import { Ship, Plane, Truck, Warehouse, Check, ArrowLeft, ArrowRight, Package, MapPin, Mail } from "lucide-react";

const modes = [
  { id: "ocean", t: "Ocean Freight", icon: Ship, d: "Best for large volumes, cost-effective" },
  { id: "air", t: "Air Cargo", icon: Plane, d: "Fastest, ideal for urgent or high-value" },
  { id: "road", t: "Road Transport", icon: Truck, d: "Cross-border and regional delivery" },
  { id: "warehouse", t: "Warehousing", icon: Warehouse, d: "Storage, distribution & 3PL" },
];

const cargoTypes = ["General cargo", "Hazardous goods", "Refrigerated", "Oversize / Project", "Pharmaceutical", "Other"];

const Quote = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    mode: "",
    origin: "",
    destination: "",
    cargoType: "General cargo",
    weight: "",
    units: "",
    incoterm: "FOB",
    name: "",
    email: "",
    company: "",
    notes: "",
  });

  const set = (k: string, v: string) => setData(d => ({ ...d, [k]: v }));

  const next = () => setStep(s => Math.min(4, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  const submit = () => {
    toast.success("Quote request submitted! Our team will respond within 4 business hours.");
    setStep(1);
    setData({ mode: "", origin: "", destination: "", cargoType: "General cargo", weight: "", units: "", incoterm: "FOB", name: "", email: "", company: "", notes: "" });
  };

  const canNext =
    (step === 1 && data.mode) ||
    (step === 2 && data.origin && data.destination) ||
    (step === 3 && data.weight) ||
    step === 4;

  return (
    <>
      <PageHero eyebrow="Request a Quote" title="Get pricing in 4 hours." subtitle="Tell us about your shipment and we'll come back with a tailored quote from a logistics specialist." />

      <section className="section">
        <div className="container-pro max-w-3xl">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-12">
            {[1, 2, 3, 4].map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step > s ? "bg-secondary text-secondary-foreground" :
                  step === s ? "bg-gradient-gold text-primary scale-110" :
                  "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {i < 3 && <div className={`flex-1 h-0.5 mx-2 transition-colors ${step > s ? "bg-secondary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <div className="card-pro min-h-[420px]">
            {step === 1 && (
              <div>
                <h2 className="font-display text-3xl text-primary">What are you shipping?</h2>
                <p className="text-muted-foreground mt-2">Choose the mode that best fits your cargo.</p>
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {modes.map(m => {
                    const active = data.mode === m.id;
                    return (
                      <button key={m.id} onClick={() => set("mode", m.id)}
                        className={`text-left p-5 rounded-xl border-2 transition-all ${
                          active ? "border-accent bg-accent/5 shadow-md" : "border-border hover:border-primary/40"
                        }`}>
                        <div className={`w-11 h-11 rounded-md flex items-center justify-center mb-3 ${active ? "bg-gradient-gold text-primary" : "bg-muted text-secondary"}`}>
                          <m.icon className="w-5 h-5" />
                        </div>
                        <div className="font-display text-lg text-primary">{m.t}</div>
                        <div className="text-sm text-muted-foreground mt-1">{m.d}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-display text-3xl text-primary">Where is it going?</h2>
                <p className="text-muted-foreground mt-2">Enter origin and destination cities or ports.</p>
                <div className="grid sm:grid-cols-2 gap-5 mt-8">
                  <Field label="Origin" icon={MapPin} v={data.origin} on={(v) => set("origin", v)} placeholder="Singapore" />
                  <Field label="Destination" icon={MapPin} v={data.destination} on={(v) => set("destination", v)} placeholder="Hamburg" />
                </div>
                <div className="mt-5">
                  <label className="block text-sm font-semibold text-primary mb-2">Incoterm</label>
                  <select value={data.incoterm} onChange={e => set("incoterm", e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none">
                    {["EXW", "FCA", "FOB", "CIF", "DAP", "DDP"].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-3xl text-primary">Tell us about the cargo.</h2>
                <p className="text-muted-foreground mt-2">A few details help us price accurately.</p>
                <div className="space-y-5 mt-8">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Cargo type</label>
                    <select value={data.cargoType} onChange={e => set("cargoType", e.target.value)}
                      className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none">
                      {cargoTypes.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Total weight (kg)" icon={Package} v={data.weight} on={(v) => set("weight", v)} placeholder="18000" />
                    <Field label="Units / pallets" icon={Package} v={data.units} on={(v) => set("units", v)} placeholder="20 pallets" />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-display text-3xl text-primary">Where should we send it?</h2>
                <p className="text-muted-foreground mt-2">Your contact details — and a quick review.</p>

                <div className="grid sm:grid-cols-2 gap-5 mt-8">
                  <Field label="Full name" v={data.name} on={(v) => set("name", v)} />
                  <Field label="Email" icon={Mail} v={data.email} on={(v) => set("email", v)} type="email" />
                </div>
                <Field label="Company" v={data.company} on={(v) => set("company", v)} className="mt-5" />
                <div className="mt-5">
                  <label className="block text-sm font-semibold text-primary mb-2">Notes (optional)</label>
                  <textarea rows={3} value={data.notes} onChange={e => set("notes", e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none" />
                </div>

                <div className="mt-7 p-5 bg-muted rounded-lg">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-semibold">Summary</div>
                  <dl className="grid grid-cols-2 gap-y-2 text-sm">
                    <dt className="text-muted-foreground">Mode</dt><dd className="text-primary font-semibold capitalize">{data.mode || "—"}</dd>
                    <dt className="text-muted-foreground">Route</dt><dd className="text-primary font-semibold">{data.origin || "—"} → {data.destination || "—"}</dd>
                    <dt className="text-muted-foreground">Cargo</dt><dd className="text-primary font-semibold">{data.cargoType}</dd>
                    <dt className="text-muted-foreground">Weight</dt><dd className="text-primary font-semibold">{data.weight ? `${data.weight} kg` : "—"}</dd>
                    <dt className="text-muted-foreground">Incoterm</dt><dd className="text-primary font-semibold">{data.incoterm}</dd>
                  </dl>
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="flex justify-between mt-10 pt-6 border-t border-border">
              <button onClick={back} disabled={step === 1}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-foreground/70 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              {step < 4 ? (
                <button onClick={next} disabled={!canNext} className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed">
                  Next <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button onClick={submit} disabled={!data.name || !data.email} className="btn-gold disabled:opacity-50 disabled:cursor-not-allowed">
                  Submit Request <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const Field = ({ label, icon: Icon, v, on, type = "text", placeholder, className = "" }: any) => (
  <div className={className}>
    <label className="block text-sm font-semibold text-primary mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />}
      <input type={type} value={v} onChange={(e) => on(e.target.value)} placeholder={placeholder}
        className={`w-full ${Icon ? "pl-11" : "pl-4"} pr-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none`} />
    </div>
  </div>
);

export default Quote;
