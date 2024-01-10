import React, { Component, useState, useEffect } from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import oneBg from "../Assets/Images/Sale/AllPropertyBg.png";
import SearchBar from "../SearchBar";
import { BsSearchHeart } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import searchImg from "../Assets/Search.png";
import TenantComp from "./TenantComp";

function AllTenantOneS() {
  const [waitingProperyData, setwaitingPropery] = useState(false);
  const [shortListedData, setshortListed] = useState(false);
  const [currentViewData, setcurrentView] = useState(false);
  const [archiveData, setArchiveData] = useState(false);

  const [ActivebgColor, setActivebgColor] = useState("#D2D7D6");
  const [ActiveBorderColor, setBorderColor] = useState("#A9C0BA");
  const [activeColor, setColor] = useState("#77A8A4");
  const [loading, setLoading] = useState(false);

  const [responseBuyer, setresponseBuyer] = useState([]);

  // const [responseTenatWaitingForProperty, setresponseTenatWaitingForProperty] =
  //   useState();
  // const [WaitingFroPropertyCondition, setWaitingFroPropertyCondition] =
  //   useState(false);
  const token = localStorage.getItem("token");
  console.log(token);

  const handleSearch = (searchValue) => {
    // Custom search handling logic
    console.log("Searching for:", searchValue);

    // Perform search operations here
  };

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
        .get("https://b8rliving.com/buyer", axiosConfig)
        .then((response) => {
          console.log(response.data.data.buyers);
          // var myArrayPropertyCount = response.data.data.properties;
          setresponseBuyer(response.data.data.buyers);
          // console.log(responseBuyer);

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

  const handlePageAvailable = () => {
    // Custom search handling logic
    if (archiveData) {
      setArchiveData(false);
    } else {
      setArchiveData(true);
      setActivebgColor("#52796F");
      setBorderColor("#DAF0EE");
    }
  };

  console.log(responseBuyer);

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
          backgroundImage: `url(${oneBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="All Buyer" color="#1E0058" />

        <div className="p-[1rem]">
          {/* grid-container */}
          <div className="grid grid-cols-2 gap-[1rem]">
            <div>
              {waitingProperyData ? (
                <CommonTopButton
                  bgColor="#1E0058"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Wating For Property"
                  onclicked={() => setwaitingPropery((current) => !current)}
                />
              ) : (
                <CommonTopButton
                  bgColor="#F5F5F5"
                  borderColor="#B3A8C8"
                  color="#B3A8C8"
                  text="Waiting For Property"
                  onclicked={() => setwaitingPropery((current) => !current)}
                />
              )}
            </div>
            <div>
              {shortListedData ? (
                <CommonTopButton
                  bgColor="#1E0058"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Shortlisted"
                  onclicked={() => setshortListed((current) => !current)}
                />
              ) : (
                <CommonTopButton
                  bgColor="#F5F5F5"
                  borderColor="#B3A8C8"
                  color="#B3A8C8"
                  text="Shortlisted"
                  onclicked={() => setshortListed((current) => !current)}
                />
              )}
            </div>
            <div>
              {currentViewData ? (
                <CommonTopButton
                  bgColor="#1E0058"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Currently Viewing"
                  onclicked={() => setcurrentView((current) => !current)}
                />
              ) : (
                <CommonTopButton
                  bgColor="#F5F5F5"
                  borderColor="#B3A8C8"
                  color="#B3A8C8"
                  text="Currently Viewing"
                  onclicked={() => setcurrentView((current) => !current)}
                />
              )}
            </div>
            <div>
              {archiveData ? (
                <CommonTopButton
                  bgColor="#1E0058"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Archived"
                  onclicked={handlePageAvailable}
                />
              ) : (
                <CommonTopButton
                  bgColor="#F5F5F5"
                  borderColor="#B3A8C8"
                  color="#B3A8C8"
                  text="Archived"
                  onclicked={handlePageAvailable}
                />
              )}
            </div>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} placeholder="Search by Buyer name" />

        {/* <div className="p-[1rem] text-[1.2rem]">
          <p className="font-bold py-[1rem]">Hey {name},</p>
          <p> Here are all the tenants that you have onboarded</p>
        </div> */}

        {/* <SearchBar
          onSearch={handleSearch}
          placeholder="Search by Buyers' name"
        /> */}

        {/* {archiveData ? (
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
                  color="#77A8A4"
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
              Here are all the Buyer that you have onboarded
            </p>
          </>
        ) : (
          <p style={{ textAlign: "left" }}>
            Hey <b>{name}</b>, <br />
            Here are all the Buyer that you have onboarded
          </p>
        )} */}

        <TenantComp props={responseBuyer} name="test" />

        <Footer />
      </div>
    </>
  );
}
export default AllTenantOneS;
