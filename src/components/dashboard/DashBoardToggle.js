import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import { useMediaQuery, useModalState } from "../../misc/custom-hook";
import DashBoard from ".";
import { auth, database } from "../../misc/firebase";
import { isOfflineForDatabase } from "../../context/ProfileContex";
const DashBoardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery("(max-width: 992px)");

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();

        Alert.info("Signed out", 4000);

        close();
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  }, [close]);
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" /> DashBoard
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} palcement="left">
        <DashBoard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
