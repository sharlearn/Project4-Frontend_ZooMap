import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { backendUrl } from "../constants";

interface ModalProp {
  show: boolean;
  handleClose: any;
  locationId: any;
}

interface Location {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface Animal {
  id: number;
  name: string;
  bannerUrl: string;
  iconUrl: string;
}

export const PopupInfo = (props: ModalProp): JSX.Element => {
  const [animalData, setAnimalData] = useState<Animal[]>();
  const [locationData, setLocationData] = useState<Location>();
  const [loading, setLoading] = useState(true);

  let getData = async () => {
    try {
      const location = await axios.get(
        `${backendUrl}/location/${props.locationId}`
      );
      setLocationData(location.data);

      const animal = await axios.get<Animal[]>(
        `${backendUrl}/animal/location/${props.locationId}`
      );
      setAnimalData(animal.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getData().then(() => setLoading(false));
  }, []);

  if (!locationData || !animalData || loading) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{locationData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{locationData.description}</p>
        <h5>Animals In This Zone</h5>
        <ul>
          {animalData.map((data, index) => (
            <li className="list-unstyled" key={index}>
              <img
                className="animal-icons"
                src={data.iconUrl}
                alt={data.name}
              />
              <p>{data.name}</p>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
