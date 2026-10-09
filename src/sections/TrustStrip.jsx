import { useApp } from "../app-context.jsx";
import Sample from "../components/Sample.jsx";
import "./TrustStrip.css";

/** One quiet strip in place of three logo walls. */
export default function TrustStrip() {
  const { t } = useApp();
  return (
    <section className="trust" id="confianza" aria-label={t.trust.rows.map((r) => r.label).join(", ")}>
      <div className="wrap">
        <p className="trust__intro" data-reveal>
          {t.trust.intro} <span className="src-tag"><Sample>{t.trust.introSource}</Sample></span>
        </p>
        <dl className="trust__rows" data-reveal style={{ "--reveal-i": 1 }}>
          {t.trust.rows.map((row) => (
            <div key={row.label} className="trust__row">
              <dt>{row.label}</dt>
              <dd>
                <ul>
                  {row.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
