import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./postPage.css";
import {
  getRawPost,
  getPost,
  getUserEmail,
  newComment,
  getUserInfo,
  getDate,
  setUserInfo,
  createUserNotification,
  removePost,
  removeComment,
} from "../../firebase";
import { updateDoc } from "firebase/firestore";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Comments from "../../components/comments/Comments";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PostPage() {
  const navigate = useNavigate();
  const [commentbody, setCommentbody] = useState();
  const params = useParams();
  const [myEmail, setMyEmail] = useState();
  const [showmodal, setShowmodal] = useState(false);
  const handleClose = () => setShowmodal(false);
  const handleShow = () => setShowmodal(true);
  const [showDelete, setShowdelete] = useState(false);
  const handleShowDelete = () => setShowdelete(true);
  const closeDelete = () => setShowdelete(false);
  const [thisPost, setThisPost] = useState();
  const [user, setUser] = useState("email loading");
  const [title, setTitle] = useState("title loading");
  const [time, setTime] = useState("time loading");
  const [discbody, setDiscbody] = useState("disc loading");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState();
  const [viewCount, setViewCount] = useState();
  const [mod, setMod] = useState();
  const [profilePic, setProfilePic] = useState();
  const [anon, setAnon] = useState(false);
  const [postEmail, setPostEmail] = useState("");

  useEffect(() => {
    const tempFunc = async () => {
      const thisPost = await getPost(params.id);
      if (!thisPost) {
        return console.log("Post not available");
      }
      const userInfo = await getUserInfo(thisPost.user);
      const myEmail = await getUserEmail();
      setMyEmail(myEmail);
      setPostEmail(thisPost.user);
      setThisPost(thisPost);
      setUser(
        thisPost.user === "Anonymous" ? "Anonymous" : userInfo.displayName
      );
      setProfilePic(
        thisPost.user === "Anonymous"
          ? "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
          : userInfo.profilePicture
      );
      setTitle(thisPost.title);
      setDiscbody(thisPost.body);
      setTime(getDate(thisPost.dateCreated.toDate()));
      setLikeCount(thisPost.likeCount);
      setViewCount(thisPost.viewCount);
      setComments(thisPost.comments);
      setMod(thisPost.mod);
    };
    tempFunc();
  }, []);

  const handleSetAnon = () => {
    setAnon(!anon);
  };
  const initAnon = () => {
    setAnon(false);
  };

  function refreshPage() {
    window.location.reload(false);
  }

  async function createComment() {
    const userEmail = myEmail;
    const userInfo = await getUserInfo(userEmail);
    const commentId = await newComment(userEmail, commentbody);
    const docRef = await getRawPost(params.id);
    const comments = thisPost.comments;
    await setUserInfo(userEmail, "comments", [...comments, commentId]);

    await updateDoc(docRef, { comments: [...comments, commentId] });
    if (postEmail != userEmail) {
      await createUserNotification(postEmail, userEmail, params.id);
    }
  }
  async function createAnonComment() {
    const commentId = await newComment("Anonymous", commentbody);
    const docRef = await getRawPost(params.id);

    await updateDoc(docRef, { comments: [...comments, commentId] });
    const notif = await createUserNotification(
      postEmail,
      "Anonymous",
      thisPost
    );
  }

  async function deletePostComments() {
    const myInfo = await getUserInfo(myEmail);
    comments.forEach(async (comment) => {
      await setUserInfo(
        myEmail,
        "comments",
        myInfo.comments.filter((myComment) => myComment != comment)
      );
      await removeComment(comment);
    });
  }

  async function deletePost() {
    await removePost(params.id);
    const myInfo = await getUserInfo(myEmail);
    await setUserInfo(
      myEmail,
      "posts",
      myInfo.posts.filter((post) => post != params.id)
    );
  }

  if (!thisPost) {
    return <div>This post is not available!</div>;
  }

  return (
    <>
      <Button onClick={() => navigate("/dashboard/discussions")}>Back</Button>
      <div className="inner-main-body p-2 p-sm-3 forum-content">
        <div className="post mb-2">
          <div className="post-body">
            <div className="media forum-item">
              <a className="post-link">
                <img
                  type="button"
                  src={profilePic}
                  className="rounded-circle"
                  width="50"
                  alt="User"
                  style={{ objectFit: "cover" }}
                  onClick={
                    postEmail === "Anonymous"
                      ? null
                      : () => navigate(`/dashboard/profile/${postEmail}`)
                  }
                />
              </a>
              <span>{mod}</span>
              {myEmail === postEmail ? (
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
                <a className="text-secondary">{user}</a>
                <small className="text-muted ml-2">{time}</small>
                <h5 className="mt-1">{title}</h5>
                <div className="mt-3 font-size-sm">{discbody}</div>
              </div>
              <div className="text-muted small text-center">
                <span className="d-none d-sm-inline-block">
                  <i className="far fa-eye"></i> {viewCount}
                </span>
                <span>
                  <i className="far fa-comment ml-2"></i> {0}
                </span>
                <Button
                  variant="link"
                  onClick={() => {
                    handleShow();
                    initAnon();
                  }}
                >
                  Add comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={showDelete} onHide={closeDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure?{" "}
          <div>
            <button
              className="btn btn-primary m-1"
              onClick={async () => {
                await deletePostComments();
                await deletePost();
                navigate("/dashboard/discussions");
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
      <Modal size="lg" show={showmodal} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Comment</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group
              onChange={(event) => setCommentbody(event.target.value)}
              className="mb-3"
              controlId="discussionArea"
            >
              <Form.Label>Comment here</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Stay anonymous"
                onChange={handleSetAnon}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                anon ? await createAnonComment() : await createComment();
                handleClose();
                refreshPage();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Comments comments={comments} postId={params.id} />
    </>
  );
}
