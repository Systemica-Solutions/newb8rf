import React from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import CommonHeaderS from "../CommonHeaderS";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import PropertyClosedimg from "../Assets/Images/PropertyClosed/PropertyImg.png";
function PropertyClosedS() {
  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
        }}
      >
        <CommonHeaderS title="Property CLosed" color="#1E0058" />
        <img
          src={PropertyClosedimg}
          style={{ height: "150px", borderRadius: "10px" }}
        />
        <CommonBtn title="Go to Agent Dashboard" />
        <Footer />
      </div>
    </>
  );
}
export default PropertyClosedS;
