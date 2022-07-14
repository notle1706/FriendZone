import React, { useEffect, useState } from "react";
import "./discussions.css";
import Dropdown from "../../components/dropdown/Dropdown";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posts from "../../components/posts/Posts";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import {
  newPost,
  getUserEmail,
  getUserInfo,
  setUserInfo,
} from "../../firebase";
import Nav from "react-bootstrap/Nav";
import { SignalWifiStatusbarNullSharp } from "@mui/icons-material";

function Discussions() {
  const [errormsg, setErrormsg] = useState(false);
  const [pageContents, setPageContents] = useState("All posts");
  const [showmodal, setShowmodal] = useState(false);
  const handleClose = () => setShowmodal(false);
  const handleShow = () => setShowmodal(true);
  const [title, setTitle] = useState();
  const [mod, setMod] = useState();
  const [desc, setDesc] = useState();
  const [discbody, setDiscbody] = useState();
  const [searchmod, setSearchMod] = useState();

  const handleChange = (event) => {
    setPageContents(event.value);
  };

  const handleSetMod = (event) => {
    setMod(event.value);
  };

  useEffect(() => console.log(pageContents), [pageContents]);

  async function createPost() {
    const userEmail = await getUserEmail();
    const userInfo = await getUserInfo(userEmail);

    const newpost = await newPost(
      userInfo.displayName,
      title,
      mod,
      desc,
      discbody
    );
    const postAppend = [...userInfo.posts, newpost];
    setUserInfo(userEmail, "posts", postAppend);
  }
  function contentsEmpty() {
    if (!title || !mod || !desc || !discbody) {
      return true;
    } else return false;
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
              <Nav variant="pills" defaultActiveKey="#" className="flex-column">
                <Nav.Link
                  eventKey="all-posts"
                  onClick={() => setPageContents("All posts")}
                >
                  All posts
                </Nav.Link>
                <Nav.Link
                  onClick={() => setPageContents("Search by mods")}
                  eventKey="search-by-mod"
                >
                  Search by Mods
                </Nav.Link>
                <Nav.Link eventKey="future-link" disabled>
                  Other Discussions
                </Nav.Link>
                <Nav.Link eventKey="future-link" disabled>
                  Future feature
                </Nav.Link>
              </Nav>
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
              {pageContents === "All posts" ? (
                <div className="p-1 p-sm-3 collapse forum-content show overflow-auto">
                  <Posts />
                </div>
              ) : pageContents === "Search by mods" ? (
                <div className="p-1 p-sm-3 collapse forum-content show">
                  <Dropdown
                    onchange={handleChange}
                    placeholder="Search for your module here!"
                  />
                </div>
              ) : (
                <Posts mod={pageContents} />
              )}

              {/* /Forum List */}

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
                    <Form.Label>Modules</Form.Label>
                    <Dropdown onchange={handleSetMod} />
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
                    if (contentsEmpty()) {
                      setErrormsg(true);
                    } else {
                      createPost();
                      handleClose();
                    }
                  }}
                >
                  Save Changes
                </Button>
                <div>
                  <p className="text-danger">
                    {errormsg ? "Please make sure all fields are filled" : null}
                  </p>
                </div>
              </Modal.Footer>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Discussions;
