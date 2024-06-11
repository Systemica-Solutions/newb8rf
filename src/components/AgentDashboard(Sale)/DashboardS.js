import React, { Component, useEffect, useState } from "react";
import "./DashboardS.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import DashComponent from "./DashComponent";

import Footer from "../Footer";
import vector from "../Assets/Images/vector.png";
import backgroundSecond from "../Assets/Images/Sale/SaleBg.png";
import listing from "../Assets/Images/AgentDashboard/listing.png";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Tenimg from "../Assets/Images/AgentDashboard/tenantimg.png";
import buyerpng from "../Assets/Images/Sale/bUYER.png";
import listingimg from "../Assets/Images/Sale/listing.png";
import currentview from "../Assets/Images/Sale/currentview.png";
import shortlistL from "../Assets/Images/Sale/shortlistL.png";
import shortlistR from "../Assets/Images/Sale/shortlistR.png";
import Vector from "../Assets/Images/Sale/Vector.png";
import wtp from "../Assets/Images/Sale/wtp.png";
import yts from "../Assets/Images/Sale/yts.png";
import tenantoraccounr from "../Assets/Images/Sale/tenantoraccounr.png";
import pv from "../Assets/Images/Sale/pv.png";
import shared from "../Assets/Images/Sale/shared.png";
import al from "../Assets/Images/Sale/al.png";
import righteye from "../Assets/Images/Sale/righteye.png";
import { FaHouse } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import { TbBrandGoogleHome } from "react-icons/tb";
import { BsFillBookmarkCheckFill } from "react-icons/bs"; //check
import { MdOutlineMobileScreenShare } from "react-icons/md"; //share
import { RiHomeHeartLine } from "react-icons/ri"; //shortlist
import { TbShareOff } from "react-icons/tb"; //yet to share
import { FaEye } from "react-icons/fa6"; //eye
import { RiQuestionnaireFill } from "react-icons/ri"; //question
import ExtraCommonButton from "../ExtraCommonButton";
import CommonHeaderS from "../CommonHeaderS";

