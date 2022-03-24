import React from "react";
import { Button } from "../button/button";
import { Card, Container, Row, Col, CardGroup } from "react-bootstrap";
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
    const { movie } = this.props;
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
