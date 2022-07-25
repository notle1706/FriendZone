import React, { useEffect, useState } from "react";
import "./comments.css";
import { useNavigate } from "react-router-dom";
import {
  getComment,
  getDate,
  getUserInfo,
  getUserEmail,
  removeComment,
  setUserInfo,
  editPostComment,
  likeComment,
} from "../../firebase";
import Modal from "react-bootstrap/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

export function CommentsList(props) {
  const [showDelete, setShowdelete] = useState(false);
  const handleShowDelete = () => setShowdelete(true);
  const closeDelete = () => setShowdelete(false);
  const navigate = useNavigate();
  const [like, setLike] = useState(props.isLiked);
  const toggleLike = () => setLike(!like);
  if (like === null) {
    return <div>Loading</div>;
  }

  function refreshPage() {
    window.location.reload(false);
  }
  const deleteComment = async () => {
    await removeComment(props.commentId);
    const myInfo = await getUserInfo(props.userEmail);
    await setUserInfo(
      props.userEmail,
      "comments",
      myInfo.comments.filter((comment) => comment != props.commentId)
    );
    await editPostComment(props.postId, props.commentId);
  };
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
              <span
                className={
                  like ? "float-end d-flex text-primary" : "float-end d-flex"
                }
              >
                <FavoriteIcon
                  type="button"
                  onClick={async () => {
                    await likeComment(props.myEmail, props.commentId);
                    toggleLike();
                  }}
                />
              </span>
              {props.myEmail === props.userEmail ? (
                <span className="float-end">
                  <button
                    className="btn btn-secondary"
                    onClick={handleShowDelete}
                  >
                    <DeleteIcon />
                  </button>
                </span>
              ) : null}

              <div className="media-body ml-3">
                <a className="text-secondary">{props.user}</a>
                <small className="text-muted ml-2">{props.dateCreated}</small>

                <div className="mt-3 font-size-sm">{props.body}</div>
              </div>
              <div className="text-muted small text-center">
                <span>
                  <FavoriteIcon /> {props.likeCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showDelete} onHide={closeDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?{" "}
          <div>
            <button
              className="btn btn-primary m-1"
              onClick={async () => {
                await deleteComment();
                refreshPage();
              }}
            >
              Yes
            </button>
            <button className="btn btn-primary m-1" onClick={closeDelete}>
              No
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default function Comments(props) {
  const [commentsData, setCommentsdata] = useState([]);
  const [myEmail, setMyEmail] = useState();

  useEffect(() => {
    const testFunction = async () => {
      const myEmail = await getUserEmail();
      const thisUserInfo = await getUserInfo(myEmail);
      setMyEmail(myEmail);
      const postId = props.postId;
      props.comments.forEach((docId) => {
        (async () => {
          const doc = await getComment(docId);
          const userInfo = await getUserInfo(doc.user);
          const IsLiked = thisUserInfo.likedComments.includes(docId);

          let props = {
            postId: postId,
            commentId: docId,
            myEmail: myEmail,
            userEmail: doc.user,
            user: doc.user === "Anonymous" ? "Anonymous" : userInfo.displayName,
            profilePic:
              doc.user === "Anonymous"
                ? "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                : userInfo.profilePicture,
            dateCreated: getDate(doc.dateCreated.toDate()),
            body: doc.body,
            likeCount: doc.likeCount,
            isLiked: IsLiked,
          };
          setCommentsdata((arr) => [...arr, <CommentsList {...props} />]);
        })();
      });
    };
    testFunction();
  }, [props.comments]);

  return <>{commentsData.map((post) => post)}</>;
}
