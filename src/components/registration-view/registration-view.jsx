import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./registration-view.scss"
import { Button } from "../button/button";
import FadeIn from "react-fade-in";



export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthdate] = useState("");

  const [values, setValues] = useState({
    nameErr: "",
    usernameErr: "",
    passwordErr: "",
    passwordRepeatErr: "",
    emailErr: "",
    birthdayErr: "",
  });

  const validate = () => {
    let isReq = true;

    if (!username) {
      setValues({...values, usernameErr: "Username is required"});
      isReq = false;
    } else if (username.length < 5) {
      setValues({...values, usernameErr: "Username must be 5 characters long"});
      isReq = false;
    } 

    if (!password) {
      setValues({...values, passwordErr: "Password Required"});
      isReq = false;
    } else if (password.length < 6) {
      setValues({...values, passwordErr: "Password must be 6 characters long"});
      isReq = false;
    } 

    if (!passwordRepeat) {
      setValues({...values, passwordRepeatErr: "Please repeat the password you have entered"});
      isReq = false;
    } else if (passwordRepeat !== password) {
      setValues({...values, passwordRepeatErr: "Passwords have to match"});
      isReq = false;
    } 

    if (!email) {
      setValues({...values, emailErr: "Email is required"});
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({...values, usernameErr: "Email is invalid"});
      isReq = false;
    } 

    return isReq;
  };

const handleSubmit =(e) => {
  e.preventDefault();
  if (isReq) {
    axios.post("https://betamax-cosmictr.herokuapp.com/users", {
      Name: name,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      alert("You have succesfully registered to the best Movie platform!");
      window.open("/", "_self")
    })
    .catch(response => {
      console.error(response);
      alert("Registration was unseccesful. Please try again!");
    })
  }
}


  return (
    <Container>
      <div>
        <h1 className="heading display-1 text-center">BETAMAX</h1>
        <div className="welcome-text text-center">
          <h1>Welcome to our registration page</h1>
          <h1>You are one step away from mega adventure!</h1>
        </div>
      </div>

      <Form className="login-container" style={{ margin: "5rem" }}>
        <Form.Group controlId="registerUsername" style={{ margin: "2rem" }}>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          {values.usernameErr && (
            <FadeIn>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {values.usernameErr}
              </div>
            </FadeIn>
          )}
        </Form.Group>
        <Form.Group controlId="registerPassword" style={{ margin: "2rem" }}>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            minLength="1"
            onChange={(e) => setPassword(e.target.value)}
          />
          {values.passwordErr && (
            <FadeIn>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {values.passwordErr}
              </div>
            </FadeIn>
          )}
          <Form.Label style={{ marginTop: "0.5rem" }}>
            Password (repeat):
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Pasword (repeat)"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
          />
          {values.passwordRepeatErr && (
            <FadeIn>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {values.passwordRepeatErr}
              </div>
            </FadeIn>
          )}
        </Form.Group>
        <Form.Group style={{ margin: "2rem" }}>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
            {values.emailErr && (
            <FadeIn>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {values.emailErr}
              </div>
            </FadeIn>
          )}
        </Form.Group>
        <Form.Group style={{ margin: "2rem" }}>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            className="birthday-input"
            type="date"
            value={birthday}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Form.Group>
        <Button
          size="sm"
          label="Cancel"
          onClick="window.location.reload();"
        ></Button>
        <Button
          size="sm"
          label="Register"
          onClick={handleRegister}
          style={{ textAlign: "center" }}
        ></Button>
      </Form>
    </Container>
  );
}


RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
}
