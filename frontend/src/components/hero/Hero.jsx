import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
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
      <div className="container">
        <div className="hero-stage">
          <div className="hero-left">
            <p className="hero-hello">Hello, I'm</p>
            <h1 id="hero-title" className="hero-name">Ajay<br />Parihar</h1>
            <ul className="hero-social" aria-label="Profiles">
              <li><a href={profile.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={18} /></a></li>
              <li><a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a></li>
              <li><a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={18} /></a></li>
            </ul>
          </div>

          <div className="hero-center">
            <div className="hero-halo" aria-hidden="true" />
            {profile.photo ? (
              <img className="hero-photo" src={profile.photo} alt="Portrait of Ajay Parihar" width="520" height="620" fetchpriority="high" />
            ) : (
              <div className="hero-visual">
                {use3D && (
                  <Suspense fallback={null}>
                    <SystemGraph3D />
                  </Suspense>
                )}
                {use3D === false && <HeroDiagram />}
              </div>
            )}
          </div>

          <div className="hero-right">
            <p className="hero-hello">Python Backend</p>
            <p className="hero-role" role="doc-subtitle">
              <span>Developer</span>
              <span className="hero-role-sub">Secure Systems &amp; AI Integration</span>
            </p>
            {profile.resume && (
              <a className="hero-resume mono" href={profile.resume} target="_blank" rel="noopener noreferrer">
                Resume <FileText size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <div className="hero-foot">
          <p className="hero-statement">{profile.statement}</p>
          <p className="hero-sub">{profile.subStatement}</p>
          <div className="hero-ctas">
            <a href="#projects" className="btn btn--primary">View Projects <ArrowRight size={16} aria-hidden="true" /></a>
            <a href="#contact" className="btn">Contact Me</a>
          </div>
        </div>
      </div>
    </section>
  );
}
