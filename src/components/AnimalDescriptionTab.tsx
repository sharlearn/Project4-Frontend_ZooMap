import Carousel from "react-bootstrap/Carousel";
import { AnimalDescription } from "../list";

export const AnimalDescriptionTab = ({
  descriptions,
}: {
  descriptions: AnimalDescription[];
}) => {
  return (
    <Carousel>
      {descriptions.map((data) => (
        <Carousel.Item>
          <div className="container" style={{ padding: "50px" }}>
            <h5>{data.title}</h5>
            <p>{data.content}</p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
