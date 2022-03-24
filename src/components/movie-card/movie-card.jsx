import React from "react";
import PropTypes from "prop-types";
import { Container, Col, Row, Card, Button, Accordion } from "react-bootstrap";
import "./movie-card.scss";
import { Router, Route, BrowserRouter, Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    if (!movie.Genre.Description) {
      return (movie.Genre.Description = "");
    }

    return (
      <Card
        style={{
          height: "500px",
          margin: "2rem",
          width: "250px",
          maxWidth: "500px",
        }}
      >
        <Link to={`/movies/id/${movie._id}`}>
          <Card.Img
            variant="top"
            src={movie.ImageURL}
            key={movie.Title}
            style={{ height: "300px" }}
          />
        </Link>
        <Card.Body>
          <Accordion flush>
            <Accordion.Item eventKey={movie.Title}>
              <Accordion.Header>{movie.Title}</Accordion.Header>
              <Accordion.Body>
                {movie.Description.substring(0, 60)}...
                <Link to={`/movies/id/${movie._id}`}>
                  <Button variant="link">show more!</Button>{" "}
                </Link>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Card.Text className="genreInCard" style={{ textAlign: "right" }}>
            Genre: {movie.Genre.Name}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func,
};
