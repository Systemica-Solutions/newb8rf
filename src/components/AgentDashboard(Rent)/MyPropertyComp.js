import React from "react";
import like from "../Assets/Images/AgentDashboard/Like.png";
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import { TfiFaceSad } from "react-icons/tfi";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineHideImage } from "react-icons/md";
import { FaHeart } from "react-icons/fa6";

const MyPropertyComp = ({ responseProperty }) => {
  console.log(responseProperty)
  return (
    <>
      {responseProperty.map((values, index) => (
        <div key={index}>
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                height: "78px",
                width: "302px",
                background: "#FFFFFF",
                border: "1px solid #DAF0EE",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                display: "flex",
              }}
            >
              <div>
                <img
                  src={imgOne}
                  alt="imgOne"
                  style={{ marginLeft: "10px", marginTop: "10px" }}
                />
              </div>
              <div style={{ marginTop: "5px" }}>
                <div style={{ textAlign: "left", marginLeft: "10px" }}>
                  <text style={{ fontSize: "9px", textAlign: "left" }}>
                    {values.houseName},{values.societyName}
                    <br />
                  </text>
                </div>
                <div
                  style={{
                    width: "150px",
                    height: "25px",
                    background: "#FFFFFF",
                    borderRadius: "10px",
                    marginTop: "5px",
                    marginLeft: "10px",
                  }}
                >
                  <text
                    style={{
                      fontSize: "12px",
                      color: "#000000",
                      marginLeft: "-50px",
                      fontFamily: "Inter",
                      fontStyle: "normal",
                      fontWeight: "bold",
                    }}
                  >
                    <img src={like} />4 Tenants
                  </text>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "75px",
                width: "52px",
                background: "#E8E7E7",
                borderRadius: "10px",
                marginLeft: "10px",
              }}
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
                Detail
              </text>
            </div>
          </div> */}
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
                  <MdOutlineHideImage className="text-[3.5rem]" />
                </div>
                {/* other-details */}
                <div className="flex flex-col justify-center items-center w-[75%]">
                  <div className="pl-[1rem] flex flex-col font-bold pb-[0.5rem]">
                    {values.houseName},{values.societyName}
                  </div>
                  {/* Awaiting Photos */}
                  <div className="py-[0.3rem] flex justify-center items-center rounded-[10px] px-[1rem] font-bold">
                    <FaHeart className="text-[2rem] text-[#B30808]" />
                    <p className="px-[0.5rem]">4 tenants</p>
                  </div>
                </div>
              </div>
              {/* right-container */}
              <div
                className="bg-[#E8E7E7] p-[0.5rem] w-[15%] flex justify-center items-center text-[#5D6560] flex-col"
                style={{
                  borderRadius: "15px",
                }}
              >
                <IoIosArrowDroprightCircle className="text-[1.5rem]" />
                <p className="font-bold text-[0.9rem]">View Status</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default MyPropertyComp;
