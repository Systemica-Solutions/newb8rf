import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";

import PendingVerification from "../Assets/Images/AgentDashboard/PendingVerification.png";
import seen from "../Assets/Images/Seen.png";
import Like from "../Assets/Images/AgentDashboard/Like.png";
import axios from "axios";
import { RiQuestionnaireFill } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { MdOutlineMobileScreenShare } from "react-icons/md"; //share

const TenantComp = ({ props, name }) => {
  // console.log(props);
  const [filteredData, setfilteredData] = useState([]);
  
  const [searchValue, setSearchValue] = useState("");
  // const [BoardNotFound, setBoardNotFound] = useState(false);
  const boardIds = ["boardId1", "boardId2", "boardId3"]; // Replace with your actual boardIds

  const token = localStorage.getItem("token");

  // console.log(props);

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);

    // If search term is empty, show all properties
    if (searchTerm === "") {
      setfilteredData(props);
      console.log("filteredData",filteredData);
    } else {
      // Filter properties based on houseName
      const filtered = props.filter((tenant) =>
        tenant.tenantDetails.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setfilteredData(filtered);
      
    }
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const fetchTenantBoard = async (TId, name) => {
    console.log("tenantId-> " + TId);
    console.log("name-> " + name);
    try {
      const res = await axios.get(
        `https://b8rliving.com/tenant/v2/board/${TId}`,
        axiosConfig
      );
      const data = res.data;
      const boardId = data.data.board._id;
      // console.log(boardId);
      if (boardId) {
        window.location.href = `/PropertyViewBoard?boardId=${boardId}&tenantId=${TId}&name=${name}`;
      }

      // console.log(res.status);
      // console.log(data);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response Status:", error.response.status);
        console.error("Response Data:", error.response.data.message);
        if (error.response.status === 404) {
          window.location.href = `/ViewBoard?tenantId=${TId}&name=${name}&boardId=${null}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    // Initialize filteredData with all properties when the component loads
    const fetchPosts = async () => {
      setfilteredData(props);
      // console.log(filteredData);

      const sharedTenantCount = props.filter(
        (tenant) => tenant.status == "Shared"
      );

      console.log(sharedTenantCount.boardId);
      // setSharedTenantCount(sharedTenantCount);

      const boardIds = [];
      sharedTenantCount.forEach((tenant) => {
        boardIds.push(tenant.boardId);
      });


      for (const boardId of boardIds) {
        try {
          const response = await axios
            .get(`https://b8rliving.com/board${boardId}}`, axiosConfig)
            .then((response) => {
              // setSharedPropertyCount(response.data.data.board.propertyId.length); // Set sharedC in your state
              // return response.data.data.board.propertyId.length;
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
              return 0; // Handle the error by returning 0 properties
            });
        } catch (error) {
          console.log(error);
          // Handle the error here if needed
        } finally {
          // setLoading(false);
        }
      }
    };

    fetchPosts();
  }, [props]);

  return (
    <>
      {/* <input
        type="text"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search by Tenant Name"
      /> */}
      {/* Mapping */}
      <div className="my-[1rem]" />
      {filteredData
        .sort((a, b) => {
          const statusOrder = {
            WaitingForProperty: 0,
            Shortlisted: 1,
            CurrentlyViewing: 2,
            Shared: 3,
            Deactivate: 4,
          };
          return statusOrder[a.status] - statusOrder[b.status];
        })
        .map((values, index) => (
          <div
            className="px-[1rem] py-[0.5rem] flex gap-x-[0.5rem] w-[100%]"
            key={index}
          >
            <div
              className="flex justify-between items-center p-[0.5rem] bg-white w-[85%]"
              style={{
                border: "1px solid #DAF0EE",
                borderRadius: "0.5rem",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              {/* left-container */}
              <div
                className="flex items-center"
                style={{
                  borderRight: "2px solid black",
                  padding: "1rem 0",
                }}
              >
                {values.status === "WaitingForProperty" && (
                  <>
                    <div>
                      <RiQuestionnaireFill className="text-[#52796F] text-[2.5rem]" />
                    </div>

                    <div className="text-[0.9rem] font-semibold px-[0.2rem]">
                      Waiting for property
                    </div>
                  </>
                )}
                {values.status === "Shortlisted" && (
                  <>
                    <div>
                      <FaHeart className="text-[#B30808] text-[2.5rem]" />
                    </div>
                    <div className="text-[0.9rem] font-semibold px-[0.2rem]">
                      {values.numberShortlisted} properties shortlisted
                    </div>
                  </>
                )}
                {values.status === "Shared" && (
                  <>
                    <div>
                      <MdOutlineMobileScreenShare className="text-[#52796F] text-[2.5rem]" />
                    </div>

                    <div className="text-[0.9rem] font-semibold px-[0.2rem]">
                      {values.numberShared} properties shared
                    </div>
                  </>
                )}
                {values.status === "CurrentlyViewing" && (
                  <>
                    <div>
                      <FaEye className="text-[#52796F] text-[2.5rem]" />
                    </div>

                    <div className="text-[0.9rem] font-semibold px-[0.2rem]">
                      CurrentlyViewing
                    </div>
                  </>
                )}

                {values.status === "Deactivate" && (
                  <>
                    <div>
                      <MdOutlineAirplanemodeActive className="text-[#52796F] text-[2.5rem]" />
                    </div>

                    <div className="text-[0.9rem] font-semibold px-[0.2rem]">
                      Deactivated
                    </div>
                  </>
                )}
              </div>
              {/* right-container-take action one */}
              <div className="px-[1rem]">
                <p className="text-[1.1rem] font-bold pb-[0.8rem]">
                  {values.tenantDetails.name}
                </p>
                <p className="text-[1rem] font-semibold">
                  <u>Preference</u>
                </p>
                <p className="text-[1rem] font-semibold">
                  {" "}
                  Rs.{values.tenantDetails.rent} &{" "}
                  {values.tenantDetails.houseConfiguration}
                </p>
              </div>
            </div>

            {values.isOnBoard ? (
              <Link
                className="bg-[#E8E7E7] rounded-[0.5rem] flex justify-center items-center flex-col p-[0.5rem] w-[15%]"
                // to={`/createboard?tenantId=${values._id}&name=${values.tenantDetails.name}&boardId=${values.boardId} `}
                to={`/PropertyViewBoard?boardId=${values.boardId}&tenantId=${values._id}&name=${values.tenantDetails.name} `}
              >
                <IoIosArrowDroprightCircle className="text-[#5D6560] text-[1.5rem]" />
                <p className="text-[0.8rem] text-center font-semibold">
                  Take Action
                </p>
              </Link>
            ) : (
              <Link
                // onClick={() =>
                //   fetchTenantBoard(values._id, values.tenantDetails.name)
                // }
                className="bg-[#E8E7E7] rounded-[0.5rem] flex justify-center items-center flex-col p-[0.5rem] w-[15%]"
                to={`/ViewBoard?tenantId=${values._id}&name=${values.tenantDetails.name}&boardId=${values.boardId}`}
              >
                <IoIosArrowDroprightCircle className="text-[#5D6560] text-[1.5rem]" />
                <p className="text-[0.8rem] text-center font-semibold">
                  Take Action
                </p>
              </Link>
            )}
          </div>
        ))}
    </>
  );
};

export default TenantComp;
