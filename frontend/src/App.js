import { useEffect, useState } from 'react';
import { navItems } from './data/profile';
import Navigation from './components/Navigation';
import Cursor from './components/Cursor';
import Hero from './components/hero/Hero';
import SignalsStrip from './components/SignalsStrip';
import About from './components/About';
import Experience from './components/Experience';
import FeaturedProjects from './components/FeaturedProjects';
import AIEngineering from './components/AIEngineering';
import Security from './components/Security';
import Architecture from './components/Architecture';
import Constellation from './components/Constellation';
import MoreProjects from './components/MoreProjects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Sections without their own nav item highlight the closest one.
const NAV_ALIAS = { stack: 'architecture', 'more-projects': 'projects' };

// Decorative CSS loops only run while on screen (see .loop in base.css).
function useLoopVisibility() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle('is-playing', e.isIntersecting)));
    document.querySelectorAll('.loop').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(NAV_ALIAS[e.target.id] || e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    [...navItems.map((n) => n.id), ...Object.keys(NAV_ALIAS)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

export default function App() {
  useScrollReveal();
  useLoopVisibility();
  const active = useActiveSection();

  return (
    <div className="page">
      <a className="skip-link" href="#main">Skip to content</a>
      <Cursor />
      <Navigation active={active} />
      <main id="main">
        <Hero />
        <SignalsStrip />
        <About />
        <Experience />
        <FeaturedProjects />
        <AIEngineering />
        <Security />
        <Architecture />
        <Constellation />
        <MoreProjects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
