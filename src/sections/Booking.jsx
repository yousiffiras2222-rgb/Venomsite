import { useRef, useState } from "react";
import { useApp } from "../app-context.jsx";
import PhotoSlot from "../components/PhotoSlot.jsx";
import Icon from "../components/Icon.jsx";
import { WHATSAPP_URL } from "../constants.js";
import "./Booking.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Booking() {
  const { t } = useApp();
  const b = t.booking;
  const [values, setValues] = useState({ name: "", email: "", phone: "", org: "", type: "", size: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | done
  const formRef = useRef(null);
  const doneRef = useRef(null);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!values.name.trim()) er.name = b.errors.name;
    if (!EMAIL_RE.test(values.email.trim())) er.email = b.errors.email;
    if (!values.type) er.type = b.errors.type;
    return er;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    const first = Object.keys(er)[0];
    if (first) {
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("sending");
    // Mockup: no network request. A short pause stands in for the real submit.
    window.setTimeout(() => {
      setStatus("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    }, 900);
  };

  const fill = (s) => s.replace("{name}", values.name.trim().split(" ")[0]).replace("{email}", values.email.trim());

  const field = (k, label, type = "text", extra = {}) => (
    <div className={`field ${errors[k] ? "field--error" : ""}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input
        id={`f-${k}`}
        name={k}
        type={type}
        value={values[k]}
        onChange={set(k)}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        {...extra}
      />
      {errors[k] && <p className="field__error" id={`e-${k}`}>{errors[k]}</p>}
    </div>
  );

  const select = (k, label, options) => (
    <div className={`field ${errors[k] ? "field--error" : ""}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <div className="field__select">
        <select
          id={`f-${k}`}
          name={k}
          className={values[k] ? "" : "is-empty"}
          value={values[k]}
          onChange={set(k)}
          aria-invalid={errors[k] ? true : undefined}
          aria-describedby={errors[k] ? `e-${k}` : undefined}
        >
          <option value="" disabled>{b.fields.choose}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      {errors[k] && <p className="field__error" id={`e-${k}`}>{errors[k]}</p>}
    </div>
  );

  return (
    <section className="booking chapter on-forest" id="agenda" data-nav-dark aria-labelledby="booking-title">
      <div className="wrap booking__grid">
        <div className="booking__intro" data-reveal>
          <h2 id="booking-title" className="t-h2">{b.h2}</h2>
          <div className="booking__replier">
            <PhotoSlot size="id" tone="bone" ratio="5 / 6" subject={b.replierName} style={{ width: 72 }} />
            <div>
              <strong>{b.replierName}</strong>
              <span>{b.replierRole}</span>
            </div>
          </div>
          <p className="t-lead booking__lead">{b.lead}</p>
          <p className="booking__patient">
            {b.patient}{" "}
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              {b.patientLink}
              <Icon name="external" size={16} />
            </a>
          </p>
        </div>

        <div className="booking__card" data-reveal style={{ "--reveal-i": 1 }}>
          {status === "done" ? (
            <div className="booking__done" ref={doneRef} tabIndex={-1} aria-live="polite">
              <span className="booking__done-icon"><Icon name="check" size={28} /></span>
              <h3 className="t-h3">{fill(b.successTitle)}</h3>
              <p className="muted">{fill(b.successText)}</p>
              <a className="link-arrow" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                {b.successWa}
                <Icon name="external" size={16} />
              </a>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setValues({ name: "", email: "", phone: "", org: "", type: "", size: "" });
                  setStatus("idle");
                }}
              >
                {b.again}
              </button>
            </div>
          ) : (
            <form ref={formRef} className="booking__form" onSubmit={onSubmit} noValidate>
              <div className="booking__row">
                {field("name", b.fields.name, "text", { autoComplete: "name" })}
                {field("email", b.fields.email, "email", { autoComplete: "email", inputMode: "email" })}
              </div>
              <div className="booking__row">
                {field("phone", b.fields.phone, "tel", { autoComplete: "tel", inputMode: "tel", placeholder: "55 1234 5678" })}
                {field("org", b.fields.org, "text", { autoComplete: "organization" })}
              </div>
              {select("type", b.fields.type, b.types)}
              {select("size", b.fields.size, b.sizes)}
              <button className="btn booking__submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? b.sending : b.submit}
              </button>
              <p className="booking__consent">{b.consent}</p>
              <p className="booking__demo">{b.demoNote}</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
