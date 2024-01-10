import React, { useEffect, useState } from "react";

// import Dashboardcss from '../Dashboard.css';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import CommonBtn from "../CommonButton";
// import logo from "../Assets/Images/Logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import DetailView1 from "../Assets/Images/TenantSideView/DetailView1.png";
import DetailView2 from "../Assets/Images/TenantSideView/DetailView2.png";
import DetailView3 from "../Assets/Images/TenantSideView/DetailView3.png";
import Heart from "react-animated-heart";
import "./DetailView.css";
import Footer from "../Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import gatedSecurity from "../Assets/Images/PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import powerBackup from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import ac from "../Assets/Images/PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import carParking from "../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import bikeParking from "../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import clubHouse from "../Assets/Images/PropertyAdditionPageIcons/club_house/24.png";
import groceryStore from "../Assets/Images/PropertyAdditionPageIcons/convenience_store/24.png";
import gym from "../Assets/Images/PropertyAdditionPageIcons/gym_1/24.png";
import bathroom from "../Assets/Images/PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import swimmingPool from "../Assets/Images/PropertyAdditionPageIcons/swimming_pool/24.png";
import nonVeg from "../Assets/Images/PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import construction_year from "../Assets/Images/PropertyAdditionPageIcons/construction_year/24.png";
import space_or_area from "../Assets/Images/PropertyAdditionPageIcons/space_or_area/24.png";
import Movein from "../Assets/Images/Move-in.png";
import rent_1 from "../Assets/Images/PropertyAdditionPageIcons/rent_1/24.png";
import calender from "../Assets/Images/AgentDashboard/calender.png";
import balcony from "../Assets/Images/PropertyAdditionPageIcons/number_of_balcony/24.png";
import sofa from "../Assets/Images/AgentDashboard/Sofa.png";
import house_Config from "../Assets/Images/AgentDashboard/House_Config.png";
import floors from "../Assets/Images/AgentDashboard/floors.png";
import key from "../Assets/Images/AgentDashboard/key.png";
import { useNavigate } from "react-router-dom";
import { useBoardState } from "./boardState";
import { globalTenantId } from "./TenantSideView";
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
import { GoClockFill } from "react-icons/go";

