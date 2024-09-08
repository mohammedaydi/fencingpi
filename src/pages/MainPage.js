import { useState, useEffect } from "react";
import Header from "../components/Header";
import Playlist from "../components/Playlist";
import Auth from "../components/Auth";

import "./MainPage.css";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const MainPage = (props) => {
  const [inputState, setInputState] = useState("");

  const changeHandler = (event) => {
    setInputState(event.target.value);
  };
  const authLogoutHandler = () => {
    props.setIsLoggedIn(false);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`${apiBaseUrl}/tmpauth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: inputState }),
    });

    const response_data = await response.json();
    if (response.ok) {
      console.log(response_data);
    }
    if (response_data.auth_state == "yes") {
      props.setIsLoggedIn(true);
    }
  };
  return (
    <div className="header-container">
      <Header />
      {!props.isLoggedIn && (
        <Auth
          handler={authSubmitHandler}
          onChange={changeHandler}
          value={inputState}
        />
      )}
      {props.isLoggedIn && <Playlist logoutHandler={authLogoutHandler} />}
    </div>
  );
};

export default MainPage;
