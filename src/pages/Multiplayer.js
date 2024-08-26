import { useState, useEffect } from "react";
import Controlbox from "../components/Controlbox";
import Health from "../components/Health";
import "./Multiplayer.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
//1 is black    2 is purple
const Multiplayer = () => {
  const [lowerText, setLowerText] = useState("dummy text");
  const [selectState, setSelectState] = useState(false);
  const [pickedSide, setPickedSide] = useState(0);
  const [textPlace, setTextPlace] = useState(0);
  let prev = 0;
  useEffect(() => {
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
              if (response2_data.purple && response2_data.black) {
                setSelectState(True);
              }
            }
          }
        }
      } else if (pickedSide == 2) {
        const response = await fetch(`${apiBaseUrl}/purple/alive`);
        const response_data = await response.json();
        if (response.ok) {
          console.log("Purple is: " + response_data.state);
          prev = 2;

          const response2 = await fetch(`${apiBaseUrl}/alive/states`);
          const response2_data = await response2.json();
          if (response2.ok) {
            if (response2_data.purple && response2_data.black) {
              setSelectState(True);
            }
          }
        }
      }
    }, 5500);
    return () => clearInterval(aliveTime);
  }, [pickedSide]);
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
      {!selectState && selection_components}
      {selectState && (
        <>
          <Health />
          <Controlbox />
        </>
      )}
    </div>
  );
};

export default Multiplayer;
