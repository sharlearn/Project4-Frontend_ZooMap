import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

interface ModalProp {
  show: boolean;
  handleClose: any;
  title: string;
  children: any;
}

export const BaseModal = (props: ModalProp): JSX.Element => {
  return (
    <Modal show={props.show} onHide={props.handleClose} className="base-modal">
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
