import React from "react";
import CommonHeader from "../CommonHeader";
import CommonHeaderS from "../CommonHeaderS";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";

function PropertyViewingStatusS() {
  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${oneBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeaderS title="Property Viewing Status" color="#1E0058" />
        <Footer />
      </div>
    </>
  );
}
export default PropertyViewingStatusS;
