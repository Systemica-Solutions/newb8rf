// import React from "react";
import React, { Component, useState, useEffect } from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";
import SearchBar from "../SearchBar";
import { BsSearchHeart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import searchImg from "../Assets/Search.png";
import propertyComp from "./propertyComp";
import AvailablePropertyComp from "./AvailablePropertyComp";

function AllProperty() {
  const [loading, setLoading] = useState(false);
  const [archiveData, setArchiveData] = useState(false);
  const [ActivebgColor, setActivebgColor] = useState("#D2D7D6");
  const [ActiveBorderColor, setBorderColor] = useState("#A9C0BA");
  const [activeColor, setColor] = useState("#77A8A4");
  const [responsePendingProperties, setresponsePendingProperties] = useState(
    []
  );
  const [responseArchiveProperties, setresponseArchiveProperties] = useState(
    []
  );
  const [filteredProperty, setFilteredProperty] = useState([]);
  const [activeCondition, setActiveCondition] = useState("all");

  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

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

        //Filter Data
        const filterData = response.data.data.properties;

        // Sort the response data by the 'imagesApproved' property in descending order
        const sortedProperties = filterData.sort((a, b) => {
          return a.imagesApproved - b.imagesApproved;
        });

        const filteredProperties = sortedProperties.filter(
          (property) => property.status != "Closed"
        );

        const ArchivefilteredProperties = sortedProperties.filter(
          (property) => property.status === "Closed"
        );

        setresponsePendingProperties(filteredProperties);
        setresponseArchiveProperties(ArchivefilteredProperties);
      } catch (error) {
        console.log(error);
        // Handle the error here if needed
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePageAvailable = (condition) => {
    if (archiveData) {
      setArchiveData(false);
    } else {
      setArchiveData(true);
      setActivebgColor("#52796F");
      setBorderColor("#DAF0EE");
    }
  };

  const handlePageAvailables = (condition) => {
    setActiveCondition(condition);
    console.log(condition);
    filterTenants(condition); // Trigger the filtering
  };

  // Filter function to filter tenants based on the active condition
  const filterTenants = (condition) => {
    switch (condition) {
      case "Rented On B8R":
        setIsActive1(true);
        setresponseArchiveProperties(
          responseArchiveProperties.filter(
            (property) => (property.closeListingReason = "Rented On B8R")
          )
        );
        break;
      case "Delisted Owner":
        setIsActive2(true);
        setresponseArchiveProperties(
          responseArchiveProperties.filter(
            (property) => (property.closeListingReason = "Delisted Owner")
          )
        );
        break;
      case "Rented Outside":
        setIsActive3(true);
        setresponseArchiveProperties(
          responseArchiveProperties.filter(
            (property) => (property.closeListingReason = "Rented Outside")
          )
        );
        break;
    }
  };

  const handlePage = () => {
    setArchiveData(true);
  };
  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

  return (
    <>
      <div
        className="form"
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          // backgroundImage: `url(${oneBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="All Properties" color="#52796F" />
        <div className="px-[0.5rem] gap-x-[0.5rem]">
          <div
            className="pt-[2rem] py-[1rem]"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              {archiveData ? (
                <CommonTopButton
                  bgColor="#D2D7D6"
                  borderColor="#DAF0EE"
                  color="#77A8A4"
                  text="Available Properties"
                  onclicked={handlePageAvailable}
                />
              ) : (
                <CommonTopButton
                  bgColor="#52796F"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Available Properties"
                  onclicked={handlePageAvailable}
                />
              )}
            </div>
            <div>
              {archiveData ? (
                <CommonTopButton
                  bgColor="#52796F"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Archived Properties"
                  onclicked={handlePageAvailable}
                />
              ) : (
                <CommonTopButton
                  bgColor="#D2D7D6"
                  borderColor="#DAF0EE"
                  color="#77A8A4"
                  text="Archived Properties"
                  onclicked={handlePageAvailable}
                />
              )}

              {/* <CommonTopButton
              text="Archived Properties"
              bgColor= {setActivebgColor}
              borderColor= {setBorderColor}
              color={activeColor}
              onclicked={handlePage}

            /> */}
            </div>
            {/* Listing */}
          </div>
        </div>

        {/* <SearchBar onSearch={handleSearch} placeholder="Search by Property name"/> */}

        {archiveData ? (
          <>
            {/* <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between" , marginRight:"10px"}}> */}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div style={{ marginRight: "8px" }}>
                {/* <CommonTopButton
                  text="Rented On B8R"
                  bgColor={isActive1 ? "#52796F" : "#D2D7D6"}
                  borderColor="#A9C0BA"
                  color={isActive1 ? "#FFFFFF" : "#77A8A4"}
                  onclicked={() => handlePageAvailables("Rented On B8R")}
                /> */}
              </div>

              <div>
                {/* <CommonTopButton
                  text="Delisted Owner"
                  bgColor={isActive2 ? "#52796F" : "#D2D7D6"}
                  borderColor="#A9C0BA"
                  color={isActive2 ? "#FFFFFF" : "#77A8A4"}
                  onclicked={() => handlePageAvailables("Delisted Owner")}

                  // margin="0px 0px 0px 1px"
                /> */}
              </div>
            </div>
            <div
              style={{ marginTop: "10px", width: "30px", marginRight: "10px" }}
            >
              {/* <CommonTopButton
                text="Rented Outside"
                bgColor={isActive3 ? "#52796F" : "#D2D7D6"}
                borderColor="#A9C0BA"
                color={isActive3 ? "#FFFFFF" : "#77A8A4"}
                margin="0px 0px 0px 0px"
                onclicked={() => handlePageAvailables("Rented Outside")}
              /> */}
            </div>

            <AvailablePropertyComp
              props={responseArchiveProperties}
              name={name}
              showCloseButton={false}
            />
          </>
        ) : (
          <AvailablePropertyComp
            props={responsePendingProperties}
            name={name}
            showCloseButton={true}
          />
        )}

        {/* {archiveData ? "" : <AvailablePropertyComp props={responsePendingProperties} name={name}/>} */}

        <Footer />
      </div>
    </>
  );
}

export default AllProperty;
