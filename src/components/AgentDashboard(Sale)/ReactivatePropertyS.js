import React from "react";
import CommonHeader from "../CommonHeader";
import CommonHeaderS from "../CommonHeaderS";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";
import BackButton from "../CommonButtonBack";
import CommonBtn from "../CommonButton";

function ReactivePropertyS() {
  return (
    <div
      className="form"
      style={{
        borderRadius: "16px",
        marginTop: "10%",
        backgroundImage: `url(${oneBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        padding: "20px",
      }}
    >
      <CommonHeaderS title="Reactivate(Archived Properties)" color="#1E0058" />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <BackButton title="No, Go Back" margin="" fontweight="bolder" />
        <CommonBtn title="Yes, Vacant again" margin="40%" fontweight="bolder" />
      </div>
      <Footer />
    </div>
  );
}

export default ReactivePropertyS;
