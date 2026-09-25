import { signals } from '../data/profile';

// Engineering capability markers. The list is duplicated for a seamless marquee; the copy is aria-hidden.
export default function SignalsStrip() {
  return (
    <section className="signals" aria-label="Core technologies">
      <div className="signals-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="signals-list" aria-hidden={copy === 1 || undefined}>
            {signals.map((s) => (
              <li key={s}><span className="signals-tick" aria-hidden="true" />{s}</li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
