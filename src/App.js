import MainPage from "./pages/MainPage";
import { PlayerContext } from "./context/player-context";
import Singleplayer from "./pages/Singleplayer";
import MultiPlayer from "./pages/Multiplayer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import "./App.css";

const App = () => {
  const [isPlayer, setIsPlayer] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const allowPlayer = useCallback(() => {
    setIsPlayer(true);
  });
  const denyPlayer = useCallback(() => {
    setIsPlayer(false);
  });
  let routes;

  if (isLoggedIn && isPlayer) {
    routes = (
      <Routes>
        <Route
          path="/"
          element={
            <MainPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route path="/singleplayer" Component={Singleplayer} />
        <Route path="/multiplayer" Component={MultiPlayer} />
      </Routes>
    );
  } else if (isLoggedIn && !isPlayer) {
    routes = (
      <Routes>
        <Route
          path="/"
          element={
            <MainPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route
          path="/"
          element={
            <MainPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          }
        />
      </Routes>
    );
  }
  return (
    <PlayerContext.Provider
      value={{
        isPlayer: isPlayer,
        allowPlayer: allowPlayer,
        denyPlayer: denyPlayer,
      }}
    >
      <Router>{routes}</Router>
    </PlayerContext.Provider>
  );
};

export default App;
