import { useState, useEffect } from "react";
import "./Health.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const Health = (props) => {
  const healthHandler = async () => {
    const response = await fetch(`${apiBaseUrl}/health`);

    const response_data = await response.json();
    if (response.ok) {
      props.setPurpleLevel(response_data.purple);
      props.setBlackLevel(response_data.black);
      console.log("updated health ---->" + response_data.purple);
      console.log("updated health ---->" + response_data.black);
    } else {
      console.log("error could not reach backend");
    }
  };

  useEffect(() => {
    const healthTime = setInterval(healthHandler, 100);
    return () => clearInterval(healthTime);
  }, []);
  return (
    <div className="health-container">
      <div className="health-container__wrapper">
        <h3>{props.blackLevel}</h3>
        <h3>Black</h3>
        <div className="player1">
          <div style={{ width: props.blackLevel + "%" }}> </div>
        </div>
      </div>
      <div className="health-container__wrapper">
        <h3>{props.purpleLevel}</h3>
        <h3>Purple</h3>
        <div className="player2">
          <div style={{ width: props.purpleLevel + "%" }}> </div>
        </div>
      </div>
    </div>
  );
};

export default Health;
