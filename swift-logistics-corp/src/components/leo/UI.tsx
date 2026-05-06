import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Menu } from "lucide-react";

export const LeoNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 backdrop-blur-xl bg-black/40 border-b border-white/10" : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-[#C9A24A] flex items-center justify-center text-[#C9A24A] font-serif text-sm">L</div>
          <span className="font-serif text-xl tracking-widest">LEO</span>
        </div>
        <nav className="hidden md:flex gap-10 text-sm tracking-[0.2em] uppercase text-white/70">
          <a href="#collection" className="hover:text-[#C9A24A] transition">Collection</a>
          <a href="#story" className="hover:text-[#C9A24A] transition">Story</a>
          <a href="#craft" className="hover:text-[#C9A24A] transition">Craft</a>
          <a href="#contact" className="hover:text-[#C9A24A] transition">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/80 hover:text-[#C9A24A] transition">
            <ShoppingBag className="w-4 h-4" /> Bag (0)
          </button>
          <button className="md:hidden text-white"><Menu /></button>
        </div>
      </div>
    </header>
  );
};

export const HeroOverlay = () => (
  <div className="absolute inset-0 z-10 pointer-events-none flex flex-col">
    {/* Giant background wordmark */}
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.06, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="font-serif text-[18vw] leading-none text-white whitespace-nowrap select-none"
      >
        LEO
      </motion.h1>
    </div>

    <div className="flex-1 flex items-end pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full grid lg:grid-cols-2 gap-8 items-end">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <p className="text-[#C9A24A] text-xs tracking-[0.4em] uppercase mb-4">New Drop · 2026</p>
          <h2 className="font-serif text-white text-5xl lg:text-7xl leading-[1.05]">
            Step Into<br />the <span className="italic text-[#C9A24A]">Future</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-white/60 text-sm lg:text-base max-w-md lg:justify-self-end pointer-events-auto"
        >
          <p className="mb-6">
            Hand-crafted from Italian leather and 24k gold accents. The LEO Aurum is more than a sneaker — it is a statement of timeless craftsmanship.
          </p>
          <div className="flex gap-4">
            <button className="group inline-flex items-center gap-2 bg-[#C9A24A] text-black px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-white transition">
              Shop the drop <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </button>
            <button className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 text-xs tracking-[0.2em] uppercase hover:border-[#C9A24A] hover:text-[#C9A24A] transition">
              The story
            </button>
          </div>
        </motion.div>
      </div>
    </div>

    {/* scroll cue */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-[10px] tracking-[0.4em] uppercase flex flex-col items-center gap-2">
      <span>Scroll</span>
      <div className="w-px h-10 bg-gradient-to-b from-[#C9A24A] to-transparent animate-pulse" />
    </div>
  </div>
);

export const ScrollSections = () => {
  const sections = [
    {
      id: "craft",
      eyebrow: "Craftsmanship",
      title: "Forged by Hand",
      body: "Each pair takes 47 hours to assemble in our Florence atelier. Every stitch, eyelet, and gold inlay placed with intention.",
      align: "left" as const,
    },
    {
      id: "story",
      eyebrow: "Materials",
      title: "Italian Leather. 24k Gold.",
      body: "Vegetable-tanned leather meets molten gold detailing. A union of heritage and audacity — built to outlive trends.",
      align: "right" as const,
    },
    {
      id: "collection",
      eyebrow: "The Collection",
      title: "Aurum Series",
      body: "Three silhouettes, one philosophy. Limited to 500 numbered pairs worldwide. Reserve yours before the drop closes.",
      align: "left" as const,
    },
  ];

  return (
    <>
      {sections.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="relative h-screen w-full pointer-events-none flex items-center"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9 }}
              className={`max-w-md pointer-events-auto ${s.align === "right" ? "ml-auto text-right" : ""}`}
            >
              <p className="text-[#C9A24A] text-xs tracking-[0.4em] uppercase mb-4">{s.eyebrow}</p>
              <h3 className="font-serif text-white text-4xl lg:text-6xl mb-5 leading-tight">{s.title}</h3>
              <p className="text-white/60 leading-relaxed">{s.body}</p>
            </motion.div>
          </div>
        </section>
      ))}
    </>
  );
};

export const LeoFooter = () => (
  <footer className="relative z-10 bg-black border-t border-white/10 text-white/60 text-xs tracking-[0.2em] uppercase">
    <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="font-serif text-2xl tracking-[0.3em] text-white">LEO</div>
      <div className="flex gap-8">
        <a href="#" className="hover:text-[#C9A24A]">Instagram</a>
        <a href="#" className="hover:text-[#C9A24A]">Journal</a>
        <a href="#" className="hover:text-[#C9A24A]">Support</a>
      </div>
      <div>© 2026 LEO Maison</div>
    </div>
  </footer>
);
