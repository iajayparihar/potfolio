import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/profile';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container contact-inner">
        <p className="eyebrow" data-reveal><b>09</b> Contact</p>
        <h2 id="contact-title" className="contact-title" data-reveal style={{ '--d': 1 }}>
          Let's build <span>reliable systems.</span>
        </h2>
        <p className="contact-copy" data-reveal style={{ '--d': 2 }}>
          Interested in backend architecture, secure APIs, AI integration, or building a complex product from the ground up?
        </p>

        <div className="contact-email" data-reveal style={{ '--d': 3 }}>
          <a href={`mailto:${profile.email}`} className="mono">{profile.email}</a>
          <button type="button" className="btn btn--sm" onClick={copy} aria-label="Copy email address">
            {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <span className="sr-only" aria-live="polite">{copied ? 'Email address copied' : ''}</span>
        </div>

        <div className="contact-ctas" data-reveal style={{ '--d': 4 }}>
          <a className="btn btn--primary" href={`mailto:${profile.email}`}><Mail size={16} aria-hidden="true" /> Email Me</a>
          <a className="btn" href={profile.social.github} target="_blank" rel="noopener noreferrer">
            <Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={14} className="ext" aria-hidden="true" />
          </a>
          <a className="btn" href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={14} className="ext" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
