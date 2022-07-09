import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./posts.css";
import { getPosts, getDate } from "../../firebase";
import { DocumentSnapshot, toDate } from "firebase/firestore";

export function PostList(props) {
  return (
    <>
      <div className="inner-main-body p-2 p-sm-3 forum-content">
        <div className="post mb-2">
          <div className="post-body">
            <div className="media forum-item">
              <a className="post-link">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  className="rounded-circle"
                  width="50"
                  alt="User"
                />
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
                  <i className="far fa-comment ml-2"></i> {props.likeCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Posts() {
  const [snapshot, setSnapshot] = useState();
  const [postsData, setPostsdata] = useState([]);

  useEffect(() => {
    const testFunction = async () => {
      const snapshot = await getPosts();
      setSnapshot(snapshot);
      snapshot.forEach((doc) => {
        const date = getDate(doc.data().dateCreated.toDate());
        let props = {
          id: doc.data().id,
          user: doc.data().user,
          dateCreated: date,
          title: doc.data().title,
          briefDescription: doc.data().briefDescription,
          viewCount: doc.data().viewCount,
          likeCount: doc.data().likeCount,
        };
        setPostsdata((arr) => [...arr, <PostList {...props} />]);
      });
    };
    testFunction();
  }, []);

  return <>{postsData.map((post) => post)}</>;
}
