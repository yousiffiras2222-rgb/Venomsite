import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import es from "./content/es.js";
import en from "./content/en.js";

const dictionaries = { es, en };
const AppContext = createContext(null);

function readStoredLang() {
  try {
    const v = window.localStorage.getItem("dk-lang");
    return v === "en" || v === "es" ? v : null;
  } catch {
    return null;
  }
}

function normalizePath(p) {
  if (p.startsWith("/equipo") || p.startsWith("/team")) return "/equipo";
  return "/";
}

export function AppProvider({ children }) {
  const [lang, setLangState] = useState(() => readStoredLang() || "es");
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  const setLang = useCallback((next) => {
    setLangState(next);
    try { window.localStorage.setItem("dk-lang", next); } catch { /* private mode: keep in memory */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "es" ? "es-MX" : "en";
  }, [lang]);

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    const [target, hash] = to.split("#");
    const nextPath = normalizePath(target || window.location.pathname);
    if (nextPath !== normalizePath(window.location.pathname)) {
      window.history.pushState({}, "", nextPath + (hash ? `#${hash}` : ""));
      setPath(nextPath);
      window.scrollTo({ top: 0, behavior: "instant" });
      if (hash) requestAnimationFrame(() => requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ block: "start" });
      }));
    } else if (hash) {
      window.history.pushState({}, "", nextPath + `#${hash}`);
      document.getElementById(hash)?.scrollIntoView({ block: "start" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang], path, navigate }), [lang, setLang, path, navigate]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  return useContext(AppContext);
}

/** In-app link: real href for crawlers and new tabs, client-side navigation on click. */
export function Link({ to, children, onClick, ...rest }) {
  const { navigate } = useApp();
  return (
    <a
      href={to}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
