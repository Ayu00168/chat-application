import React, { memo } from "react";
import { useParams } from "react-router";
import { Alert, Button, Drawer } from "rsuite";
import { useCurrentRoom } from "../../../context/currentRoomContext";
import { useMediaQuery, useModalState } from "../../../misc/custom-hook";
import { database } from "../../../misc/firebase";
import EditableInput from "../../EditableInput";

const EditRoomModal = () => {
  const { isOpen, open, close } = useModalState();
  const isMobile = useMediaQuery();
  const { chatId } = useParams("(max-width : 992px)");

  const name = useCurrentRoom((v) => v.name);
  const description = useCurrentRoom((v) => v.description);

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success("Sucessfully updated", 4000);
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  };

  const onNameSave = (newName) => {
    updateData("name", newName);
  };

  const onDescriptionSave = () => {};

  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>

      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2"> Name</h6>}
            emptyMsg="name can not be empty"
          />
          <EditableInput
            componentClass="textarea"
            rows={5}
            initialValue={description.value}
            onSave={onDescriptionSave}
            emptymsg="description can not be empty"
            wrapperClassName="mt-3"
          />
        </Drawer.Body>

        <Drawer.Footer>
          <button onClick={close} block>
            Close
          </button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomModal);
