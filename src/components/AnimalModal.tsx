import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AnimalDataTabs } from "./AnimalDataTabs";
import { Animal } from "../list";

export const AnimalModal = ({
  animalData,
  switchModals,
  locationType,
}: {
  animalData: Animal;
  switchModals: (data: any) => void;
  locationType: string;
}) => {
  return (
    <>
      <Modal.Body>
        <h3>{animalData.name}</h3>
        <img className="modal-banner" src={animalData.bannerUrl} alt="banner" />
        <AnimalDataTabs data={animalData} />
      </Modal.Body>
      {locationType === "zone" && (
        <Button variant="light" onClick={switchModals}>
          Back to Zone
        </Button>
      )}
    </>
  );
};
