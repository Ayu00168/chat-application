import React, { useCallback, useState, useRef } from "react";
import { useModalState } from "../../misc/custom-hook";
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from "rsuite";
import firebase from "firebase/compat/app";
import { auth, database } from "../../misc/firebase";

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Chat name is required"),
  description: StringType().isRequired("Description is required"),
});

const INITIAL_FORM = {
  name: "",
  description: "",
};

const CreateRoomBtn = () => {
  const { open, isOpen, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  const onFormSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    const newRoomdata = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };

    try {
      await database.ref("rooms").push(newRoomdata);
      setIsLoading(false);
      setFormValue(INITIAL_FORM);

      close();
      Alert.info(`${formValue.name} has been created`, 4000);
    } catch (err) {
      setIsLoading(false);

      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative">Create new Chat Room</Icon>
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl
                name="name"
                placeholder="Enter your romm description..."
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                row={5}
                name="description"
                placeholder="Enter your romm name..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            apperance="primary"
            onClick={onFormSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtn;
