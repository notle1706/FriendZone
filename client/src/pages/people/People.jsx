import "./people.css";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import DropdownUsers from "../../components/dropdownUsers/DropdownUsers";
import { useNavigate } from "react-router-dom";

function People() {
  const navigate = useNavigate();
  const [pageContents, setPageContents] = useState("find users");

  const handleClickUser = (event) => {
    navigate(`/dashboard/profile/${event.value}`);
  };
  return (
    <>
      <div className="container">
        <div className="main-body p-0">
          <div className="inner-wrapper">
            {/* Inner sidebar */}
            <div className="inner-sidebar">
              {/* Inner sidebar header */}
              <div className="inner-sidebar-header justify-content-center"></div>
              {/* /Inner sidebar header */}

              {/* Inner sidebar body */}
              <Nav variant="pills" defaultActiveKey="#" className="flex-column">
                <Nav.Link
                  eventKey="find-users"
                  onClick={() => setPageContents("find users")}
                >
                  Find users
                </Nav.Link>
                <Nav.Link
                  eventKey="find-groups"
                  onClick={() => setPageContents("find groups")}
                >
                  Find groups
                </Nav.Link>
                <Nav.Link eventKey="future-link" disabled>
                  Other feature
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
                  <option selected="">Placeholder function</option>
                  <option value="1">1</option>
                  <option value="3">2</option>
                  <option value="3">3</option>
                  <option value="3">4</option>
                </select>
                <span className="input-icon input-icon-sm ml-auto w-auto">
                  <input
                    type="text"
                    className="form-control form-control-sm bg-gray-200 border-gray-200 shadow-none mb-4 mt-4"
                    placeholder="Search"
                  />
                </span>
              </div>
              {/* /Inner main header */}

              {/* Inner main body */}
              {pageContents === "find users" ? (
                <div className="container p-3">
                  <DropdownUsers
                    placeholder="Find users by username, email"
                    onchange={handleClickUser}
                  />{" "}
                </div>
              ) : pageContents === "find groups" ? null : null}

              {/* /Inner main body */}
            </div>
            {/* /Inner main */}
          </div>
        </div>
      </div>
    </>
  );
}

export default People;
