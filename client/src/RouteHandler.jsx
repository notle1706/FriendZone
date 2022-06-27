import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Home from "./pages/home/Home";
import Discussions from "./pages/discussions/Discussions";
import People from "./pages/people/People";
import Profile from "./pages/profile/Profile";
import Messages from "./pages/messages/Messages";
import Settings from "./pages/settings/Settings";
import Sidebar from "./components/sidebar/Sidebar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function RouteHandler() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="discussions" element={<Discussions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="people" element={<People />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}
