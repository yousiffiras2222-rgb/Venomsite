import { useApp } from "../app-context.jsx";
import PhotoSlot from "./PhotoSlot.jsx";
import { DisciplineTag } from "./RecordBits.jsx";
import Icon from "./Icon.jsx";
import Sample from "./Sample.jsx";
import { SEP_REGISTRY, personName } from "../constants.js";
import "./PersonCard.css";


/** A team member's record: portrait, name, discipline tab, cédula, a line in their own voice. */
export default function PersonCard({ person, ratio = "4 / 5", showQuote = false, showVerify = false, style, revealIndex }) {
  const { t } = useApp();
  const name = personName(person);
  return (
    <article
      className={`person person--${person.discipline}`}
      style={{ ...style, ...(revealIndex !== undefined ? { "--reveal-i": revealIndex } : {}) }}
      data-reveal={revealIndex !== undefined ? "" : undefined}
    >
      <PhotoSlot tone={person.tone} ratio={ratio} subject={name} brief={person.brief} size="sm" showSubject={false} />
      <div className="person__plate">
        <h3 className="person__name"><Sample>{name}</Sample></h3>
        <DisciplineTag kind={person.discipline}>{person.role}</DisciplineTag>
        <p className="person__license tnum">
          <Sample>{t.hero.slip.license}</Sample>
          {showVerify && (
            <a className="person__verify" href={SEP_REGISTRY} target="_blank" rel="noreferrer">
              {t.teamPage.verify}
              <Icon name="external" size={14} />
            </a>
          )}
        </p>
        {showQuote && <p className="person__quote">“{person.quote}”</p>}
      </div>
    </article>
  );
}
