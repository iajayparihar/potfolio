import { featured } from '../data/profile';
import SectionHead from './SectionHead';
import FlowDiagram from './FlowDiagram';
import useTilt from '../lib/useTilt';

function CaseStudy({ p, i }) {
  const tilt = useTilt(2);
  return (
    <article className={`case ${i % 2 ? 'case--flip' : ''}`} aria-labelledby={`${p.id}-title`}>
      <div className="case-copy" data-reveal>
        <p className="case-index mono">Case study · {String(i + 1).padStart(2, '0')}</p>
        <h3 id={`${p.id}-title`} className="case-title">{p.name}</h3>
        <p className="case-subtitle">{p.subtitle}</p>

        <dl className="case-wwh">
          <div><dt className="mono">What</dt><dd>{p.what}</dd></div>
          <div><dt className="mono">Why</dt><dd>{p.why}</dd></div>
          <div><dt className="mono">How</dt><dd>{p.how}</dd></div>
          <div>
            <dt className="mono">Stack</dt>
            <dd>
              <ul className="tags">
                {p.stack.map((s) => <li key={s} className="tag">{s}</li>)}
                {p.integrations?.map((s) => <li key={s} className="tag tag--accent">{s}</li>)}
              </ul>
            </dd>
          </div>
        </dl>

        <details className="case-more">
          <summary>Engineering decisions</summary>
          <ul>{p.decisions.map((d) => <li key={d}>{d}</li>)}</ul>
          <p className="case-more-label mono">Capabilities</p>
          <ul className="tags">{p.highlights.map((h) => <li key={h} className="tag">{h}</li>)}</ul>
        </details>
      </div>

      <div className="case-visual" data-reveal style={{ '--d': 2 }}>
        <div className="window" ref={tilt}>
          <div className="window-bar mono" aria-hidden="true">
            <span className="window-dots"><i /><i /><i /></span>
            {p.id}/architecture
          </div>
          <FlowDiagram
            steps={p.flow}
            branches={p.branches}
            branchLabel={p.branches && '↳ async, real-time & external'}
            layout="vertical"
            accent={i % 2 ? 'cyan' : 'violet'}
          />
        </div>
      </div>
    </article>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead
          id="projects-title"
          index="03"
          label="Featured work"
          title={<>Systems where access control and <em>reliability are the product.</em></>}
          lede="Architecture shown at the level of components and data flow: what each system does, why it is shaped that way, and how it is built."
        />
        <div className="cases">
          {featured.map((p, i) => <CaseStudy key={p.id} p={p} i={i} />)}
        </div>
      </div>
    </section>
  );
}
