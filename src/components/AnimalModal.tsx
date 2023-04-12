import React from "react";
import Modal from "react-bootstrap/Modal";

interface AnimalDescription {
  title: string;
  content: string;
}

interface Animal {
  id: number;
  name: string;
  bannerUrl: string;
  iconUrl: string;
  description: AnimalDescription[];
}

export const AnimalModal = ({
  animalData,
  switchModals,
}: {
  animalData: Animal;
  switchModals: (data: any) => void;
}) => {
  return (
    <Modal.Body>
      <img className="modal-banner" src={animalData.bannerUrl} alt="banner" />
    </Modal.Body>
  );
};
