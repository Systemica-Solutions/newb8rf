import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import imgOne from "../../Assets/Images/AgentDashboard/imgOne.png";
import Add from "../../Assets/Images/BoardCreation/Add.png";
import loadingGif from "../../Assets/Images/loading.gif";

import area from "../../Assets/Images/BoardCreation/area.png";
import Group from "../../Assets/Images/BoardCreation/Group.png";
import parking from "../../Assets/Images/BoardCreation/parking.png";
import space from "../../Assets/Images/BoardCreation/space.png";
import CommonBtn from "../../CommonButton";
import { MdBed } from "react-icons/md";
import { MdChair } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { LuParkingCircleOff } from "react-icons/lu";
import { RxDimensions } from "react-icons/rx";
import { LuPlusCircle } from "react-icons/lu";
import { FaSquareCheck } from "react-icons/fa6";

const PropertyComp = ({
  props,
  Id,
  responseDataTenantData,
  responseDataTenantBoard,
  name,
  boardId,
  boardData,
}) => {
  const [visibleItems, setVisibleItems] = useState(2);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [addedItems, setAddedItems] = useState([]);

  // const [isClickArray, setIsClickArray] = useState(new Array(boards.length).fill(false));
  // console.log(props);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  // console.log("boardData=>"+boardData)

  // useEffect(() => {
  //   const fetchBoardDetails = async () => {
  //     setLoading(true);
  // Simulate an async operation, e.g., an API request
  // setTimeout( async () => {
  //   // console.log(props);

  //   const response = await axios.get(
  //     `https://b8rliving.com/property`,
  //     axiosConfig
  //   );
  //   const filteredProperties = response.data.data.property.filter(property => {
  //     return props.some(prop => prop._id === property._id.toString());
  //   });

  //   console.log(response.data.data.property);

  //   // setformData(response.data.data.property);
  //   // Assuming you have your response data stored in a variable called 'response'
  //   const responseDataPropertiesData = response.data.data.property;

  //   // const responseData = response.data.data.tenant.tenantDetails;
  //   // const responseDataBoardData = response.data.data.board;
  //   // const responseDataPropertiesData =  response;
  //   if (props && responseDataPropertiesData) {
  //     console.log(props);
  //     console.log(responseDataPropertiesData);
  //     // Perform filtering here
  //   } else {
  //     console.log("Props or responseDataPropertiesData is not available yet.");
  //   }

  //     console.log("filteredProperties:", filteredProperties);

  // setResponseDataProperty(responseDataPropertiesData); // Set All properties added to board
  // console.log(
  //   props.some((prop) => prop._id === responseDataPropertiesData._id)
  // );
  // console.log("responseDataPropertiesData:", responseDataPropertiesData);

  // console.log(responseDataPropertiesData);
  // if (responseDataPropertiesData) {
  //   // Create a set of unique _id values from responseDataPropertiesData
  //   const responseDataPropertyIds = new Set(
  //     responseDataPropertiesData.map((property) => property._id)
  //   );

  //   // Filter props based on matching _id values
  //   const filteredProps = props.filter((prop) =>
  //     responseDataPropertyIds.has(prop._id)
  //   );

  //   setResponseDataProperty(filteredProps); // Set all properties added to the board
  //   // setAddedItems(filteredProps); // Set matching items from props
  //   // setFilteredProps(filteredProps); // Set the filtered props to a new state

  //   console.log("filteredProps:", filteredProps);
  // }
  // console.log(responseDataBoardData);

  // Update the formData state with the response data
  // setResponseDataBoard(responseDataBoardData);
  // } catch (error) {
  //   console.error("Error fetching data:", error);
  // } finally {
  //   setLoading(false); // Set loading to false when the request is complete
  // }
  // }, 3000); // Simulating a 2-second delay
  // };
  //   fetchBoardDetails(); // Call the fetch function
  // }, [boardId]);

  const addToBoard = async (pId) => {
    console.log("addToBoard",pId);

    if (!addedItems.includes(pId)) {
      // If it's not already added, add it to the addedItems state
      setAddedItems([...addedItems, pId]);
    } else {
      // If it's not added, add it to the addedItems state
      setAddedItems(addedItems.filter((item) => item !== pId));
    }
  };

  console.log("added Items->" + addedItems);

  // console.log(typeof addedItems);

  const viewToBoard = async () => {
    var bId;
    const propertyId = [...addedItems];
    if (addedItems.length === 0) {
      alert("Please select at least one property.");
      return; // Stop further execution
    }
    console.log("boardID -> " + boardId);
    if (boardId !== null && boardId !== undefined) {
      console.log("tenant board already exist");
      try {
        if (boardId) {
          console.log(addedItems)
          var res;
          const response = await axios.put(
            `https://b8rliving.com/board/property/${boardId}`,
            { propertyId: addedItems },  // Ensure propertyId is an array
            axiosConfig
          );
          if (response.status === 200) {
            window.location.href = `/PropertyViewBoard?boardId=${boardId}&tenantId=${Id}&name=${name}`;
          }
        }
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching data:", error);
        // alert(error.message)
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    } else {
      console.log("creating new board");
      try {
        // create new board
        const res = await axios.post(
          `https://b8rliving.com/board`,
          { tenantId: Id },
          axiosConfig
        );
        // console.log(res.data);
        // const responseData = response.data.data.tenant.tenantDetails;
        console.log(res.data);
        bId = res.data.data.board.tenantId.boardId;
        console.log("newboardId-> " + bId);
      } catch (error) {
        console.log(error);
      }

      try {
        if (bId !== undefined && bId !== null) {
          const response = await axios.put(
            `https://b8rliving.com/board/property/${bId}`,
            { propertyId: addedItems },  // Ensure propertyId is an array
            axiosConfig
          );
          if (response.status === 200) {
            window.location.href = `/PropertyViewBoard?boardId=${bId}&tenantId=${Id}&name=${name}`;
          }
        }
        
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching data:", error);
        // alert(error.message)
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    }
  };
  const handleLoadMore = () => {
    setVisibleItems(visibleItems + 3);
  };

  useEffect(() => {
    if (boardData.length !== 0) {
      setAddedItems(boardData.map((data) => data._id));
    }
  }, [boardData]);
  // console.log(addedItems);
  // console.log(boardData);
  // console.log(responseDataProperty);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <div>
          {props.slice(0, visibleItems).map((values, key) => (
            <div key={key} className="py-[1rem]">
              <div className="flex w-[100%] gap-x-[0.5rem]">
                {/* left side */}
                <div
                  className="w-[85%] px-[1rem] py-[0.5rem] flex justify-between items-center"
                  style={{
                    background: values.status === "Closed" ? "rgb(250, 203, 203)" : "#F5F5F5",
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
                    <div className="flex font-bold text-[#3B413D] gap-x-[1.5rem] text-center">
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
                      <div className="flex flex-col justify-center items-center">
                        <RxDimensions className="text-[1.5rem] mx-[0.3rem]" />
                        <p className="text-[0.9rem] text-center">
                          {values.propertyDetails.featureInfo.carpetArea} sft
                        </p>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <MdBed className="text-[1.5rem] mx-[0.3rem]" />
                        <p className="text-[0.9rem] text-center">
                          {values.propertyDetails.propertyInfo.houseConfig}
                        </p>
                      </div>
                      {values.propertyDetails.featureInfo.parking.car > 0 &&
                      values.propertyDetails.featureInfo.parking.bike > 0 ? (
                        <div className="flex flex-col justify-center items-center">
                          <LuParkingCircle className="text-[1.5rem] mx-[0.3rem]" />
                          <p className="text-[0.9rem] text-center">Available</p>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center">
                          <LuParkingCircleOff className="text-[1.5rem] mx-[0.3rem]" />
                          <p className="text-[0.9rem] text-center">No</p>
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
                 className={`w-[15%] flex justify-center items-center rounded-[0.5rem] flex-col font-bold ${values.status === "Closed" ? "bg-[#FACBCB]" : "bg-[#E8E7E7]"}`}
                  key={values._id}
                  onClick={() => addToBoard(values._id)}
                >
                  {addedItems.includes(values._id) ? (
                    <>
                      <FaSquareCheck className="text-[1.4rem] text-[#52796F]" />
                      <p className="text-[0.9rem] text-center py-[0.4rem] text-[#52796F]">
                        Added
                      </p>
                    </>
                  ) : (
                    <>
                      <LuPlusCircle className="text-[1.4rem] text-[#141514]" />
                      <p className="text-[0.9rem] text-center py-[0.4rem] text-[#141514]">
                        Add to Board
                      </p>
                    </>
                  )}
                </div>
              </div>
              {/* </>
                )} */}
              {/* </div> */}
            </div>
          ))}

          {visibleItems < props.length && (
            <div style={{ textAlign: "center", marginTop: "10px", }}>
              <button onClick={handleLoadMore} style={{padding:"10px 10px",background:"#E78895",color:"white",borderRadius:"5px"}}>Load More Properties . .</button>
            </div>
          )}
        </div>
      )}
      <div
        onClick={() => viewToBoard()}
        className="py-[1rem] flex justify-center items-center"
      >
        {/* <Link
          to={`/PropertyViewBoard?boardId=${responseDataTenantData.boardId}&tenantId=${Id}&name=${name}&addedItemsId=${addedItems}`}
        >
        </Link> */}
        <CommonBtn title="View Board" margin="90px" />
      </div>
    </>
  );
};

export default PropertyComp;
