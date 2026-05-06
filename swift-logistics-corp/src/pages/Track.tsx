import PageHero from "@/components/PageHero";
import { useState } from "react";
import { Search, Package, MapPin, CheckCircle2, Truck, Ship, Plane, Warehouse, Clock, AlertCircle } from "lucide-react";

const sampleShipments: Record<string, any> = {
  "MGL-883429": {
    id: "MGL-883429",
    mode: "Ocean FCL",
    origin: "Singapore, SG",
    destination: "Hamburg, DE",
    eta: "May 12, 2026",
    status: "In Transit",
    progress: 65,
    weight: "18,200 kg",
    container: "MGLU 4421887",
    timeline: [
      { t: "Booking confirmed", loc: "Singapore", date: "Apr 02 · 09:14", done: true, icon: CheckCircle2 },
      { t: "Picked up at origin", loc: "Tuas, SG", date: "Apr 04 · 14:30", done: true, icon: Truck },
      { t: "Departed origin port", loc: "Port of Singapore", date: "Apr 07 · 22:10", done: true, icon: Ship },
      { t: "In transit – Indian Ocean", loc: "Vessel MV Atlantic Pioneer", date: "Apr 18 · 06:45", done: true, current: true, icon: Ship },
      { t: "Arriving at Hamburg", loc: "Port of Hamburg, DE", date: "May 10 · ETA", done: false, icon: Warehouse },
      { t: "Delivered to consignee", loc: "Hamburg warehouse", date: "May 12 · ETA", done: false, icon: CheckCircle2 },
    ],
  },
  "MGL-771204": {
    id: "MGL-771204",
    mode: "Air Express",
    origin: "Hong Kong, HK",
    destination: "Los Angeles, US",
    eta: "Apr 30, 2026",
    status: "Out for Delivery",
    progress: 92,
    weight: "640 kg",
    container: "AWB 160-44218876",
    timeline: [
      { t: "Booking confirmed", loc: "Hong Kong", date: "Apr 25 · 10:00", done: true, icon: CheckCircle2 },
      { t: "Picked up", loc: "Kowloon, HK", date: "Apr 26 · 13:20", done: true, icon: Truck },
      { t: "Departed HKG", loc: "Hong Kong Intl Airport", date: "Apr 27 · 23:55", done: true, icon: Plane },
      { t: "Arrived LAX", loc: "Los Angeles, US", date: "Apr 28 · 19:40", done: true, icon: Plane },
      { t: "Customs cleared", loc: "LAX cargo terminal", date: "Apr 29 · 08:15", done: true, icon: CheckCircle2 },
      { t: "Out for delivery", loc: "Long Beach, CA", date: "Apr 30 · 09:30", done: true, current: true, icon: Truck },
    ],
  },
};

const Track = () => {
  const [q, setQ] = useState("");
  const [searched, setSearched] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(q.trim().toUpperCase());
  };

  const result = searched ? sampleShipments[searched] : null;
  const notFound = searched && !result;

  return (
    <>
      <PageHero eyebrow="Shipment Tracking" title="Track your cargo in real time." subtitle="Enter your tracking number to see live milestones, ETA, and document downloads.">
        <form onSubmit={submit} className="bg-card rounded-xl p-3 flex flex-col sm:flex-row items-stretch gap-2 max-w-2xl shadow-elegant">
          <div className="flex-1 flex items-center gap-2">
            <Search className="w-5 h-5 text-muted-foreground ml-3" />
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="e.g. MGL-883429"
              className="w-full bg-transparent text-foreground py-3 focus:outline-none"
            />
          </div>
          <button type="submit" className="btn-gold !py-3">Track Shipment</button>
        </form>
        <div className="mt-4 text-sm text-white/60">
          Try demo IDs: <button onClick={() => { setQ("MGL-883429"); setSearched("MGL-883429"); }} className="text-accent underline">MGL-883429</button> · <button onClick={() => { setQ("MGL-771204"); setSearched("MGL-771204"); }} className="text-accent underline">MGL-771204</button>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-pro max-w-5xl">
          {!searched && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-muted-foreground/40 mx-auto" />
              <p className="text-muted-foreground mt-4">Enter a tracking number above to view shipment details.</p>
            </div>
          )}

          {notFound && (
            <div className="card-pro text-center max-w-lg mx-auto">
              <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
              <h2 className="font-display text-2xl text-primary mt-4">No shipment found</h2>
              <p className="text-muted-foreground mt-2">We couldn't find a shipment with ID <span className="font-mono text-primary">{searched}</span>. Try one of the demo IDs above.</p>
            </div>
          )}

          {result && (
            <div className="space-y-8">
              {/* Header card */}
              <div className="bg-gradient-navy text-primary-foreground rounded-2xl p-8 lg:p-10">
                <div className="flex flex-wrap items-start justify-between gap-6">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-accent font-semibold">Tracking ID</div>
                    <div className="font-display text-3xl mt-1">{result.id}</div>
                  </div>
                  <span className="bg-accent/20 border border-accent/40 text-accent px-4 py-1.5 rounded-full text-sm font-semibold">{result.status}</span>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between text-sm text-white/80 mb-2">
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {result.origin}</span>
                    <span className="flex items-center gap-2">{result.destination} <MapPin className="w-4 h-4 text-accent" /></span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-gradient-gold transition-all duration-1000" style={{ width: `${result.progress}%` }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/10">
                  <Stat label="Mode" value={result.mode} />
                  <Stat label="ETA" value={result.eta} />
                  <Stat label="Weight" value={result.weight} />
                  <Stat label="Container / AWB" value={result.container} mono />
                </div>
              </div>

              {/* Timeline */}
              <div className="card-pro">
                <h3 className="font-display text-2xl text-primary flex items-center gap-2"><Clock className="w-6 h-6 text-accent" /> Shipment Timeline</h3>
                <div className="mt-8 relative">
                  <div className="absolute left-5 top-2 bottom-2 w-px bg-border" />
                  {result.timeline.map((step: any, i: number) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="relative pl-16 pb-8 last:pb-0">
                        <div className={`absolute left-0 w-10 h-10 rounded-full flex items-center justify-center ring-4 ring-background ${
                          step.current ? "bg-gradient-gold text-primary animate-pulse" :
                          step.done ? "bg-secondary text-secondary-foreground" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className={step.done ? "" : "opacity-60"}>
                          <div className="font-semibold text-primary">{step.t}</div>
                          <div className="text-sm text-muted-foreground mt-0.5">{step.loc}</div>
                          <div className="text-xs text-muted-foreground/80 mt-1 font-mono">{step.date}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const Stat = ({ label, value, mono }: { label: string; value: string; mono?: boolean }) => (
  <div>
    <div className="text-xs uppercase tracking-widest text-white/60">{label}</div>
    <div className={`mt-1 text-white ${mono ? "font-mono text-sm" : "font-semibold"}`}>{value}</div>
  </div>
);

export default Track;
