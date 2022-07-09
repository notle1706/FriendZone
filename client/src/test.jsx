import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Collapse } from "react-bootstrap";
import Posts from "./components/posts/Posts";
import { getPost } from "./firebase";

export default function Test() {
  const [thisPost, setThisPost] = useState();
  useEffect(() => {
    const tempFunc = async () => {
      const thisPost = await getPost("LpUwA7UvCyFkDhVmfmqj");
      console.log(thisPost);
      setThisPost(thisPost);
    };
    tempFunc();
  }, []);
  console.log(thisPost);
  return <>Hello world</>;
}
