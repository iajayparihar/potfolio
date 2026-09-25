import { GraduationCap } from 'lucide-react';
import { about, aboutFocus, education, supporting } from '../data/profile';
import SectionHead from './SectionHead';

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHead
          id="about-title"
          index="01"
          label="About"
          title={<>I build secure backend systems for <em>complex, data-sensitive products.</em></>}
          lede="Sensitive data, third-party integrations, asynchronous workflows, AI services and relational systems that need to scale — that is the work I do."
        />

        <div className="about-grid">
          <dl className="about-list">
            {about.map((item, i) => (
              <div key={item.k} className="about-item" data-reveal style={{ '--d': i }}>
                <dt className="mono"><span>{String(i + 1).padStart(2, '0')}</span>{item.k}</dt>
                <dd>{item.v}</dd>
              </div>
            ))}
          </dl>

          <aside className="about-aside panel" data-reveal style={{ '--d': 2 }}>
            <p className="aside-label mono">focus.areas</p>
            <ul className="tags">
              {aboutFocus.map((f) => <li key={f} className="tag tag--accent">{f}</li>)}
            </ul>
            <p className="aside-label mono">supporting</p>
            <p className="aside-text">
              Frontend knowledge in {supporting.join(', ')} — used to ship end-to-end, not the main specialisation.
            </p>
            <p className="aside-label mono">education</p>
            <p className="aside-edu">
              <GraduationCap size={18} aria-hidden="true" />
              <span><strong>{education.degree}</strong><br />{education.institution} · {education.detail}</span>
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
