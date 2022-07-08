import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse } from "react-bootstrap";
import Posts from "./pages/posts/posts";

export default function Test() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Posts />
    </>
  );
}
