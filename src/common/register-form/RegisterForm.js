import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormHelperText from "@material-ui/core/FormHelperText";
import "./RegisterForm.css";

function RegisterForm({ handleRegisterFormSubmit, isOpen }) {
  const initialFormValues = {
    email: "",
    firstname: "",
    lastname: "",
    contactNo: "",
    password: "",
  };
  const initialValidationErrors = {
    email: false,
    firstname: false,
    lastname: false,
    contactNo: false,
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

  const handleRegisterError = (err) => {
    setErrorMsg(err.message);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };

  const submitRegisterForm = (e) => {
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
      handleRegisterFormSubmit(formValues, handleRegisterError);
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
    <form className="login-register-form" onSubmit={submitRegisterForm}>
      <FormControl component="div" className="input-field">
        <InputLabel htmlFor="firstname">First Name</InputLabel>
        <Input
          id="firstname"
          name="firstname"
          value={formValues.firstname}
          onChange={handleFormInput}
          aria-describedby="firstname-error-text"
          error={validationErrors.firstname}
        />
        {validationErrors.firstname && (
          <FormHelperText
            id="firstname-error-text"
            error={validationErrors.firstname}>
            First name is required.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl component="div" className="input-field">
        <InputLabel htmlFor="lastname">Last Name</InputLabel>
        <Input
          id="lastname"
          name="lastname"
          value={formValues.lastname}
          onChange={handleFormInput}
          aria-describedby="lastname-error-text"
          error={validationErrors.lastname}
        />
        {validationErrors.lastname && (
          <FormHelperText
            id="lastname-error-text"
            error={validationErrors.lastname}>
            Last name is required.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl component="div" className="input-field">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          id="email"
          name="email"
          value={formValues.email}
          onChange={handleFormInput}
          aria-describedby="email-error-text"
          error={validationErrors.email}
        />{" "}
        {validationErrors.email && (
          <FormHelperText id="email-error-text" error={validationErrors.email}>
            Email is required.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl component="div" className="input-field">
        <InputLabel htmlFor="register-password">Password</InputLabel>
        <Input
          id="register-password"
          name="password"
          value={formValues.password}
          onChange={handleFormInput}
          type="password"
          aria-describedby="password-error-text"
          error={validationErrors.password}
        />
        {validationErrors.password && (
          <FormHelperText
            id="password-error-text"
            error={validationErrors.password}>
            Passowrd is required.
          </FormHelperText>
        )}
      </FormControl>
      <FormControl component="div" className="input-field">
        <InputLabel htmlFor="contactNo">Contact No.</InputLabel>
        <Input
          id="contactNo"
          name="contactNo"
          value={formValues.contactNo}
          onChange={handleFormInput}
          aria-describedby="contactNo-error-text"
          error={validationErrors.contactNo}
        />
        {validationErrors.contactNo && (
          <FormHelperText
            id="contactNo-error-text"
            error={validationErrors.contactNo}>
            Contact no. is required.
          </FormHelperText>
        )}
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        className="submit-button">
        REGISTER
      </Button>
      {errorMsg && <FormHelperText error={errorMsg}>{errorMsg}</FormHelperText>}
    </form>
  );
}

export default RegisterForm;
