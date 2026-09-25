import { useEffect, useState } from 'react';
import { Menu, X, FileText, ArrowUpRight } from 'lucide-react';
import { navItems, profile } from '../data/profile';

export default function Navigation({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar?.style.setProperty('--p', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
        setScrolled(window.scrollY > 8);
      });
    };
    // No initial call: reading scrollHeight on mount forces a full-page layout during load.
    if (window.scrollY > 8) onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize); };
  }, [open]);

  return (
    <>
      <div id="scroll-progress" className="progress" aria-hidden="true" />
      <header className={`nav ${scrolled || open ? 'is-scrolled' : ''}`}>
        <nav className="container nav-inner" aria-label="Primary">
          <a href="#home" className="brand" aria-label={`${profile.name} — home`}>
            <span className="brand-mark" aria-hidden="true">AP</span>
            <span className="brand-name">{profile.name}</span>
          </a>

          <ul className="nav-links">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} className="nav-link" aria-current={active === id ? 'true' : undefined}>{label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            {profile.resume ? (
              <a className="btn btn--sm" href={profile.resume} target="_blank" rel="noopener noreferrer">
                <FileText size={14} aria-hidden="true" /> Resume
              </a>
            ) : (
              <a className="btn btn--sm" href={profile.social.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight size={14} className="ext" aria-hidden="true" />
              </a>
            )}
            <button
              className="nav-toggle"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div id="mobile-menu" className="mobile-menu">
          <ul>
            {navItems.map(({ id, label }, i) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? 'true' : undefined}>
                  {label} <span>{String(i + 1).padStart(2, '0')}</span>
                </a>
              </li>
            ))}
            {profile.resume && (
              <li><a href={profile.resume} target="_blank" rel="noopener noreferrer">Resume <span>PDF</span></a></li>
            )}
          </ul>
        </div>
      )}
    </>
  );
}
