"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function Reveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (delay) setTimeout(() => e.target.classList.add("in"), delay);
            else e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );

    // Daca este deja in viewport, reveal imediat
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add("in");
    } else {
      io.observe(el);
    }

    return () => io.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={clsx("reveal", className)}>
      {children}
    </div>
  );
}
