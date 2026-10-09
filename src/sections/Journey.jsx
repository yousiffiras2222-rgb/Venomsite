import { useApp } from "../app-context.jsx";
import { Attendee, CoraMark } from "../components/RecordBits.jsx";
import PhotoSlot from "../components/PhotoSlot.jsx";
import Sample from "../components/Sample.jsx";
import Icon from "../components/Icon.jsx";
import "./Journey.css";

function Bubble({ from, text }) {
  const { t } = useApp();
  const isDoctor = from === "doctor";
  return (
    <div className={`bubble bubble--${from}`}>
      {isDoctor && (
        <PhotoSlot size="id" tone="sage" ratio="1 / 1" subject={t.hero.slip.name} style={{ width: 34, borderRadius: "50%" }} />
      )}
      <div className="bubble__body">
        <span className="bubble__from">
          {isDoctor ? <Sample>{t.hero.slip.name}</Sample> : t.journey.patientLabel}
        </span>
        <p><Sample>{text}</Sample></p>
      </div>
    </div>
  );
}

function Artifact({ a }) {
  switch (a.type) {
    case "bubble":
      return <Bubble from={a.from} text={a.text} />;
    case "thread":
      return (
        <div className="thread">
          {a.items.map((m, i) => <Bubble key={i} from={m.from} text={m.text} />)}
        </div>
      );
    case "chips":
      return (
        <ul className="chips">
          {a.items.map((c) => <li key={c}>{c}</li>)}
        </ul>
      );
    case "plan":
      return (
        <ul className="plan">
          {a.items.map((c) => (
            <li key={c}><Icon name="check" size={18} />{c}</li>
          ))}
        </ul>
      );
    case "vitals":
      return (
        <dl className="vitals">
          {a.items.map(([k, v]) => (
            <div key={k}>
              <dt><Icon name="pulse" size={18} />{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      );
    default:
      return null;
  }
}

/** The relay at 07:49: CORA hands the prepared case to a named clinician. */
function Handoff({ row, j, stampKey }) {
  return (
    <div className="relay">
      <div className="relay__from">
        <CoraMark size={28} />
        <span>
          <span className="attendee__verb">{j.prepared}</span>
          <span className="relay__cora">CORA</span>
        </span>
      </div>
      <span className="relay__line" aria-hidden="true" />
      <Attendee who={row.who} stampKey={stampKey} verb={j.attended} />
    </div>
  );
}

export default function Journey() {
  const { t, lang } = useApp();
  const j = t.journey;
  return (
    <section className="journey chapter" id="como-funciona" aria-labelledby="journey-title">
      <div className="wrap journey__head">
        <h2 id="journey-title" className="t-h2" data-reveal>{j.h2}</h2>
        <div className="journey__intro" data-reveal style={{ "--reveal-i": 1 }}>
          <p className="t-lead muted">{j.lead}</p>
          <p className="journey__note t-small">{j.note}</p>
        </div>
      </div>

      <div className="wrap">
        <div className="record" role="table" aria-label={j.h2}>
          <div className="record__cols" role="row">
            <span role="columnheader">{j.colTime}</span>
            <span role="columnheader">{j.colWhat}</span>
            <span role="columnheader">{j.colWho}</span>
          </div>
          {j.rows.map((row, i) => {
            const verb = row.who.kind === "cora" ? j.prepared : j.attended;
            return (
              <div
                key={`${lang}-${i}`}
                role="row"
                className={`record__row ${row.handoff ? "record__row--handoff" : ""}`}
                data-reveal
              >
                <div role="cell" className="record__time-cell">
                  <span className="record__time tnum">{row.time}</span>
                </div>
                <div role="cell" className="record__what">
                  <h3 className="t-h3">{row.title}</h3>
                  <p className="muted">{row.text}</p>
                  <div className="record__artifact"><Artifact a={row.artifact} /></div>
                  {row.tag && <p className="record__tag">{row.tag}</p>}
                  {row.note && <p className="record__note">{row.note}</p>}
                </div>
                <div role="cell" className="record__who">
                  {row.handoff ? (
                    <Handoff row={row} j={j} stampKey={`${lang}-${i}`} />
                  ) : (
                    <Attendee who={row.who} stampKey={`${lang}-${i}`} verb={verb} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
