// import React from "react";
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
import propertyComp from "./propertyComp";
import AvailablePropertyComp from "./AvailablePropertyComp";
import CommonHeaderS from "../CommonHeaderS";

function AllPropertyS() {
  const token = localStorage.getItem("token");

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
    // const fetchPosts = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await axios.get(
    //       "https://b8rliving.com/property",
    //       axiosConfig
    //     );

    //     const filterData = response.data.data.properties;

    //     Sort the response data by the 'imagesApproved' property in descending order
    //     const sortedProperties = filterData.sort((a, b) => {
    //       return a.imagesApproved - b.imagesApproved;
    //     });

    //     setresponsePendingProperties(sortedProperties);
    //   } catch (error) {
    //     console.log(error);
    //     Handle the error here if needed
    //   } finally {
    //     setLoading(false);
    //   }
    // };

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
          return new Date(b.createdAt) - new Date(a.createdAt);
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

  const handlePageAvailable = () => {
    // Custom search handling logic

    if (archiveData) {
      setArchiveData(false);
    } else {
      setArchiveData(true);
      setActivebgColor("#52796F");
      setBorderColor("#DAF0EE");
    }
    // setActivebgColor("#52796F");
    // setBorderColor("#DAF0EE");
    // activeColor("")

    // Perform search operations here
  };

  const handlePage = () => {
    // Custom search handling logic
    setArchiveData(true);
    // setActivebgColor("#52796F");
    // setBorderColor("#DAF0EE");

    // Perform search operations here
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
        <CommonHeaderS title="All Properties" color="#1E0058" />

        {/* <div style={{ display: "flex", justifyContent: "space-between" , marginBottom:"20px"}}>
          <div style={{ marginRight: "8px" }}>
              
              {archiveData ? 
              (
              <CommonTopButton
              bgColor= "#F5F5F5"
              borderColor= "#B3A8C8"
              color="#B3A8C8"
               text="Available Properties"
               onclicked={handlePageAvailable}
            />
              )
              : 
              (
              <CommonTopButton
              bgColor= "#1E0058"
              borderColor= "#DAF0EE"
              color="#DAF0EE"
              text="Available Properties"
              onclicked={handlePageAvailable}
            />

              )}
          

          </div>
          <div >
          {archiveData ? 
              (

                <CommonTopButton
                bgColor= "#1E0058"
                borderColor= "#DAF0EE"
                color="#DAF0EE"
                text="Archived Properties"
                onclicked={handlePageAvailable}
             />

              )
              : 
              (
         
             <CommonTopButton
             bgColor= "#F5F5F5"
             borderColor= "#B3A8C8"
             color="#B3A8C8"
             text="Archived Properties"
             onclicked={handlePageAvailable}
           />
              )}

            <CommonTopButton
              text="Archived Properties"
              bgColor= {setActivebgColor}
              borderColor= {setBorderColor}
              color={activeColor}
              onclicked={handlePage}

            />
          </div>
        </div> */}

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
                  bgColor="#F5F5F5"
                  borderColor="#B3A8C8"
                  color="#B3A8C8"
                  text="Available Properties"
                  onclicked={handlePageAvailable}
                />
              ) : (
                <CommonTopButton
                  bgColor="#1E0058"
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
                  bgColor="#1E0058"
                  borderColor="#DAF0EE"
                  color="#DAF0EE"
                  text="Archived Properties"
                  onclicked={handlePageAvailable}
                />
              ) : (
                <CommonTopButton
                  bgColor="#F5F5F5"
                  borderColor="#B3A8C8"
                  color="#B3A8C8"
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

        {/* {archiveData ? 
          (
            <>
            
 

              <div style={{ display: "flex", justifyContent: "space-between" , marginBottom:"20px"}}>
                <div style={{ marginRight: "8px" }}>
                  <CommonTopButton
                    text="Sold On B8R"
                    bgColor="#F5F5F5"
                    borderColor="#B3A8C8"
                    color="#B3A8C8"
                  />
                  </div>
                  
                  <div>
                  <CommonTopButton
                  text="Delisted Owner"
                  bgColor="#F5F5F5"
                  borderColor="#B3A8C8"
                  color="#B3A8C8"
                  // margin="0px 0px 0px 1px"
                  />
                  </div>

            </div>
            <div style={{marginTop:"10px", width:"30px", marginRight:"10px"}}>
            <CommonTopButton
            text="Sold Outside"
            bgColor="#F5F5F5"
            borderColor="#B3A8C8"
            color="#B3A8C8"
            margin="0px 0px 0px 0px"

            />
          
            </div>
          
          <p style={{textAlign:"left"}}>Hey {name}, <br/>

        

          Here are all the properties that were SOLD OUTSIDE OF B8R. If available again, you can change status and start sharing with your clients.</p>
  

        </>
          ) : (
                    

        <p style={{textAlign:"left"}}>Hey {name}, <br/>

        Here are all the <b>Sale</b> properties that are available for Sale.</p>
          ) }  */}

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

        {/* <AvailablePropertyComp
          props={responsePendingProperties}
          name={name}
          showCloseButton={false}
        /> */}

        <Footer />
      </div>
    </>
  );
}

export default AllPropertyS;
