import React from "react";
import PropTypes from "prop-types";
import "./director-view.scss";
import { Container, Card, Button } from "react-bootstrap";

import { Row } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, movies } = this.props;

    return (
      <Container fluid>
        <Card>
          <Card.Body>
            <Card.Title
              style={{ textAlign: "center", fontSize: "36px", margin: "1rem" }}
            >
              Director
            </Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{director.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Birth year: </span>
              <span className="value">{director.BirthYear}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Death year: </span>
              <span className="value">{director.DeathYear}</span>
            </Card.Text>

            <Button
              label="Back"
              onClick={() => {
                history.back();
              }}
              style={{ textAlign: "center" }}
            >Back</Button>
          </Card.Body>
        </Card>
        <Row
          style={{
            textAlign: "center",
            fontSize: "36px",
            margin: "2rem",
            display: "grid",
          }}
        >
          {movies.map((movie) => (
            <Card
              className="favorite-movie card-content"
              key={movie._id}
              style={{ margin: "2rem" }}
            >
              <Card.Img
                className="fav-poster"
                variant="top"
                src={movie.ImageURL}
              />
              <Card.Body>
                <Card.Title className="movie_title">{movie.Title}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string,
    Bio: PropTypes.string,
    BirthYear: PropTypes.number,
    DeathYear: PropTypes.number,
  }).isRequired,
};
