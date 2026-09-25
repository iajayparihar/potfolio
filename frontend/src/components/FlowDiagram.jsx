import { useEffect, useRef, useState } from 'react';

/**
 * Animated, interactive pipeline. A "packet" steps through the nodes while the diagram is on screen;
 * hovering, focusing or clicking a node takes over and pins it. The active node's explanation is
 * always rendered below, so nothing is hover-only.
 *
 * layout: 'auto' (horizontal when the container is wide) | 'vertical'
 */
export default function FlowDiagram({ steps, branches = [], branchLabel, title, layout = 'auto', accent = 'violet', interval = 1500 }) {
  const all = [...steps, ...branches];
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (pinned || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      clearInterval(timer);
      if (e.isIntersecting) timer = setInterval(() => setActive((a) => (a + 1) % all.length), interval);
    }, { threshold: 0.3 });
    io.observe(ref.current);
    return () => { io.disconnect(); clearInterval(timer); };
  }, [pinned, all.length, interval]);

  const pick = (i) => { setActive(i); setPinned(true); };
  const current = all[active];
  const node = (s, i) => (
    <button
      type="button"
      className="flow-node"
      aria-pressed={i === active}
      onMouseEnter={() => pick(i)}
      onFocus={() => pick(i)}
      onClick={() => pick(i)}
    >
      <span className="flow-idx mono">{String(i + 1).padStart(2, '0')}</span>
      <span className="flow-label">{s.label}</span>
      <span className="flow-tag mono">{s.tag}</span>
    </button>
  );

  return (
    <div className={`flow flow--${layout} flow--${accent} loop`} ref={ref}>
      {title && <p className="flow-title mono">{title}</p>}
      <ol className="flow-steps">
        {steps.map((s, i) => (
          <li key={s.label} className={`flow-step ${i < active && active < steps.length ? 'is-past' : ''} ${i === active ? 'is-active' : ''}`}>
            {node(s, i)}
          </li>
        ))}
      </ol>
      {branches.length > 0 && (
        <div className="flow-branches">
          {branchLabel && <p className="flow-branch-label mono">{branchLabel}</p>}
          <ul>
            {branches.map((s, j) => {
              const i = steps.length + j;
              return <li key={s.label} className={`flow-step ${i === active ? 'is-active' : ''}`}>{node(s, i)}</li>;
            })}
          </ul>
        </div>
      )}
      <p className="flow-note" aria-live={pinned ? 'polite' : 'off'}>
        <span className="mono">{String(active + 1).padStart(2, '0')} · {current.label}</span>
        {current.note}
      </p>
    </div>
  );
}
