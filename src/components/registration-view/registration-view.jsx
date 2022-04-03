import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Redirect, Link } from "react-router-dom";
import "./registration-view.scss";
import { Button } from "../button/button";
import FadeIn from "react-fade-in";

export function RegistrationView() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthdate] = useState("");

  const [usernameErr, setusernameErr] = useState("");
  const [passwordErr, setpasswordErr] = useState("");
  const [passwordRepeatErr, setpasswordRepeatErr] = useState("");
  const [emailErr, setemailErr] = useState("");
  const [birthdayErr, setbirthdayErr] = useState("");

  const validate = () => {
    let isReq = true;

    if (!username) {
      setusernameErr("Username Required");
      isReq = false;
    } else if (username.length < 6) {
      setusernameErr("Username must be 6 characters long");
      isReq = false;
    } else {
      setusernameErr("");
      isReq = true;
    }

    if (!password) {
      setpasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 8) {
      setpasswordErr("Password must be 8 characters long");
      isReq = false;
    } else {
      setpasswordErr("");
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

    if (!email) {
      setemailErr("Email is required");
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setemailErr("Email is invalid");
      isReq = false;
    } else {
      setemailErr("");
      isReq = true;
    }

    if (!birthday) {
      setbirthdayErr("Birthday should not be empty");
      isReq = false;
    } else {
      setbirthdayErr("");
      isReq = true;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://betamax-cosmictr.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("You have succesfully registered to the best Movie platform!");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("Registration was unseccesful. Please try again!");
        });
    }
  };

  return (
    <Container>
      <div>
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
            autoComplete="name"
            placeholder="Username (min 8 characters)"
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
            placeholder="Password (Password must be between 8 to 16 characters)"
            value={password}
            autoComplete="new-password"
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
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErr && (
            <FadeIn>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {emailErr}
              </div>
            </FadeIn>
          )}
        </Form.Group>
        <Form.Group style={{ margin: "2rem" }}>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            className="birthday-input"
            type="date"
            autoComplete="bday"
            value={birthday}
            onChange={(e) => setBirthdate(e.target.value)}
          />
          {birthdayErr && (
            <FadeIn>
              <div className="invalid-feedback" style={{ display: "block" }}>
                {birthdayErr}
              </div>
            </FadeIn>
          )}
        </Form.Group>

        <Link to={"/"}>
          <Button size="sm" label="Cancel" onClick={()=>""}></Button>
        </Link>
        <Button
          size="sm"
          label="Register"
          onClick={handleSubmit}
          style={{ textAlign: "center" }}
        ></Button>
      </Form>
    </Container>
  );
}

