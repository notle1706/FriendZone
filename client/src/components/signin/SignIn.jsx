import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./signin.css";
import { useAuth } from "../../contexts/AuthContext";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";
import { SettingsInputAntennaTwoTone } from "@mui/icons-material";

export default function SignIn(props) {
  let navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function sError(str) {
    setLoading(true);
    return setError(str);
  }

  const register = async () => {
    if (registerPassword !== confirmPassword) {
      sError("Passwords do not match");
      return;
    }
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((auth) => {
        console.log(auth);
      })
      .catch((error) => sError(error.message));
  };

  const login = async () => {
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((auth) => {
        navigate("/dashboard/home");
      })
      .catch((error) => sError(error.message));
  };

  const logout = async () => {};

  let [authMode, setAuthMode] = useState("signin");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(event) => {
                  setLoading(false);
                  setLoginEmail(event.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(event) => {
                  setLoading(false);
                  setLoginPassword(event.target.value);
                }}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                disabled={loading}
                className="btn btn-primary"
                onClick={login}
              >
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
            <p className="text-center mt-2 text-danger">{error}</p>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input className="form-control mt-1" placeholder="e.g Jane Doe" />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(event) => {
                setLoading(false);
                setRegisterEmail(event.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(event) => {
                setLoading(false);
                setRegisterPassword(event.target.value);
              }}
            />
          </div>
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(event) => {
                setLoading(false);
                setConfirmPassword(event.target.value);
              }}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="button"
              onClick={register}
              disabled={loading}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
          <p className="text-center mt-2 text-danger">{error}</p>
        </div>
      </form>
    </div>
  );
}
