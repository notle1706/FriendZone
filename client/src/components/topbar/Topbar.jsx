import "./topbar.css";
import React, { useState } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";

function Topbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3">
          <span className="logo">FriendZone</span>
        </div>
        <>
          {loggedIn ? (
            <>
              <div className="col-5">
                <div className="input-group rounded mt-1">
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search for modules, people, and groups"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                  <Search id="search-addon" />
                </div>
              </div>
              <div className="col-1"></div>
              <div className="topbarIcons col-3 justify-content-end">
                <div className="topbarIconItem">
                  <Person />
                  <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                  <Chat />
                  <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                  <Notifications />
                  <span className="topbarIconBadge">1</span>
                </div>
              </div>
            </>
          ) : null}
        </>
      </div>
    </div>
  );
}

export default Topbar;
