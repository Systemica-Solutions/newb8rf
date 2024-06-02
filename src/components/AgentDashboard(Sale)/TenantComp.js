import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";

import PendingVerification from "../Assets/Images/AgentDashboard/PendingVerification.png";
import seen from "../Assets/Images/Seen.png";
import Like from "../Assets/Images/AgentDashboard/Like.png";
import { RiQuestionnaireFill } from "react-icons/ri";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { MdOutlineMobileScreenShare } from "react-icons/md";

const TenantComp = ({ props, name }) => {
  // console.log(props);
  const [filteredData, setfilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);

    // If search term is empty, show all properties
    if (searchTerm === "") {
      setfilteredData(props);
    } else {
      // Filter properties based on houseName
      const filtered = props.filter((buyer) =>
        buyer.buyerDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setfilteredData(filtered);
    }
  };

  useEffect(() => {
    // Initialize filteredData with all properties when the component loads
    setfilteredData(props);
    console.log(filteredData);
  }, [props]);

  return (
    <>
      {/* Mapping */}
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
            key={index}
            className="px-[1rem] py-[0.5rem] flex gap-x-[0.5rem] w-[100%]"
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
                  {values.buyerDetails.name}
                </p>
                <p className="text-[1rem] font-semibold">
                  <u>Preference</u>
                </p>
                <p className="text-[1rem] font-semibold">
                  Rs.{values.buyerDetails.budget} Cr &{" "}
                  {values.buyerDetails.houseConfiguration}
                </p>
              </div>
            </div>
            {values.isOnBoard ? (
              <Link
                className="bg-[#E8E7E7] rounded-[0.5rem] flex justify-center items-center flex-col p-[0.5rem] w-[15%]"
                // to={`/createboard?tenantId=${values._id}&name=${values.tenantDetails.name}&boardId=${values.boardId} `}
                to={`/PropertyViewBoardS?boardId=${values.boardId}&buyerId=${values._id}&name=${values.buyerDetails.name} `}
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
                to={`/ViewBoardS?buyerId=${values._id}&name=${values.buyerDetails.name}&boardId=${values.boardId}`}
              >
                <IoIosArrowDroprightCircle className="text-[#5D6560] text-[1.5rem]" />
                <p className="text-[0.8rem] text-center font-semibold">
                  Take Action
                </p>
              </Link>
            )}
            {/* {values.isOnBoard && values.status == "Shortlisted" ? (
            <Link
              to={`/PropertyViewBoardS?buyerId=${values._id}&name=${values.buyerDetails.name} `}
            >
              <img
                src={checkP}
                style={{
                  height: "27px",
                  marginTop: "20px",
                  marginBottom: "-8px",
                }}
              />
              <text
                style={{
                  fontSize: "12px",
                  color: "#5D6560",
                  fontWeight: "bold",
                }}
              >
                Take Action
              </text>
            </Link>
          ) : (
            ""
          )} */}
          </div>
        ))}
    </>
  );
};

export default TenantComp;
