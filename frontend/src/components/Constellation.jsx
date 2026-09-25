import { useState } from 'react';
import { categories, technologies } from '../data/profile';
import SectionHead from './SectionHead';

// Two orbits around Python. Positions are percentages of the square stage.
const INNER = 11;
const place = (i) => {
  const inner = i < INNER;
  const n = inner ? INNER : technologies.length - INNER;
  const k = inner ? i : i - INNER;
  const a = (k / n) * Math.PI * 2 - Math.PI / 2 + (inner ? 0 : Math.PI / n);
  const r = inner ? 26 : 44;
  return { left: `${50 + r * Math.cos(a)}%`, top: `${50 + r * Math.sin(a)}%` };
};

export default function Constellation() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const sel = technologies.find((t) => t.name === selected);

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <div className="container">
        <SectionHead
          id="stack-title"
          index="07"
          label="Technology"
          title={<>A Python-centred stack, <em>chosen per problem.</em></>}
          lede="Filter by domain, then select a technology to see where it fits."
        />

        <div className="const-filters" role="group" aria-label="Filter technologies" data-reveal>
          {categories.map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={filter === c} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <div className="const-grid">
          <div className="const-stage" data-reveal>
            <svg className="const-orbits" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="26" />
              <circle cx="50" cy="50" r="44" />
            </svg>
            <div className="const-center" aria-hidden="true"><span className="mono">core</span>Python</div>
            <ul className="const-nodes">
              {technologies.map((t, i) => {
                const dim = filter !== 'All' && t.cat !== filter;
                return (
                  <li key={t.name} style={place(i)} className={`const-node ${dim ? 'is-dim' : ''}`}>
                    <button
                      type="button"
                      aria-pressed={selected === t.name}
                      aria-controls="const-detail"
                      tabIndex={dim ? -1 : 0}
                      onClick={() => setSelected(t.name)}
                    >
                      {t.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="const-detail panel" id="const-detail" aria-live="polite" data-reveal style={{ '--d': 1 }}>
            {sel ? (
              <>
                <p className="mono const-cat">{sel.cat}</p>
                <h3>{sel.name}</h3>
                <p>{sel.note}</p>
              </>
            ) : (
              <>
                <p className="mono const-cat">Python</p>
                <h3>The centre of gravity</h3>
                <p>Python for backend services, data and AI integration — with SQL, JavaScript and TypeScript alongside. Select any node to see how it is used.</p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
