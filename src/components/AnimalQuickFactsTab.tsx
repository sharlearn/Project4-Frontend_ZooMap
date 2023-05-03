import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IucnDescription } from "../list";

export const AnimalQuickFacts = ({
  animalDiet,
  animalHabitat,
  animalLifespan,
  animalRange,
}: {
  animalDiet: string;
  animalHabitat: string;
  animalLifespan: string;
  animalRange: string;
}) => {
  return (
    <Container>
      <Row>
        <Col className="quick-fact-boxes">
          <h5>Diet</h5> {animalDiet}
        </Col>
        <Col className="quick-fact-boxes">
          <h5>Habitat</h5> {animalHabitat}
        </Col>
      </Row>
      <Row>
        <Col className="quick-fact-boxes">
          <h5>Lifespan</h5> {animalLifespan}
        </Col>
        <Col className="quick-fact-boxes">
          <h5>Range</h5> {animalRange}
        </Col>
      </Row>
    </Container>
  );
};
