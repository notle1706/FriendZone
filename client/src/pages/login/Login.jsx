import "./login.css";
import Topbar from "../../components/topbar/Topbar";
import SideText from "../../components/sidetext/SideText";
import SignIn from "../../components/signin/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Login() {
  return (
    <>
      <Topbar />
      <div className="container">
        <div className="row">
          <div className="col-8 d-none d-md-block">
            <SideText />
          </div>
          <div className="col pt-5 ml-3">
            <SignIn />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