function DetailView() {
  const queryParameters = new URLSearchParams(window.location.search);
  const boardId = queryParameters.get("boardId");
  const propertyId = queryParameters.get("propertyId");
  const propertyIndex = queryParameters.get("index");
  console.log(boardId);

  // const [isClick, setClick] = useState(false);
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  //boards = responseDataProperty;
  const [shortListStatus, setshortListStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [booleanValues, setBooleanValues] = useState([]); // Store boolean values here
  const { isClickArray, setIsClickArray } = useBoardState();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  useEffect(() => {
    const fetchTenantDetails = async () => {
      setLoading(true);
      //console.log("wuhssufeeteiUUUUU");
      //Get All Properties
      try {
        setLoading(true);
        const response = await axios.get(
          `https://b8rliving.com/board/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.board.propertyId;
        const responseDataProperty = response.data.data.board.propertyId;
        console.log("REsponse", response);
        // const responseDataFilter = response.data.data.board.propertyId.propertyDetails;
        const responseData =
          response.data.data.board.propertyId[propertyIndex].propertyDetails
            .featureInfo;
        console.log("Response from this api", responseData);
        const booleanValues = [];
        // responseData.forEach((tenant) => {
        for (const key in responseData) {
          if (typeof responseData[key] === "boolean") {
            booleanValues[key] = responseData[key];
            console.log(booleanValues);
          }
        }
        // });

        setBooleanValues(booleanValues);

        const filteredProperties = responseDataProperty.filter(
          (property) => property._id == propertyId
        );

        // Update the formData state with the response data
        setResponseDataProperty(filteredProperties);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchTenantDetails(); // Call the fetch function
  }, [boardId]);

  console.log(responseDataProperty);
  // console.log(setBooleanValues);

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

  //////////////////////////////////
  const shortlist = async (propertyid, propertIndex) => {
    setIsClickArray((prevState) => {
      const updatedIsClickArray = [...prevState];
      updatedIsClickArray[propertIndex] = !isClickArray[propertIndex];
      console.log(isClickArray);
      return updatedIsClickArray;
    });

    try {
      console.log("Final pid", propertyid);
      console.log("Recieved BId", boardId);
      const response = await axios.put(
        `https://b8rliving.com/board/shortlist/${boardId}`,
        { propertyid, shortListStatus, globalTenantId },
        axiosConfig
      );
      console.log("Response fo apishortlist ", response);
      alert(response.data.message);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };
  ///////////////////////////////

  const formateDate = (givendate) => {
    var dateObject = new Date(givendate);
    var options = { day: "numeric", month: "short", year: "2-digit" };
    var formattedDate = dateObject.toLocaleDateString("en-GB", options);
    return formattedDate;
  };
  function convertToCrore(number) {
    var croreValue = number / 10000000;
    return croreValue.toFixed(2); // Keep two decimal places
  }
  return (
    <>
      {responseDataProperty.map((property, index) => (
        <div key={index}>
          <div
            className=""
            style={{
              // borderRadius: "9px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <div
            //   className="containered form"
            //   style={{
            //     height: '300px',
            //     borderRadius: '5px',
            //     boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            //     background: '#DAF0EE',
            //   }}
            >
              {/* <Link to="/DetailImgView"><img
            src={DetailView1}
            alt="Tenant"
            height={373}
            style={{marginLeft:"-14px",marginTop:"-14px"}}

          /></Link> */}

              <Link
              // to={`/DetailImgView?boardId=${boardId}&propertyId=${property._id}&propertyIndex=${propertyIndex}`}
              ></Link>
              <Carousel
                // showThumbs={false}
                showArrows={true}
                infiniteLoop={true}
                autoPlay={true}
                interval={1500}
              >
                {property.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      style={{
                        boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
                        // borderRadius: "10px",
                        scale: 1,
                      }}
                    />
                    <p
                      className="legend"
                      style={{
                        color: "#FFFFF",
                        fontSize: "16px",
                        fontWeight: "bolder",
                      }}
                    >
                      {property.houseName}
                    </p>
                  </div>
                ))}
              </Carousel>
            </div>


            <Link to={property.tourLink3D}>
              <div className="px-[1rem]">
                <div className="flex justify-center items-center flex-col">
                  <img
                    src={property.images[0]}
                    className="w-[80%] opacity-50"
                    style={{
                      borderRadius: "1rem 1rem 0 0 ",
                    }}
                  />
                  <div
                    className="font-bold py-[0.5rem] px-[1rem] bg-[#666666] w-[80%] flex justify-center items-center"
                    style={{
                      borderRadius: "0 0 1rem 1rem",
                    }}
                  >
                    <p className="text-white font-bold text-[1.3rem]">
                      3D Virtual Tour
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* property-name */}
            <div className="flex justify-center items-center py-[1rem]">
              <p className="text-[#3B413D] text-[1.7rem] font-bold">
                {property.houseName}
              </p>
            </div>
            {/* about the Society */}
            <div className="px-[1rem]">
              <div
                className="rounded-[0.5rem] p-[0.5rem]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(232, 231, 231, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25) ",
                }}
              >
                <p className="text-[#3B413D] text-[1.3rem] font-bold pb-[1rem]">
                  About the Society
                </p>
                <div className="grid grid-cols-4 gap-x-[0.5rem]" style={{}}>
                  <div className="flex items-center flex-col text-center">
                    <MdOutlineSecurity className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      Gated Security
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      always secure
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <MdPower className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      24 x 7
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      Power Back-Up
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <MdOutlineSportsHandball className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      Club house
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      with Swimming Pool
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <FaCartShopping className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      Grocery Store
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">In Campus</p>
                  </div>
                </div>
              </div>
            </div>
            {/* house-details */}
            <div className="px-[1rem] py-[1rem]">
              <div
                className="rounded-[0.5rem] p-[0.5rem]"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(218, 240, 238, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <p className="text-[#3B413D] text-[1.3rem] font-bold pb-[1rem]">
                  House Details
                </p>
                <div
                  className="grid grid-cols-4 gap-x-[0.5rem] gap-y-[1rem]"
                  style={{}}
                >
                  <div className="flex items-center flex-col text-center">
                    <MdBed className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      {property.propertyDetails.propertyInfo.houseConfig}
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      + {property.propertyDetails.featureInfo.bathrooms}{" "}
                      Bathrooms
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <MdBalcony className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      {property.propertyDetails.featureInfo.balconies} Balconies
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      Bedroom, Living
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <RxDimensions className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      {property.propertyDetails.featureInfo.carpetArea} sft
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      Spacious than most
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <HiMiniBuildingOffice className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      floors {property.propertyDetails.featureInfo.floors.your}
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      Total {property.propertyDetails.featureInfo.floors.total}
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <MdChair className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      {property.propertyDetails.featureInfo.furnishingType}
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      {property.propertyDetails.featureInfo.ac
                        ? "with Air Conditioner"
                        : "without Air Conditioner"}
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <GoClockFill className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      {new Date().getFullYear() -
                        property.propertyDetails.featureInfo
                          .constructionYear}{" "}
                      year
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      Age of Building
                    </p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <BiSolidCalendarEdit className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      {formateDate(property.propertyDetails.updatedAt)}
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">Posted On</p>
                  </div>
                  <div className="flex items-center flex-col text-center">
                    <MdVpnKey className="text-[2rem]" />
                    <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                      {formateDate(
                        property.propertyDetails.featureInfo.availableFrom
                      )}
                    </p>
                    <p className="text-[#52796F] text-[0.8rem]">
                      Possession Time
                    </p>
                  </div>
                  {property.propertyDetails.featureInfo.nonVeg && (
                    <div className="flex items-center flex-col text-center">
                      <GiRoastChicken className="text-[2rem]" />
                      <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                        Non-Veg Allowed
                      </p>
                      <p className="text-[#52796F] text-[0.8rem]">
                        No Food Restriction
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-[#3B413D] text-[1.3rem] font-bold py-[1rem]">
                  Price Details
                </p>
                <div className="grid grid-cols-4 gap-x-[0.5rem]" style={{}}>
                  {property.propertyDetails.featureInfo.rentAmount > 1 && (
                    <>
                      <div className="flex items-center flex-col text-center">
                        <HiCurrencyRupee className="text-[2rem]" />
                        <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                          {property.propertyDetails.featureInfo.rentAmount} INR{" "}
                          /month
                        </p>
                        <p className="text-[#52796F] text-[0.8rem]">
                          Total Rent
                        </p>
                      </div>
                      <div className="flex items-center flex-col text-center">
                        <HiCurrencyRupee className="text-[2rem]" />
                        <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                          {property.propertyDetails.featureInfo.rentDeposit} INR
                        </p>
                        <p className="text-[#52796F] text-[0.8rem]">
                          Security Deposit
                        </p>
                      </div>
                    </>
                  )}
                  {property.propertyDetails.featureInfo.saleAmount > 1 && (
                    <>
                      <div className="flex items-center flex-col text-center">
                        <HiCurrencyRupee className="text-[2rem]" />
                        <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                          {convertToCrore(
                            property.propertyDetails.featureInfo.saleAmount
                          )}{" "}
                          Cr
                        </p>
                        <p className="text-[#52796F] text-[0.8rem]">
                          Sale Amount
                        </p>
                      </div>
                      <div className="flex items-center flex-col text-center">
                        <HiCurrencyRupee className="text-[2rem]" />
                        <p className="pt-[0.3rem] font-semibold text-[0.9rem]">
                          {property.propertyDetails.featureInfo.saleDeposit} INR
                        </p>
                        <p className="text-[#52796F] text-[0.8rem]">
                          Token Deposit
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* shortlist */}
            <div className="flex justify-center items-center flex-col pt-[4rem] pb-[2rem]">
              <p className="text-[1.5rem] font-bold text-center">
                Loved this property?
              </p>
              {globalTenantId && (
                <>
                  <Heart
                    isClick={isClickArray[propertyIndex]}
                    onClick={() => shortlist(propertyId, propertyIndex)}
                  />
                  {isClickArray[propertyIndex] ? (
                    <p
                      className="text-[#52796F] font-bold text-[1.4rem]"
                      style={{
                        fontStyle: "Glida Display",
                      }}
                    >
                      Shortlisted
                    </p>
                  ) : (
                    <p
                      className="text-[#B30808] font-bold text-[1.4rem]"
                      style={{
                        fontStyle: "Glida Display",
                      }}
                    >
                      Shortlist
                    </p>
                  )}
                </>
              )}
            </div>
            {/* btn */}
            <div className="flex justify-center items-center pb-[1rem]">
              <button
                className="bg-[#3B413DB2] font-bold text-[1.2rem] rounded-[0.6rem]"
                onClick={handleClick}
              >
                <p className="text-white px-[2rem] py-[0.5rem]">
                  See other properties
                </p>
              </button>
            </div>
            {/* footer */}
            <Footer />
            <div className="mb-[0.5rem]" />
          </div>
        </div>
      ))}
    </>
  );
}

export default DetailView;
