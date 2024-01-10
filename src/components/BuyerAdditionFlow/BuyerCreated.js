import React, { Component, useState, useEffect } from "react";
// import Signp from "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
// import vector from "../Assets/Images/RegisterLoginUser/vector.png";
import bgm from "../Assets/Images/BuyerAdditionFlow/BuyerBg.png";
import "./BuyerDesign.css";

import Footer from "../Footer";
import CommonBtn from "../CommonButton";
import CommonHeader from "../CommonHeader";
import greenTick from "../Assets/Images/greenTick.png";
import { FaCheckCircle } from "react-icons/fa";

function BuyerCreated() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const budget = queryParameters.get("budget");

  return (
    <>
      <div className="startPage">
        <div className="">
          <div
            className="form"
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${bgm})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <CommonHeader title="Buyer Created" color="#1E0058" />
            {/* buyer Created container */}
            <div className="flex justify-center items-center flex-col py-[2rem]">
              <FaCheckCircle className="text-[#3dd700] text-[5rem]" />
              <p className="text-center font-bold text-[1.7rem] pb-[0.5rem]">
                Buyer Added
              </p>
            </div>
            {/* name-container */}
            <div className="py-[1rem] flex justify-center items-center flex-col">
              <p className="text-[1.3rem] pb-[0.2rem]">
                <u>Name</u>
              </p>
              <p className="text-[2rem] font-bold text-[#1E0058]">{name}</p>
            </div>
            {/* budget-container */}
            <div className="py-[1rem] flex justify-center items-center flex-col">
              <p className="text-[1.3rem] pb-[0.2rem]">
                <u>Budget Details</u>
              </p>
              <p className="text-[2rem] font-bold text-[#1E0058]">
                {budget} Cr
              </p>
            </div>
            <Link
              to="/DashboardS"
              className="flex justify-center items-center py-[1rem]"
            >
              <CommonBtn
                title="Go to Agent Dashboard"
                margin="11%"
                fontweight="bolder"
                color="#DAF0EE"
                bgColor="#3F007F"
              />
            </Link>

            <Footer />
            <br />
          </div>
        </div>
      </div>

      {/* </div> */}
    </>
  );
}
export default BuyerCreated;
