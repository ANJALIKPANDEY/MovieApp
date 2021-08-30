import React, { useState } from "react";
import Modal from "react-modal";
import "./LoginRegister.css";

// material-ui imports
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import LoginForm from "../login-form/LoginForm";
import RegisterForm from "../register-form/RegisterForm";

Modal.setAppElement("#root");

function LoginRegisterModal({
  isOpen,
  closeModal,
  handleLogin,
  handleRegister,
}) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleLoginFormSubmit = ({ username, password }, handleError) => {
    handleLogin(username, password).then(
      () => {
        closeModal();
      },
      (err) => {
        handleError(err);
      }
    );
  };

  const handleRegisterFormSubmit = (
    { email, firstname, lastname, contactNo, password },
    handleError
  ) => {
    handleRegister(email, firstname, lastname, contactNo, password).then(
      () => {
        closeModal();
      },
      (err) => {
        handleError(err);
      }
    );
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const styles = {
    content: {
      width: "fit-content",
      height: "fit-content",
      margin: "auto",
    },
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={styles}>
      <Tabs value={selectedTab} onChange={handleTabChange} centered>
        <Tab label="LOGIN"></Tab>
        <Tab label="REGISTER"></Tab>
      </Tabs>
      {selectedTab === 0 && (
        <LoginForm
          handleLoginFormSubmit={handleLoginFormSubmit}
          isOpen={isOpen}
        />
      )}

      {selectedTab === 1 && (
        <RegisterForm
          handleRegisterFormSubmit={handleRegisterFormSubmit}
          isOpen={isOpen}
        />
      )}
    </Modal>
  );
}

export default LoginRegisterModal;
