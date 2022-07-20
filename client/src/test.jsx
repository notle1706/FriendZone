import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import FriendReq from "./components/friendreq/FriendReq";

export default function Test() {
  return (
    <>
      <div>
        <FriendReq
          ownEmail="yuchen.ma@ymail.com"
          friendEmail="bean@bean.bean"
        />
      </div>
    </>
  );
}
