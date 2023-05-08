import Carousel from "react-bootstrap/Carousel";
import { AnimalDescription } from "../list";

// this seems to be a carousel, not a Tab
export const AnimalDescriptionTab = ({
  descriptions,
}: {
  descriptions: AnimalDescription[];
}) => {
  return (
    <Carousel variant="dark">
      {descriptions.map((data, index) => (
        <Carousel.Item key={index}>
          <div className="container" style={{ padding: "50px" }}>
            <h5>{data.title}</h5>
            <p>{data.content}</p>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
