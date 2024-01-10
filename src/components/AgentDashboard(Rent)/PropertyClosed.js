import React from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import PropertyClosedimg from "../Assets/Images/PropertyClosed/PropertyImg.png";

function PropertyClosed() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const societyName = queryParameters.get("societyname");
  const reason = queryParameters.get("closed");

  return (
    <>
      <div
        className="form"
        style={
          {
            // borderRadius: "16px",
            // marginTop: "10%",
          }
        }
      >
        <CommonHeader title="Property Closed" color="#52796F" />

        <div className="flex justify-center items-center flex-col pt-[3rem] pb-[2rem] px-[1.5rem]">
          <p
            style={{ fontWeight: "lighter", textDecoration: "underline" }}
            className="text-[1.3rem]"
          >
            Name
          </p>
          <p
            style={{ color: "#52796F", fontWeight: "bolder" }}
            className="text-[1.5rem]"
          >
            {name},{societyName}
          </p>
        </div>

        {/* -----------budget details----------- */}
        <div className="flex justify-center items-center flex-col pt-[1rem] pb-[4rem] px-[1.5rem]">
          <p
            style={{ fontWeight: "lighter", textDecoration: "underline" }}
            className="text-[1.3rem]"
          >
            Closed Status
          </p>
          <p
            style={{ color: "#52796F", fontWeight: "bolder" }}
            className="text-[1.5rem]"
          >
            {reason}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img
            src={PropertyClosedimg}
            style={{ height: "150px", borderRadius: "10px" }}
          />
        </div>
        <Link
          to="/Dashboard"
          className="flex justify-center items-center py-[1rem]"
        >
          <CommonBtn title="Go to Agent Dashboard" margin="50px" />
        </Link>
        <Footer />
      </div>
    </>
  );
}
export default PropertyClosed;
