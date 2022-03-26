import React from "react";
import { Button } from "../button/button";
import { Card, Container, Row, Col, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
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
                    Director: {" "}
                    <Link to={`/directors/${movie.Director.Name}`}>
                      {movie.Director.Name}
                    </Link>
                  </Card.Text>

                  <Card.Text className="movie-genre" style={{ margin: "1rem" }}>
                    Genre: {" "}
                    <Link to={`/genre/${movie.Genre.Name}`}>
                      {movie.Genre.Name}
                    </Link>
                  </Card.Text>
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
