import React, { Component, useState, useEffect } from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import AvailablePropertyComp from "./AvailablePropertyComp";

function AllActiveProperties() {
  const [responsePendingProperties, setresponsePendingProperties] = useState(
    []
  );
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchValue) => {
    // Custom search handling logic
    console.log("Searching for:", searchValue);

    // Perform search operations here
  };

  const token = localStorage.getItem("token");

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

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

        // Check if the 'imagesApproved' property exists and has data
        const properties = response.data.data.properties;
        console.log(properties);

        const sort = properties.sort((a,b) =>{
          return new Date(b.createdAt) - new Date(a.createdAt)
        })

        if (properties) {
          // Filter properties where 'imagesApproved' is true
          const filteredProperties = properties.filter(
            (property) => property.imagesApproved === true
          );

          console.log(filteredProperties);
          // Sort the filtered properties by 'imagesApproved' in descending order
          const sortedProperties = filteredProperties.sort((a, b) => {
            return b.imagesApproved - a.imagesApproved;
          });

          setresponsePendingProperties(sortedProperties || sort );
        } else {
          // Handle the case where 'imagesApproved' is empty or doesn't exist
          console.log("No properties with images approved found.");
        }
      } catch (error) {
        console.log(error);
        // Handle the error here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <div
        className=""
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${oneBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="All Active Properties" color="#52796F" />

        <AvailablePropertyComp
          props={responsePendingProperties}
          name={name}
          activeProperies="true"
        />

        <Footer />
      </div>
    </>
  );
}
export default AllActiveProperties;
