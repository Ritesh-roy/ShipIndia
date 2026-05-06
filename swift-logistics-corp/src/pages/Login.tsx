import { Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, Shield, Package, FileText, BarChart3 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import heroPort from "@/assets/hero-port.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info("This is a demo portal. Connect a backend to enable real authentication.");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 bg-background">
        <div className="max-w-md w-full mx-auto">
          <Logo />
          <div className="mt-12">
            <div className="eyebrow mb-5">Customer Portal</div>
            <h1 className="font-display text-4xl text-primary font-bold">Welcome back.</h1>
            <p className="text-muted-foreground mt-3">Sign in to track shipments, view invoices, and manage your account.</p>
          </div>

          <form onSubmit={submit} className="mt-10 space-y-5">
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-primary">Password</label>
                <a href="#" className="text-xs text-secondary hover:text-accent">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input required type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-md border border-input bg-background focus:ring-2 focus:ring-accent focus:outline-none" />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" className="rounded" /> Keep me signed in
            </label>
            <button type="submit" className="btn-gold w-full justify-center">Sign In <ArrowRight className="w-4 h-4" /></button>
          </form>

          <div className="mt-8 p-4 bg-muted rounded-lg flex items-start gap-3 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
            <span>Your data is protected with enterprise-grade encryption and SOC 2 controls.</span>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Don't have an account? <Link to="/contact" className="text-secondary font-semibold hover:text-accent">Contact sales</Link>
          </p>
          <Link to="/" className="mt-6 inline-block text-sm text-muted-foreground hover:text-primary">← Back to home</Link>
        </div>
      </div>

      {/* Right: imagery */}
      <div className="hidden lg:block relative">
        <img src={heroPort} alt="Global port" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-navy opacity-90" />
        <div className="relative h-full flex flex-col justify-center px-16 text-primary-foreground">
          <h2 className="font-display text-4xl font-bold text-balance max-w-md">Total visibility. Total control.</h2>
          <p className="mt-4 text-white/80 max-w-md leading-relaxed">Everything you need to manage international shipments — in one secure place.</p>

          <div className="mt-10 space-y-4 max-w-md">
            {[
              { i: Package, t: "Real-time shipment tracking", d: "Live milestones across ocean, air, and road." },
              { i: FileText, t: "Invoices & documents", d: "Download BOLs, invoices, and customs paperwork instantly." },
              { i: BarChart3, t: "Analytics & reporting", d: "Spend, lane performance, and on-time KPIs at a glance." },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="flex gap-4 bg-white/5 backdrop-blur p-4 rounded-lg border border-white/10">
                <div className="w-10 h-10 rounded-md bg-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold">{t}</div>
                  <div className="text-sm text-white/70">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
