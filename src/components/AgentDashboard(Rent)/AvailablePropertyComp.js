// import React from 'react';
import React, { Component, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import ActiveListing from "../Assets/Images/AgentDashboard/ActiveListing.png";
import PendingVerification from "../Assets/Images/AgentDashboard/PendingVerification.png";
import SearchBar from "../SearchBar";
import noImg from "../Assets/Images/AgentDashboard/noImg.png";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineHideImage } from "react-icons/md";
import { RiQuestionnaireFill } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";

const AvailablePropertyComp = ({ props, name, showCloseButton }) => {
  const [filteredData, setfilteredData] = useState(props);
  const [searchValue, setSearchValue] = useState("");

  console.log(props);
  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);

    // If search term is empty, show all properties
    if (searchTerm === "") {
      setfilteredData(props);
    } else {
      // Filter properties based on houseName
      const filtered = props.filter((property) =>
        property.houseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setfilteredData(filtered);
    }
  };

  useEffect(() => {
    // Initialize filteredData with all properties when the component loads
    setfilteredData(props);
  }, [props]);

  return (
    <>
      {/* input-box */}
      <div className="px-[1rem] py-[1.5rem]">
        <div
          className="bg-[#F5F5F5] px-[1rem] rounded-[0.6rem] flex justify-between items-center"
          style={{
            border: "1px solid #52796F",
          }}
        >
          <input
            type="text"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by property Name"
            style={{
              border: "none",
              boxShadow: "none",
              background: "transparent",
              width: "100%",
              margin: "0",
            }}
          />
          <button>
            <FaSearch className="text-[1.5rem]" />
          </button>
        </div>
      </div>

      {/* header-text */}
      <div className="px-[1rem] text-[1.2rem]">
        Hey <b>{name}</b>, Here are all the rent properties that are available
        for renting out.
      </div>

      {/* properties */}

      {/* Mapping */}
      {filteredData.map((values, index) => (
        <div key={index}>
          <div className="px-[1rem] py-[0.5rem]">
            <div className="flex justify-between gap-x-[0.5rem]">
              {/* left-section */}
              <div
                className="bg-white w-[85%] p-[0.5rem] rounded-[0.5rem] flex "
                style={{
                  border: "1px solid #DAF0EE",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* image */}
                <div className="w-[30%] flex justify-center items-center">
                  {values.imagesApproved ? (
                    <>
                      <img
                        src={values.images[0]}
                        alt="img"
                        // style={{
                        //   marginLeft: "10px",
                        //   marginTop: "10px",
                        //   borderRadius: "15px",
                        // }}
                        // height="60px"
                      />
                    </>
                  ) : (
                    <>
                      <MdOutlineHideImage className="text-[3.5rem]" />
                    </>
                  )}
                </div>
                {/* other-containt */}
                <div className="w-[70%]">
                  {/* name & icon */}
                  <div className="flex justify-between items-center pl-[0.5rem]">
                    <p className="font-semibold px-[0.2rem]">
                      {values.societyName}
                    </p>
                    {values.imagesApproved ? (
                      <>
                        <BsFillBookmarkCheckFill className="text-[#52796F] text-[2.5rem]" />
                      </>
                    ) : (
                      <>
                        <RiQuestionnaireFill className="text-[#52796F] text-[2.5rem]" />
                      </>
                    )}
                  </div>
                  {/* status */}
                  <div
                    className="font-bold flex justify-end items-center pt-[0.5rem] text-[#E13018]"
                    style={{
                      color: values.imagesApproved ? "#2F9E3A" : "#E13018",
                    }}
                  >
                    {values.imagesApproved
                      ? "  Active Listing"
                      : "   Pending Verification"}
                  </div>
                </div>
              </div>
              {/* right/edit section */}
              {/* <Link
                className="w-[15%] bg-[#E8E7E7] flex justify-center items-center p-[0.5rem] flex-col rounded-[0.5rem]"
                to={`/Changestatus?propertyId=${values._id}`}
              >
                <IoIosArrowDroprightCircle className="text-[1.7rem] text-[#5D6560]" />
                <p className="font-bold py-[0.2rem] text-[#5D6560]">Close Property</p>
              </Link> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AvailablePropertyComp;
