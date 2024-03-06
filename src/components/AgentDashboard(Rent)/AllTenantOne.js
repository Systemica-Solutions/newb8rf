import React, { Component, useState, useEffect, useRef } from "react";
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
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import PendingVerification from "../Assets/Images/AgentDashboard/PendingVerification.png";
import TenantComp from "./TenantComp";

function AllTenantOne() {
  const [archiveData, setArchiveData] = useState(false);
  const queryParameters = new URLSearchParams(window.location.search);
  const [route,setRoute] = useState(queryParameters.get("route"));
  const [ActivebgColor, setActivebgColor] = useState("#D2D7D6");
  const [ActiveBorderColor, setBorderColor] = useState("#A9C0BA");
  const [activeColor, setColor] = useState("#77A8A4");
  const [loading, setLoading] = useState(false);

  const [responseTenat, setResponseTenat] = useState([]);
  const [filteredTenants, setFilteredTenants] = useState([]);
  const [activeCondition, setActiveCondition] = useState("all");

  const [responseTenatWaitingForProperty, setresponseTenatWaitingForProperty] =
    useState();
  const [WaitingFroPropertyCondition, setWaitingFroPropertyCondition] =
    useState(false);

  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);

  const token = localStorage.getItem("token");
  // console.log(token);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    // console.log(activeCondition)
    const fetchPosts = async () => {
      setLoading(true);
      axios
        .get("https://b8rliving.com/tenant", axiosConfig)
        .then((response) => {
          console.log("Tenatas api ka data ", response.data.data.tenants);
          // this is tenants model ka data
          // var myArrayPropertyCount = response.data.data.properties;
          setResponseTenat(response.data.data.tenants);
          setFilteredTenants(response.data.data.tenants);
          // filterTenants();
          // alert("Your data has been submitted");
          // do something with the response
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
      setLoading(false);
    };

    fetchPosts();
  }, []);

  // console.log(responseTenat);

  // Function to handle button clicks and trigger filtering
  const handlePageAvailable = (condition) => {
    setActiveCondition(condition);
    // console.log(condition);
    filterTenants(condition); // Trigger the filtering
  };
  // useEffect(() => {
  //   filterTenants(activeCondition);
  // }, [activeCondition]);

  useEffect(() => {
    if (filteredTenants.length !== 0 && route !== null && activeCondition !== null) {
      handlePageAvailable(route);
      // Set the route value to null after handling the initial condition
      setRoute(null);
    }
  }, [filteredTenants, route, activeCondition]);
  
  // console.log(activeCondition);
  const prevRouteRef = useRef(null);

  // Filter function to filter tenants based on the active condition
  const filterTenants = (condition) => {
    switch (condition) {
      case "WaitingForProperty":
        setIsActive1(true);
        setFilteredTenants(
          responseTenat.filter((tenant) => tenant.status === "WaitingForProperty")
        );
        break;
      case "CurrentlyViewing":
        setIsActive2(true);
        setFilteredTenants(
          responseTenat.filter((tenant) => tenant.status === "CurrentlyViewing")
        );
        break;
      case "Shortlisted":
        setIsActive3(true);
        setFilteredTenants(
          responseTenat.filter((tenant) => tenant.status === "Shortlisted")
        );
        break;
      case "Archived":
        setFilteredTenants(
          responseTenat.filter((tenant) => tenant.status === "Deactivate")
        );
        break;
      case "BoardShared":
        setIsActive4(true);
        setFilteredTenants(
          responseTenat.filter(
            (tenant) =>
              tenant.status !== "WaitingForProperty" &&
              tenant.status !== "Deactivate"
          )
        );
        break;
      default:
        setFilteredTenants(responseTenat); // Show all tenants when no specific condition is selected
        break;
    }
  };
  // console.log(filteredTenants)

  const username = localStorage.getItem("username");
  const name = username.substring(0, username.indexOf(" "));

  const handleSearch = (searchValue) => {
    // Custom search handling logic
    console.log("Searching for:", searchValue);

    // Perform search operations here
  };

  // Perform search operations here
  // const WaitingForProperty = (query) => {
  //   // Custom search handling logic
  //   console.log("WaitingForProperty:", query);
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     axios
  //       .get(
  //         "https://b8rliving.com/tenant?filter=WaitingForProperty",
  //         axiosConfig
  //       )
  //       .then((response) => {
  //         // console.log(response.data.data.tenants);
  //         // var myArrayPropertyCount = response.data.data.properties;
  //         setresponseTenatWaitingForProperty(response.data.data);
  //         // console.log(myArrayPropertyCount.length);

  //         if (response.data.data.properties.propertyInfo.purposeRent == true) {
  //         }

  //         // alert("Your data has been submitted");
  //         // do something with the response
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         // handle the error
  //       });
  //     setLoading(false);
  //   };
  // };

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
        <CommonHeader title="All Tenant" color="#52796F" />

        {/* Body */}

        <div className="p-[1rem]">
          {/* grid-container */}
          <div className="grid grid-cols-2 gap-[1rem]">
            <div>
              <CommonTopButton
                bgColor={
                  activeCondition === "WaitingForProperty"
                    ? "#52796F"
                    : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={
                  activeCondition === "WaitingForProperty"
                    ? "#FFFFFF"
                    : "#77A8A4"
                }
                text="Waiting For Property"
                onclicked={() => handlePageAvailable("WaitingForProperty")}
              />
            </div>
            <div>
              <CommonTopButton
                bgColor={
                  activeCondition === "Shortlisted" ? "#52796F" : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={
                  activeCondition === "Shortlisted" ? "#FFFFFF" : "#77A8A4"
                }
                text="Shortlisted"
                onclicked={() => handlePageAvailable("Shortlisted")}
              />
            </div>
            <div>
              <CommonTopButton
                bgColor={
                  activeCondition === "CurrentlyViewing" ? "#52796F" : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={
                  activeCondition === "CurrentlyViewing" ? "#FFFFFF" : "#77A8A4"
                }
                text="Currently Viewing"
                onclicked={() => handlePageAvailable("CurrentlyViewing")}
              />
            </div>
            <div>
              <CommonTopButton
                bgColor={
                  activeCondition === "BoardShared" ? "#52796F" : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={
                  activeCondition === "BoardShared" ? "#FFFFFF" : "#77A8A4"
                }
                text="BoardShared"
                onclicked={() => handlePageAvailable("BoardShared")}
              />
            </div>
            <div>
              {/* {archiveData ? (
                <CommonTopButton
                  bgColor="#52796F"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Archived"
                  onclicked={() => handlePageAvailable("Deactivate")}
                />
              ) : (
                <CommonTopButton
                  bgColor="#D2D7D6"
                  borderColor="#DAF0EE"
                  color="#77A8A4"
                  text="Archived"
                  onclicked={() => handlePageAvailable("Deactivate")}
                />
              )} */}
              <CommonTopButton
                bgColor={
                  activeCondition === "Archived" ? "#52796F" : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={activeCondition === "Archived" ? "#FFFFFF" : "#77A8A4"}
                text="Archived"
                onclicked={() => handlePageAvailable("Archived")}
              />
            </div>
          </div>
        </div>

        {/* <SearchBar
          onSearch={handleSearch}
          placeholder="Search by Tenant name"
        /> */}

        {/* <div className="p-[1rem] text-[1.2rem]">
          <p className="font-bold py-[1rem]">Hey {name},</p>
          <p> Here are all the tenants that you have onboarded</p>
        </div> */}
        {/* 
        {archiveData ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div style={{ marginRight: "8px" }}>
                <CommonTopButton
                  text="Rented On B8R"
                  bgColor="#D2D7D6"
                  borderColor="#A9C0BA"
                  color="#77A8A4"
                />
              </div>

              <div>
                <CommonTopButton
                  text="Rented Outside"
                  bgColor="#D2D7D6"
                  borderColor="#A9C0BA"
                />
              </div>
            </div>
            <div
              style={{ marginTop: "10px", width: "30px", marginRight: "10px" }}
            >
              <CommonTopButton
                text="Others"
                bgColor="#D2D7D6"
                borderColor="#A9C0BA"
                color="#77A8A4"
                margin="0px 0px 0px 0px"
              />
            </div>

            <p style={{ textAlign: "left" }}>
              {" "}
              Hey <b>{name}</b>,<br />
              Here are all the tenants that you have onboarded
            </p>
          </>
        ) : (
          <p style={{ textAlign: "left" }}>
            Hey <b>{name}</b>, <br />
            Here are all the tenants that you have onboarded
          </p>
        )} */}

        <TenantComp props={filteredTenants} name={name} />

        <Footer />
      </div>
    </>
  );
}
export default AllTenantOne;
