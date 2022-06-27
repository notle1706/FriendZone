import React from "react";
import {
  Menu,
  Close,
  Home,
  Forum,
  People,
  Person,
  Message,
  Settings,
} from "@mui/icons-material";

export const SidebarData = [
  {
    title: "Home",
    path: "/dashboard/home",
    icon: <Home />,
    cName: "nav-text",
  },
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: <Person />,
    cName: "nav-text",
  },
  {
    title: "Discussions",
    path: "/dashboard/discussions",
    icon: <Forum />,
    cName: "nav-text",
  },
  {
    title: "People",
    path: "/dashboard/people",
    icon: <People />,
    cName: "nav-text",
  },
  {
    title: "Messages",
    path: "/dashboard/messages",
    icon: <Message />,
    cName: "nav-text",
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <Settings />,
    cName: "nav-text",
  },
];
