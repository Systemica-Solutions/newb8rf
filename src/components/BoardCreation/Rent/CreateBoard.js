import React, { Component, useEffect, useState } from "react";

import backgroundImg from "../../Assets/Images/BoardCreation/BackgroundBoard.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from "../../CommonTopButton";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import CreateBoardUpper from "../../Assets/CreateBoardUpper.png";
import CreateBoardAmm from "../../Assets/CreateBoardAmm.png";
import ApartmentType from "../../Assets/Images/BoardCreation/ApartmentType.png";
import area from "../../Assets/Images/BoardCreation/area.png";
import Group from "../../Assets/Images/BoardCreation/Group.png";
import parking from "../../Assets/Images/BoardCreation/parking.png";
import Money from "../../Assets/Images/BoardCreation/Money.png";
import loadingGif from "../../Assets/Images/loading.gif";

import axios from "axios";
import searchImg from "../../Assets/Search.png";
import SearchBar from "../../SearchBar";
import "./CreateBoard.css";
import gatedSecurity from "../../Assets/Images/PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import powerBackup from "../../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import ac from "../../Assets/Images/PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import carParking from "../../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import bikeParking from "../../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import clubHouse from "../../Assets/Images/PropertyAdditionPageIcons/club_house/24.png";

import groceryStore from "../../Assets/Images/PropertyAdditionPageIcons/convenience_store/24.png";

import gym from "../../Assets/Images/PropertyAdditionPageIcons/gym_1/24.png";

import bathroom from "../../Assets/Images/PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";

