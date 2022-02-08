import React from "react";
import { Button, Drawer, Icon } from "rsuite";
import { useMediaQuery, useModalState } from "../../misc/custom-hook";
import DashBoard from ".";
const DashBoardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> DashBoard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} palcement="left">
        <DashBoard />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;