function DashboardS() {
  const token = localStorage.getItem("token");
  const [countBuyer, setCountBuyer] = useState([]);
  const [responseCountProperties, setresponseCountProperties] = useState();
  const [responseProperties, setresponseProperties] = useState([]);
  const [CountProperties, setCountProperties] = useState([]);
  const [CountTenants, setCountTenants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ytsCount, setYtsCount] = useState([]);
  const [SharedPropertyCount, setSharedPropertyCount] = useState([]);
  console.log(token);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    alert("You have been logged out.");
  };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  useEffect(() => {
    const fetchBuyerCounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://b8rliving.com/buyer/count",
          axiosConfig
        );
        console.log(response);
        // Update the countProperties state with the response data
        setCountBuyer(response.data.data.buyer);
        // console.log(response.data.data.counts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle the error
        setLoading(false);
      }
    };

    const fetchPropertiesCounts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://b8rliving.com/property/count?purposeType=purposeSale",
          axiosConfig
        );
        // Update the countProperties state with the response data
        setCountProperties(response.data.data.counts);
        console.log(response.data.data.counts);
        // console.log(response.data.data.counts);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle the error
        setLoading(false);
      }
    };
    fetchPropertiesCounts();
    fetchBuyerCounts();
  }, []);
  // console.log(CountProperties);

  var pendingCounting = 0;
  var activeCounting = 0;
  const difference = countBuyer.Total - countBuyer.Deactivate;

  const number =
    difference && difference !== 0 ? difference : difference === 0 ? 0 : "-";
  const difference2 = CountProperties.Total - CountProperties.Closed;
  const AvailablePropertyNumber =
    difference2 && difference2 !== 0
      ? difference2
      : difference2 === 0
      ? 0
      : "-";
  responseProperties.map((element) => {
    // console.log(element.status);
    if (
      (element.fieldAgentStatus = "Completed" && element.imagesApproved == true)
    ) {
      activeCounting = activeCounting + 1;
      // console.log(activeCounting);
    } else {
      pendingCounting = pendingCounting + 1;
      // console.log(pendingCounting);
    }
    return null; // You should return something when using map to avoid React warnings.
  });

  let route = {
    WaitingForProperty: "WaitingForProperty",
    CurrentlyViewing: "CurrentlyViewing",
    Shortlisted: "Shortlisted",
    Deactivate: "Deactivate",
    BoardShared: "BoardShared",
  };

  return (
    <>
      <div
        className="form"
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundSecond})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeaderS title="Sale Dashboard" color="#1E0058" />
        {/* top-btn */}
        <div className="p-[1rem]">
          <div className="grid grid-cols-2 gap-x-[1rem]">
            <Link to="/Dashboard">
              <CommonTopButton
                text="For Rent"
                bgColor="#F5F5F5"
                borderColor="#B3A8C8"
                color="#B3A8C8"
              />
            </Link>
            <div>
              <CommonTopButton
                text="For Sale"
                bgColor="#1E0058"
                borderColor="#F1F8F7"
                color="#F1F8F7"
              />
            </div>
          </div>
        </div>
        {/* BODY */}
        {/* main content */}
        <div className="p-[1rem]">
          {/* listing & tenant */}
          <div className="px-[1rem] grid grid-cols-2">
            {/* Listing */}
            <div className="flex justify-center items-center text-[#1E0058]">
              <FaHouse className="text-[1.7rem]" />
              <p className="px-[0.6rem] text-[1.4rem] font-bold">Listings</p>
            </div>
            {/* tenant */}
            <div className="flex justify-center items-center text-[#4C00A7]">
              <FaCircleUser className="text-[1.7rem]" />
              <p className="px-[0.6rem] text-[1.4rem] font-bold">Buyers</p>
            </div>
          </div>
          {/* main-container */}
          <div className="px-[1rem] py-[1rem]">
            <div className="grid grid-cols-2 gap-x-[1rem]">
              {/* left-container */}
              <div>
                <div className="flex justify-center items-center flex-col bg-[#1E0058] rounded-[0.8rem] gap-y-[0.5rem] p-[1rem]">
                  {/* AvailableProperties */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to="/AvailablePropertyrentalS"
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <TbBrandGoogleHome className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {AvailablePropertyNumber}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center">
                      <p className="text-center">Available Properties</p>
                    </div>
                  </Link>
                  {/* PendingVerification */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to="/My_propertyPVS"
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <RiQuestionnaireFill className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {CountProperties.Pending &&
                        CountProperties.Pending !== 0
                          ? CountProperties.Pending
                          : CountProperties.Pending === 0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Pending Verification</p>
                    </div>
                  </Link>
                  {/* ActiveListing */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to="/AllActivePropertiesS"
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <BsFillBookmarkCheckFill className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {CountProperties.Verified &&
                        CountProperties.Verified !== 0
                          ? CountProperties.Verified
                          : CountProperties.Verified === 0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Active Listing</p>
                    </div>
                  </Link>
                  {/* yetToShare */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to="/My_PropertyYTSS"
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <TbShareOff className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {CountProperties.YetToShare &&
                        CountProperties.YetToShare !== 0
                          ? Math.max(CountProperties.YetToShare, 0)
                          : CountProperties.YetToShare === 0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Yet to share</p>
                    </div>
                  </Link>
                  {/* shared */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to="/MyPropSNAS"
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <MdOutlineMobileScreenShare className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {CountProperties.Shared && CountProperties.Shared !== 0
                          ? CountProperties.Shared
                          : CountProperties.Shared === 0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Shared</p>
                    </div>
                  </Link>
                  {/* shortlisted */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to="/My_PropertySS"
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <RiHomeHeartLine className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {CountProperties.Shortlisted &&
                        CountProperties.Shortlisted !== 0
                          ? CountProperties.Shortlisted
                          : CountProperties.Shortlisted === 0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Shortlisted</p>
                    </div>
                  </Link>
                </div>
                <p className="font-bold text-[1.2rem] text-center py-[1rem]">
                  {CountProperties.Closed && CountProperties.Closed !== 0
                    ? CountProperties.Closed
                    : CountProperties.Closed === 0
                    ? 0
                    : "-"}{" "}
                  Sold
                </p>
              </div>
              {/* right-container */}
              <div>
                <div className="flex flex-col bg-[#E8C5ED] rounded-[0.8rem] gap-y-[0.5rem] p-[1rem] h-max">
                  {/* active leads */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to="/ActiveLeadsS"
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <FaCircleUser className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {number}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Active Leads</p>
                    </div>
                  </Link>
                  {/* waiting for property */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to={`/AllTenantOneS?route=${route.WaitingForProperty}`}
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <RiQuestionnaireFill className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {countBuyer.WaitingForProperty &&
                        countBuyer.WaitingForProperty != 0
                          ? countBuyer.WaitingForProperty
                          : countBuyer.WaitingForProperty === 0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Waiting for Property</p>
                    </div>
                  </Link>
                  {/*board shared*/}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to={`/AllTenantOneS?route=${route.BoardShared}`}
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <MdOutlineMobileScreenShare className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {countBuyer.Total -
                          countBuyer.WaitingForProperty -
                          countBuyer.Deactivate &&
                        countBuyer.Total -
                          countBuyer.WaitingForProperty -
                          countBuyer.Deactivate !==
                          0
                          ? countBuyer.Total -
                            countBuyer.WaitingForProperty -
                            countBuyer.Deactivate
                          : countBuyer.Total -
                              countBuyer.WaitingForProperty -
                              countBuyer.Deactivate ===
                            0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Board shared</p>
                    </div>
                  </Link>
                  {/* currently viewing */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to={`/AllTenantOneS?route=${route.CurrentlyViewing}`}
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <FaEye className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {countBuyer.CurrentlyViewing + countBuyer.Shortlisted &&
                        countBuyer.CurrentlyViewing + countBuyer.Shortlisted !=
                          0
                          ? countBuyer.CurrentlyViewing + countBuyer.Shortlisted
                          : countBuyer.CurrentlyViewing +
                              countBuyer.Shortlisted ===
                            0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Currently Viewing</p>
                    </div>
                  </Link>
                  {/* shortlisted */}
                  <Link
                    className="p-[0.5rem] bg-[#FFFFFF] rounded-[0.8rem] flex justify-between items-center w-[100%] flex-col"
                    to={`/AllTenantOneS?route=${route.Shortlisted}`}
                  >
                    {/* icon */}
                    <div className="flex justify-center items-center pb-[0.5rem]">
                      <RiHomeHeartLine className="text-[#1E0058] text-[2.5rem]" />
                      <p className="text-[2rem] text-center px-[0.5rem] font-bold">
                        {countBuyer.Shortlisted && countBuyer.Shortlisted != 0
                          ? countBuyer.Shortlisted
                          : countBuyer.Shortlisted === 0
                          ? 0
                          : "-"}
                      </p>
                    </div>
                    {/* text */}
                    <div className="font-bold flex justify-center items-center flex-col">
                      <p className="text-center">Shortlisted</p>
                    </div>
                  </Link>
                </div>
                <p className="font-bold text-[1.2rem] text-center py-[1rem]">
                  {countBuyer.Deactivate} closed
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* buttons-containers */}
        <div className="px-[1rem] py-[1rem]">
          {/* btngrp1 */}
          <div className="grid grid-cols-2 gap-x-[0.5rem]">
            <Link
              to="/AllPropertyS"
              className="flex justify-center items-center"
            >
              <CommonBtn
                title="All Properties"
                margin="2%"
                fontweight="bolder"
                bgColor="#1E0058"
              />
            </Link>
            <Link
              to="/AllTenantOneS"
              className="flex justify-center items-center"
            >
              <CommonBtn
                title="All Buyer"
                margin="55%"
                fontweight="bolder"
                bgColor="#3F007F"
              />
            </Link>
          </div>
          {/* btngrp2 */}
          <div className="grid grid-cols-2 gap-x-[0.5rem] py-[1.5rem]">
            <Link
              to="/Propertyinfo"
              className="flex justify-center items-center"
            >
              <CommonBtn title="Add New Property" bgColor="#1E0058" />
            </Link>
            <Link to="/AddBuyer" className="flex justify-center items-center">
              <CommonBtn title="Add New Buyer" bgColor="#3F007F" />
            </Link>
          </div>
        </div>
        <div className="py-[1rem]">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default DashboardS;
