import React from "react";
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import { Link } from "react-router-dom";
import sharedImg from "../Assets/Images/AgentDashboard/sharedImg.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineHideImage } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6"; //eye
import { MdOutlineMobileScreenShare } from "react-icons/md"; //share

const SharedNoactcomp = ({ responseProperty }) => {
  console.log(responseProperty);
  return (
    <>
      {responseProperty.map((values, index) => (
        <div key={index}>
          <div className="px-[1rem] py-[0.5rem]">
            <div className="flex justify-between gap-x-[0.5rem]">
              {/* left-container */}
              <div
                className="bg-white p-[0.5rem] w-[85%] flex items-center"
                style={{
                  border: " 1px solid #DAF0EE",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "15px",
                }}
              >
                {/* img/icon */}
                <div className="flex justify-center items-center w-[25%]">
                  <img
                    src={values.images[0]}
                    alt="imgOne"
                    style={{
                      // marginLeft: "10px",
                      // marginTop: "10px",
                      borderRadius: "15px",
                    }}
                    //   height="60px"
                  />
                </div>
                {/* other-details */}
                <div className="pl-[1rem] flex flex-col  w-[75%]">
                  <div className="flex flex-col font-bold pb-[0.5rem]">
                    {values.houseName}, {values.societyName}
                  </div>
                  {/* shared or View */}
                  <div className="grid grid-cols-2">
                    <div className="flex font-bold items-center">
                      <MdOutlineMobileScreenShare className="text-[#52796F] text-[1.7rem]" />
                      <div className="px-[0.2rem] text-[0.9rem]">
                        {/* <p>Shared</p>
                        <p> {values.sharedProperty.length} tenants</p> */}
                      </div>
                    </div>
                    <div className="flex font-bold items-center">
                      <FaEye className="text-[#52796F] text-[1.7rem]" />
                      <div className="px-[0.2rem] text-[0.9rem]">
                        {/* <p>Viewed</p>
                        <p>4 tenants</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* right-container */}
              <Link
                to={`/PropertyViewingStatus/${values._id}`}
                className="bg-[#E8E7E7] p-[0.5rem] w-[15%] flex justify-center items-center text-[#5D6560] flex-col"
                style={{
                  borderRadius: "15px",
                }}
              >
                <IoIosArrowDroprightCircle className="text-[1.5rem]" />
                <p className="font-bold text-[0.9rem] text-center">
                  View Status
                </p>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default SharedNoactcomp;
