import React, { Component } from "react";
import carpetarea from "../Assets/Images/BoardCreation/space.png";
import money from "../Assets/Images/BoardCreation/Money.png";
import furnishingtype from "../Assets/Images/BoardCreation/Group.png";
import housetype from "../Assets/Images/BoardCreation/area.png";
import demoimg from "../Assets/Images/AgentDashboard/imgOne.png";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { RxDimensions } from "react-icons/rx";
import { MdBed } from "react-icons/md";
import { LuArmchair } from "react-icons/lu";

const YetToShareComp = ({ responseProperty }) => {
  // console.log(responseProperty);
  console.log(responseProperty)

  function formatDate(startDate) {
    const options = { day: "numeric", month: "long" };
    return new Date(startDate).toLocaleDateString("en-US", options);
  }
  console.log(responseProperty.updatedAt);

  function calculateDaysGone(startDate) {
    const currentDate = new Date();
    const startDateObj = new Date(startDate);
    const timeDifference = currentDate - startDateObj;
    const daysGone = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days

    return daysGone;
  }
  const todayISOString = new Date().toISOString().split("T")[0];
  const startDate = todayISOString;

  const dateUpdated = formatDate(startDate);

  return (
    <>
      {responseProperty.map((values, index) => (
        <div key={index}>
          <div className="px-[1rem] py-[0.5rem]">
            <div className="flex flex-col">
              {/* upper-container */}
              <div
                className="bg-white p-[0.5rem] flex"
                style={{
                  borderRadius: "15px",
                  border: "1px solid #DAF0EE",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                {/* img-container */}
                <div className="w-[25%]">
                  <img
                    src={values.images[0]}
                    alt="imgOne"
                    // style={{
                    //   marginLeft: "0px",
                    //   marginTop: "0px",
                    //   borderRadius: "15px",
                    // }}
                    // height="60px"
                  />
                </div>
                <div className="w-[75%]">
                  <p className="text-[1.1rem] font-bold">
                    {values.houseName}, {values.societyName}
                  </p>
                  <div className="flex">
                    <HiOutlineCurrencyRupee className="text-[1.3rem] mr-[0.2rem]" />
                    <p>{values.propertyDetails[0].featureInfo.rentAmount}/month</p>
                  </div>
                  {/* feature-con
              er */}
                  <div className="grid grid-cols-3 gap-x-[0.5rem] pt-[1rem]">
                    {/* carpetArea */}
                    <div className="flex justify-center items-center flex-col font-bold">
                      <RxDimensions className="text-[1.5rem] my-[0.2rem]" />
                      <p className="text-center">
                        {values.propertyDetails[0].featureInfo.carpetArea} sft
                      </p>
                    </div>
                    {/* config */}
                    <div className="flex justify-center items-center flex-col font-bold">
                      <MdBed className="text-[1.5rem] my-[0.2rem]" />
                      <p className="text-center">
                        {values.propertyDetails[0].propertyInfo.houseConfig}
                      </p>
                    </div>
                    {/* furnishingType */}
                    <div className="flex justify-center items-center flex-col font-bold">
                      <LuArmchair className="text-[1.5rem] my-[0.2rem]" />
                      <p className="text-center">
                        {values.propertyDetails[0].featureInfo.furnishingType}
                      </p>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
              {/* lower-container */}
              <div className="flex justify-center items-center">
                <div
                  className="bg-[#DAF0EE] text-[1.2rem] w-[80%] py-[0.2rem] flex justify-center items-center font-bold"
                  style={{
                    borderRadius: "0 0 15px 15px",
                  }}
                >
                  Added since {calculateDaysGone(values.updatedAt)} days
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default YetToShareComp;
