import Home from "../../pages/home/Home";
import Sidebar from "../../components/sidebar/Sidebar";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.bundle.js";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Dashboard;
