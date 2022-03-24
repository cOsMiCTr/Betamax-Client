import React from "react";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";


function FavoriteMovies(favoriteMovieList) {
  return (
    <div>
      <h1>HEYYYYYYYYYYYY</h1>

      {favoriteMovieList.map((movies) => {
        return (
          <Container>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <h4>{Username} Favorite Movies</h4>
              </Col>
            </Row>
            <Row>
              {favoriteMovieList.map((movies) => {
                return (
                  <Col xs={12} md={6} lg={3} key={movies._id}>
                    <img src={movies.ImageURL} />
                    <Link to={`/movies/${movies._id}`}>
                      <h4>{movies.Title}</h4>
                    </Link>

                    <button
                      variant="secondary"
                      onClick={() => removeFav(movies._id)}
                    >
                      Remove from list
                    </button>
                  </Col>
                );
              })}
            </Row>
          </Container>
        );
      })}
    </div>
  );
}

export default FavoriteMovies;
