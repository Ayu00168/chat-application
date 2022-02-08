import React from "react";
import { Button, Drawer } from "rsuite";
import { useProfile } from "../../context/ProfileContex";

const DashBoard = ({ onSignOut }) => {
  const { profile } = useProfile();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>DashBoard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3> Hey {profile.name}, How are u doing! </h3>
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
