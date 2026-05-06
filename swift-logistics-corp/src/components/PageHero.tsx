import { ReactNode } from "react";

const PageHero = ({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) => (
  <section className="relative pt-40 pb-24 bg-gradient-navy text-primary-foreground overflow-hidden">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, hsl(var(--accent)/0.4), transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--secondary)/0.5), transparent 50%)' }} />
    <div className="container-pro relative">
      {eyebrow && <div className="eyebrow mb-5 animate-fade-in">{eyebrow}</div>}
      <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold max-w-4xl text-balance animate-slide-up">{title}</h1>
      {subtitle && <p className="mt-6 text-lg md:text-xl text-white/75 max-w-2xl animate-slide-up" style={{ animationDelay: '0.15s' }}>{subtitle}</p>}
      {children && <div className="mt-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>{children}</div>}
    </div>
  </section>
);

export default PageHero;
