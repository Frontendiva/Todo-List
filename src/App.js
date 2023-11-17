import "./App.css";
import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ToDo from "./ToDo/ToDo";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

const App = () => {
  return (
    <div>
      <ToDo firestore={firestore} />
    </div>
  );
};

export default App;
