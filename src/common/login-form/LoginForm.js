import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import "./LoginForm.css";

function LoginForm({ handleLoginFormSubmit, isOpen }) {
  const initialFormValues = {
    username: "",
    password: "",
  };
  const initialValidationErrors = {
    username: false,
    password: false,
  };

  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [validationErrors, setValidationErrors] = useState(
    initialValidationErrors
  );

  const handleFormInput = (e) => {
    const values = { ...formValues };
    values[e.target.name] = e.target.value;
    setFormValues(values);
    setValidationErrors({ ...validationErrors, [e.target.name]: false });
  };

  const handleLoginError = (err) => {
    setErrorMsg(err.message);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const submitLoginForm = (e) => {
    e.preventDefault();
    let submitForm = true;
    const errors = { ...validationErrors };
    for (const key in formValues) {
      if (!formValues[key]) {
        errors[key] = true;
        submitForm = false;
      }
    }
    if (submitForm) {
      handleLoginFormSubmit(formValues, handleLoginError);
    } else {
      setValidationErrors(errors);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setFormValues(initialFormValues);
    }
  }, [isOpen]);

  return (
    <form className="login-register-form" onSubmit={submitLoginForm}>
      <FormControl component="div" className="input-field">
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          id="username"
          name="username"
          value={formValues.username}
          onChange={handleFormInput}
          aria-describedby="username-error-text"
          error={validationErrors.username}
        />
        {validationErrors.username && (
          <FormHelperText
            id="username-error-text"
            error={validationErrors.username}>
            Username is required.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl component="div" className="input-field">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          value={formValues.password}
          onChange={handleFormInput}
          type="password"
          error={validationErrors.password}
          aria-describedby="password-error-text"
        />
        {validationErrors.password && (
          <FormHelperText
            id="password-error-text"
            error={validationErrors.password}>
            Passowrd is required.
          </FormHelperText>
        )}
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="submit-button">
        LOGIN
      </Button>
      {errorMsg && <FormHelperText error={errorMsg}>{errorMsg}</FormHelperText>}
    </form>
  );
}

export default LoginForm;
