import { useState, useEffect } from "react";
import Controlbox from "../components/Controlbox";
import Health from "../components/Health";
import "./Multiplayer.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
import { useNavigate } from "react-router-dom";
//1 is black    2 is purple
const Multiplayer = () => {
  const [lowerText, setLowerText] = useState("Waiting");
  const [selectState, setSelectState] = useState(false);
  const [pickedSide, setPickedSide] = useState(0);
  const [textPlace, setTextPlace] = useState(0);
  const [purpleLevel, setPurpleLevel] = useState(100);
  const [blackLevel, setBlackLevel] = useState(100);
  const [gameTimer2, setGameTimer2] = useState(0);
  const [gameState, setGameState] = useState(true);
  const [gameText, setGameText] = useState("");
  const navigate = useNavigate();
  let prev = 0;

  useEffect(() => {
    if (purpleLevel <= 0) {
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
    const aliveTime = setInterval(async () => {
      if (pickedSide == 1) {
        if (prev == 2) {
          setTimeout(async () => {
            const response = await fetch(`${apiBaseUrl}/black/alive`);
            const response_data = await response.json();

            if (response.ok) {
              console.log("Black is: " + response_data.state);
              prev = 1;
            }
          }, 1500);
        } else {
          const response = await fetch(`${apiBaseUrl}/black/alive`);
          const response_data = await response.json();

          if (response.ok) {
            console.log("Black is: " + response_data.state);
            prev = 1;

            const response2 = await fetch(`${apiBaseUrl}/alive/states`);
            const response2_data = await response2.json();
            if (response2.ok) {
              console.log(response2_data);
              if (response2_data.purple && response2_data.black) {
                setSelectState(true);
              }
            }
          }
        }
      } else if (pickedSide == 2) {
        if (prev == 1) {
          setTimeout(async () => {
            const response = await fetch(`${apiBaseUrl}/purple/alive`);
            const response_data = await response.json();

            if (response.ok) {
              console.log("Purple is: " + response_data.state);
              prev = 2;
              const response2 = await fetch(`${apiBaseUrl}/alive/states`);
              const response2_data = await response2.json();
              if (response2.ok) {
                if (response2_data.purple && response2_data.black) {
                  setSelectState(true);
                }
              }
            }
          }, 1500);
        } else {
          const response = await fetch(`${apiBaseUrl}/purple/alive`);
          const response_data = await response.json();
          if (response.ok) {
            console.log("Purple is: " + response_data.state);
            prev = 2;

            const response2 = await fetch(`${apiBaseUrl}/alive/states`);
            const response2_data = await response2.json();
            if (response2.ok) {
              if (response2_data.purple && response2_data.black) {
                setSelectState(true);
              }
            }
          }
        }
      }
    }, 5500);

    let tim2Int;
    if (selectState == true) {
      tim2Int = setInterval(() => {
        setGameTimer2((preTimer) => {
          return preTimer + 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(aliveTime);
      clearInterval(tim2Int);
    };
  }, [pickedSide, purpleLevel, blackLevel, gameTimer2]);
  const reservePlayer = async (event) => {
    const response = await fetch(`${apiBaseUrl}/alive/states`);
    let blackState;
    let purpleState;
    const response_data = await response.json();
    if (response.ok) {
      purpleState = response_data.purple;
      blackState = response_data.black;
    }
    if (event.target.id == "blackPlayer") {
      //1. reserve the black player by sending request to backend
      //2. check if player 2 is available continuously by sending request to backend
      //3. change the structure of the screen and wait for second player
      //4. open the control box and start the game
      setTextPlace(1);
      if (!blackState) {
        setPickedSide(1);
        if (purpleState) {
          // setSelectState(true);
        } else {
          setLowerText(
            "connected as Black successfully waiting for Purple to join.."
          );
        }
      } else {
        setLowerText("Black is already taken");
      }
    } else if (event.target.id == "purplePlayer") {
      setTextPlace(2);
      if (!purpleState) {
        setPickedSide(2);
        if (blackState) {
          //setSelectState(true);
        } else {
          setLowerText(
            "connected as Purple successfully waiting for Black to join.."
          );
        }
      } else {
        setLowerText("Purple is already taken");
      }
    }
  };

  let selection_components;
  selection_components = (
    <div className="multiplayer-container">
      <div className="multiplayer-container__select">
        <div
          onClick={reservePlayer}
          id="blackPlayer"
          className={`multiplayer-container__select-1 ${
            pickedSide == 1 && "picked-player"
          } ${pickedSide == 2 && "unpicked-player"}`}
        >
          <h1>Black</h1>
          {textPlace == 1 && <p>{lowerText}</p>}
        </div>
        <div
          onClick={reservePlayer}
          id="purplePlayer"
          className={`multiplayer-container__select-2 ${
            pickedSide == 2 && "picked-player"
          } ${pickedSide == 1 && "unpicked-player"}`}
        >
          <h1>Purple</h1>
          {textPlace == 2 && <p>{lowerText}</p>}
        </div>
      </div>
    </div>
  );
  return (
    <div className="multiplayer-container">
      {gameState && !selectState && selection_components}
      {gameState && selectState && (
        <>
          <h1>{pickedSide == 1 ? "Black" : "Purple"}</h1>
          <Health
            purpleLevel={purpleLevel}
            blackLevel={blackLevel}
            setPurpleLevel={setPurpleLevel}
            setBlackLevel={setBlackLevel}
          />
          <Controlbox pickedSide={pickedSide} />
        </>
      )}
      {!gameState && (
        <div className="multiplayer-container">
          <h1>{gameText}</h1>
        </div>
      )}
    </div>
  );
};

export default Multiplayer;
