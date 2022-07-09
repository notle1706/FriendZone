import React from "react";
import Home from "../../pages/home/Home";
import Sidebar from "../../components/sidebar/Sidebar";
import { Logout } from "@mui/icons-material";
import "./dashboard.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { getAuth, signOut } from "firebase/auth";

function Dashboard() {
  let navigate = useNavigate();
  const auth = getAuth();
  const logout = async () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful.");
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <button
          type="button"
          className="btn btn-secondary float-right logout-button"
          onClick={logout}
        >
          <Logout />
        </button>
        <Outlet />
      </div>
    </>
  );
}

export default Dashboard;
