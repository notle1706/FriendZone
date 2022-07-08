import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => auth.onAuthStateChanged((user) => setCurrentUser(user)), []);
  if (currentUser) {
    console.log("user is logged in", currentUser);
    console.log(children);
    return children;
  } else {
    console.log("user is logged out");
    return navigate("/");
  }
};

export default PrivateRoute;
