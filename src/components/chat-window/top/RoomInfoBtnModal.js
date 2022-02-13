import React from "react";
import { Button, Modal } from "rsuite";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { useModalState } from "../../../misc/custom-hook";

const RoomInfoBtnModal = () => {
  const description = useCurrentRoom((v) => v.description);
  const { isOpen, close, open } = useModalState();
  const name = useCurrentRoom((v) => v.name);

  return (
    <>
      <Button apperance="link" className="px-0" onClick={open}>
        Room information
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="mb-1">
            <p>{description}</p>
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomInfoBtnModal;
