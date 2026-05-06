import { Suspense, lazy, useEffect, useState } from "react";
import { LeoNavbar, HeroOverlay, ScrollSections, LeoFooter } from "@/components/leo/UI";
import { useLenis } from "@/components/leo/useLenis";

const Scene = lazy(() => import("@/components/leo/Scene"));

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <div
      className="pointer-events-none fixed z-[60] mix-blend-screen transition-transform duration-200"
      style={{
        left: pos.x - 150,
        top: pos.y - 150,
        width: 300,
        height: 300,
        background: "radial-gradient(circle, rgba(201,162,74,0.25) 0%, transparent 70%)",
      }}
    />
  );
};

const LeoShoe = () => {
  useLenis();

  useEffect(() => {
    document.documentElement.style.background = "#08080a";
    return () => {
      document.documentElement.style.background = "";
    };
  }, []);

  return (
    <div className="bg-[#08080a] text-white" style={{ cursor: "none" }}>
      <CursorGlow />
      <LeoNavbar />

      {/* Sticky WebGL canvas — stays behind all content */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#08080a]" />}>
          <Scene />
        </Suspense>
      </div>

      {/* Scroll-driving content */}
      <div id="leo-scroll-root" className="relative z-10">
        <section className="relative h-screen w-full">
          <HeroOverlay />
        </section>

        <ScrollSections />

        <section className="relative h-screen flex items-center pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full text-center pointer-events-auto">
            <p className="text-[#C9A24A] text-xs tracking-[0.4em] uppercase mb-4">Reserve</p>
            <h3 className="font-serif text-white text-5xl lg:text-7xl mb-8">€1,290</h3>
            <button className="bg-[#C9A24A] text-black px-10 py-4 text-xs tracking-[0.3em] uppercase font-semibold hover:bg-white transition">
              Pre-order Now
            </button>
          </div>
        </section>
      </div>

      <div className="relative z-10">
        <LeoFooter />
      </div>
    </div>
  );
};

export default LeoShoe;
