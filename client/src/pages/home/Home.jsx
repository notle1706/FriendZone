import React, { useState, Fragment } from "react";
import "./home.css";
import Calendar from "@ericz1803/react-google-calendar"
import { css } from "@emotion/react";


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
   /* highlight today by making the text red and giving it a red border */
    color: blue;
    border: 1px solid blue;
  `
}

function Home() {
  return (
    <>
      <div
        style={{
          width: "20%",

        }}>
        <Calendar apiKey={API_KEY} calendars={calendars} styles={styles} />
      </div>

    </>

  )
}


export default Home;
