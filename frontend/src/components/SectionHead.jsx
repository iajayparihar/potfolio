export default function SectionHead({ index, label, title, lede, id }) {
  return (
    <header className="section-head">
      <p className="eyebrow" data-reveal><b>{index}</b> {label}</p>
      <h2 className="section-title" id={id} data-reveal style={{ '--d': 1 }}>{title}</h2>
      {lede && <p className="section-lede" data-reveal style={{ '--d': 2 }}>{lede}</p>}
    </header>
  );
}
