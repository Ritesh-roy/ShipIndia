import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/branches", label: "Branches" },
  { to: "/news", label: "News" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        transparent ? "bg-transparent py-5" : "bg-background/95 backdrop-blur-md shadow-sm py-3"
      }`}
    >
      <div className="container-pro flex items-center justify-between">
        <Logo light={transparent} />

        <nav className="hidden xl:flex items-center gap-0.5">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
                  transparent ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-primary"
                } ${isActive ? "!text-accent" : ""}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:+18005551234"
            className={`flex items-center gap-2 text-sm font-medium ${
              transparent ? "text-white/90" : "text-foreground/80"
            }`}
          >
            <Phone className="w-4 h-4" /> +1 800 555 1234
          </a>
          <Link to="/login" className="btn-gold !py-2.5 !px-5 text-sm">Customer Login</Link>
        </div>

        <button
          className={`lg:hidden p-2 ${transparent ? "text-white" : "text-foreground"}`}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-background border-t border-border shadow-lg animate-fade-in">
          <div className="container-pro py-6 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-md font-medium ${isActive ? "bg-muted text-accent" : "text-foreground"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/login" className="btn-gold mt-4 justify-center">Customer Login</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
