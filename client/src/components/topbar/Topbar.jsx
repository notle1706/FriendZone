import "./topbar.css";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";

function Topbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <span className="logo">FriendZone</span>
      </div>
      <>
        {loggedIn ? (
          <>
            <div className="topbarCenter">
              <div className="searchBar">
                <SearchIcon className="searchIcon" />
                <input
                  placeholder="Search for friend, post, or module"
                  className="searchInput"
                />
              </div>
            </div>
            <div className="topbarRight">
              <div className="topbarLinks">
                <span className="topbarLink">Profile</span>
              </div>
              <div className="topbarIcons">
                <div className="topbarIconItem">
                  <PersonIcon />
                  <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarIconItem">
                  <ChatIcon />
                  <span className="topbarIconBadge">2</span>
                </div>
                <div className="topbarIconItem">
                  <NotificationsIcon />
                  <span className="topbarIconBadge">1</span>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
}

export default Topbar;
