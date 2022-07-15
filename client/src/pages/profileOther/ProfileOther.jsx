import "./profileother.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo, getUserEmail } from "../../firebase";
import Posts from "../../components/posts/Posts";
import Button from "react-bootstrap/Button";

function ProfileData(props) {
  return (
    <>
      <div className="col d-flex justify-content-center">
        <div className="card">
          <h3 className="module-text">Modules</h3>
          <div>{props.displayMods}</div>
        </div>
      </div>
      <div className="col d-flex justify-content-center">2</div>
    </>
  );
}

function MyPosts(props) {
  return (
    <>
      <div className="col-8">
        <Posts userPosts={props.userPosts} />
      </div>
    </>
  );
}

function MyComments() {
  return (
    <>
      <div className="col-8"></div>
    </>
  );
}

function ProfileOther() {
  const params = useParams();
  const [ownUserEmail, setOwnUserEmail] = useState();
  const [userInfo, setUserInfo] = useState("info placeholder");
  const [userEmail, setUserEmail] = useState();
  const [postNo, setPostno] = useState();
  const [commentNo, setCommentNo] = useState();
  const [mods, setMods] = useState();
  const [displayMods, setDisplayMods] = useState();
  const [picurl, setPicUrl] = useState();
  const [profilePage, setProfilePage] = useState("profile");
  const [userPosts, setUserPosts] = useState();
  useEffect(() => {
    const getData = async () => {
      const newUserEmail = params.id;
      const userInfo = await getUserInfo(newUserEmail);
      const ownEmail = await getUserEmail();
      setOwnUserEmail(ownEmail);
      setUserEmail(newUserEmail);
      setUserInfo(userInfo);
      setPostno(userInfo.posts.length);
      setMods(userInfo.modulesTaken);
      setPicUrl(userInfo.profilePicture);
      setUserPosts(userInfo.posts);
      setCommentNo(userInfo.comments.length);
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
      <div className="container-fluid profile-navigation pt-4 px-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              role="button"
              className={
                profilePage == "profile" ? "nav-link active" : "nav-link"
              }
              onClick={() => setProfilePage("profile")}
            >
              Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              role="button"
              className={
                profilePage == "posts" ? "nav-link active" : "nav-link"
              }
              onClick={() => setProfilePage("posts")}
            >
              Posts
            </a>
          </li>
          <li className="nav-item">
            <a
              role="button"
              className={
                profilePage == "comments" ? "nav-link active" : "nav-link"
              }
              onClick={() => setProfilePage("comments")}
            >
              Comments
            </a>
          </li>
        </ul>
      </div>

      <div className="container-fluid mt-5">
        <div className="row">
          {profilePage == "profile" ? (
            <ProfileData displayMods={displayMods} />
          ) : profilePage == "posts" ? (
            <MyPosts userPosts={userPosts} />
          ) : profilePage == "comments" ? (
            <MyComments />
          ) : null}

          <div className="col d-flex justify-content-center">
            <div className="card ">
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

                <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                  <div className="stats">
                    <h6 className="mb-0">Posts</h6>
                    <span>{postNo}</span>
                  </div>

                  <div className="stats">
                    <h6 className="mb-0">Comments</h6>
                    <span>{commentNo}</span>
                  </div>

                  <div className="stats">
                    <h6 className="mb-0">Karma</h6>
                    <span>129</span>
                  </div>
                </div>
                <div>
                  {ownUserEmail != userEmail ? (
                    <Button>Add friend</Button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileOther;
