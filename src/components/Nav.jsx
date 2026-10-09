import { useEffect, useRef, useState } from "react";
import { Link, useApp } from "../app-context.jsx";
import Logo from "./Logo.jsx";
import Icon from "./Icon.jsx";
import { PATIENT_URL } from "../constants.js";
import "./Nav.css";


export function LangToggle({ className = "" }) {
  const { lang, setLang, t } = useApp();
  return (
    <div className={`lang ${className}`} role="group" aria-label={t.nav.langLabel}>
      {["es", "en"].map((l) => (
        <button
          key={l}
          type="button"
          className="lang__btn"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t, path } = useApp();
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtn = useRef(null);

  // Tone follows whatever sits under the bar: forest chapters flip it dark.
  useEffect(() => {
    const check = () => {
      const probeY = 30;
      const darkEls = document.querySelectorAll("[data-nav-dark]");
      let isDark = false;
      darkEls.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) isDark = true;
      });
      setDark(isDark);
      setScrolled(window.scrollY > 4);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [path]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const links = [
    { to: "/equipo", label: t.nav.team, current: path === "/equipo" },
    { to: "/#como-funciona", label: t.nav.how },
    { to: "/#impacto", label: t.nav.impact },
    { to: "/#organizaciones", label: t.nav.orgs },
  ];
  const close = () => setOpen(false);

  return (
    <>
      <a className="skip-link" href="#contenido">{t.nav.skip}</a>
      <header className={`nav ${dark && !open ? "nav--dark" : ""} ${scrolled ? "nav--scrolled" : ""} ${open ? "nav--open" : ""}`}>
        <div className="nav__bar wrap">
          <Link to="/" className="nav__logo" aria-label="Diagnostikare, inicio" onClick={close}>
            <Logo />
          </Link>
          <nav className="nav__links" aria-label="Principal">
            {links.map((l) => (
              <Link key={l.to} to={l.to} aria-current={l.current ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="nav__actions">
            <LangToggle className="nav__lang" />
            <a className="nav__patient" href={PATIENT_URL}>{t.nav.patient}</a>
            <Link to="/#agenda" className={`btn btn--small ${dark && !open ? "btn--light" : ""}`}>
              {t.nav.book}
            </Link>
            <button
              ref={menuBtn}
              type="button"
              className="nav__menu"
              aria-expanded={open}
              aria-controls="nav-sheet"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} size={24} />
              <span className="visually-hidden">{open ? t.nav.close : t.nav.menu}</span>
            </button>
          </div>
        </div>
        <div id="nav-sheet" className="nav__sheet" hidden={!open}>
          <nav className="wrap nav__sheet-links" aria-label="Móvil">
            <a href={PATIENT_URL} className="nav__sheet-patient">{t.nav.patient}</a>
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={close} aria-current={l.current ? "page" : undefined}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="wrap nav__sheet-foot">
            <LangToggle />
            <Link to="/#agenda" className="btn" onClick={close}>{t.nav.book}</Link>
          </div>
        </div>
      </header>
    </>
  );
}
