import { useApp } from "../app-context.jsx";
import Icon from "../components/Icon.jsx";
import "./Organizations.css";

export default function Organizations() {
  const { t } = useApp();
  const o = t.orgs;
  return (
    <section className="orgs chapter" id="organizaciones" aria-labelledby="orgs-title">
      <div className="wrap">
        <div className="orgs__head">
          <h2 id="orgs-title" className="t-h2" data-reveal>{o.h2}</h2>
          <p className="t-lead muted" data-reveal style={{ "--reveal-i": 1 }}>{o.lead}</p>
        </div>

        <ul className="orgs__rows">
          {o.rows.map((r, i) => (
            <li key={r.label} className="orgs__row" data-reveal style={{ "--reveal-i": i }}>
              <h3 className="t-h3">{r.label}</h3>
              <div>
                <p>{r.text}</p>
                {r.detail && <p className="orgs__detail">{r.detail}</p>}
              </div>
            </li>
          ))}
        </ul>

        <dl className="orgs__privacy" data-reveal>
          <div>
            <dt><Icon name="eye" size={24} />{o.seesTitle}</dt>
            <dd>{o.sees}</dd>
          </div>
          <div>
            <dt><Icon name="eyeOff" size={24} />{o.neverTitle}</dt>
            <dd>{o.never}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
