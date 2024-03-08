import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import imgOne from "../../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../../Assets/Images/CheckP.png";
import loadingGif from "../../Assets/Images/loading.gif";

import area from "../../Assets/Images/BoardCreation/area.png";
import Group from "../../Assets/Images/BoardCreation/Group.png";
import parking from "../../Assets/Images/BoardCreation/parking.png";
import space from "../../Assets/Images/BoardCreation/space.png";
import { MdBed } from "react-icons/md";
import { MdChair } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { LuParkingCircleOff } from "react-icons/lu";
import { RxDimensions } from "react-icons/rx";
import { LuPlusCircle } from "react-icons/lu";
import { FaSquareCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";

const ViewBoardComp = ({ props, loading, Id, responseDataBoard }) => {
  const [visibleItems, setVisibleItems] = useState(3);
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    propertyId: "",
  });
  const [addedProperty, setAddedProperty] = useState(false);
  console.log(props);

  // console.log(responseDataBoard.tenantId.boardId);

  // console.log(boardId);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const addToBoard = async (pId) => {
    // const { name, value } = event.target;
    const boardId = responseDataBoard.tenantId.boardId;

    console.log("propertyId-> " + pId);
    console.log("boardId-> " + boardId);
    //   setFormData(pId);
    //   // setFormData((prevState) => {
    //   //   return {
    //   //     ...prevState,
    //   //     [name]: value,
    //   //   };
    //   // })

    //   console.log(formData);

    try {
      const response = await axios.put(
        `https://b8rliving.com/board/property/${boardId}`,
        { propertyId: pId },
        axiosConfig
      );
      console.log(response);
      setAddedProperty(true);
      console.log(addedProperty);
      // alert(response);
      // console.log(JSON.stringify(formData));
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      // setLoading(false); // Set loading to false when the request is complete
    }
  };

  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 2);
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <div>
          {/* {responseDataBoard.key} */}
          {props.map((values, index) => (
            <div key={index} className="px-[1rem]">
              <div className="flex w-[100%] gap-x-[0.5rem] py-[0.5rem]">
                {/* left side */}
                <div
                  className="w-[85%] px-[1rem] py-[0.5rem] flex justify-between items-center"
                  style={{
                    background: "#F5F5F5",
                    border: "1px solid #000000",
                    borderRadius: "0.5rem",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    display: "flex",
                  }}
                >
                  {/* img */}
                  <div className="w-[25%]">
                    <img src={values.images[0]} alt="imgOne" />
                  </div>
                  {/* second-container */}
                  <div className="flex flex-col w-[75%] px-[1rem]">
                    {/* middlesection */}
                    <div className="flex flex-col">
                      {/* <text style={{ fontSize: "10px" }}>
                      {values.houseName},{values.societyName}
                    </text>
                    <br />
                    <text style={{ fontSize: "10px", marginLeft: "-90px" }}>
                      <b>
                        Rent:{values.propertyDetails.featureInfo.rentAmount}
                      </b>
                    </text>
                    <div
                      style={{
                        width: "150px",
                        height: "25px",
                        marginTop: "10px",
                        marginLeft: "10px",
                        display: "flex",
                      }}
                    >
                      <img src={Group} height={15} />
                      <text
                        style={{
                          fontSize: "12px",
                          marginLeft: "1px",
                          fontFamily: "Inter",
                          fontStyle: "normal",
                          fontWeight: "bold",
                        }}
                      >
                        {values.propertyDetails.featureInfo.furnishingType}
                      </text>
                    </div> */}
                      <p className="">
                        {values.houseName}
                        {values.societyName}
                      </p>
                      <p className="font-bold">
                        Rent:{values.propertyDetails.featureInfo.rentAmount}{" "}
                        INR/month
                      </p>
                      <div className="pt-[0.8rem] flex items-center text-[#3B413D] font-semibold justify-center py-[0.5rem]">
                        <MdChair className="text-[1.2rem]" />
                        <p className="px-[0.5rem]">
                          {values.propertyDetails.featureInfo.furnishingType}
                        </p>
                      </div>
                    </div>
                    {/* last-section */}
                    <div className="flex font-bold text-[#3B413D] gap-x-[2rem] text-center flex-row flex-wrap">
                      {/* <div style={{ marginLeft: "-25px" }}>
                      <img src={space} alt="space" />
                      <text style={{ fontSize: "10px" }}>
                        {values.propertyDetails.featureInfo.carpetArea}
                      </text>
                    </div>
                    <div>
                      <img
                        src={area}
                        alt="area"
                        style={{ marginLeft: "-25px" }}
                      />
                      <text style={{ fontSize: "7px" }}>
                        {values.propertyDetails.propertyInfo.houseConfig}
                      </text>
                    </div>
                    <img
                      src={parking}
                      alt="parking"
                      style={{ marginLeft: "-25px" }}
                    />
                    <text style={{ fontSize: "10px" }}>
                      {values.propertyDetails.featureInfo.parking.car > 0 &&
                      values.propertyDetails.featureInfo.parking.bike > 0
                        ? "Available"
                        : "No"}
                    </text> */}
                      <div className="flex flex-col items-center">
                        <RxDimensions className="text-[1.1rem] mx-[0.3rem]" />
                        <p className="text-[0.6rem]">
                          {values.propertyDetails.featureInfo.carpetArea} sft
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <MdBed className="text-[1.1rem] mx-[0.3rem]" />
                        <p className="text-[0.6rem]">
                          {values.propertyDetails.propertyInfo.houseConfig}
                        </p>
                      </div>
                      {values.propertyDetails.featureInfo.parking.car > 0 &&
                      values.propertyDetails.featureInfo.parking.bike > 0 ? (
                        <div className="flex flex-col items-center">
                          <LuParkingCircle className="text-[1.1rem] mx-[0.3rem]" />
                          <p className="text-[0.6rem]">Available</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <LuParkingCircleOff className="text-[1.1rem] mx-[0.3rem]" />
                          <p className="text-[0.6rem]">Not Available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* {values._id} */}
                {/* {addedProperty ? (
                  <p style={{ color: "#52796F", fontWeight: "bolder" }}>
                    Added
                  </p>
                ) : (
                  <> */}
                <div
                  className="w-[15%] bg-[#E8E7E7] flex justify-center items-center rounded-[0.5rem] flex-col font-bold"
                  // key={values._id}
                  // onClick={() => addToBoard(values._id)}
                >
                  {/* {addedProperty ? (
                    <>
                      <FaSquareCheck className="text-[1.4rem] text-[#52796F]" />
                      <p className="text-[0.9rem] text-center py-[0.4rem] text-[#52796F]">
                        Added
                      </p>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => addToBoard(values._id)}
                        className="flex justify-center items-center flex-col"
                      >
                        <IoIosArrowDroprightCircle className="text-[1.4rem] text-[#5D6560]" />
                        <p className="text-[0.9rem] text-center py-[0.4rem] text-[#5D6560]">
                          Change Status
                        </p>
                      </button>

                    </>
                  )} */}
                  <Link
                    // onClick={() => addToBoard(values._id)}
                    className="flex justify-center items-center flex-col" 
                    to={`/ChangeStatus?propertyId=${values._id}`}
                  >
                    <IoIosArrowDroprightCircle className="text-[1.4rem] text-[#5D6560]" />
                    <p className="text-[0.7rem] text-center py-[0.4rem] text-[#5D6560]">
                      Change Status
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {visibleItems < props.length && (
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              <button onClick={handleLoadMore}>Load More Properties</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ViewBoardComp;
