import { profile } from '../data/profile';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name.toUpperCase()}</p>
          <p className="footer-role">{profile.role} · {profile.focus}</p>
        </div>
        <ul className="footer-links">
          <li><a href={profile.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href={`mailto:${profile.email}`}>Email</a></li>
          <li><a href={profile.site}>Portfolio</a></li>
        </ul>
        <p className="footer-copy mono">© {new Date().getFullYear()} {profile.name}</p>
      </div>
    </footer>
  );
}
