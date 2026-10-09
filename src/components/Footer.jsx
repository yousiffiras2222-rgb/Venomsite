import { Link, useApp } from "../app-context.jsx";
import Logo from "./Logo.jsx";
import { WHATSAPP_URL } from "../constants.js";
import "./Footer.css";

export default function Footer() {
  const { t } = useApp();
  const f = t.footer;
  const careLinks = ["/#como-funciona", "/equipo", "https://diagnostikare.com/soy-paciente/"];
  const orgLinks = ["/#organizaciones", "/#organizaciones", "/#organizaciones"];
  const companyLinks = ["/#impacto", "/#confianza", "https://diagnostikare.com/aviso-de-privacidad/", "https://diagnostikare.com/codigo-de-etica/"];
  const item = (label, to) =>
    to.startsWith("http") ? <a href={to}>{label}</a> : <Link to={to}>{label}</Link>;

  return (
    <footer className="footer on-forest" data-nav-dark>
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p>{f.tagline}</p>
          </div>
          <nav className="footer__cols" aria-label="Pie de página">
            <div>
              <h2>{f.colCare}</h2>
              <ul>{f.care.map((l, i) => <li key={l}>{item(l, careLinks[i])}</li>)}</ul>
            </div>
            <div>
              <h2>{f.colOrgs}</h2>
              <ul>{f.orgs.map((l, i) => <li key={l}>{item(l, orgLinks[i])}</li>)}</ul>
            </div>
            <div>
              <h2>{f.colCompany}</h2>
              <ul>{f.company.map((l, i) => <li key={l}>{item(l, companyLinks[i])}</li>)}</ul>
            </div>
            <div>
              <h2>{f.contact}</h2>
              <ul>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">{f.whatsapp}</a></li>
                <li><a href="mailto:hola@diagnostikare.com">hola@diagnostikare.com</a></li>
                <li><a href="tel:+525534789774" className="tnum">55 3478 9774</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="footer__legal">
          <p>{f.legal}</p>
          <div className="footer__base">
            <span>{f.rights}</span>
            <span className="footer__mock">{f.mock}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
