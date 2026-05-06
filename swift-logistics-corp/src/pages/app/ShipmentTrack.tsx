import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, User, Package, Clock, CheckCircle2, Truck, PackageCheck } from "lucide-react";
import type { Shipment, ShipmentEvent, Driver } from "@/lib/types";
import { fetchShipment, fetchShipmentEvents, fetchDriverById } from "@/lib/api";

type Event = ShipmentEvent;

const STATUS_STEPS = [
  { key: "pending", label: "Order placed", icon: Package },
  { key: "assigned", label: "Driver assigned", icon: User },
  { key: "picked_up", label: "Picked up", icon: Truck },
  { key: "in_transit", label: "In transit", icon: Truck },
  { key: "delivered", label: "Delivered", icon: PackageCheck },
];

export default function ShipmentTrack() {
  const { id } = useParams();
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [driver, setDriver] = useState<Driver | null>(null);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        const shipmentResult = await fetchShipment(id);
        setShipment(shipmentResult);
        if (shipmentResult?.driver_id) {
          const driverResult = await fetchDriverById(shipmentResult.driver_id);
          setDriver(driverResult);
        }
        const eventResult = await fetchShipmentEvents(id);
        setEvents(eventResult);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, [id]);

  if (!shipment) return <div className="text-muted-foreground">Loading shipment…</div>;

  const currentStep = STATUS_STEPS.findIndex(s => s.key === shipment.status);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/app/customer" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="w-4 h-4" /> Back to dashboard
      </Link>

      <div className="bg-white border border-border rounded-xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Tracking ID</div>
            <div className="font-display text-2xl text-primary">{shipment.tracking_id}</div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Price</div>
            <div className="font-display text-2xl text-primary">${shipment.price}</div>
          </div>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-2">
          {STATUS_STEPS.map((step, i) => {
            const done = i <= currentStep;
            const Icon = step.icon;
            return (
              <div key={step.key} className="flex-1 flex flex-col items-center relative">
                {i > 0 && (
                  <div className={`absolute left-0 right-1/2 top-5 h-0.5 ${i <= currentStep ? "bg-accent" : "bg-border"}`} />
                )}
                {i < STATUS_STEPS.length - 1 && (
                  <div className={`absolute left-1/2 right-0 top-5 h-0.5 ${i < currentStep ? "bg-accent" : "bg-border"}`} />
                )}
                <motion.div
                  initial={false}
                  animate={{ scale: done ? 1 : 0.9 }}
                  className={`relative w-10 h-10 rounded-full grid place-items-center z-10 ${
                    done ? "bg-accent text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {done && i < currentStep ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-4 h-4" />}
                </motion.div>
                <div className={`text-[10px] mt-2 text-center uppercase tracking-wider ${done ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                  {step.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map placeholder */}
      <div className="bg-white border border-border rounded-xl overflow-hidden">
        <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-100 relative grid place-items-center">
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, hsl(215 65% 22%) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />
          <div className="text-center relative">
            <MapPin className="w-10 h-10 mx-auto text-accent mb-2 animate-bounce" />
            <div className="text-sm text-muted-foreground">Live map coming online</div>
            <div className="text-xs text-muted-foreground/70 mt-1">Mapbox integration ready in next pass</div>
          </div>
        </div>
        <div className="p-5 grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Pickup</div>
            <div className="text-primary font-medium">{shipment.pickup_address}</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Drop</div>
            <div className="text-primary font-medium">{shipment.drop_address}</div>
          </div>
        </div>
      </div>

      {/* Driver card */}
      {driver && (
        <div className="bg-white border border-border rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-gold grid place-items-center text-primary font-bold">
              {driver.vehicle_type?.[0]?.toUpperCase() ?? "D"}
            </div>
            <div>
              <div className="font-semibold text-primary">Your driver</div>
              <div className="text-sm text-muted-foreground">{driver.vehicle_type ?? "Van"} · {driver.vehicle_number ?? "—"} · ⭐ {driver.rating}</div>
            </div>
          </div>
          <a href={`tel:`} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm hover:brightness-110">
            <Phone className="w-4 h-4" /> Call
          </a>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white border border-border rounded-xl p-5">
        <h3 className="font-semibold text-primary mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent" /> Activity
        </h3>
        {events.length === 0 ? (
          <div className="text-sm text-muted-foreground">No updates yet. We'll notify you in real time.</div>
        ) : (
          <ul className="space-y-3">
            {events.map((ev) => (
              <li key={ev.id} className="flex gap-3 text-sm">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-accent" />
                <div className="flex-1">
                  <div className="text-primary font-medium">{ev.message ?? ev.event_type}</div>
                  <div className="text-xs text-muted-foreground">{new Date(ev.created_at).toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
