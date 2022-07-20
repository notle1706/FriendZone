import React, { useState, useEffect } from "react";
import "./home.css";
import Calendar from "@ericz1803/react-google-calendar"
import { css } from "@emotion/react";
import { auth, getUserInfo, firestore, getUserEmail } from "../../firebase";


const API_KEY = "AIzaSyAshjaeOnAhZ27gZ3nM59dUZkWOAtDPa_E";
let calendars = [
  {
    calendarId: "friendzone.orbital2022@gmail.com",
    color: "#B241D1"
  },
];

let styles = {
  //you can use object styles (no import required)
  calendar: {
    borderWidth: "10px", //make outer edge of calendar thicker
  },

  //you can also use emotion's string styles
  today: css`
    color: blue;
    border: 1px solid blue;
  `
}

function Home() {
  const [userInfo, setUserInfo] = useState("info placeholder");
  const [userEmail, setUserEmail] = useState();

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
      <div className="container">
        <div className="row">
          <div className="col-sm-10"><h1>Welcome Back {userInfo.displayName}</h1></div>
          <div className="col-sm-2"><Calendar apiKey={API_KEY} calendars={calendars} styles={styles} /></div>
        </div>
      </div>

    </>

  )
}


export default Home;
