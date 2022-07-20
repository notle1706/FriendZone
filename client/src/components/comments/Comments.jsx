import React, { useEffect, useState } from "react";
import "./comments.css";
import { useNavigate } from "react-router-dom";
import { getComment, getDate, getUserInfo } from "../../firebase";
export function CommentsList(props) {
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
                  onClick={
                    props.userEmail === "Anonymous"
                      ? null
                      : () => {
                          navigate(`/dashboard/profile/${props.userEmail}`);
                        }
                  }
                />
              </a>
              <div className="media-body ml-3">
                <a className="text-secondary">{props.user}</a>
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
          const userInfo = await getUserInfo(doc.user);
          console.log(doc);
          let props = {
            userEmail: doc.user,
            user: doc.user === "Anonymous" ? "Anonymous" : userInfo.displayName,
            profilePic:
              doc.user === "Anonymous"
                ? "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                : userInfo.profilePicture,
            dateCreated: getDate(doc.dateCreated.toDate()),
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
