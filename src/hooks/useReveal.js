import { useEffect } from "react";

/**
 * Calm, once-only scroll reveals. Content renders visible; the `js-motion`
 * class on <html> opts elements with [data-reveal] into the fade-rise, and
 * reduced motion keeps it to a short opacity change (see base.css).
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-motion");
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
