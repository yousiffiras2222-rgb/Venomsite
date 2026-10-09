import { AppProvider, useApp } from "./app-context.jsx";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Team from "./pages/Team.jsx";

function Routes() {
  const { path } = useApp();
  return path === "/equipo" ? <Team key="team" /> : <Home key="home" />;
}

export default function App() {
  return (
    <AppProvider>
      <Nav />
      <Routes />
      <Footer />
    </AppProvider>
  );
}
