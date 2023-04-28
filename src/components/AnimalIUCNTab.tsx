import { IucnDescription } from "../list";
import Carousel from "react-bootstrap/Carousel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const AnimalIUCNTab = ({
  iucnStatus,
  iucnDescription,
}: {
  iucnStatus: string;
  iucnDescription: IucnDescription[];
}) => {
  return (
    <Row>
      <Col style={{ fontWeight: "bold" }}>IUCN Status:</Col>
      <Col>{iucnStatus}</Col>

      <Carousel>
        {iucnDescription.map((data) => (
          <Carousel.Item>
            <div className="container" style={{ padding: "50px" }}>
              <h5>{data.title}</h5>
              <p>{data.description}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Row>
  );
};
