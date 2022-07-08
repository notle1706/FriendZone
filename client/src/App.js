import React from "react";
import Login from "./pages/login/Login";
import RouteHandler from "./RouteHandler";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { firestore, setUser, getUserInfo } from "./firebase";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
  return (
    <>
      <RouteHandler />
    </>
  );
}

export default App;
