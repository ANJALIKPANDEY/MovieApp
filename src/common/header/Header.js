import React, { useState } from "react";
import logoImage from "../../assets/logo.svg";
import "./Header.css";

// material-ui imports
import Button from "@material-ui/core/Button";
import LoginRegisterModal from "../login-register/LoginRegister";

function Header(props) {
  const initialLoginStatus = localStorage.getItem("userDetails") ? true : false;

  const [isLogin, setIsLogin] = useState(initialLoginStatus);
  const [loginModalShow, setLoginModalShow] = useState(false);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("userDetails");
  };
  const handleLogin = (username, password) => {
    const param = window.btoa(`${username}:${password}`);

    return fetch(props.baseUrl + `/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        authorization: `Basic ${param}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { id, status } = data;
        if (status === "ACTIVE") {
          setIsLogin(true);
          const userDetails = {
            loginStatus: true,
            userId: id,
          };
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          return data;
        } else {
          throw new Error("Failed to login");
        }
      });
  };
  const handleRegister = async (
    email_address,
    first_name,
    last_name,
    mobile_number,
    password
  ) => {
    const body = {
      email_address,
      first_name,
      last_name,
      mobile_number,
      password,
    };

    return fetch(props.baseUrl + `signup`, {
      method: "POST",
      headers: {
        Accept: "application/json;charset=UTF-8",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // update the data and state
        const { id, status } = data;
        if (status === "ACTIVE") {
          setIsLogin(true);
          const userDetails = {
            loginStatus: true,
            userId: id,
          };
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          return data;
        } else {
          throw new Error("Failed to register");
        }
      });
  };

  const bookShowHandler = () => {
    if (!isLogin) {
      setLoginModalShow(true);
      return;
    }
    if (props.movieId && props.history) {
      props.history.push("/bookshow/" + props.movieId);
    }
  };

  return (
    <React.Fragment>
      <div className="app-header">
        <img className="app-logo" src={logoImage} alt="App Logo" />
        <div className="header-button-group">
          {props.movieId && (
            <Button
              variant="contained"
              color="primary"
              onClick={bookShowHandler}>
              Book Show
            </Button>
          )}
          {isLogin ? (
            <Button variant="contained" color="default" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="default"
              onClick={() => setLoginModalShow(true)}>
              Login
            </Button>
          )}
        </div>
      </div>
      <LoginRegisterModal
        isOpen={loginModalShow}
        closeModal={() => setLoginModalShow(false)}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
    </React.Fragment>
  );
}

export default Header;
