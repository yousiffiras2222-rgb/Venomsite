import { useApp } from "../app-context.jsx";
import PhotoSlot from "./PhotoSlot.jsx";
import Stamp from "./Stamp.jsx";
import Sample from "./Sample.jsx";
import "./RecordBits.css";

/** Discipline marker: the colored tab on a record, like a booklet's edge color. */
export function DisciplineTag({ kind, children }) {
  const { t } = useApp();
  return (
    <span className={`dtag dtag--${kind}`}>
      <span className="dtag__tab" aria-hidden="true" />
      {children || t.disciplines[kind]}
    </span>
  );
}

/** CORA's own mark: small, violet, never larger than a person. */
export function CoraMark({ size = 40 }) {
  return (
    <span className="cora-mark" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24" width={size * 0.5} height={size * 0.5}>
        <path d="M15.6 7.4a5.2 5.2 0 1 0 0 9.2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="16.8" cy="12" r="1.9" fill="currentColor" />
      </svg>
    </span>
  );
}

/** "Atendió" block: who signed this entry. */
export function Attendee({ who, compact = false, stampKey, verb }) {
  const { t } = useApp();
  if (who.kind === "cora") {
    return (
      <div className="attendee attendee--cora">
        <CoraMark size={compact ? 34 : 40} />
        <div className="attendee__text">
          {verb && <span className="attendee__verb">{verb}</span>}
          <span className="attendee__name">{who.name}</span>
          <span className="attendee__role">{who.role}</span>
        </div>
      </div>
    );
  }
  const tone = who.kind === "nut" ? "nut" : who.kind === "psi" ? "psi" : "sage";
  return (
    <div className={`attendee attendee--${who.kind}`}>
      <PhotoSlot size="id" tone={tone} ratio="5 / 6" subject={who.name} style={{ width: compact ? 40 : 52 }} />
      <div className="attendee__text">
        {verb && <span className="attendee__verb">{verb}</span>}
        <span className="attendee__name"><Sample>{who.name}</Sample></span>
        <span className="attendee__role">
          <DisciplineTag kind={who.kind}>{who.role}</DisciplineTag>
        </span>
        {who.license && <span className="attendee__license tnum"><Sample>{who.license}</Sample></span>}
      </div>
      {who.stamp && (
        <Stamp key={stampKey} className="attendee__stamp" top={t.hero.slip.stamp} bottom={t.hero.slip.stampSub} size={92} />
      )}
    </div>
  );
}

/** The hero's record slip: one signed entry from today. */
export function RecordSlip() {
  const { t } = useApp();
  const s = t.hero.slip;
  return (
    <article className="slip" aria-label={`${s.attendedBy}: ${s.name}, ${s.role}`}>
      <header className="slip__head">
        <span className="slip__when tnum">{s.when}</span>
        <span className="slip__sample">{t.sample}</span>
      </header>
      <div className="slip__who">
        <PhotoSlot size="id" tone="sage" ratio="5 / 6" subject={s.name} style={{ width: 64 }} />
        <div>
          <span className="slip__label">{s.attendedBy}</span>
          <strong className="slip__name"><Sample>{s.name}</Sample></strong>
          <span className="slip__role">
            <DisciplineTag kind="med">{s.role}</DisciplineTag>
          </span>
          <span className="slip__license tnum"><Sample>{s.license}</Sample></span>
        </div>
      </div>
      <dl className="slip__rows">
        <dt>{s.reasonLabel}</dt>
        <dd>{s.reason}</dd>
      </dl>
      <Stamp className="slip__stamp" top={s.stamp} bottom={s.stampSub} size={108} />
    </article>
  );
}