import swimmingPool from "../../Assets/Images/PropertyAdditionPageIcons/swimming_pool/24.png";
import nonVeg from "../../Assets/Images/PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import PropertyComp from "./PropertyComp";
import { MdBed } from "react-icons/md";
import { MdChair } from "react-icons/md";
import { LuParkingCircle } from "react-icons/lu";
import { LuParkingCircleOff } from "react-icons/lu";
import {
  MdOutlineSecurity,
  MdPower,
  MdOutlineSportsHandball,
} from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { BiSwim } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { RxDimensions } from "react-icons/rx";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { RiParkingBoxFill } from "react-icons/ri";
import { FaBath } from "react-icons/fa6";
import { MdBalcony, MdOutlineCleaningServices } from "react-icons/md";
import { LuArmchair } from "react-icons/lu";
import { TbAirConditioning } from "react-icons/tb";
import { GiRoastChicken } from "react-icons/gi";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { MdVpnKey } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaUserLock } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { BsFillHouseLockFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";

function CreateBoard() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const tenantId = queryParameters.get("tenantId");
  const boardId = queryParameters.get("boardId");

  console.log("bID from createboard -> " + boardId);

  const [searchValue, setSearchValue] = useState("");
  const [responseDataTenantBoard, setResponseDataTenantBoard] = useState("");
  const [responseDataTenant, setResponseDataTenant] = useState([]);
  const [responseDataTenantData, setResponseDataTenantData] = useState([]);
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [booleanValues, setBooleanValues] = useState([]); // Store boolean values here
  const [boardData, setBoardData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);

  const handleSearch = (searchTerm) => {
    setSearchValue(searchTerm);
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

 useEffect(() => {
    const fetchBoardDetails = async () => {
      if (boardId) {
        try {
          const response = await axios.get(
            `https://b8rliving.com/board/${boardId}`,
            axiosConfig
          );
  
          const responseDataPropertiesData = response.data.data.board.propertyId;
  
  
          if (responseDataPropertiesData) {
            // Filter properties where 'imagesApproved' is true
            const filteredProperties = responseDataPropertiesData.filter(
              (property) =>
                property.status === "Verified" &&
                property.closeListingDetails === null
            );
            setBoardData(responseDataPropertiesData); // Set all properties added to the board
          }
        } catch (error) {
          console.error("Error fetching board details:", error);
        }
      }
    };
  
  
  
    fetchBoardDetails();
  }, [boardId]);
  
  
  useEffect(() => {
    const fetchTenantDetails = async () => {
      try {
        const response = await axios.get(
          `https://b8rliving.com/tenant/${tenantId}`,
          axiosConfig
        );
  
  
  
        const responseData = response.data.data.tenant.tenantDetails;
        const responseDataTenantBoardId = response.data.data.tenant.boardId;
  
  
  
        setResponseDataTenantBoard(responseDataTenantBoardId);
        setResponseDataTenant(responseData);
        setResponseDataTenantData(response.data.data.tenant);
        // Separate boolean values and store them in booleanValues state
        const booleanValues = [];
        responseData.forEach((tenant) => {
          for (const key in tenant) {
            if (typeof tenant[key] === "boolean") {
              booleanValues[key] = tenant[key];
            }
          }
        });
  
  
  
        setBooleanValues(booleanValues);
      } catch (error) {
        console.error("Error fetching tenant details:", error);
      }
    };
    fetchTenantDetails();
  }, [tenantId]);
  
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `https://b8rliving.com/property`,
          axiosConfig
        );
  
  
  
        const properties = response.data.data.properties;
  
  
  
        if (properties) {
          // Filter properties where 'imagesApproved' is true
          const filteredProperties = properties.filter(
            (property) =>
              property.status === "Verified" &&
              property.closeListingDetails === null
          );
          setResponseDataProperty(filteredProperties);
  
  
          const closedPropertiesInBoard = boardData.filter(
            (boardProperty) => boardProperty.status === "Closed"
          );
  
  
          // Combine responseDataProperty and closedPropertiesInBoard
          const final = [...filteredProperties, ...closedPropertiesInBoard];
          setUpdatedData(final);
        }
      } catch (error) {
        console.error("Error fetching properties:", error)
      }
    };
  
    fetchProperties();
  }, [boardData]);
  

  // console.log(booleanValues);

  // console.log(responseDataProperty);

  // console.log(responseDataTenantData);

  // Create a mapping object for key names
  const keyNames = {
    carParking: "Car Parking",
    bikeParking: "Bike Parking",
    gatedSecurity: "Gated Security",
    powerBackup: "Power Backup",
    groceryStore: "Grocery Store",
    swimmingPool: "Swimming Pool",
    gym: "Gym",
    clubHouse: "Club House",
    AirCondition: "Air Conditioning",
    nonVeg: "Non-Veg",
    bathroom: "Bathroom",
  };
  

  return (
    <>
      <div
        className=""
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="Create/Add to Board" color="#52796F" />

        {/* <img src={CreateBoardUpper} style={{height:"190px"}}/> */}
        {/* upper component */}
        {loading ? (
          <div>
            <img src={loadingGif} height={180} />
            {/* hello */}
          </div>
        ) : (
          <>
            {/* maincontainer */}
            <div className="p-[1rem]">
              {/* first container */}
              <div
                className="bg-[#DAF0EE] px-[1rem] py-[0.5rem]"
                style={{
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <p className="text-[1.4rem]">
                  Tenant Name: <b>{name}</b>
                </p>
                {/* <p className="text-[0.9rem]">(8 days since onboarded)</p> */}
                {/* Preference */}
                <div className="pt-[1.5rem]">
                  <p className="font-bold text-[1.2rem]">
                    <u>Preference of Tenant</u>
                  </p>
                  <div
                    className="bg-white py-[0.2rem] grid grid-cols-3"
                    style={{
                      boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                    }}
                  >
                    <div className="flex items-center justify-center flex-col">
                      <MdBed className="text-[2.5rem]" />
                      <p className="font-bold text-center">
                        {responseDataTenant.length !== 0 &&
                          responseDataTenant[0].houseConfiguration}
                      </p>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                      <MdChair className="text-[2.5rem]" />
                      <p className="font-bold text-center">
                        {responseDataTenant.length !== 0 &&
                          responseDataTenant[0].furnishingType}
                      </p>
                    </div>
                    {responseDataTenant.length !== 0 &&
                    (responseDataTenant[0].carParking ||
                      responseDataTenant[0].bikeParking) ? (
                      <>
                        <div className="flex items-center justify-center flex-col">
                          <LuParkingCircle className="text-[2.5rem]" />
                          <p className="font-bold text-center">Available</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-center flex-col">
                          <LuParkingCircleOff className="text-[2.5rem]" />
                          <p className="font-bold text-center">Not Available</p>
                        </div>
                      </>
                    )}
                  </div>
                  {/* rent and ApartmentType */}
                  <div className="pt-[1rem] grid grid-cols-2">
                    {/* rent */}
                    <div className="flex justify-start items-center">
                      <HiCurrencyRupee className="text-[2rem]" />
                      <span className="text-[1.3rem] font-bold px-[0.2rem]">
                        {responseDataTenant.length !== 0 &&
                          responseDataTenant[0].rent}
                        /month
                      </span>
                    </div>
                    {/* ApartmentType */}
                    <div className="flex justify-center items-center">
                      <div
                        className="p-[0.5rem] flex justify-center items-center text-white rounded-[0.5rem]"
                        style={{
                          background: "rgba(59, 65, 61, 0.70)",
                        }}
                      >
                        <HiMiniBuildingOffice className="text-[2.5rem]" />
                        <span className="text-[0.9rem] font-bold px-[1rem]">
                          {responseDataTenant.length !== 0 &&
                            responseDataTenant[0].houseType}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* second container */}
              <div
                className="py-[0.5rem] px-[1rem] my-[1rem]"
                style={{
                  background: "#F5F5F5",
                  border: "1px solid #52796F",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <p className="font-bold text-[1.2rem] pb-[1rem]">
                  <u>Amenities & Other Preference</u>
                </p>
                <div className="grid grid-cols-3 gap-y-[1.5rem]">
                  {Object.entries(booleanValues).map(([key, value]) => {
                    if (value === true) {
                      const iconSources = {
                        gatedSecurity: <MdOutlineSecurity />,
                        powerBackup: <MdPower />,
                        groceryStore: <FaCartShopping />,
                        swimmingPool: <BiSwim />,
                        gym: <CgGym />,
                        clubHouse: <MdOutlineSportsHandball />,
                        AirCondition: <TbAirConditioning />,
                        carParking: <RiParkingBoxFill />,
                        bikeParking: <RiParkingBoxFill />,
                        nonVeg: <GiRoastChicken />,
                        bathroom: <FaBath />,
                      };
                      const iconSrc = iconSources[key];
                      return (
                        <div className="flex justify-center items-center flex-col">
                          <p className="text-[2rem]">{iconSrc}</p>
                          <p className="font-semibold text-center">
                            {keyNames[key]}
                          </p>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
            {/* CreateBoard - container */}
            <div className="px-[1rem] py-[1rem]">
              <p className="text-[#52796F] text-[2rem] font-semibold text-center pb-[0.5rem]">
                Create Tenant Board
              </p>
              <div
                className="flex justify-center items-center px-[1rem]
      rounded-[0.5rem] "
                style={{
                  boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <input
                  type="text"
                  placeholder="Search by property Name"
                  value={searchValue}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{
                    outline: "none",
                    marginBottom: "0",
                    boxShadow: "none",
                  }}
                />
                <button className="flex justify-center items-center">
                  <FaSearch className="text-[1.5rem]" />
                </button>
              </div>
              <PropertyComp
                props={updatedData}
                props={updatedData}
                props={updatedData}
                boardId={boardId}
                responseDataTenantData={responseDataTenantData}
                loading={loading}
                Id={tenantId}
                name={name}
                boardData={boardData}
                responseDataTenantBoard={responseDataTenantBoard}
              />
            </div>
          </>
        )}
        <Footer />
        {/* <div className="mb-[1rem]" /> */}
      </div>
      {/* </div> */}
    </>
  );
}
export default CreateBoard;
