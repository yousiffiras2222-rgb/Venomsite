import { useId } from "react";

/**
 * The rubber stamp a clinician leaves on a record. Uppercase is the stamp's
 * own grammar. Rendered in green ink, slightly rotated, like a real "sello".
 */
export default function Stamp({ top = "ATENDIDO", bottom = "DIAGNOSTIKARE", className = "", size = 104 }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className={`stamp ${className}`}
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
    >
      <defs>
        <path id={`${id}-t`} d="M 22 60 A 38 38 0 0 1 98 60" />
        <path id={`${id}-b`} d="M 18 60 A 42 42 0 0 0 102 60" />
      </defs>
      <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="60" cy="60" r="47.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="60" cy="60" r="27" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text fontSize="11.5" fontWeight="700" letterSpacing="2.6" fill="currentColor" fontFamily="var(--font)">
        <textPath href={`#${id}-t`} startOffset="50%" textAnchor="middle">{top.toUpperCase()}</textPath>
      </text>
      <text fontSize="8.5" fontWeight="700" letterSpacing="2.2" fill="currentColor" fontFamily="var(--font)">
        <textPath href={`#${id}-b`} startOffset="50%" textAnchor="middle" dominantBaseline="hanging">{bottom.toUpperCase()}</textPath>
      </text>
      <path d="m47 60.5 9 9 17.5-19" fill="none" stroke="currentColor" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
