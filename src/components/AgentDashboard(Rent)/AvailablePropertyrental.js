import React, { useEffect, useState } from "react";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Footer from "../Footer";

import { Link } from "react-router-dom";
import axios from "axios";
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import AvailablePropertiesRentalI from "../Assets/Images/AgentDashboard/AvailablePropertyRentalsI.png";
import AvailablePropertiesRentalI2 from "../Assets/Images/AgentDashboard/AvailablePropertyRentalsI2.png";
import AvailablePropertyComp from "./AvailablePropertyComp";

function AvailablePropertyrental() {
  const [loading, setLoading] = useState(false);
  const [responsePendingProperties, setresponsePendingProperties] = useState(
    []
  );

  const token = localStorage.getItem("token");

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
      try {
        const response = await axios.get(
          "https://b8rliving.com/property",
          axiosConfig
        );

        // Sort the response data by the 'imagesApproved' property in descending order
        const sortedProperties = response.data.data.properties.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
        });

        const filteredProperties = sortedProperties.filter(
          (property) => property.status != "Closed"
        );

        setresponsePendingProperties(filteredProperties);
      } catch (error) {
        console.log(error);
        // Handle the error here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

  return (
    <>
      <CommonHeader title="Available Properties Rentals" color="#52796F" />
      <div
        className=""
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <AvailablePropertyComp props={responsePendingProperties} name={name} />
        <Footer />
      </div>
    </>
  );
}

export default AvailablePropertyrental;
