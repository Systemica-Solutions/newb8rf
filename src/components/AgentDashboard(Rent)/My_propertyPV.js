//--------------------------PROPERTY PENDING VERIFICATION---------------------------------//

import React, { Component, useState, useEffect } from "react";
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
import AllPropertiesComp from "./AllPropertiesComp";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import ListingComp2 from "../AgentDashboard(Rent)/ListingComp";

function My_propertyPV() {
  const [loading, setLoading] = useState(false);
  const [responseNoImageProperty, setresponseNoImageProperty] = useState([]);
  const [responseProperty, setresponseProperty] = useState([]);
  const [fieldAgentStatus, setFieldAgentStatus] = useState("Pending"); // Default status
  const [imagesApproved, setimagesApproved] = useState("Pending"); // Default status

  const token = localStorage.getItem("token");
  //   console.log(token);

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
          // Filter out properties where propertyDetails.purposeSale is true

          // Filter out properties where propertyDetails.purposeSale is true
          const underReviewProperties = propertiesData.filter((property) => {
            return (
              property.fieldAgentStatus === "Completed" &&
              property.status === "Pending"
            );
          });

          const sortedProperties = response.data.data.properties.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          });

          const noImageProperties = propertiesData.filter((property) => {
            return (
              property.status !== "Closed" &&
              property.images.length == 0 &&
              (property.fieldAgentStatus === "DetailsCompleted" ||
                property.fieldAgentStatus === "Unassigned")
            );
          });

          // var myArrayPropertyCount = response.data.data.properties;
          setresponseProperty(underReviewProperties || sortedProperties);
          setresponseNoImageProperty(noImageProperties);
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

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

  // Function to update both fieldAgentStatus and imagesApproved
  const updateFilterConditions = (newStatus, newImagesApproved) => {
    setFieldAgentStatus(newStatus);
    setimagesApproved(newImagesApproved);
  };

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
            <CommonTopButton
              bgColor="#52796F"
              borderColor="#DAF0EE"
              color="#DAF0EE"
              text="Pending Verification"
              onClick={() => updateFilterConditions("Pending", false)}
              //        onclicked={handlePageAvailable}
            />
            <Link to="/My_PropertyYTS">
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#DAF0EE"
                color="#77A8A4"
                text="Yet to Share "
                onClick={() => updateFilterConditions("Completed", true)}
              />
            </Link>
          </div>
        </div>
        <div className="px-[0.5rem]">
          <div className="grid grid-cols-2 gap-x-[0.5rem]">
            <Link to="/My_PropertyS">
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#DAF0EE"
                color="#77A8A4"
                text="Shortlisted"
                //   onClick={() => updateFieldAgentStatus('verified')}
              />
            </Link>
            <Link to="/My_PropertySNA">
              <CommonTopButton
                bgColor="#D2D7D6"
                borderColor="#DAF0EE"
                color="#77A8A4"
                text="Shared "
                //   onClick={() => updateFieldAgentStatus('verified')}
              />
            </Link>
          </div>
        </div>
        {/* -------------------------------button ends---------------------------------------------- */}
        {/* BODY */}
        <div className="px-[1rem] py-[2rem] text-[1.2rem]">
          {/* <text>
            Hey {name},<br />
            Properties shown here are <b>NOT VERIFIED</b>. Correct wherever
            necessary to get them ready to share
          </text> */}
          <p className="pb-[0.5rem] font-bold">Hey {name} ,</p>
          <p>
            Properties shown here are YET TO BE VERIFIED
          </p>
        </div>
        {/* --------------------------------------first tab-------------------------------------------- */}
        <ListingComp2
          responseNoImageProperty={responseNoImageProperty}
          responseProperty={responseProperty}
        />

        {/* --------------------------------------Second tab-------------------------------------------- */}

        <Footer />
      </div>
    </>
  );
}
export default My_propertyPV;
