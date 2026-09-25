import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { moreProjects } from '../data/profile';
import SectionHead from './SectionHead';
import ScribbleSim from './ScribbleSim';

const snippets = {
  fitnessos: ['request', 'clerk jwt', 'org scope', 'role check', 'handler'],
  pidhi: ['member', 'family scope', 'role permission', 'tree api'],
};

function Links({ links }) {
  if (!links.github && !links.demo) return <p className="proj-private mono">source private</p>;
  return (
    <div className="proj-links">
      {links.demo && (
        <a className="btn btn--sm btn--primary" href={links.demo} target="_blank" rel="noopener noreferrer">
          Live demo <ArrowUpRight size={14} className="ext" aria-hidden="true" />
        </a>
      )}
      {links.github && (
        <a className="btn btn--sm" href={links.github} target="_blank" rel="noopener noreferrer">
          <Github size={14} aria-hidden="true" /> GitHub <ArrowUpRight size={14} className="ext" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function Project({ p, i, wide }) {
  return (
    <article className="proj panel" aria-labelledby={`${p.id}-title`} data-reveal>
      <div className="proj-top">
        <span className="proj-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <p className="proj-kind mono">{p.kind}</p>
      </div>
      <div className="proj-copy">
        <h3 id={`${p.id}-title`}>{p.name}</h3>
        <p className="proj-summary">{p.summary}</p>
        <ul className="proj-points">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        <ul className="tags" aria-label="Stack">{p.stack.map((s) => <li key={s} className="tag">{s}</li>)}</ul>
        <Links links={p.links} />
      </div>
      {wide ? (
        <ScribbleSim />
      ) : (
        snippets[p.id] && (
          <p className="proj-snippet mono" aria-label={`Request path: ${snippets[p.id].join(', then ')}`}>
            {snippets[p.id].map((s, i) => (
              <span key={s}>{i > 0 && <i aria-hidden="true">→</i>}{s}</span>
            ))}
          </p>
        )
      )}
    </article>
  );
}

export default function MoreProjects() {
  const track = useRef(null);
  const scroll = (dir) => track.current?.scrollBy({ left: dir * Math.min(460, track.current.clientWidth * 0.86), behavior: 'smooth' });
  return (
    <section id="more-projects" className="section" aria-labelledby="more-title">
      <div className="container">
        <SectionHead
          id="more-title"
          index="08"
          label="Selected engineering projects"
          title={<>Personal projects, <em>built from the data model up.</em></>}
          lede="Independent builds on my own GitHub — real-time systems, multi-tenant SaaS foundations and access control."
        />
        <div className="projs" ref={track} role="region" aria-label="Personal projects, scroll horizontally" tabIndex={0}>
          {moreProjects.map((p, i) => <Project key={p.id} p={p} i={i} wide={i === 0} />)}
        </div>
        <div className="projs-nav">
          <button type="button" className="btn btn--sm" onClick={() => scroll(-1)} aria-label="Previous projects"><ArrowLeft size={14} aria-hidden="true" /></button>
          <button type="button" className="btn btn--sm" onClick={() => scroll(1)} aria-label="Next projects"><ArrowRight size={14} aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  );
}
