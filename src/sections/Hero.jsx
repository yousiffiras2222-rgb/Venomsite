import { Link, useApp } from "../app-context.jsx";
import { RecordSlip } from "../components/RecordBits.jsx";
import PhotoSlot from "../components/PhotoSlot.jsx";
import Sample from "../components/Sample.jsx";
import Icon from "../components/Icon.jsx";
import { WHATSAPP_URL } from "../constants.js";
import "./Hero.css";

export default function Hero() {
  const { t } = useApp();
  const h = t.hero;
  return (
    <section className="hero" data-nav-dark aria-labelledby="hero-title">
      <div className="hero__field" aria-hidden="true" />

      <div className="hero__inner wrap">
        <div className="hero__copy">
          <h1 id="hero-title" className="t-display hero__title">{h.h1}</h1>
          <p className="t-lead hero__lead">{h.lead}</p>
          <div className="hero__actions">
            <Link to="/#agenda" className="btn btn--light">{h.cta}</Link>
            <Link to="/equipo" className="hero__team-link">{h.ctaTeam}</Link>
          </div>
          <p className="hero__patient">
            {h.patientLine}{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              {h.patientLink}
              <Icon name="external" size={15} />
            </a>
          </p>
          <p className="hero__since t-small">
            {h.since} <span className="src-tag"><Sample>{h.sinceSource}</Sample></span>
          </p>
        </div>

        {/* The clinician's moment: a framed photo slot, with today's signed entry overlapping it */}
        <div className="hero__visual">
          <PhotoSlot className="hero__photo" tone="forest2" ratio="4 / 5" subject={h.photo.subject} brief={h.photo.brief} />
          <div className="hero__slip">
            <RecordSlip />
          </div>
        </div>
      </div>
    </section>
  );
}
