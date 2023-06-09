import Button from "react-bootstrap/Button";
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
  banner,
}: {
  locationData: Location;
  animalsData: Animal[];
  switchModals: (data: any) => void;
  banner: string | null;
}) => {
  return (
    <Modal.Body className="modal-body">
      {banner && (
        <img className="location-banner" src={banner} alt="location banner" />
      )}
      <p>{locationData.description}</p>
      <h5>Animals In This Zone</h5>
      <div className="container">
        <div className="d-flex flex-wrap">
          {animalsData.map((data, index) => (
            <Button
              key={index}
              variant="link"
              className="animal-buttons"
              onClick={() => switchModals(data)}
            >
              <div className="animal-container container">
                <img
                  className="animal-icon-image"
                  src={data.iconUrl}
                  alt={data.name}
                />
                <div className="animal-icon-overlay">{data.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Modal.Body>
  );
};
