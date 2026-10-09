import { useEffect } from "react";
import { useApp } from "../app-context.jsx";
import useReveal from "../hooks/useReveal.js";
import Hero from "../sections/Hero.jsx";
import CareTeam from "../sections/CareTeam.jsx";
import Journey from "../sections/Journey.jsx";
import Impact from "../sections/Impact.jsx";
import TrustStrip from "../sections/TrustStrip.jsx";
import Organizations from "../sections/Organizations.jsx";
import Booking from "../sections/Booking.jsx";

// Story order: people lead, technology supports.
// Hero (a clinician) → the team → one patient's morning (CORA inside it)
// → impact with a face → one quiet trust strip → organizations → who replies.
export default function Home() {
  const { t, lang } = useApp();
  useReveal([lang]);
  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);
  return (
    <main id="contenido">
      <Hero />
      <CareTeam />
      <Journey />
      <Impact />
      <TrustStrip />
      <Organizations />
      <Booking />
    </main>
  );
}
