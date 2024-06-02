import React from "react";
// import "./DashboardS.css";
import "./ListingComp.css";

import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import Seen from "../Assets/Images/Seen.png";
import shared from "../Assets/Images/shared.png";
import noImg from "../Assets/Images/AgentDashboard/noImg.png";
// import ActiveLeads from "./ActiveLeads";
import { TfiFaceSad } from "react-icons/tfi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineHideImage } from "react-icons/md";

function ListingComp(responseNoImageProperty, responseProperty) {
  console.log(responseNoImageProperty);

  return (
    <>
      <div className="flex justify-center items-center font-bold text-[1.2rem] py-[1rem]">
        <u>Pending Verification by Internal Team</u>
      </div>
      {/* Mapping */}
      {responseNoImageProperty.responseProperty.length !== 0 ? (
        <>
          {responseNoImageProperty.responseProperty.map((values, index) => (
            <div key={index}>
              <div className="px-[1rem] py-[0.5rem]">
                <div className="flex justify-between gap-x-[0.5rem]">
                  {/* left-container */}
                  <div
                    className="bg-white p-[0.5rem] w-[100%] flex items-center"
                    style={{
                      border: " 1px solid #DAF0EE",
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                      borderRadius: "15px",
                    }}
                  >
                    {/* img/icon */}
                    <div className="flex justify-center items-center w-[25%]">
                      <MdOutlineHideImage className="text-[3.5rem]" />
                    </div>
                    {/* other-details */}
                    <div className="flex flex-col justify-center items-center w-[75%]">
                      <div className="pl-[1rem] flex flex-col font-bold pb-[0.5rem]">
                        {values.houseName}, {values.societyName}
                      </div>
                      {/* Awaiting Photos */}
                      <div className="bg-[#E8ECEC] py-[0.3rem] flex justify-center items-center text-[#5D6560] rounded-[10px] px-[1rem] font-bold">
                        Awaiting Photos
                      </div>
                    </div>
                  </div>
                  {/* right-container */}
                  
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex justify-center items-center flex-col text-[#E13018] py-[2rem]">
            <TfiFaceSad className="text-[4rem]" />
            <p className="text-[1.3rem] font-bold py-[1rem] text-center">
              No Property Found
            </p>
          </div>
        </>
      )}
      {/* <hr></hr> */}
      <div className="flex justify-center items-center font-bold text-[1.2rem] pb-[1rem]">
        <u>Pending Photos from Field Agent</u>
      </div>
      {responseNoImageProperty.responseNoImageProperty.length !== 0 ? (
        <>
          {responseNoImageProperty.responseNoImageProperty.map(
            (values, index) => (
              <div key={index}>
                <div className="px-[1rem] py-[0.5rem]">
                  <div className="flex justify-between gap-x-[0.5rem]">
                    {/* left-container */}
                    <div
                      className="bg-white p-[0.5rem] w-[100%] flex items-center"
                      style={{
                        border: " 1px solid #DAF0EE",
                        boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                        borderRadius: "15px",
                      }}
                    >
                      {/* img/icon */}
                      <div className="flex justify-center items-center w-[25%]">
                        <MdOutlineHideImage className="text-[3.5rem]" />
                      </div>
                      {/* other-details */}
                      <div className="flex flex-col justify-center items-center w-[75%]">
                        <div className="pl-[1rem] flex flex-col font-bold pb-[0.5rem]">
                          {values.houseName}, {values.societyName}
                        </div>
                        {/* Awaiting Photos */}
                        <div className="bg-[#FCECEF] py-[0.3rem] flex justify-center items-center text-[#AA223C] rounded-[10px] px-[1rem] font-bold">
                          Awaiting Photos
                        </div>
                      </div>
                    </div>
                    {/* right-container */}
                    {/* <div
                      className="bg-[#E8E7E7] p-[0.5rem] w-[15%] flex justify-center items-center text-[#5D6560] flex-col"
                      style={{
                        borderRadius: "15px",
                      }}
                    >
                      <IoIosArrowDroprightCircle className="text-[1.5rem]" />
                      <p className="font-bold">email</p>
                    </div> */}
                  </div>
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <>
          <div className="flex justify-center items-center flex-col text-[#E13018] py-[2rem]">
            <TfiFaceSad className="text-[4rem]" />
            <p className="text-[1.3rem] font-bold py-[1rem] text-center">
              No Property Found
            </p>
          </div>
        </>
      )}
    </>
  );
}
export default ListingComp;