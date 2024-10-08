import { useEffect, useState } from "react";
import Controlbox from "../components/Controlbox";
import Health from "../components/Health";
import "./Singleplayer.css";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Singleplayer = () => {
  const [gameTimer, setGameTimer] = useState(0);
  const [purpleLevel, setPurpleLevel] = useState(100);
  const [blackLevel, setBlackLevel] = useState(100);
  const [gameState, setGameState] = useState(true);
  const [gameText, setGameText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timerInt = setInterval(() => {
      setGameTimer((preTimer) => {
        return preTimer + 1;
      });
    }, 1000);

    if (gameTimer >= 40) {
      if (purpleLevel > blackLevel) {
        setGameText("Purple wins");
        setGameState(false);

        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        setGameText("Black wins");
        setGameState(false);

        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } else if (purpleLevel <= 0) {
      setGameText("Black wins");
      setGameState(false);

      setTimeout(() => {
        navigate("/");
      }, 5000);
    } else if (blackLevel <= 0) {
      setGameText("Purple wins");
      setGameState(false);

      setTimeout(() => {
        navigate("/");
      }, 5000);
    }

    return () => clearInterval(timerInt);
  }, [purpleLevel, blackLevel, gameTimer]);
  return (
    <>
      {gameState && (
        <div className="singleplayer-container">
          <h1>Purple</h1>
          <h1>{gameTimer}</h1>
          <Health
            purpleLevel={purpleLevel}
            blackLevel={blackLevel}
            setPurpleLevel={setPurpleLevel}
            setBlackLevel={setBlackLevel}
          />
          <Controlbox />
        </div>
      )}

      {!gameState && (
        <div className="singleplayer-container">
          <h1>{gameText}</h1>
        </div>
      )}
    </>
  );
};

export default Singleplayer;
