import { nodes } from './graph';

const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
// Rows of the same system, flattened for small screens / no WebGL.
const rows = [['client'], ['gateway'], ['auth', 'rbac'], ['api'], ['redis', 'celery', 'postgres', 'llm', 'rag'], ['cloud']];

export default function HeroDiagram() {
  return (
    <figure className="hero-diagram" aria-label="Secure backend system: client to gateway, authentication and RBAC, services, data and AI layers, on cloud infrastructure">
      <div className="hero-diagram-head mono" aria-hidden="true"><span className="dot" /> system.topology</div>
      <ol className="hero-diagram-rows">
        {rows.map((row, i) => (
          <li key={i} className="hd-row">
            {row.map((id) => (
              <span key={id} className={`hd-node g-${byId[id].group}`}>
                {byId[id].label}
                <small className="mono">{byId[id].tag}</small>
              </span>
            ))}
          </li>
        ))}
      </ol>
    </figure>
  );
}
