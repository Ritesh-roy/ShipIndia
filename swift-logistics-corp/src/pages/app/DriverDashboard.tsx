import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, DollarSign, Clock, Package, Check, X, ArrowRight, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { Shipment, Driver } from "@/lib/types";
import { fetchDriverProfile, fetchDriverShipments, fetchOpenShipments, updateShipment, updateDriver, createShipmentEvent } from "@/lib/api";

export default function DriverDashboard() {
  const { user } = useAuth();
  const [pool, setPool] = useState<Shipment[]>([]);
  const [active, setActive] = useState<Shipment[]>([]);
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const drv = await fetchDriverProfile();
        setDriver(drv);
        const pending = await fetchOpenShipments();
        setPool(pending);
        const activeShipments = await fetchDriverShipments("assigned,picked_up,in_transit");
        setActive(activeShipments);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [user]);

  const accept = async (s: Shipment) => {
    if (!driver) return toast.error("Driver profile not ready");
    try {
      await updateShipment(s.id, { driver_id: driver.id, status: "assigned" });
      await createShipmentEvent(s.id, {
        event_type: "assigned",
        message: "Driver accepted the trip",
      });
      toast.success("Trip accepted!");
      setPool(pool.filter((item) => item.id !== s.id));
      setActive([{ ...s, driver_id: driver.id, status: "assigned" }, ...active]);
    } catch (error: any) {
      toast.error(error?.message ?? "Could not accept trip");
    }
  };

  const updateStatus = async (s: Shipment, status: "picked_up" | "in_transit" | "delivered") => {
    try {
      const updates: any = { status };
      if (status === "delivered") updates.delivered_at = new Date().toISOString();
      await updateShipment(s.id, updates);
      await createShipmentEvent(s.id, {
        event_type: status,
        message: `Shipment ${status.replace("_", " ")}`,
      });

      if (status === "delivered" && driver) {
        await updateDriver({
          total_earnings: (driver.total_earnings ?? 0) + Number(s.price),
          total_trips: (driver.total_trips ?? 0) + 1,
        });
        setDriver({ ...driver, total_earnings: (driver.total_earnings ?? 0) + Number(s.price), total_trips: (driver.total_trips ?? 0) + 1 });
      }
      toast.success("Status updated");
      setActive(active.map((item) => (item.id === s.id ? { ...item, ...updates } : item)));
    } catch (error: any) {
      toast.error(error?.message ?? "Could not update status");
    }
  };

  const toggleAvailability = async () => {
    if (!driver) return;
    try {
      const newAv = driver.availability === "online" ? "offline" : "online";
      const updated = await updateDriver({ availability: newAv });
      setDriver(updated);
      toast.success(`You're now ${newAv}`);
    } catch (error: any) {
      toast.error(error?.message ?? "Unable to update availability");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Status header */}
      <div className="bg-gradient-navy rounded-xl p-6 text-white flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs text-accent uppercase tracking-wider">Driver workspace</div>
          <h1 className="font-display text-2xl">Hello, driver</h1>
          <div className="text-sm text-white/60 mt-1">
            ${driver?.total_earnings ?? 0} earned · {driver?.total_trips ?? 0} trips · ⭐ {driver?.rating ?? 5}
          </div>
        </div>
        <button
          onClick={toggleAvailability}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold ${
            driver?.availability === "online" ? "bg-emerald-500 text-white" : "bg-white/10 text-white"
          }`}
        >
          {driver?.availability === "online" ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
          {driver?.availability === "online" ? "Online" : "Go online"}
        </button>
      </div>

      {/* Active */}
      {active.length > 0 && (
        <section>
          <h2 className="font-display text-xl text-primary mb-3">Active trips</h2>
          <div className="grid gap-3">
            {active.map((s) => (
              <div key={s.id} className="bg-white border border-accent rounded-xl p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-xs text-muted-foreground">{s.tracking_id}</div>
                    <div className="font-semibold text-primary">{s.package_description}</div>
                  </div>
                  <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold capitalize">{s.status.replace("_", " ")}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-4 space-y-1">
                  <div className="flex gap-2"><MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {s.pickup_address}</div>
                  <div className="flex gap-2"><MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" /> {s.drop_address}</div>
                </div>
                <div className="flex gap-2">
                  {s.status === "assigned" && <button onClick={() => updateStatus(s, "picked_up")} className="btn-gold flex-1">Mark picked up</button>}
                  {s.status === "picked_up" && <button onClick={() => updateStatus(s, "in_transit")} className="btn-gold flex-1">Start transit</button>}
                  {s.status === "in_transit" && <button onClick={() => updateStatus(s, "delivered")} className="btn-gold flex-1 bg-emerald-500">Mark delivered</button>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pool */}
      <section>
        <h2 className="font-display text-xl text-primary mb-3">New trip requests</h2>
        {pool.length === 0 ? (
          <div className="bg-white border border-dashed border-border rounded-xl p-10 text-center text-muted-foreground">
            No pending trips. We'll notify you the moment one comes in.
          </div>
        ) : (
          <div className="grid gap-3">
            <AnimatePresence>
              {pool.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white border border-border rounded-xl p-5"
                >
                  <div className="flex flex-wrap justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-accent" />
                      <span className="font-semibold text-primary">{s.package_description}</span>
                      <span className="text-xs text-muted-foreground">· {s.package_weight_kg}kg</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold"><DollarSign className="w-3.5 h-3.5" />{s.price}</span>
                      <span className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3.5 h-3.5" />{s.eta_minutes}m</span>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-4 space-y-1">
                    <div className="flex gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> {s.pickup_address}</div>
                    <div className="flex gap-2"><MapPin className="w-4 h-4 text-rose-500" /> {s.drop_address}</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => accept(s)} className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-semibold hover:brightness-110">
                      <Check className="w-4 h-4" /> Accept
                    </button>
                    <button className="px-4 py-2.5 rounded-lg border border-border text-muted-foreground hover:bg-muted">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}
