import React, { Component, useState, useEffect } from "react";
import "./DashboardS.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/AgentDashboard/homeDown.png";
import peopleDown from "../Assets/Images/AgentDashboard/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Images/AgentDashboard/vector.png";
import backgroundSecond from "../Assets/Images/AgentDashboard/other_bg.png";
import rentedOut from "../Assets/Images/AgentDashboard/rentedOut.png";
import sharedOut from "../Assets/Images/AgentDashboard/sharedOut.png";
import shortListed from "../Assets/Images/AgentDashboard/shortListed.png";
import yetShared from "../Assets/Images/AgentDashboard/yetShared.png";
import PVbackground from "../Assets/Images/AgentDashboard/Pvbackground.png";
import newImg from "../Assets/Images/AgentDashboard/newImg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import BackButton from "../CommonButtonBack";
import Deactivateimg from "../Assets/Deactivate.png";
import CommonHeaderS from "../CommonHeaderS";

function DeactivateTenantS() {
  const [stateRender, setStateRender] = useState("rent");

  const token = localStorage.getItem("token");
  console.log(token);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    alert("You have been logged out.");
  };

  const handlePageAvailable = (value) => {
    // Custom search handling logic
    // e.preventDefault();
    console.log(value);
    console.log("hit hai");
    setStateRender(value);
    // setActivebgColor("#52796F");
    // setBorderColor("#DAF0EE");
    // activeColor("")

    // Perform search operations here
  };

  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${PVbackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeaderS title="Deactivate Buyer" color="#1E0058" />

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}
        <div
          className="containered form"
          style={{
            height: "250px",
            borderRadius: "15px",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              marginTop: "10px",
              whiteSpace: "nowrap",
            }}
          >
            <h4>
              <b>Are you deactivating the customer?</b>
            </h4>
            <div>
              <CommonTopButton
                bgColor="#52796F"
                borderColor="#A9C0BA"
                color="#FFFFFF"
                text="Rented From B8R"
                onclicked={() => handlePageAvailable("rent")}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#A9C0BA"
                color="#77A8A4"
                text="Rented Externally"
                onclicked={() => handlePageAvailable("delist")}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#A9C0BA"
                color="#77A8A4"
                text="Does not need anymore"
                onclicked={() => handlePageAvailable("rented")}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#A9C0BA"
                color="#77A8A4"
                text="Not responding"
                onclicked={() => handlePageAvailable("rented")}
              />
            </div>

            {/* </div> */}
            {/* for title and text */}
          </div>
        </div>

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}

        <div style={{ display: "flex", flexDirection: "row" }}>
          <img src={Deactivateimg} style={{ marginLeft: "130px" }} />
        </div>

        <Footer />
      </div>
    </>
  );
}
export default DeactivateTenantS;
