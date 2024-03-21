import React, { useEffect, useState } from "react";

import "../Dashboard.css";
import Heart from "react-animated-heart";
import { Link } from "react-router-dom";
// import "./DashComponent.css";
import homeDown from "../Assets/Images/FieldAgent/homeDown.png";
import Rupee from "../Assets/Images/TenantSide/Ruppee.png";
import space from "../Assets/Images/TenantSide/area.png";
import Sofa from "../Assets/Images/TenantSide/Sofa.png";
import HouseConfig from "../Assets/Images/TenantSide/HouseConfig.png";
import Parking from "../Assets/Images/TenantSide/Parking.png";
import Parking2 from "../Assets/Images/TenantSide/Parking2.png";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBoardState } from "./boardState";
import { globalTenantId } from "./TenantSideView";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
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

// import ActiveLeads from "./ActiveLeads";

function TenantSideViewComp({ boards, boardId }) {
  const token = localStorage.getItem("token");
  // console.log(token);
  //const shortListStatus = false;
  const [isClick, setClick] = useState(false);
  const [shortListStatus, setshortListStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  // Initialize isClick state as an array with the same length as boards
  const { isClickArray, setIsClickArray } = useBoardState(boards.length);
  //const ClickArray
  // console.log("isClickArray", isClickArray);
  //console.log("boardLength", boards.length)

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axios.get(
  //         "https://b8rliving.com/property",
  //         axiosConfig
  //       );

  //     //Filter Data
  //     const filterData = response.data.data.properties ;

  //     // Sort the response data by the 'imagesApproved' property in descending order
  //     const sortedProperties = filterData.sort((a, b) => {
  //       return a.imagesApproved - b.imagesApproved;
  //     });

  //       setresponsePendingProperties(sortedProperties);

  //     } catch (error) {
  //       console.log(error);
  //       // Handle the error here if needed
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  // console.log("TID from -> " + globalTenantId);

  const shortlist = async (propertyid, index) => {
    // event.preventDefault();
    // setClick(true);
    
    // if (isClickArray[index]) {
    //   setClick(!isClick);
     
    // } else {
    //   setClick(false);
     
    // }
    setIsClickArray((prevState) => {
      const updatedIsClickArray = [...prevState];
      updatedIsClickArray[index] = !isClickArray[index]; // Use prevState here
      return updatedIsClickArray;
    });   
    const updatedIsClick = !isClickArray[index];
    setClick(updatedIsClick);
    setshortListStatus(updatedIsClick); // Update shortListStatus based on updatedIsClick
    
    
    //setIsClickArray
    /*  
   if(isClick){
      alert("Property shortlisted  ")
    }
    else{
    alert("Property removed from shortlist")}
   */
    // console.log("Received Id:", propertyid);
    //console.log("Recieved BId", boardId);
    // setIsClickArray((prevState) => {
    //   const updatedIsClickArray = [...prevState];
    //   updatedIsClickArray[index] = !isClickArray[index]; // Use prevState here
    //   return updatedIsClickArray;
    // });   
    try {
      // console.log("Final pid",propertyid)
      // console.log("Recieved BId", boardId);
  
      console.log(
        "PropertyId",
        propertyid,
        "shortliststatus",
        shortListStatus,
        "tenantId",
        globalTenantId
      );
      const response = await axios.put(
        `https://b8rliving.com/board/shortlist/${boardId}`,
        { propertyid, shortListStatus:updatedIsClick, globalTenantId },
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
  useEffect(()=>{
    console.log("inUseEffect"+" "+ isClickArray);

  },[])
  console.log(isClickArray)

  //console.log(boards);

  return (
    <>
      {/* Mapping */}
      {boards.map((property, index) => (
        <div key={index} className="px-[0.5rem] my-[1rem]">
          <div
            className="py-[0.5rem] bg-[#DAF0EE] rounded-[0.3rem] p-[0.5rem]"
            style={{
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            {/* carousel */}
            <Link
              to={`/DetailView?boardId=${boardId}&propertyId=${property._id}&index=${index}`}
            >
              <Carousel
                showThumbs={false}
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
                        objectFit: "cover",
                        borderRadius: "10px",
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
                      {property.houseName}, {property.societyName}
                    </p>
                  </div>
                ))}
              </Carousel>
            </Link>
            {/* other-item */}
            <div className="pt-[0.5rem]">
              {/* rent & shortlist */}
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center flex-col">
                  <div className="flex justify-center items-center">
                    <HiOutlineCurrencyRupee className="text-[1.4rem] font-bold" />
                    <p className="font-bold text-[1.1rem]">
                      {property.propertyDetails.featureInfo.rentAmount} /month
                    </p>
                  </div>
                  <p className="text-[0.9rem]"> (incl. Maintenance )</p>
                </div>
                {globalTenantId && (
                  <div className="flex justify-center items-center">
                    <div className="mr-[-30px] flex justify-center items-center">
                      {isClickArray[index] ? (
                        <p
                          style={{
                            fontStyle: "Glida Display",
                            fontSize: "16px",
                            color: "#B30808",
                            fontWeight: "bold",
                          }}
                        >
                          Shortlisted
                        </p>
                      ) : (
                        <p
                          style={{
                            fontStyle: "Glida Display",
                            fontSize: "16px",
                            color: "#B30808",
                            fontWeight: "bold",
                          }}
                        >
                          Shortlist{" "}
                        </p>
                      )}
                    </div>
                    <div className="mr-[-30px]">
                      <Heart
                        height={8}
                        isClick={isClickArray[index]}
                        onClick={() => shortlist(property._id, index)}
                      />
                    </div>
                  </div>
                )}
              </div>
              {/* features */}
              <div className="grid grid-cols-4">
                <div className="flex justify-center items-center flex-col">
                  <RxDimensions className="text-[1.5rem] mb-[0.2rem]" />
                  <p className="font-bold text-center">
                    {property.propertyDetails.featureInfo.carpetArea} sqft
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <MdBed className="text-[1.5rem] mb-[0.2rem]" />
                  <p className="font-bold text-center">
                    {property.propertyDetails.propertyInfo.houseConfig}
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <MdChair className="text-[1.5rem] mb-[0.2rem]" />
                  <p className="font-bold text-center">
                    {property.propertyDetails.featureInfo.furnishingType}
                  </p>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <LuParkingCircle className="text-[1.5rem] mb-[0.2rem]" />
                  <p className="font-bold text-center">
                    {property.propertyDetails.featureInfo.parking.car != "" ||
                    property.propertyDetails.featureInfo.parking.bike > 0
                      ? "Available"
                      : "No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* <div className="px-[0.5rem]">
      
      </div> */}
    </>
  );
}
export default TenantSideViewComp;
