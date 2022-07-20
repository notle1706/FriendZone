import React, { useState } from "react";
import "./sidebar.css";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Fab from "@mui/material/Fab";

export default function Sidebar() {
  /* setSidebar is a hook that toggles the sidebar */

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  /* Each item in the sidebar should light up when
     that particular page is being accessed. 
     Not implimented yet*/

  const [clicked, setClicked] = useState(false);
  const clickItem = () => setClicked(true);

  return (
    <>
      {/* The button which toggles the sidebar*/}
      <Link to="#" className="menu-bars">
        <Fab color="primary" aria-label="add">
          <Menu className="menu" onClick={showSidebar} />
        </Fab>
      </Link>

      {/* Shows the sidebar if it is active*/}
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        {/* We capture the items in the sidebar using a list */}
        <ul className="nav-menu-items list-group ">
          {SidebarData.map((item, index) => {
            return (
              <li
                key={index}
                className={clicked ? item.cName + " active" : item.cName}
                onClick={clickItem}
              >
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
