import { architecture } from '../data/profile';
import SectionHead from './SectionHead';
import FlowDiagram from './FlowDiagram';

export default function Architecture() {
  return (
    <section id="architecture" className="section" aria-labelledby="architecture-title">
      <div className="container">
        <SectionHead
          id="architecture-title"
          index="06"
          label="System design"
          title={<>How I build systems.</>}
          lede="A core request path that keeps data safe and consistent, with an AI path that branches off the service layer and rejoins it through validation."
        />

        <div className="arch-grid">
          <div className="arch-col panel" data-reveal>
            <FlowDiagram steps={architecture.core} title="core.request_path" layout="vertical" accent="violet" />
          </div>
          <div className="arch-join loop" aria-hidden="true">
            <span className="mono">service layer ⇄ ai</span>
          </div>
          <div className="arch-col panel" data-reveal style={{ '--d': 1 }}>
            <FlowDiagram steps={architecture.ai} title="parallel.ai_path" layout="vertical" accent="cyan" interval={1700} />
          </div>
        </div>

        <ul className="principles">
          {architecture.principles.map((p, i) => (
            <li key={p.k} data-reveal style={{ '--d': i }}>
              <h3>{p.k}</h3>
              <p>{p.v}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
