// One authored icon set: 24px grid, 1.75 stroke, round joins.
const paths = {
  arrowRight: <path d="M5 12h13M13 6l6 6-6 6" />,
  external: <path d="M8 16 17 7M9.5 7H17v7.5" />,
  check: <path d="m5 12.5 4.2 4.2L19 7" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  video: (
    <>
      <rect x="3" y="6.5" width="12.5" height="11" rx="2.5" />
      <path d="m15.5 10.5 5-3v9l-5-3" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.75" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M10 5.8A9.7 9.7 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a17 17 0 0 1-2.7 3.4M6.2 7.4A16.6 16.6 0 0 0 2.5 12S6 18.5 12 18.5c1.6 0 3-.4 4.3-1.1" />
      <path d="M4 4l16 16" />
    </>
  ),
  chat: <path d="M4.5 18.5 5.6 15A7.5 7.5 0 1 1 9 18.1l-4.5.4Z" />,
  pulse: <path d="M3 12h4l2.2-5 3.6 10 2.2-5H21" />,
};

export default function Icon({ name, size = 20, className = "", label }) {
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      {paths[name]}
    </svg>
  );
}
