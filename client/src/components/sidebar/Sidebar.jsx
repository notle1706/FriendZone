import "./sidebar.css";
import Button from "@mui/material/Button";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <img src="src\assets\person\pfp.jpg" alt="" className="pfp" />
        <span className="profileName">Nick West</span>

        <div className="username">@amongus</div>
        <ul className="sidebarList">
          <li className="sidebarIcon">Home</li>
          <li className="sidebarIcon">People</li>
          <li className="sidebarIcon">Groups</li>
          <li className="sidebarIcon">Messages</li>
          <li className="sidebarIcon">Settings</li>
        </ul>
      </div>
      <div className="moduleWrapper">
        <div className="modules">
          Modules
          <span className="moreButton">...</span>
        </div>
        <div className="btnGroup">
          <button>CN3222</button>
          <button>CS1231</button>
          <button>FIN2704</button>
          <button>FSP4003</button>
          <button>DBA4811</button>
        </div>
      </div>
      <div className="interestGroups">
        Interest Groups<span className="moreButton">...</span>
      </div>
      <div className="btnGroup">
        <button>Piano</button>
        <button>Stage</button>
        <button>StartIT</button>
      </div>
    </div>
  );
}
