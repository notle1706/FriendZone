import React from "react";
import "./sidetext.css";
import loginPage from "../../assets/login-page-pic.png";

export default function SideText() {
  return (
    <>
      <div className="container-md">
        <div className="image">
          <img className="img-fluid" src={loginPage} alt="Cute picture"></img>
        </div>
        <div className="text">
          <h1>Connecting has never been easier</h1>
        </div>
      </div>
    </>
  );
}
