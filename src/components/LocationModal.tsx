import React from "react";
import Modal from "react-bootstrap/Modal";

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

export const LocationModal = ({
  locationData,
  animalsData,
  switchModals,
}: {
  locationData: Location;
  animalsData: Animal[];
  switchModals: (data: any) => void;
}) => {
  return (
    <Modal.Body>
      <p>{locationData.description}</p>
      <h5>Animals In This Zone</h5>
      <ul>
        {animalsData.map((data, index) => (
          <li className="list-unstyled" key={index}>
            <button onClick={() => switchModals(data)}>
              <img
                className="animal-icons"
                src={data.iconUrl}
                alt={data.name}
              />
              <p>{data.name}</p>
            </button>
          </li>
        ))}
      </ul>
    </Modal.Body>
  );
};
