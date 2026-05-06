import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Package, Truck, DollarSign, TrendingUp, Users, MapPin, Activity } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import type { Shipment, Driver, Profile } from "@/lib/types";
import { fetchAdminOverview } from "@/lib/api";

type UserRole = { user_id: string; role: string };

export default function AdminDashboard() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { shipments, drivers, users } = await fetchAdminOverview();
        setShipments(shipments);
        setDrivers(drivers);
        setProfiles(users);
        setRoles(users.map((user) => ({ user_id: user.id, role: user.role })));
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const roleByUser = useMemo(() => Object.fromEntries(roles.map((role) => [role.user_id, role.role])), [roles]);
  const profileByUser = useMemo(() => Object.fromEntries(profiles.map((profile) => [profile.id, profile])), [profiles]);
  const shipmentsByCustomer = useMemo(() => shipments.reduce((acc, shipment) => {
    if (!shipment.customer_id) return acc;
    acc[shipment.customer_id] = (acc[shipment.customer_id] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>), [shipments]);
  const totalUsers = profiles.length;
  const totalOrders = shipments.length;
  const totalDrivers = drivers.length;

  const totalRevenue = shipments.filter(s => s.status === "delivered").reduce((sum, s) => sum + Number(s.price), 0);
  const activeShipments = shipments.filter(s => ["assigned", "picked_up", "in_transit"].includes(s.status)).length;
  const failedRate = shipments.length ? Math.round((shipments.filter(s => s.status === "failed").length / shipments.length) * 100) : 0;
  const onlineDrivers = drivers.filter(d => d.availability !== "offline").length;

  // Build last-7-day series
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    const dayShipments = shipments.filter(s => s.created_at.slice(0, 10) === key);
    return {
      day: d.toLocaleDateString("en", { weekday: "short" }),
      orders: dayShipments.length,
      revenue: dayShipments.filter(s => s.status === "delivered").reduce((sum, s) => sum + Number(s.price), 0),
    };
  });

  const statusBreakdown = ["pending", "assigned", "in_transit", "delivered"].map(st => ({
    status: st.replace("_", " "),
    count: shipments.filter(s => s.status === st).length,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl text-primary">Operations overview</h1>
        <p className="text-muted-foreground">Real-time fleet, revenue and delivery metrics.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={DollarSign} label="Revenue" value={`$${totalRevenue.toLocaleString()}`} trend="+12%" color="emerald" />
        <KPI icon={Package} label="Orders" value={totalOrders} trend="Active shipments" color="blue" />
        <KPI icon={Users} label="Drivers" value={`${onlineDrivers}/${totalDrivers}`} color="indigo" />
        <KPI icon={TrendingUp} label="Users" value={totalUsers} color="rose" />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="Revenue (7 days)">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={days}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(215 70% 30%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(215 70% 30%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(215 70% 30%)" fill="url(#rev)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Orders by status">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={statusBreakdown}>
              <XAxis dataKey="status" stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "white", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="count" fill="hsl(42 75% 52%)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Live orders table */}
      <Card title="Live orders">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="text-left py-2 px-2 font-medium">Tracking</th>
                <th className="text-left py-2 px-2 font-medium">Route</th>
                <th className="text-left py-2 px-2 font-medium">Status</th>
                <th className="text-right py-2 px-2 font-medium">Price</th>
                <th className="text-right py-2 px-2 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {shipments.slice(0, 12).map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="py-2.5 px-2 font-mono text-xs text-primary">{s.tracking_id}</td>
                  <td className="py-2.5 px-2 text-muted-foreground truncate max-w-[260px]">{s.pickup_address} → {s.drop_address}</td>
                  <td className="py-2.5 px-2"><StatusPill status={s.status} /></td>
                  <td className="py-2.5 px-2 text-right font-medium">${s.price}</td>
                  <td className="py-2.5 px-2 text-right text-xs text-muted-foreground">{new Date(s.created_at).toLocaleTimeString()}</td>
                </tr>
              ))}
              {shipments.length === 0 && (
                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No orders yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card title="User registry">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="text-left py-2 px-2 font-medium">Name</th>
                  <th className="text-left py-2 px-2 font-medium">Email</th>
                  <th className="text-left py-2 px-2 font-medium">Role</th>
                  <th className="text-left py-2 px-2 font-medium">Account</th>
                  <th className="text-right py-2 px-2 font-medium">Shipments</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 px-2">{profile.full_name || "—"}</td>
                    <td className="py-2.5 px-2 truncate max-w-[220px]">{profile.email}</td>
                    <td className="py-2.5 px-2 capitalize">{roleByUser[profile.id] || "customer"}</td>
                    <td className="py-2.5 px-2 capitalize">{profile.account_type}</td>
                    <td className="py-2.5 px-2 text-right">{shipmentsByCustomer[profile.id] || 0}</td>
                  </tr>
                ))}
                {profiles.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Driver registry">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                  <th className="text-left py-2 px-2 font-medium">Driver</th>
                  <th className="text-left py-2 px-2 font-medium">Vehicle</th>
                  <th className="text-left py-2 px-2 font-medium">Availability</th>
                  <th className="text-right py-2 px-2 font-medium">Trips</th>
                  <th className="text-right py-2 px-2 font-medium">Earnings</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver) => {
                  const owner = profileByUser[driver.user_id];
                  return (
                    <tr key={driver.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="py-2.5 px-2">{owner?.full_name || owner?.email || "Driver"}</td>
                      <td className="py-2.5 px-2">{driver.vehicle_type || "—"}</td>
                      <td className="py-2.5 px-2 capitalize">{driver.availability || "offline"}</td>
                      <td className="py-2.5 px-2 text-right">{driver.total_trips}</td>
                      <td className="py-2.5 px-2 text-right">${Number(driver.total_earnings).toFixed(2)}</td>
                    </tr>
                  );
                })}
                {drivers.length === 0 && (
                  <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">No drivers found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

const KPI = ({ icon: Icon, label, value, trend, color }: any) => {
  const colors: Record<string, string> = {
    emerald: "from-emerald-500 to-emerald-600",
    blue: "from-blue-500 to-blue-600",
    indigo: "from-indigo-500 to-indigo-600",
    rose: "from-rose-500 to-rose-600",
  };
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-border rounded-xl p-5">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[color]} grid place-items-center mb-3`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      {trend && <div className="text-xs text-emerald-600 mt-1">{trend}</div>}
    </motion.div>
  );
};

const Card = ({ title, children }: any) => (
  <div className="bg-white border border-border rounded-xl p-5">
    <h3 className="font-semibold text-primary mb-4">{title}</h3>
    {children}
  </div>
);

const StatusPill = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700",
    assigned: "bg-blue-100 text-blue-700",
    picked_up: "bg-indigo-100 text-indigo-700",
    in_transit: "bg-purple-100 text-purple-700",
    delivered: "bg-emerald-100 text-emerald-700",
    cancelled: "bg-gray-100 text-gray-600",
    failed: "bg-rose-100 text-rose-700",
  };
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${colors[status]}`}>{status.replace("_", " ")}</span>;
};
