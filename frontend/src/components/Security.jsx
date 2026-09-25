import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { securityLayers } from '../data/profile';
import SectionHead from './SectionHead';

export default function Security() {
  const [active, setActive] = useState(2);
  const layer = securityLayers[active];

  return (
    <section id="security" className="section" aria-labelledby="security-title">
      <div className="container">
        <SectionHead
          id="security-title"
          index="05"
          label="Security"
          title={<>Security by architecture, <em>not by afterthought.</em></>}
          lede="Every request passes through explicit layers before it reaches data. Each layer has one job, and none of them trusts the client."
        />

        <div className="sec-grid">
          {/* Decorative 3D stack mirrors the accessible list on the right */}
          <div className="sec-stage" aria-hidden="true" data-reveal>
            <div className="sec-stack">
              {securityLayers.map((l, i) => (
                <div
                  key={l.label}
                  className={`sec-plane ${i === active ? 'is-active' : ''} ${i < active ? 'is-passed' : ''}`}
                  style={{ '--i': i, '--n': securityLayers.length }}
                  onMouseEnter={() => setActive(i)}
                >
                  <span className="mono">{l.tag}</span> {l.label}
                </div>
              ))}
              <div className="sec-core"><ShieldCheck size={20} /></div>
            </div>
          </div>

          <div className="sec-side" data-reveal style={{ '--d': 1 }}>
            <ol className="sec-list">
              {securityLayers.map((l, i) => (
                <li key={l.label}>
                  <button
                    type="button"
                    className="sec-item"
                    aria-pressed={i === active}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                  >
                    <span className="mono">{l.tag}</span>
                    <strong>{l.label}</strong>
                    <span className="sec-item-note">{l.note}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="sec-detail" aria-live="polite">
              <p className="mono">{layer.tag} · controls</p>
              <ul className="tags">{layer.controls.map((c) => <li key={c} className="tag tag--sec">{c}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
