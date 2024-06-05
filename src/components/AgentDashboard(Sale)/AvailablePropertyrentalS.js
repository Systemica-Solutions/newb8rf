import React, { useEffect, useState } from "react";
import CommonHeaderS from "../CommonHeaderS";
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

function AvailablePropertyrentalS() {
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
          "https://b8rliving.com/property?purposeType=purposeSale",
          axiosConfig
        );

        // Sort the response data by the 'imagesApproved' property in descending order
        const sortedProperties = response.data.data.properties.sort((a, b) => {
          return a.imagesApproved - b.imagesApproved;
        });

        // Filter out properties where propertyDetails.purposeSale is true
        const saleProperties = sortedProperties.filter((property) => {
          return property.propertyDetails.propertyInfo.purposeSale === true;
        });

        setresponsePendingProperties(saleProperties);
      } catch (error) {
        console.log(error);
        // Handle the error here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log(responsePendingProperties);

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

  const handleSearch = (searchValue) => {
    // Custom search handling logic
    console.log("Searching for:", searchValue);

    // Perform search operations here
  };

  return (
    <>
      <div
        className="form"
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${oneBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeaderS title="Available Properties Sale" color="#1E0058" />
        {/* <p style={{ textAlign: "left", marginLeft: "20px" }}>
          Hey <b>{name}</b>, Here are all the sale properties that are available
          for sale
        </p> */}
        <div className="flex justify-center items-center px-[1rem] pt-[1rem]">
          <p className="text-[1.2rem] text-left">
            Hey <b>{name}</b>, Here are all the sale properties that are
            available for sale
          </p>
        </div>
        <AvailablePropertyComp props={responsePendingProperties} name={name} />

        <Footer />
      </div>
    </>
  );
}

export default AvailablePropertyrentalS;
