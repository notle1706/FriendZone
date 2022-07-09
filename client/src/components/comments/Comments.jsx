import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./comments.css";
import { getComment } from "../../firebase";
import { DocumentSnapshot, toDate } from "firebase/firestore";

export function CommentsList(props) {
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
                <a className="text-secondary">{props.userEmail}</a>
                <small className="text-muted ml-2">{props.dateCreated}</small>

                <div className="mt-3 font-size-sm">{props.body}</div>
              </div>
              <div className="text-muted small text-center">
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

export default function Comments(props) {
  const [commentsData, setCommentsdata] = useState([]);
  useEffect(() => {
    const testFunction = async () => {
      props.comments.forEach((docId) => {
        (async () => {
          const doc = await getComment(docId);
          console.log(doc);
          let props = {
            userEmail: doc.userEmail,
            dateCreated: doc.dateCreated.toDate().toString(),
            body: doc.body,
            likeCount: doc.likeCount,
          };
          setCommentsdata((arr) => [...arr, <CommentsList {...props} />]);
        })();
      });
    };
    testFunction();
  }, [props.comments]);

  return <>{commentsData.map((post) => post)}</>;
}
