import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Package, MapPin, User, Phone, ArrowRight, Loader2, Calculator } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { createShipment } from "@/lib/api";
import { toast } from "sonner";

const schema = z.object({
  package_description: z.string().trim().min(2).max(200),
  package_weight_kg: z.number().min(0.1).max(1000),
  pickup_address: z.string().trim().min(5).max(300),
  drop_address: z.string().trim().min(5).max(300),
  recipient_name: z.string().trim().min(2).max(100),
  recipient_phone: z.string().trim().min(7).max(20),
});

export default function NewShipment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    package_description: "",
    package_weight_kg: "1",
    pickup_address: "",
    drop_address: "",
    recipient_name: "",
    recipient_phone: "",
  });

  const weight = parseFloat(form.package_weight_kg) || 0;
  const estimatedPrice = Math.max(12, Math.round(10 + weight * 2));
  const estimatedEta = 35 + Math.round(weight * 3);

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (!user) throw new Error("Please sign in first.");
      const parsed = schema.parse({
        ...form,
        package_weight_kg: parseFloat(form.package_weight_kg),
      });

      const result = await createShipment({
        package_description: parsed.package_description,
        package_weight_kg: parsed.package_weight_kg,
        pickup_address: parsed.pickup_address,
        drop_address: parsed.drop_address,
        recipient_name: parsed.recipient_name,
        recipient_phone: parsed.recipient_phone,
        price: estimatedPrice,
        eta_minutes: estimatedEta,
      });

      toast.success(`Shipment ${result.tracking_id} created!`);
      navigate(`/app/customer/shipment/${result.id}`);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to create shipment");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-display text-3xl text-primary mb-1">Create shipment</h1>
      <p className="text-muted-foreground mb-8">Fill in the details — we'll dispatch a driver instantly.</p>

      <form onSubmit={submit} className="space-y-6">
        {/* Package */}
        <Section title="Package details" icon={Package}>
          <div className="grid sm:grid-cols-3 gap-3">
            <Input className="sm:col-span-2" label="Description" value={form.package_description} onChange={(v) => update("package_description", v)} placeholder="e.g. Documents, electronics" required />
            <Input label="Weight (kg)" type="number" step="0.1" min="0.1" value={form.package_weight_kg} onChange={(v) => update("package_weight_kg", v)} required />
          </div>
        </Section>

        {/* Locations */}
        <Section title="Pickup & drop" icon={MapPin}>
          <Input label="Pickup address" value={form.pickup_address} onChange={(v) => update("pickup_address", v)} placeholder="Street, city" required />
          <Input label="Drop address" value={form.drop_address} onChange={(v) => update("drop_address", v)} placeholder="Street, city" required />
        </Section>

        {/* Recipient */}
        <Section title="Recipient" icon={User}>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input label="Full name" value={form.recipient_name} onChange={(v) => update("recipient_name", v)} required />
            <Input label="Phone" type="tel" value={form.recipient_phone} onChange={(v) => update("recipient_phone", v)} required />
          </div>
        </Section>

        {/* Quote */}
        <div className="bg-gradient-navy rounded-xl p-6 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-accent text-xs uppercase tracking-wider mb-1">
              <Calculator className="w-3.5 h-3.5" /> Estimated quote
            </div>
            <div className="text-3xl font-bold">${estimatedPrice}</div>
            <div className="text-xs text-white/60">ETA ~{estimatedEta} min</div>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 hover:brightness-110 disabled:opacity-50"
          >
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Confirm <ArrowRight className="w-4 h-4" /></>}
          </button>
        </div>
      </form>
    </div>
  );
}

const Section = ({ title, icon: Icon, children }: any) => (
  <div className="bg-white border border-border rounded-xl p-5">
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-accent" />
      <h3 className="font-semibold text-primary text-sm uppercase tracking-wider">{title}</h3>
    </div>
    <div className="space-y-3">{children}</div>
  </div>
);

const Input = ({ label, className = "", onChange, ...props }: any) => (
  <label className={`block ${className}`}>
    <span className="text-xs text-muted-foreground mb-1 block">{label}</span>
    <input
      {...props}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2.5 rounded-lg border border-border bg-white focus:border-accent focus:outline-none transition text-sm"
    />
  </label>
);
