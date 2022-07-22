import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./posts.css";
import {
  getPosts,
  getDate,
  getPostsByMod,
  getPostsFromUser,
  getUserInfo,
} from "../../firebase";

export function PostList(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="inner-main-body p-2 p-sm-3 forum-content">
        <div className="post mb-2">
          <div className="post-body">
            <div className="media forum-item">
              <a className="post-link">
                <img
                  type="button"
                  src={props.profilePic}
                  className="rounded-circle"
                  width="50"
                  alt="User"
                  style={{ objectFit: "cover" }}
                  onClick={
                    props.userEmail === "Anonymous"
                      ? null
                      : () => {
                          navigate(`/dashboard/profile/${props.userEmail}`);
                        }
                  }
                />
                <span>{props.mod}</span>
              </a>
              <div className="media-body ml-3">
                <a className="text-secondary">{props.user}</a>
                <small className="text-muted ml-2">{props.dateCreated}</small>
                <Link className="title" to={"/dashboard/postpage/" + props.id}>
                  <h5 className="mt-1">{props.title}</h5>
                </Link>
                <div className="mt-3 font-size-sm">
                  {props.briefDescription}
                </div>
              </div>
              <div className="text-muted small text-center">
                <span className="d-none d-sm-inline-block">
                  <i className="far fa-eye"></i> {props.viewCount}
                </span>
                <span>
                  <i className="far fa-comment ml-2"></i> {props.commentNo}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Posts(props) {
  switch (true) {
    case props.homepg != null: {
      const [snapshot, setSnapshot] = useState();
      const [postsData, setPostsdata] = useState([]);

      useEffect(() => {
        const testFunction = async () => {
          const snapshot = await getPosts("dateCreated", "desc");
          setSnapshot(snapshot);
          var snapshotArray = [];
          snapshot.forEach((doc) => snapshotArray.push(doc));
          for (const doc of snapshotArray.slice(0, 3)) {
            const date = getDate(doc.data().dateCreated.toDate());
            let props;

            const userInfo =
              doc.data().user === "Anonymous"
                ? null
                : await getUserInfo(doc.data().user);
            props = {
              userEmail: doc.data().user,
              id: doc.data().id,
              user: userInfo ? userInfo.displayName : "Anonymous",
              dateCreated: date,
              title: doc.data().title,
              briefDescription: doc.data().briefDescription,
              viewCount: doc.data().viewCount,
              likeCount: doc.data().likeCount,
              mod: doc.data().mod,
              profilePic: userInfo
                ? userInfo.profilePicture
                : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
            };

            setPostsdata((arr) => [...arr, <PostList {...props} />]);
          }
        };
        testFunction();
      }, []);
      return <>{postsData.map((post) => post)}</>;
    }
    case props.mod != null:
      {
        const [snapshot, setSnapshot] = useState();
        const [postsData, setPostsdata] = useState([]);

        useEffect(() => {
          const testFunction = async () => {
            const snapshot = await getPostsByMod(
              props.mod,
              "dateCreated",
              "desc"
            );
            setSnapshot(snapshot);
            var snapshotArray = [];
            snapshot.forEach((doc) => snapshotArray.push(doc));
            for (const doc of snapshotArray) {
              const date = getDate(doc.data().dateCreated.toDate());
              let props;

              const userInfo = await getUserInfo(doc.data().user);
              props = {
                userEmail: doc.data().user,
                id: doc.data().id,
                user: userInfo ? userInfo.displayName : "Anonymous",
                dateCreated: date,
                title: doc.data().title,
                briefDescription: doc.data().briefDescription,
                viewCount: doc.data().viewCount,
                likeCount: doc.data().likeCount,
                mod: doc.data().mod,
                profilePic: userInfo
                  ? userInfo.profilePicture
                  : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
              };

              setPostsdata((arr) => [...arr, <PostList {...props} />]);
            }
          };
          testFunction();
        }, []);

        return <>{postsData.map((post) => post)}</>;
      }
      break;
    case props.userPosts != null:
      {
        const [snapshot, setSnapshot] = useState();
        const [postsData, setPostsdata] = useState([]);

        useEffect(() => {
          const testFunction = async () => {
            const snapshot = await getPostsFromUser(
              props.userPosts,
              "dateCreated",
              "desc"
            );
            setSnapshot(snapshot);
            var snapshotArray = [];
            snapshot.forEach((doc) => snapshotArray.push(doc));

            for (const doc of snapshotArray) {
              const date = getDate(doc.data().dateCreated.toDate());
              let props;

              const userInfo = await getUserInfo(doc.data().user);
              props = {
                userEmail: doc.data().user,
                id: doc.data().id,
                user: userInfo ? userInfo.displayName : "Anonymous",
                dateCreated: date,
                title: doc.data().title,
                briefDescription: doc.data().briefDescription,
                viewCount: doc.data().viewCount,
                likeCount: doc.data().likeCount,
                mod: doc.data().mod,
                profilePic: userInfo
                  ? userInfo.profilePicture
                  : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
              };

              setPostsdata((arr) => [...arr, <PostList {...props} />]);
            }
          };
          testFunction();
        }, []);

        return <>{postsData.map((post) => post)}</>;
      }
      break;
    default: {
      const [snapshot, setSnapshot] = useState();
      const [postsData, setPostsdata] = useState([]);

      useEffect(() => {
        const testFunction = async () => {
          const snapshot = await getPosts("dateCreated", "desc");
          setSnapshot(snapshot);
          var snapshotArray = [];
          snapshot.forEach((doc) => snapshotArray.push(doc));
          for (const doc of snapshotArray) {
            const date = getDate(doc.data().dateCreated.toDate());
            let props;

            const userInfo =
              doc.data().user === "Anonymous"
                ? null
                : await getUserInfo(doc.data().user);
            props = {
              userEmail: doc.data().user,
              id: doc.data().id,
              user: userInfo ? userInfo.displayName : "Anonymous",
              dateCreated: date,
              title: doc.data().title,
              briefDescription: doc.data().briefDescription,
              viewCount: doc.data().viewCount,
              likeCount: doc.data().likeCount,
              mod: doc.data().mod,
              profilePic: userInfo
                ? userInfo.profilePicture
                : "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
            };

            setPostsdata((arr) => [...arr, <PostList {...props} />]);
          }
        };
        testFunction();
      }, []);
      return <>{postsData.map((post) => post)}</>;
    }
  }
}
