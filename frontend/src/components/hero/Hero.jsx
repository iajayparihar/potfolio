import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Github, Linkedin, FileText } from 'lucide-react';
import { profile } from '../../data/profile';
import HeroDiagram from './HeroDiagram';

const SystemGraph3D = lazy(() => import(/* webpackChunkName: "graph3d" */ './SystemGraph3D'));

function canUse3D() {
  if (window.innerWidth < 900 || navigator.connection?.saveData) return false;
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export default function Hero() {
  // null = undecided (desktop only): keep the fixed-size visual box empty to avoid layout shift.
  const [use3D, setUse3D] = useState(() => (window.innerWidth < 900 ? false : null));

  // Decide after first paint, when the browser is idle, so the 3D chunk never blocks the text.
  useEffect(() => {
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200));
    const cancel = window.cancelIdleCallback || clearTimeout;
    if (use3D === false) return undefined;
    const id = idle(() => setUse3D(canUse3D()));
    return () => cancel(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-status mono">
            <span className="pulse" aria-hidden="true" /> <span className="hide-sm">Backend · Security · AI · </span>{profile.tagline}
          </p>
          <h1 id="hero-title" className="hero-title">
            Ajay<br />Parihar<span className="hero-dot">.</span>
          </h1>
          <p className="hero-role">
            <span>Python Backend Developer</span>
            <span className="sep" aria-hidden="true">/</span>
            <span>Secure Systems &amp; AI Integration</span>
          </p>
          <p className="hero-statement">{profile.statement}</p>
          <p className="hero-sub">{profile.subStatement}</p>

          <div className="hero-ctas">
            <a href="#projects" className="btn btn--primary">View Projects <ArrowRight size={16} aria-hidden="true" /></a>
            <a href="#contact" className="btn">Contact Me</a>
          </div>
          <ul className="hero-links" aria-label="Profiles">
            {profile.resume && (
              <li><a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noopener noreferrer"><FileText size={16} aria-hidden="true" /> Resume</a></li>
            )}
            <li><a className="btn btn--ghost" href={profile.social.github} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={14} className="ext" aria-hidden="true" /></a></li>
            <li><a className="btn btn--ghost" href={profile.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} className="ext" aria-hidden="true" /></a></li>
          </ul>
        </div>

        <div className="hero-visual">
          {use3D && (
            <Suspense fallback={null}>
              <SystemGraph3D />
            </Suspense>
          )}
          {use3D === false && <HeroDiagram />}
          <p className="hero-visual-caption mono" aria-hidden="true">
            request path → auth → services → data · ai → cloud
          </p>
        </div>
      </div>
    </section>
  );
}
