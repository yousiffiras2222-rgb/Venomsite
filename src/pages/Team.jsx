import { useEffect, useMemo, useState } from "react";
import { Link, useApp } from "../app-context.jsx";
import useReveal from "../hooks/useReveal.js";
import PersonCard from "../components/PersonCard.jsx";
import { SEP_REGISTRY } from "../constants.js";
import { CoraMark } from "../components/RecordBits.jsx";
import PhotoSlot from "../components/PhotoSlot.jsx";
import Icon from "../components/Icon.jsx";
import Sample from "../components/Sample.jsx";
import "./Team.css";

const FILTERS = ["all", "med", "nut", "psi"];

export default function Team() {
  const { t, lang } = useApp();
  const p = t.teamPage;
  const [filter, setFilter] = useState("all");
  // The medical director leads the directory: accountability first.
  const people = useMemo(() => {
    const ordered = [...t.people].sort((a, b) => (b.id === "p10") - (a.id === "p10"));
    return ordered.filter((x) => filter === "all" || x.discipline === filter);
  }, [t, filter]);
  useReveal([lang]);
  useEffect(() => {
    document.title = t.meta.teamTitle;
  }, [t]);

  return (
    <main id="contenido" className="teampage">
      <section className="teampage__hero wrap" aria-labelledby="teampage-title">
        <h1 id="teampage-title" className="t-display" data-reveal>{p.h1}</h1>
        <div className="teampage__intro" data-reveal style={{ "--reveal-i": 1 }}>
          <p className="t-lead muted">{p.lead}</p>
          <p className="teampage__counts">
            <span><Sample>{p.counts}</Sample></span>
            <span className="teampage__counts-note">{p.countsNote}</span>
          </p>
        </div>
      </section>

      <section className="wrap teampage__directory" aria-label={p.filterLabel}>
        <div className="teampage__bar">
          <div className="filters" role="group" aria-label={p.filterLabel}>
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`filter filter--${f}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f !== "all" && <span className="filter__tab" aria-hidden="true" />}
                {f === "all" ? p.all : t.disciplines[f]}
                <span className="filter__count tnum">
                  {f === "all" ? t.people.length : t.people.filter((x) => x.discipline === f).length}
                </span>
              </button>
            ))}
          </div>
          <p className="teampage__tone">{p.toneNote}</p>
        </div>

        <h2 className="visually-hidden">{p.filterLabel}</h2>
        <div className="teampage__grid" aria-live="polite">
          {people.map((person) => (
            <PersonCard key={`${lang}-${person.id}`} person={person} showQuote showVerify />
          ))}
        </div>
      </section>

      <section className="teampage__how chapter" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="t-h2" data-reveal>{p.howH2}</h2>
          <ol className="how">
            {p.how.map((step, i) => (
              <li key={step.label} className="how__row" data-reveal style={{ "--reveal-i": i }}>
                <span className="how__who" aria-hidden="true">
                  {i === 0 ? <CoraMark size={40} /> : <PhotoSlot size="id" tone={i === 1 ? "sage" : "nut"} ratio="5 / 6" subject={t.people[i === 1 ? 0 : 1].title + " Nombre Apellido"} style={{ width: 40 }} />}
                </span>
                <h3 className="t-h3">{step.label}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap teampage__end">
        <div className="teampage__verify" data-reveal>
          <h2 className="t-h3">{p.verifyH}</h2>
          <p className="muted">{p.verifyText}</p>
          <a className="link-arrow" href={SEP_REGISTRY} target="_blank" rel="noreferrer">
            {p.verifyCta}
            <Icon name="external" size={18} />
          </a>
        </div>
        <div className="teampage__join" data-reveal style={{ "--reveal-i": 1 }}>
          <h2 className="t-h3">{p.joinH2}</h2>
          <p className="muted">{p.joinText}</p>
          <div className="teampage__join-actions">
            <a className="btn" href="mailto:hola@diagnostikare.com">{p.joinCta}</a>
            <Link to="/#agenda" className="link-arrow">
              {t.nav.book}
              <Icon name="arrowRight" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
