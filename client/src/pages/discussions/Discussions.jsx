import React, { useState } from "react";
import "./discussions.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {
  newPost,
  getUserEmail,
  getUserInfo,
  setUserInfo,
} from "../../firebase";

function Discussions() {
  const [showmodal, setShowmodal] = useState(false);
  const handleClose = () => setShowmodal(false);
  const handleShow = () => setShowmodal(true);
  const [title, setTitle] = useState();
  const [course, setCourse] = useState();
  const [desc, setDesc] = useState();
  const [discbody, setDiscbody] = useState();

  async function createPost() {
    const userEmail = await getUserEmail();
    const userInfo = await getUserInfo(userEmail);

    const newpost = await newPost(
      userInfo.displayName,
      title,
      course,
      desc,
      discbody
    );
    const postAppend = [...userInfo.posts, newpost];
    setUserInfo(userEmail, "posts", postAppend);
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css"
        integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o="
        crossOrigin="anonymous"
      />
      <div className="container">
        <div className="main-body p-0">
          <div className="inner-wrapper">
            {/* Inner sidebar */}
            <div className="inner-sidebar">
              {/* Inner sidebar header */}
              <div className="inner-sidebar-header justify-content-center">
                <button
                  className="btn btn-primary has-icon btn-block"
                  type="button"
                  onClick={handleShow}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-plus mr-2"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  NEW DISCUSSION
                </button>
              </div>
              {/* /Inner sidebar header */}

              {/* Inner sidebar body */}

              {/* /Inner sidebar body */}
            </div>
            {/* /Inner sidebar */}

            {/* Inner main */}
            <div className="inner-main">
              {/* Inner main header */}
              <div className="inner-main-header">
                <a
                  className="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none"
                  href="#"
                  data-toggle="inner-sidebar"
                >
                  <i className="material-icons">arrow_forward_ios</i>
                </a>
                <select className="custom-select custom-select-sm w-auto mr-1">
                  <option selected="">Latest</option>
                  <option value="1">Popular</option>
                  <option value="3">Solved</option>
                  <option value="3">Unsolved</option>
                  <option value="3">No Replies Yet</option>
                </select>
                <span className="input-icon input-icon-sm ml-auto w-auto">
                  <input
                    type="text"
                    className="form-control form-control-sm bg-gray-200 border-gray-200 shadow-none mb-4 mt-4"
                    placeholder="Search forum"
                  />
                </span>
              </div>
              {/* /Inner main header */}

              {/* Inner main body */}

              {/* Forum List */}
              <div className="inner-main-body p-2 p-sm-3 collapse forum-content show">
                <Posts />
                <ul className="pagination pagination-sm pagination-circle justify-content-center mb-0">
                  <li className="page-item disabled">
                    <span className="page-link has-icon">
                      <i className="material-icons">chevron_left</i>
                    </span>
                  </li>
                  <li className="page-item">
                    <a className="page-link">1</a>
                  </li>
                  <li className="page-item active">
                    <span className="page-link">2</span>
                  </li>
                  <li className="page-item">
                    <a className="page-link">3</a>
                  </li>
                  <li className="page-item">
                    <a className="page-link has-icon">
                      <i className="material-icons">chevron_right</i>
                    </a>
                  </li>
                </ul>
              </div>
              {/* /Forum List */}

              {/* Forum Detail */}
              <div
                className="inner-main-body p-2 p-sm-3 collapse forum-content"
                id="collapseExample"
              >
                <a
                  href="#"
                  className="btn btn-light btn-sm mb-3 has-icon"
                  data-toggle="collapse"
                  data-target=".forum-content"
                >
                  <i className="fa fa-arrow-left mr-2"></i>Back
                </a>
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
                        <small className="d-block text-center text-muted">
                          Newbie
                        </small>
                      </a>
                      <div className="media-body ml-3">
                        <a className="text-secondary">Mokrani</a>
                        <small className="text-muted ml-2">1 hour ago</small>
                        <h5 className="mt-1">Realtime fetching data</h5>
                        <div className="mt-3 font-size-sm">
                          <p>Hellooo :)</p>
                          <p>
                            I'm newbie with laravel and i want to fetch data
                            from database in realtime for my dashboard anaytics
                            and i found a solution with ajax but it dosen't work
                            if any one have a simple solution it will be helpful
                          </p>
                          <p>Thank</p>
                        </div>
                      </div>
                      <div className="text-muted small text-center">
                        <span className="d-none d-sm-inline-block">
                          <i className="far fa-eye"></i> 19
                        </span>
                        <span>
                          <i className="far fa-comment ml-2"></i> 3
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post mb-2">
                  <div className="post-body">
                    <div className="media forum-item">
                      <a className="post-link">
                        <img
                          src="https://bootdey.com/img/Content/avatar/avatar2.png"
                          className="rounded-circle"
                          width="50"
                          alt="User"
                        />
                        <small className="d-block text-center text-muted">
                          Pro
                        </small>
                      </a>
                      <div className="media-body ml-3">
                        <a className="text-secondary">drewdan</a>
                        <small className="text-muted ml-2">1 hour ago</small>
                        <div className="mt-3 font-size-sm">
                          <p>What exactly doesn't work with your ajax calls?</p>
                          <p>
                            Also, WebSockets are a great solution for realtime
                            data on a dashboard. Laravel offers this out of the
                            box using broadcasting
                          </p>
                        </div>
                        <button className="btn btn-xs text-muted has-icon">
                          <i className="fa fa-heart" aria-hidden="true"></i>1
                        </button>
                        <a className="text-muted small">Reply</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Forum Detail */}

              {/* /Inner main body */}
            </div>
            {/* /Inner main */}
          </div>

          {/* New Thread Modal */}
          <Modal
            size="lg"
            show={showmodal}
            onHide={handleClose}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title>New discussion</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <Row className="g-2">
                  <Col md>
                    <Form.Group
                      onChange={(event) => setTitle(event.target.value)}
                      className="mb-3"
                      controlId="discussionArea"
                    >
                      <Form.Label>Title</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                  <Col md>
                    <Form.Group
                      onChange={(event) => setCourse(event.target.value)}
                      className="mb-3"
                      controlId="discussionArea"
                    >
                      <Form.Label>Course</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group
                  onChange={(event) => setDesc(event.target.value)}
                  className="mb-3"
                  controlId="discussionArea"
                >
                  <Form.Label>Brief description</Form.Label>
                  <Form.Control as="textarea" rows={1} />
                </Form.Group>
                <Form.Group
                  onChange={(event) => setDiscbody(event.target.value)}
                  className="mb-3"
                  controlId="discussionArea"
                >
                  <Form.Label>Discuss!</Form.Label>
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
                    createPost();
                    handleClose();
                  }}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Discussions;
