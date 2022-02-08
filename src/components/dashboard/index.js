import React from "react";
import { Button, Drawer, Divider } from "rsuite";
import { useProfile } from "../../context/ProfileContex";
import EditableInput from "../EditableInput";

const DashBoard = ({ onSignOut }) => {
  const { profile } = useProfile();

  const onSave = async (newData) => {
    console.log("newData", newData);
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>DashBoard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3> Hey {profile.name}, How are u doing! </h3>
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2"> Nickname </h6>}
        />
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
          Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default DashBoard;
