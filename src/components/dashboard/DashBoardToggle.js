import React from "react";
import { Button, Drawer, Icon } from "rsuite";
import { useModalState } from "../../misc/custom-hook";
import DashBoard from ".";
const DashBoardToggle = () => {
  const { isOpen, close, open } = useModalState();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> DashBoard
      </Button>
      <Drawer show={isOpen} onHide={close} palcement="left">
        <DashBoard />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
