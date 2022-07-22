import React, { useState, useEffect } from "react";
import "./home.css";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { css } from "@emotion/react";
import { auth, getUserInfo, firestore, getUserEmail } from "../../firebase";

function Home() {
  const [userInfo, setUserInfo] = useState("info placeholder");
  const [userEmail, setUserEmail] = useState();
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const getData = async () => {
      const newUserEmail = await getUserEmail();
      const userInfo = await getUserInfo(newUserEmail);
      setUserEmail(newUserEmail);
      setUserInfo(userInfo);
    };
    getData();
    return () => console.log("get user data cleanup");
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 p-4">
            <h2>Welcome back, {userInfo.displayName}!</h2>
          </div>
          <div className="col-sm-4"></div>
          <div className="col-sm-4 p-4 d-flex flex-row-reverse">
            <Calendar value={value} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
