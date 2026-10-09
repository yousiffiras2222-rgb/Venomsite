import { useApp } from "../app-context.jsx";
import "./PhotoSlot.css";

/**
 * A designed absence: a flat, untinted field the size of the real photograph,
 * with frame ticks and a typed shot brief. Swap for <img> when the client
 * delivers real photography; the brief doubles as the shoot's shot list.
 */
export default function PhotoSlot({
  tone = "sage",
  ratio = "4 / 5",
  subject,
  brief,
  size = "md",
  showSubject = true,
  className = "",
  style,
  children,
}) {
  const { t } = useApp();
  const label = [t.photo, subject, brief].filter(Boolean).join(". ");
  return (
    <figure
      className={`slot slot--${tone} slot--${size} ${className}`}
      style={{ aspectRatio: `var(--slot-ratio, ${ratio})`, ...style }}
      role="img"
      aria-label={label}
    >
      <span className="slot__ticks" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      {size !== "id" && (
        <figcaption className="slot__cap" aria-hidden="true">
          <span className="slot__label">
            <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
              <path d="M2.5 5.5v-3h3M10.5 2.5h3v3M13.5 10.5v3h-3M5.5 13.5h-3v-3" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {t.photo}
          </span>
          {subject && showSubject && <span className="slot__subject">{subject}</span>}
          {brief && <span className="slot__brief">{brief}</span>}
        </figcaption>
      )}
      {size === "id" && (
        <span className="slot__id" aria-hidden="true">{t.photo}</span>
      )}
      {children}
    </figure>
  );
}
