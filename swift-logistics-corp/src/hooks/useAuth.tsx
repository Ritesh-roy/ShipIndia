import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { User } from "@/lib/types";
import type { AppRole } from "@/lib/types";
import { getMe, logout } from "@/lib/api";

interface AuthCtx {
  user: User | null;
  role: AppRole | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx>({
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getMe()
      .then((account) => {
        if (!mounted) return;
        setUser(account);
        setRole(account.role);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
        setRole(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const signOut = async () => {
    try {
      await logout();
    } finally {
      setUser(null);
      setRole(null);
      window.location.href = "/auth";
    }
  };

  return <Ctx.Provider value={{ user, role, loading, signOut }}>{children}</Ctx.Provider>;
};

export const useAuth = () => useContext(Ctx);
