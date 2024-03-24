import React, { Component, useEffect, useState } from "react";
import Dashboardcss from "../Dashboard.css";
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
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import noImg from "../Assets/Images/AgentDashboard/noImg.png";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import YetToShareComp from "./YetToShareComp";

function My_PropertyYTS() {
  const token = localStorage.getItem("token");
  console.log(token);

  const [loading, setLoading] = useState(false);
  const [responseProperty, setresponseProperty] = useState([]);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      axios
        .get(`https://b8rliving.com/property`, axiosConfig)
        .then((response) => {
          console.log(response.data.data);
          var propertiesData = response.data.data.properties;

          const sortedProperties = propertiesData.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          
          // Filter out properties where propertyDetails.purposeSale is true

          // Filter out properties where propertyDetails.purposeSale is true
          const yetToShareProperties = propertiesData.filter((property) => {
            return (
              property.status === "Verified" &&
              property.sharedProperty.length === 0
            );
          });

          // var myArrayPropertyCount = response.data.data.properties;
          //   setresponseNoImageProperty(noImageProperties);

          setresponseProperty(yetToShareProperties || sortedProperties);
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
      setLoading(false);
    };

    fetchPosts();
  }, []);

  console.log(responseProperty);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    alert("You have been logged out.");
  };

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

  return (
    <>
      <div
        className=""
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${PVbackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {/* <h2 style={{color:"#52796F"}}>My Properties</h2> */}
        <CommonHeader title="My Properties" color="#52796F" />

        {/* -------------------------------button---------------------------------------------- */}
        <div className="px-[0.5rem] py-[1rem] pt-[2rem]">
          <div className="grid grid-cols-2 gap-x-[0.5rem]">
            <Link to="/My_PropertyPV">
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#A9C0BA"
                color="#77A8A4"
                text="Pending Verification"
                //        onclicked={handlePageAvailable}
              />
            </Link>
            <Link to="/My_PropertyYTS">
              <CommonTopButton
                bgColor="#52796F"
                borderColor="#DAF0EE"
                color="#DAF0EE"
                text="Yet to Share "
                //        onclicked={handlePageAvailable}
              />
            </Link>
          </div>
        </div>
        <div className="px-[0.5rem]">
          <div className="grid grid-cols-2 gap-x-[0.5rem]">
            <Link to="/My_PropertyS">
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#A9C0BA"
                color="#77A8A4"
                text="Shortlisted"
                //        onclicked={handlePageAvailable}
              />
            </Link>
            <Link to="/My_PropertySNA">
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#A9C0BA"
                color="#77A8A4"
                text="Shared "
                //        onclicked={handlePageAvailable}
              />
            </Link>
          </div>
        </div>
        {/* -------------------------------button---------------------------------------------- */}

        {/* BODY */}
        <div className="px-[1rem] py-[2rem] text-[1.2rem]">
          {/* <text>
            Hey {name},<br />
            Properties shown here are <b>NOT VERIFIED</b>. Correct wherever
            necessary to get them ready to share
          </text> */}
          <p className="pb-[0.5rem] font-bold">Hey {name} ,</p>
          <p>
            Properties shown here are ready to be <b>rented out</b> & but are{" "}
            <b>
              <span style={{ color: "#B30808" }}>not yet shared</span>
            </b>{" "}
            with any tenant{" "}
          </p>
        </div>

        <YetToShareComp responseProperty={responseProperty} />

        <div className="py-[2rem] flex justify-center items-center">
          <Link to="/AllTenantOne">
            <CommonBtn title="Share with Tenant" />
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default My_PropertyYTS;