import { Link } from "react-router-dom";
import { PlayerContext } from "../context/player-context";
import { useContext, useEffect } from "react";

import "./Playlist.css";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Playlist = (props) => {
  const playerAuth = useContext(PlayerContext);
  useEffect(() => {
    const timerAv = setTimeout(checkIfAvailable, 50);
    return () => clearTimeout(timerAv);
  }, []);

  const checkIfAvailable = async () => {
    const response = await fetch(`${apiBaseUrl}/available`);
    const response_data = await response.json();
    if (response.ok) {
      console.log(response_data);
      if (response_data.available == true) {
        playerAuth.allowPlayer();
        console.log("auth is set to true");
      } else {
        playerAuth.denyPlayer();
      }
    } else {
      console.log("could not reach backend");
    }
  };
  const singlePlayerHandler = async () => {
    checkIfAvailable();
    const response = await fetch(`${apiBaseUrl}/start/single`);

    const response_data = await response.json();
    if (response.ok) {
      // console.log(response_data.from_backend);
    } else {
      console.log("error could not reach backend");
    }
  };
  const dualAIHandler = async () => {
    checkIfAvailable();
    const response = await fetch(`${apiBaseUrl}/start/dual`);

    const response_data = await response.json();
    if (response.ok) {
      // console.log(response_data.from_backend);
    } else {
      console.log("error could not reach backend");
    }
  };

  const multiplayerHandler = async () => {
    checkIfAvailable();
    const response = await fetch(`${apiBaseUrl}/start/multi`);

    const response_data = await response.json();
    if (response.ok) {
      // console.log(response_data.from_backend);
    } else {
      console.log("error could not reach backend");
    }
  };
  return (
    <div className="playlist-container">
      <div className="playlist-container-items">
        <div>
          <Link to="/singleplayer">
            <button id="sbtn" onClick={singlePlayerHandler}>
              Singleplayer
            </button>
          </Link>
        </div>
        <div>
          <Link to="/multiplayer">
            <button onClick={multiplayerHandler}>Multiplayer</button>
          </Link>
        </div>
        <div>
          <Link to="/dual">
            <button onClick={dualAIHandler}>Dual AI</button>
          </Link>
        </div>
        <div>
          <button onClick={props.logoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
