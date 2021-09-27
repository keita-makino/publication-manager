import React from "react";
import firebase from "firebase";
import { Login as RALogin } from "react-admin";
import { StyledFirebaseAuth } from "react-firebaseui";

export type LoginProps = {};

const uiConfig = {
  signInFlow: "popup",
  signInSuccessUrl: "#/",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export const Login: React.FC<LoginProps> = (props: LoginProps) => {
  return (
    <RALogin {...props}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </RALogin>
  );
};
