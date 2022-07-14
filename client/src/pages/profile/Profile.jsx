import "./profile.css";
import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import { setDoc, collection, getDocs, getDoc, doc } from "firebase/firestore";
import { auth, getUserInfo, firestore, getUserEmail } from "../../firebase";

function Profile() {
  const [userInfo, setUserInfo] = useState("info placeholder");
  const [userEmail, setUserEmail] = useState();
  const [postNo, setPostno] = useState();
  const [mods, setMods] = useState();
  const [displayMods, setDisplayMods] = useState();
  const [picurl, setPicUrl] = useState();
  useEffect(() => {
    const getData = async () => {
      const newUserEmail = await getUserEmail();
      const userInfo = await getUserInfo(newUserEmail);
      setUserEmail(newUserEmail);
      setUserInfo(userInfo);
      setPostno(userInfo.posts.length);
      setMods(userInfo.modulesTaken);
      setPicUrl(userInfo.profilePicture);
    };
    getData();
    return () => console.log("get user data cleanup");
  }, []);

  useEffect(() => {
    if (mods) {
      setDisplayMods(
        mods.map((mod) => {
          return (
            <span>
              <button type="button" className="mb-1 btn btn-outline-secondary">
                {mod}
              </button>
            </span>
          );
        })
      );
    }
    return () => console.log("cleanup render mod buttons");
  }, [mods]);

  let navigate = useNavigate();

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card module-card">
              <h3 className="module-text">My Modules</h3>
              <div>{displayMods}</div>
              <div className="container"></div>
            </div>
          </div>
          <div className="col">2</div>
          <div className="col">
            <div className="container d-flex justify-content-center align-items-center">
              <div className="card profile-card">
                <div className="upper">
                  <img
                    src="https://i.imgur.com/Qtrsrk5.jpg"
                    className="img-fluid"
                  />
                </div>

                <div className="user text-center">
                  <div className="profile">
                    <img src={picurl} className="rounded-circle" width="80" />
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <h4 className="mb-0">{userInfo.displayName}</h4>
                  <span className="text-muted d-block mb-2">
                    {userInfo.teleHandle}
                  </span>

                  <button className="btn btn-primary btn-sm follow">
                    <Link
                      className="text-light"
                      style={{ textDecoration: "none" }}
                      to="/dashboard/edit"
                    >
                      Edit profile
                    </Link>
                  </button>

                  <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                    <div className="stats">
                      <h6 className="mb-0">Posts</h6>
                      <span>{postNo}</span>
                    </div>

                    <div className="stats">
                      <h6 className="mb-0">Comments</h6>
                      <span>142</span>
                    </div>

                    <div className="stats">
                      <h6 className="mb-0">Karma</h6>
                      <span>129</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
