import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./profile-view.scss";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { setUser, setUserData } from '../../actions/actions';
import MainView from "../main-view/main-view";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      changeMarker: false,
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
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://betamax-cosmictr.herokuapp.com/users/${Username}`,
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

        alert("Profile updated");
        window.open("/profile", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser = () => {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://betamax-cosmictr.herokuapp.com/users/${Username}`, {
         headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        this.onLoggedOut();
        alert("Profile deleted");
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
        `https://betamax-cosmictr.herokuapp.com/users/${Username}/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie has been removed");
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
    const { movies, users } = this.props;
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
            <Card>
              <Card.Body className="update-form">
                <Card.Title>Profile</Card.Title>
                <Form
                  
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="Enter Email"
                      value={Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    {/* {JSON.stringify(Birthday)} */}
                    <Form.Control
                      type="date"
                      name="Birthday"
                      value={new Date(Birthday, 3, 6)}
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div>
                    <Button
                      type="submit"
                      label="Submit"
                      onClick={this.editUser}
                    >
                      Update Data
                    </Button>
                  </div>
                </Form>
                <Button
                  onClick={() => {
                    history.back();
                  }}
                  label="Back"
                >Back</Button>
                <Button
                  label="Delete User"
                  onClick={() => this.deleteUser()}
                >
                  Delete Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          {FavoriteMoviesArray.map((movie) => (
            <Col md={4} key={movie._id} className="my-2">
              <Button label="Remove" onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove</Button>
              <MovieCard movie={movie}/>
              
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
      Birthday: PropTypes.instanceOf(Date),
      FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  onBackClick: PropTypes.func,
};
