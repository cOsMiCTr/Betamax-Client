import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./profile-view.scss";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import { Button} from "../button/button";
import { MovieCard } from "../movie-card/movie-card";
import { Button as ButtonSpecial } from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      changeMarker: false
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://betamax-cosmictr.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // update profile
  editUser = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://betamax-cosmictr.herokuapp.com/${user}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        alert("Profile updated");
        window.open("/profile", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  onRemoveFavorite = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://betamax-cosmictr.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };




  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }
  

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies, user } = this.props;
    const { Username, Email, Birthday, FavoriteMovies } = this.state;

    const FavoriteMoviesArray =
      movies.filter((movie) => FavoriteMovies.includes(movie._id)) || [];

    if (!Username) {
      return null;
    }

    return (
      <Container className="profile-view">
        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title
                  style={{
                    textAlign: "center",
                    fontSize: "36px",
                    marginTop: "2rem",
                  }}
                >
                  Profile
                </Card.Title>
                <Form
                  className="update-form"

                  style={{ margin: "2rem" }}
                >
                  
                  <Form.Group style={{ margin: "2rem" }}>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={Username}
                      on
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group style={{ margin: "2rem" }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={""}
                      onChange={(e) => this.setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group style={{ margin: "2rem" }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group style={{ margin: "2rem" }}>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
         
                      value={Birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    style={{ margin: "1rem" }}
                    type="submit"
                    label="Update"
                    onClick={(e) =>
                      this.editUser(
                        e,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    Update User
                  </Button>
                  <div className="backButton">
                    <Button variant="outline-primary" onClick={() => { history.pushState(null, null, '/'); }} label="Back"></Button>
                </div>
                </Form>
              </Card.Body>
            </Card>
            <div className="deleteAccount">
                    <ButtonSpecial variant="danger" style={{margin:"1rem"}} onClick={onDeleteUser } label="Delete Account"> Delete Account</ButtonSpecial>
                </div>
          </Col>
        </Row>
        <Row>
          {FavoriteMoviesArray.map((movie) => (
            <Col md={4} key={movie._id} className="my-2">
              <MovieCard movie={movie} />
            </Col>
          ))}
        </Row>

      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string,
      Description: PropTypes.string,
      ImageURL: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string,
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        BirthYear: PropTypes.number,
        DeathYear: PropTypes.number,
      }),
    })
  ),
  users: PropTypes.arrayOf(
    PropTypes.shape({
      Username: PropTypes.string,
      Password: PropTypes.string,
      Email: PropTypes.string,
      Birthday: PropTypes.string,
      FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  onBackClick: PropTypes.func,
};
