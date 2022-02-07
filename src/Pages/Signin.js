import React from "react";
import firebase from "firebase/compat/app";
import { Container, Grid, Row, Col, Panel, Button, Icon, Alert } from "rsuite";
import { auth, database } from "../styles/misc/firebase";

const Signin = () => {
  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);

      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }

      Alert.success("Signed in", 4000);
    } catch (err) {
      Alert.info(err.message, 4000);
    }
  };

  const onFacebookSignIn = () => {
    signInWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2> Welcome to Chat</h2>
                <p>Progessive chat platform</p>
              </div>

              <div className="mt-3">
                <Button block color="blue">
                  <Icon icon="facebook" onClick={onFacebookSignIn} />
                  Continue with FaceBook
                </Button>

                <Button block color="green">
                  <Icon icon="google" onClick={onGoogleSignIn} />
                  Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Signin;
