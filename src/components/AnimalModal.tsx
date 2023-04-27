import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { AnimalDescriptionTabs } from "./AnimalDescriptionTabs";
import { Animal } from "../list";

export const AnimalModal = ({
  animalData,
  switchModals,
}: {
  animalData: Animal;
  switchModals: (data: any) => void;
}) => {
  return (
    <>
      <Modal.Body>
        <img className="modal-banner" src={animalData.bannerUrl} alt="banner" />
        {/* <p>Lifespan: {animalData.lifespan}</p>
        <p>Diet: {animalData.diet}</p>
        <p>Habitat: {animalData.habitat}</p> */}
        <AnimalDescriptionTabs data={animalData} />
      </Modal.Body>
      <Button variant="secondary" onClick={switchModals}>
        Back to Zone
      </Button>
    </>
  );
};
