import { experience } from '../data/profile';
import SectionHead from './SectionHead';

export default function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          id="experience-title"
          index="02"
          label="Experience"
          title="Current professional experience"
          lede="Backend engineering across APIs, data, integrations and deployment — plus the stakeholder and mentoring work around it."
        />

        <ol className="timeline">
          {experience.map((job) => (
            <li key={job.company} className="timeline-item" data-reveal>
              <div className="timeline-rail" aria-hidden="true"><span className="timeline-node" /></div>
              <article className="timeline-card panel">
                <header className="timeline-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="timeline-company">{job.company}</p>
                  </div>
                  <p className="timeline-period mono">
                    {job.current && <span className="live" aria-hidden="true" />}
                    {job.period}
                  </p>
                </header>
                <div className="timeline-groups">
                  {job.groups.map((g, i) => (
                    <section key={g.title} className="timeline-group" data-reveal style={{ '--d': i + 1 }}>
                      <h4 className="mono">{g.title}</h4>
                      <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
                    </section>
                  ))}
                </div>
                <ul className="tags" aria-label="Stack">
                  {job.stack.map((s) => <li key={s} className="tag">{s}</li>)}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
