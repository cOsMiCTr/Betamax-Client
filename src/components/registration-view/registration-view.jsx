import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Button } from "../button/button";
import FadeIn from "react-fade-in";
export function RegisterView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [registerClicked, setregState] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordRepeatErr, setpasswordRepeatErr] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */

    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      setregState({ registerClicked: true });
      props.onRegisterClick(registerClicked);

      //Here comes the connection to register endpoint
    }
  };

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    } else {
      setUsernameErr("");
      isReq = true;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be 6 characters long");
      isReq = false;
    } else {
      setPasswordErr("");
      isReq = true;
    }
    if (!passwordRepeat) {
      setpasswordRepeatErr("Please repeat the password you have entered");
      isReq = false;
    } else if (passwordRepeat !== password) {
      setpasswordRepeatErr("Passwords have to match");
      isReq = false;
    } else {
      setpasswordRepeatErr("");
      isReq = true;
    }

    return isReq;
  };

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
        {usernameErr && (
          <FadeIn>
            <div className="invalid-feedback" style={{ display: "block" }}>
              {usernameErr}
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
        {passwordErr && (
          <FadeIn>
            <div className="invalid-feedback" style={{ display: "block" }}>
              {passwordErr}
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
        {passwordRepeatErr && (
          <FadeIn>
            <div className="invalid-feedback" style={{ display: "block" }}>
              {passwordRepeatErr}
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
      </Form.Group>
      <Form.Group style={{ margin: "2rem" }}>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          className="birthday-input"
          type="date"
          value={birthdate}
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
    </Form></Container>
  );
}
