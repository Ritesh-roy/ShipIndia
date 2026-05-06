import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { z } from "zod";
import { Truck, Mail, Lock, Phone, User as UserIcon, Building2, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { roleHomePath, type AccountType } from "@/lib/auth";
import type { AppRole } from "@/lib/types";
import { login, signup } from "@/lib/api";

const emailSchema = z.string().trim().email("Invalid email").max(255);
const passwordSchema = z.string().min(6, "Min 6 characters").max(72);
const nameSchema = z.string().trim().min(2, "Name too short").max(100);
const phoneSchema = z.string().trim().min(7, "Invalid phone").max(20);

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<AppRole>("customer");
  const [accountType, setAccountType] = useState<AccountType>("person");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const adminEmail = "Leodas@gmail.com";
  const adminPassword = "Leo@7631";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        nameSchema.parse(name);
        phoneSchema.parse(phone);
        emailSchema.parse(email);
        passwordSchema.parse(password);

        const { user } = await signup({
          email,
          password,
          full_name: name,
          phone,
          account_type: accountType,
          role,
        });

        toast.success("Account created!");
        navigate(roleHomePath(user.role), { replace: true });
      } else {
        emailSchema.parse(email);
        passwordSchema.parse(password);

        const { user } = await login(email, password);
        toast.success("Welcome back!");
        navigate(roleHomePath(user.role), { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const fillAdminLogin = () => {
    setMode("signin");
    setEmail(adminEmail);
    setPassword(adminPassword);
  };

  const handleGoogle = async () => {
    toast.error("Google OAuth is not available in this build.");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[hsl(215,65%,8%)] flex items-center justify-center p-6">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(215_70%_22%/0.6),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="flex items-center justify-center gap-2 mb-8 text-white">
          <div className="w-10 h-10 rounded-lg bg-gradient-gold grid place-items-center">
            <Truck className="w-5 h-5 text-primary" />
          </div>
          <span className="font-display text-2xl">LEO FLEX</span>
        </Link>

        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h1 className="font-display text-3xl text-white mb-1">
            {mode === "signin" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-white/60 text-sm mb-6">
            {mode === "signin" ? "Sign in to manage your shipments" : "Start shipping in minutes"}
          </p>

          {/* Role tabs (signup) */}
          {mode === "signup" && (
            <>
              <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-white/5 mb-4">
                {(["customer", "driver", "admin"] as AppRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 text-xs uppercase tracking-wider rounded-md transition ${role === r ? "bg-accent text-primary font-semibold" : "text-white/60 hover:text-white"
                      }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {role === "customer" && (
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {([["person", UserIcon, "Person"], ["store", Building2, "Store"]] as const).map(([v, Icon, label]) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setAccountType(v as AccountType)}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm transition ${accountType === v
                          ? "border-accent bg-accent/10 text-accent"
                          : "border-white/10 text-white/60 hover:border-white/30"
                        }`}
                    >
                      <Icon className="w-4 h-4" /> {label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <>
                <Field icon={UserIcon} type="text" placeholder="Full name" value={name} onChange={setName} />
                <Field icon={Phone} type="tel" placeholder="Phone number" value={phone} onChange={setPhone} />
              </>
            )}
            <Field icon={Mail} type="email" placeholder="Email address" value={email} onChange={setEmail} />
            <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} />

            <button
              type="submit"
              disabled={busy}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary font-semibold py-3 rounded-lg transition hover:brightness-110 disabled:opacity-50"
            >
              {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <>{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5 text-white/30 text-xs uppercase tracking-wider">
            <div className="flex-1 h-px bg-white/10" /> or <div className="flex-1 h-px bg-white/10" />
          </div>

          <button
            onClick={handleGoogle}
            disabled={busy}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-2.5 rounded-lg font-medium hover:bg-white/90 transition disabled:opacity-50"
          >
            <GoogleIcon /> Continue with Google
          </button>

          <button
            type="button"
            onClick={fillAdminLogin}
            className="w-full mt-3 inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white/90 py-2.5 rounded-lg font-medium hover:bg-white/15 transition"
          >
            Quick admin login
          </button>

          <p className="text-center text-white/60 text-sm mt-6">
            {mode === "signin" ? "New to LEO FLEX? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-accent hover:underline font-medium"
            >
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const Field = ({ icon: Icon, ...props }: any) => (
  <div className="relative">
    <Icon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
    <input
      {...props}
      onChange={(e) => props.onChange(e.target.value)}
      className="w-full pl-10 pr-3 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-accent focus:outline-none transition"
      required
    />
  </div>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);
