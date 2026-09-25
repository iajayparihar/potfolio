import { aiPipeline, aiTopics } from '../data/profile';
import SectionHead from './SectionHead';
import FlowDiagram from './FlowDiagram';

const contrast = [
  { k: 'Decoration', v: 'A chat box bolted onto a product. The model sees whatever it is given and its output is trusted as-is.' },
  { k: 'Integration', v: 'The model is one service in the backend: behind authentication, fed only permitted context, with validated output and deterministic business logic deciding what happens next.' },
];

export default function AIEngineering() {
  return (
    <section id="ai" className="section" aria-labelledby="ai-title">
      <div className="container">
        <SectionHead
          id="ai-title"
          index="04"
          label="AI engineering"
          title={<>AI integration, <em>not AI decoration.</em></>}
          lede="LLMs, RAG and agents wired into real backend systems — async, authenticated and validated like every other dependency."
        />

        <div className="ai-contrast">
          {contrast.map((c, i) => (
            <div key={c.k} className={`ai-card ${i ? 'ai-card--on' : ''}`} data-reveal style={{ '--d': i }}>
              <p className="mono">{c.k}</p>
              <p>{c.v}</p>
            </div>
          ))}
        </div>

        <div className="ai-pipeline panel" data-reveal>
          <FlowDiagram steps={aiPipeline} title="request lifecycle · ai-assisted endpoint" accent="cyan" interval={1300} />
        </div>

        <ul className="tags ai-topics" aria-label="AI topics" data-reveal>
          {aiTopics.map((t) => <li key={t} className="tag">{t}</li>)}
        </ul>
      </div>
    </section>
  );
}
