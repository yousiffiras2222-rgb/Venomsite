import { useApp } from "../app-context.jsx";
import PhotoSlot from "../components/PhotoSlot.jsx";
import Sample from "../components/Sample.jsx";
import "./Impact.css";

// The number and the person land together: the 89% statement and the face share the first screen.
export default function Impact() {
  const { t } = useApp();
  const m = t.impact;
  return (
    <section className="impact chapter on-forest" id="impacto" data-nav-dark aria-labelledby="impact-title">
      <div className="wrap impact__grid">
        <div className="impact__numbers">
          <h2 id="impact-title" className="t-statement impact__statement" data-reveal>
            <span className="impact__num tnum">{m.number}</span> {m.statement}
          </h2>
          <p className="impact__source" data-reveal style={{ "--reveal-i": 1 }}>
            <span className="impact__source-tag">60 Decibels</span>
            {m.source}
          </p>
          <div className="impact__ledger" data-reveal style={{ "--reveal-i": 2 }}>
            <dl>
              {m.rows.map((r) => (
                <div className="impact__row" key={r.label}>
                  <dt className="impact__value tnum">{r.value}</dt>
                  <dd className="impact__label">{r.label}</dd>
                  <dd className="impact__src">
                    <span className="visually-hidden">{m.sourceLabel}: </span>{r.source}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="impact__gender">{m.gender}</p>
          </div>
        </div>

        <figure className="impact__story" data-reveal style={{ "--reveal-i": 1 }}>
          <PhotoSlot tone="forest2" ratio="4 / 5" subject={m.story.subject} brief={m.story.brief} size="md" />
          <figcaption>
            <blockquote className="impact__template"><Sample>{m.story.template}</Sample></blockquote>
            <p className="impact__byline"><Sample>{m.story.byline}</Sample></p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
