import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const ShawAmphitheaterModal = () => {
  return (
    <>
      <Modal.Body>
        <h3>Shaw Foundation Amphitheater</h3>
        <img
          className="modal-banner"
          src="https://firebasestorage.googleapis.com/v0/b/project4-z.appspot.com/o/zoneIcons%2Fshawfoundationamphitheatre.png?alt=media&token=44eb869e-3434-440e-88b3-a5de60127771"
          alt="banner"
        />
        <div>
          <h4>Shows</h4>
          <p>10:30am: Splash Safari</p>
          <p>12:00pm: Rainforest Fights Back</p>
        </div>
      </Modal.Body>
    </>
  );
};
