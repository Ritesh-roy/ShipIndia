import { Link } from "react-router-dom";

const Logo = ({ light = false }: { light?: boolean }) => (
  <Link to="/" className="flex items-center gap-2.5 group">
    <div className="relative w-10 h-10 rounded-md bg-gradient-gold flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-primary">
        <path d="M3 7l9-4 9 4-9 4-9-4z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M3 12l9 4 9-4M3 17l9 4 9-4" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    </div>
    <div className="leading-tight">
      <div className={`font-display text-xl font-bold ${light ? 'text-white' : 'text-primary'}`}>LEO</div>
      <div className={`text-[10px] uppercase tracking-[0.2em] ${light ? 'text-white/70' : 'text-muted-foreground'}`}>Global Logistics</div>
    </div>
  </Link>
);

export default Logo;
