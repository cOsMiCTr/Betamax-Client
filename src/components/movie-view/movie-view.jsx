import React from "react";
import { Button } from "../button/button";
import { Card, Container, Row, Col, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import axios from "axios";

export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isFavorite: false,
        FavoriteMovies: []
    }

}

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let Username = localStorage.getItem("user");

    axios
      .post(`https://betamax-cosmictr.herokuapp.com/users/${Username}/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        windows.open("/", "_self");
        alert("Movies has been added to your favorites list!");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

    let url = `https://betamax-cosmictr.herokuapp.com/users/${user}/${movie._id}`;


    axios
      .post(url, "", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        history.back();
        alert("Movies has been added to your favorites list!");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { movie, Director } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <CardGroup>
              <Card style={{ border: "none" }}>
                <Card.Body>
                  <Card.Img
                    className="movie-image"
                    src={movie.ImageURL}
                    alt={movie.Title}
                  />
                  <Card.Title
                    className="movie-title"
                    style={{
                      fontSize: "25px",
                      textAlign: "center",
                      margin: "1rem",
                    }}
                  >
                    {movie.Title}
                  </Card.Title>
                  <Card.Text
                    className="movie-description"
                    style={{ margin: "1rem" }}
                  >
                    {movie.Description}{" "}
                  </Card.Text>
                  <Card.Text>{movie.Bio}</Card.Text>
                  <Card.Text className="movie-genre" style={{ margin: "1rem" }}>
                    Director:{" "}
                    <Link to={`/directors/${movie.Director.Name}`}>
                      {movie.Director.Name}
                    </Link>
                  </Card.Text>

                  <Card.Text className="movie-genre" style={{ margin: "1rem" }}>
                    Genre:{" "}
                    <Link to={`/genre/${movie.Genre.Name}`}>
                      {movie.Genre.Name}
                    </Link>
                  </Card.Text>
                  <Button
                    className="favButton"
                    label="+ Add"
                    onClick={() => {
                      this.addFavorite(movie);
                    }}
                    style={{ textAlign: "center" }}
                  ></Button>
                  <Button
                    label="Back"
                    onClick={() => {
                      history.back();
                    }}
                    style={{ textAlign: "center" }}
                  ></Button>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
