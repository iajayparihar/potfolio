// Illustrative, CSS-animated miniature of the Scribble Addaa game loop (not live data).
const chat = [
  { who: 'riya', text: 'house?' },
  { who: 'dev', text: 'boat' },
  { who: 'sam', text: 'sailboat', ok: true },
];

export default function ScribbleSim() {
  return (
    <figure className="sim loop" aria-label="Illustration of the game: a shared room with a drawing canvas, timer and guess chat">
      <div className="sim-bar mono" aria-hidden="true">
        <span className="sim-room">room · K7Q2</span>
        <span className="sim-timer"><span className="sim-timer-fill" /></span>
        <span>round 2/3</span>
      </div>
      <div className="sim-body" aria-hidden="true">
        <div className="sim-canvas">
          <svg viewBox="0 0 200 130">
            <path className="sim-stroke s1" d="M30 95 L170 95 L150 115 L50 115 Z" />
            <path className="sim-stroke s2" d="M100 95 L100 20" />
            <path className="sim-stroke s3" d="M100 25 L150 85 L100 85" />
            <path className="sim-stroke s4" d="M96 30 L60 85 L96 85" />
            <path className="sim-stroke s5" d="M10 122 Q30 116 50 122 T90 122 T130 122 T170 122 T195 122" />
          </svg>
          <span className="sim-word mono">_ _ _ _ _ _ _ _</span>
        </div>
        <ul className="sim-chat">
          {chat.map((c, i) => (
            <li key={i} className={c.ok ? 'is-ok' : ''} style={{ '--i': i }}>
              <b>{c.who}</b> {c.ok ? 'guessed the word!' : c.text}
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mono">illustrative preview · realtime over socket.io</figcaption>
    </figure>
  );
}
