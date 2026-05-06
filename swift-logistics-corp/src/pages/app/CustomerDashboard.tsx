import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Plus, MapPin, Clock, TrendingUp, ArrowRight, Truck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import type { Shipment } from "@/lib/types";
import { fetchCustomerShipments } from "@/lib/api";

const STATUS_META: Record<string, { label: string; color: string; pct: number }> = {
  pending: { label: "Pending", color: "bg-amber-500", pct: 10 },
  assigned: { label: "Driver Assigned", color: "bg-blue-500", pct: 30 },
  picked_up: { label: "Picked Up", color: "bg-indigo-500", pct: 55 },
  in_transit: { label: "In Transit", color: "bg-purple-500", pct: 80 },
  delivered: { label: "Delivered", color: "bg-emerald-500", pct: 100 },
  cancelled: { label: "Cancelled", color: "bg-gray-400", pct: 0 },
  failed: { label: "Failed", color: "bg-rose-500", pct: 0 },
};

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchCustomerShipments()
      .then((data) => setShipments(data))
      .catch(() => setShipments([]))
      .finally(() => setLoading(false));
  }, [user]);

  const active = shipments.filter(s => !["delivered","cancelled","failed"].includes(s.status));
  const delivered = shipments.filter(s => s.status === "delivered").length;

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-primary">Your shipments</h1>
          <p className="text-muted-foreground">Track and manage every package, in real time.</p>
        </div>
        <Link to="/app/customer/new" className="btn-gold">
          <Plus className="w-4 h-4" /> New shipment
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat icon={Package} label="Total" value={shipments.length} />
        <Stat icon={Truck} label="Active" value={active.length} accent />
        <Stat icon={TrendingUp} label="Delivered" value={delivered} />
        <Stat icon={Clock} label="Avg ETA" value={active[0]?.eta_minutes ? `${active[0].eta_minutes}m` : "—"} />
      </div>

      {/* List */}
      <section>
        <h2 className="font-display text-xl text-primary mb-4">Recent shipments</h2>
        {loading ? (
          <div className="text-muted-foreground text-sm">Loading…</div>
        ) : shipments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-3">
            {shipments.map((s, i) => (
              <ShipmentCard key={s.id} shipment={s} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

const Stat = ({ icon: Icon, label, value, accent }: any) => (
  <div className={`rounded-xl p-5 border ${accent ? "bg-primary text-white border-primary" : "bg-white border-border"}`}>
    <div className="flex items-center justify-between mb-2">
      <Icon className={`w-5 h-5 ${accent ? "text-accent" : "text-muted-foreground"}`} />
    </div>
    <div className="text-2xl font-bold">{value}</div>
    <div className={`text-xs uppercase tracking-wider ${accent ? "text-white/60" : "text-muted-foreground"}`}>{label}</div>
  </div>
);

export const ShipmentCard = ({ shipment: s, index = 0 }: { shipment: Shipment; index?: number }) => {
  const meta = STATUS_META[s.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
    >
      <Link
        to={`/app/customer/shipment/${s.id}`}
        className="block bg-white border border-border rounded-xl p-5 hover:border-accent hover:shadow-[var(--shadow-card)] transition group"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="min-w-0">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">{s.tracking_id}</div>
            <div className="font-semibold text-primary truncate">{s.package_description || "Package"}</div>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-white ${meta.color}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> {meta.label}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
          <div className="min-w-0">
            <div className="truncate">{s.pickup_address}</div>
            <div className="truncate">→ {s.drop_address}</div>
          </div>
        </div>

        <div className="h-1.5 bg-muted rounded-full overflow-hidden mb-2">
          <div className={`h-full ${meta.color} transition-all duration-700`} style={{ width: `${meta.pct}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{new Date(s.created_at).toLocaleDateString()}</span>
          <span className="flex items-center gap-1 text-accent font-medium group-hover:translate-x-0.5 transition">
            Track <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const EmptyState = () => (
  <div className="bg-white border border-dashed border-border rounded-xl p-12 text-center">
    <Package className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
    <h3 className="font-display text-xl text-primary mb-1">No shipments yet</h3>
    <p className="text-sm text-muted-foreground mb-4">Create your first shipment to get started.</p>
    <Link to="/app/customer/new" className="btn-gold inline-flex"><Plus className="w-4 h-4" /> New shipment</Link>
  </div>
);
