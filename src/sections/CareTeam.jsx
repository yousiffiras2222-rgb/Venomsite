import { Link, useApp } from "../app-context.jsx";
import PersonCard from "../components/PersonCard.jsx";
import { SEP_REGISTRY } from "../constants.js";
import Icon from "../components/Icon.jsx";
import "./CareTeam.css";

// Lineup order and heights: varied like a real group of people, not a card grid.
const LINEUP = [
  { id: "p1", ratio: "4 / 5.4" },
  { id: "p2", ratio: "4 / 4.7" },
  { id: "p4", ratio: "4 / 5.6" },
  { id: "p3", ratio: "4 / 4.9" },
  { id: "p7", ratio: "4 / 4.5" },
];

export default function CareTeam() {
  const { t } = useApp();
  const byId = Object.fromEntries(t.people.map((p) => [p.id, p]));
  return (
    <section className="team chapter" id="equipo" aria-labelledby="team-title">
      <div className="wrap team__head">
        <h2 id="team-title" className="t-h2" data-reveal>{t.team.h2}</h2>
        <p className="t-lead muted team__lead" data-reveal style={{ "--reveal-i": 1 }}>{t.team.lead}</p>
      </div>

      <div className="team__lineup-scroller" role="region" aria-label={t.team.h2} tabIndex={0}>
        <div className="wrap team__lineup">
          {LINEUP.map((item, i) => (
            <PersonCard key={item.id} person={byId[item.id]} ratio={item.ratio} revealIndex={i} />
          ))}
        </div>
      </div>

      <div className="wrap team__voice">
        <figure className="team__quote" data-reveal>
          <blockquote className="t-statement">“{t.team.quote}”</blockquote>
          <figcaption>
            <span className="team__quote-by">{t.team.quoteBy}</span>
            <span className="team__tone">{t.team.toneNote}</span>
          </figcaption>
        </figure>
        <div className="team__links" data-reveal style={{ "--reveal-i": 1 }}>
          <Link to="/equipo" className="link-arrow">
            {t.team.all}
            <Icon name="arrowRight" size={18} />
          </Link>
          <a className="link-arrow" href={SEP_REGISTRY} target="_blank" rel="noreferrer">
            {t.team.verify}
            <Icon name="external" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
