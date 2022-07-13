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
} from "../../firebase";
import { updateDoc } from "firebase/firestore";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Comments from "../../components/comments/Comments";

export default function PostPage() {
  const navigate = useNavigate();
  const [commentbody, setCommentbody] = useState();
  const params = useParams();
  const [showmodal, setShowmodal] = useState(false);
  const handleClose = () => setShowmodal(false);
  const handleShow = () => setShowmodal(true);
  const [thisPost, setThisPost] = useState();
  const [user, setUser] = useState("email loading");
  const [title, setTitle] = useState("title loading");
  const [time, setTime] = useState("time loading");
  const [discbody, setDiscbody] = useState("disc loading");
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState();
  const [viewCount, setViewCount] = useState();

  useEffect(() => {
    const tempFunc = async () => {
      const thisPost = await getPost(params.id);
      setThisPost(thisPost);
      setUser(thisPost.user);
      setTitle(thisPost.title);
      setDiscbody(thisPost.body);
      setTime(getDate(thisPost.dateCreated.toDate()));
      setLikeCount(thisPost.likeCount);
      setViewCount(thisPost.viewCount);
      setComments(thisPost.comments);
    };
    tempFunc();
  }, []);

  async function createComment() {
    const userEmail = await getUserEmail();
    const userInfo = await getUserInfo(userEmail);
    const commentId = await newComment(userInfo.displayName, commentbody);
    const docRef = await getRawPost(params.id);

    await updateDoc(docRef, { comments: [...comments, commentId] });
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
                  src="https://bootdey.com/img/Content/avatar/avatar1.png"
                  className="rounded-circle"
                  width="50"
                  alt="User"
                />
              </a>
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
                <Button variant="link" onClick={handleShow}>
                  Add comment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                createComment();
                handleClose();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Comments comments={comments} />
    </>
  );
}
