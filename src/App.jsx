import { useCallback, useEffect, useState } from "react";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./App.css";

const ROUTES = {
  home: "/",
  game: "/juego",
};

function getCurrentRoute() {
  return window.location.pathname === ROUTES.game ? ROUTES.game : ROUTES.home;
}

export default function App() {
  const [route, setRoute] = useState(getCurrentRoute);

  useEffect(() => {
    const handlePopState = () => setRoute(getCurrentRoute());

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((nextRoute) => {
    window.history.pushState({}, "", nextRoute);
    setRoute(getCurrentRoute());
  }, []);

  if (route === ROUTES.game) {
    return <Game onBack={() => navigate(ROUTES.home)} />;
  }

  return <Home onStart={() => navigate(ROUTES.game)} />;
}
