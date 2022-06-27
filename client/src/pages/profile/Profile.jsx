import "./profile.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function Profile() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card module-card">
              <h3 className="module-text">My Modules</h3>
              <div className="container"></div>
            </div>
          </div>
          <div className="col">2</div>
          <div className="col">
            <div class="container d-flex justify-content-center align-items-center">
              <div class="card profile-card">
                <div class="upper">
                  <img
                    src="https://i.imgur.com/Qtrsrk5.jpg"
                    class="img-fluid"
                  />
                </div>

                <div class="user text-center">
                  <div class="profile">
                    <img
                      src="https://i.imgur.com/JgYD2nQ.jpg"
                      class="rounded-circle"
                      width="80"
                    />
                  </div>
                </div>

                <div class="mt-5 text-center">
                  <h4 class="mb-0">Jack Ma</h4>
                  <span class="text-muted d-block mb-2">Barely hanging on</span>

                  <button class="btn btn-primary btn-sm follow">
                    Edit profile
                  </button>

                  <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                    <div class="stats">
                      <h6 class="mb-0">Posts</h6>
                      <span>2</span>
                    </div>

                    <div class="stats">
                      <h6 class="mb-0">Comments</h6>
                      <span>142</span>
                    </div>

                    <div class="stats">
                      <h6 class="mb-0">Karma</h6>
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
