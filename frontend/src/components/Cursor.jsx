import { useEffect, useRef, useState } from 'react';

const INTERACTIVE = 'a, button, [role="button"], summary, input, label';

// Dot follows the pointer exactly; halo eases behind it. Only on fine pointers with hover.
export default function Cursor() {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );
  const dot = useRef(null);
  const halo = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add('has-cursor');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let x = -100, y = -100, hx = -100, hy = -100, raf = 0;

    const tick = () => {
      hx += (x - hx) * (reduced ? 1 : 0.2);
      hy += (y - hy) * (reduced ? 1 : 0.2);
      halo.current.style.transform = `translate3d(${hx}px, ${hy}px, 0)`;
      raf = Math.abs(x - hx) + Math.abs(y - hy) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      const hot = !!e.target.closest?.(INTERACTIVE);
      halo.current.classList.toggle('is-active', hot);
      dot.current.classList.remove('is-hidden'); halo.current.classList.remove('is-hidden');
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => { dot.current.classList.add('is-hidden'); halo.current.classList.add('is-hidden'); };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      root.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={halo} className="cursor-halo is-hidden" aria-hidden="true" />
      <div ref={dot} className="cursor-dot is-hidden" aria-hidden="true" />
    </>
  );
}
