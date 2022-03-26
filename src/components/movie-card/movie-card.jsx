import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Accordion } from "react-bootstrap";
import "./movie-card.scss";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
  }

  render() {
    const { movie } = this.props;
    const { isFavorite } = this.state;

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
            key={movie._id}
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
          <Card.Text style={{ textAlign: "right" }}>
            Genre: {movie.Genre.Name}
          </Card.Text>
          <div 
            render={() => {
              if (!isFavorite) {
                return (
                  <Button style={{ textAlign: "right" }}>
                    + Add to favorites
                  </Button>
                );
              } else {
                return (
                  <Button style={{ textAlign: "right" }}>
                    - Remove from favorites
                  </Button>
                );
              }
            }}
          ></div>

        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string,
    ImageURL: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func,
};
