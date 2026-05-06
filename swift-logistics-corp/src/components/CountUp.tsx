import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";

interface Props {
  to: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

const CountUp = ({ to, duration = 2000, prefix = "", suffix = "", decimals = 0 }: Props) => {
  const { ref, shown } = useReveal<HTMLSpanElement>(0.3);
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!shown) return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, to, duration]);

  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
};

export default CountUp;
