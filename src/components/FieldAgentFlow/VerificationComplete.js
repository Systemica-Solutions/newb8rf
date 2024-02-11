import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import greenTick from "../Assets/Images/greenTick.png";
import vector from "../Assets/Images/vector.png";
import Footer from "../Footer";
// import key_1 from "./PropertyAdditionPageIcons/key_1/24.png";
// import rent_1 from "./PropertyAdditionPageIcons/rent_1/24.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import { IoCloudDoneSharp } from "react-icons/io5";

function VerificationComplete() {
  const token = localStorage.getItem("token");
  const queryParameters = new URLSearchParams(window.location.search);
  const pId = queryParameters.get("propertyId");
  const [propertyData, setPropertyData] = useState();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (pId) {
        try {
          const res = await axios.get(
            `https://b8rliving.com/property/${pId}`,
            axiosConfig
          );
          //   console.log(res.data.data.property);
          setPropertyData(res.data.data.property);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchPropertyData();
  }, []);
  return (
    <>
      {/* <CommonHeader title="Upload Photos" color="#52796F" /> */}
      <div className="px-[1rem] py-[4rem]">
        <div className="flex justify-center items-center text-[#52796F]">
          <IoCloudDoneSharp className="text-[4rem]" />
          <p className="text-[1.5rem] px-[0.5rem] font-bold">
            Verification Complete
          </p>
        </div>
        <div className="flex justify-center items-center py-[2rem] flex-col text-center">
          <p className="text-[2rem] font-bold py-[2rem]">
            {propertyData && propertyData.houseName}
          </p>
          <p className="text-[1.4rem] font-semibold">
            <u>Society Name</u>
          </p>
          <p className="text-[2rem] font-bold">
            {propertyData && propertyData.societyName}
          </p>
        </div>
        <div className="flex justify-center items-center flex-col py-[3rem] text-center">
          <p className="text-[1.3rem] font-semibold text-center">
            <u>Features</u>
          </p>
          <p className="text-[2rem] font-bold text-[#52796F]">
            {propertyData &&
              propertyData.propertyDetails.propertyInfo.houseConfig}
          </p>
          <p className="text-[1.4rem] font-semibold mb-10">
            {`(${
              propertyData &&
              propertyData.propertyDetails.featureInfo.furnishingType
            })`}
          </p>
        <Link to="/FieldAgentHomeN"><CommonBtn title="Return to Home"  margin="52%" fontweight="bolder" /></Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default VerificationComplete;
