'use client';
import { ReactNode, useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Duration bariye 1.8 kora holo (scroll aro smooth o soft hobe)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -12 * t)), // Easing function aro smooth kora holo
      smoothWheel: true,
      wheelMultiplier: 0.9, // Mouse wheel speed ektu control kore smoothness barabe
      touchMultiplier: 2, // Mobile/Touchpad-er jonnoo smooth response
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}