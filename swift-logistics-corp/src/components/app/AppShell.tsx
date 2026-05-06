import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Truck, Package, Map, BarChart3, Users, Bell, LogOut, Plus, Home, Wallet, Navigation, Moon, Sun } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { roleHomePath } from "@/lib/auth";

const navByRole = {
  customer: [
    { to: "/app/customer", icon: Home, label: "Dashboard" },
    { to: "/app/customer/new", icon: Plus, label: "New Shipment" },
    { to: "/app/customer/history", icon: Package, label: "History" },
  ],
  driver: [
    { to: "/app/driver", icon: Home, label: "Trips" },
    { to: "/app/driver/active", icon: Navigation, label: "Active" },
    { to: "/app/driver/earnings", icon: Wallet, label: "Earnings" },
  ],
  admin: [
    { to: "/app/admin", icon: BarChart3, label: "Overview" },
    { to: "/app/admin/orders", icon: Package, label: "Orders" },
    { to: "/app/admin/fleet", icon: Users, label: "Fleet" },
    { to: "/app/admin/map", icon: Map, label: "Live Map" },
  ],
};

export default function AppShell({ children }: { children: ReactNode }) {
  const { user, role, signOut } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();
  const items = role ? navByRole[role] : [];

  useEffect(() => {
    const stored = localStorage.getItem("leo-flex-theme") as "light" | "dark" | null;
    const initial = stored ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("leo-flex-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <Link to="/" className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-gradient-gold grid place-items-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-xl">LEO FLEX</span>
        </Link>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to.split("/").length === 3}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-accent text-primary font-semibold"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/15 hover:text-sidebar-foreground"
                }`
              }
            >
              <it.icon className="w-4 h-4" /> {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <div className="px-3 py-2 text-xs text-sidebar-foreground/70 truncate">{user?.email}</div>
          <button type="button" onClick={signOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/10 hover:text-sidebar-foreground transition">
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-card border-b border-border px-4 lg:px-8 flex items-center justify-between">
          <div className="lg:hidden flex items-center gap-2">
            <Link to={role ? roleHomePath(role) : "/"} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold grid place-items-center">
                <Truck className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display text-lg text-primary">LEO FLEX</span>
            </Link>
          </div>
          <div className="hidden lg:block text-sm text-muted-foreground">
            {role && <span className="capitalize">{role} workspace</span>}
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={toggleTheme} className="relative p-2 rounded-lg hover:bg-muted transition">
              {theme === "dark" ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-muted transition">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </button>
            <button type="button" onClick={signOut} className="lg:hidden p-2 rounded-lg hover:bg-muted">
              <LogOut className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <nav className="lg:hidden flex border-b border-border bg-card overflow-x-auto">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.to.split("/").length === 3}
              className={({ isActive }) =>
                `flex-1 min-w-0 flex flex-col items-center gap-1 py-2.5 text-[10px] uppercase tracking-wider transition ${
                  isActive ? "text-accent border-b-2 border-accent" : "text-muted-foreground"
                }`
              }
            >
              <it.icon className="w-4 h-4" />
              <span className="truncate">{it.label}</span>
            </NavLink>
          ))}
        </nav>

        <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
