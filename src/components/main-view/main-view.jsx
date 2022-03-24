import React from "react";
// to import the library from a database
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "./main-view.scss";

// Login page and welcoming page
import { LoginView } from "../login-view/login-view";
// Registration page
import { RegisterView } from "../registration-view/registration-view";
// detailed info on a single movie
import { MovieCard } from "../movie-card/movie-card";
// view all movies
import { MovieView } from "../movie-view/movie-view";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Button } from "../button/button";
import { NavbarView } from "../nav-bar/nav-bar";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      password: null,
    };
  }

  getMovies(token) {
    axios
      .get("https://betamax-cosmictr.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onRegisterClick(registerClicked) {
    !registerClicked
      ? this.setState({
          ...this.state,
          registerClicked: true,
        })
      : this.setState({
          ...this.state,
          registerClicked: false,
        });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    if (!user)
      return (
        <Row>
          <Col>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
          </Col>
        </Row>
      );
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
          <Route
              exact
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView
                    onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              exact
              path="/"
              render={() => {
                return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/movies/id/:MovieID"
              render={({ match }) => {
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.MovieID)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/profile"
              render={({ match }) => {
                return (
                  <Col md={8}>
                    <ProfileView
                      movie={movies.find((m) => m._id === match.params.MovieID)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            
          </Row>
        </Container>
      </Router>
    );
  }
}

export default MainView;
