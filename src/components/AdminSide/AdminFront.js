import React, { Component, useEffect, useState } from "react";
// import Dashboardcss from  "./Dashboard.css";
// import "./DashComponent.css";
import { Link } from "react-router-dom";


import Footer from "../Footer";
import vector from "../Assets/Images/vector.png";
import backgroundSecond from "../Assets/Images/other_bg.png";
import listing from "../Assets/Images/AgentDashboard/listing.png";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";


import ExtraCommonButton from "../ExtraCommonButton";

function AdminFront() {
 

  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundSecond})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {/* <h2 style={{color:"#52796F"}}>Agent Dashboard</h2> */}
        <CommonHeader title="My Admin" color="#52796F" />

        

        {/* BODY */}
      

    <div className="btnGroup">

            
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginLeft:"-150%"}}>
                
            
            <Link to="/AuthCode"><CommonBtn title="Add Auth Code"  margin="52%" fontweight="bolder" /></Link>
            <Link to="/AssignProperty"><CommonBtn title="Assign Property"  marginTop="72%" fontweight="bolder" /></Link>
            <Link to="/"><CommonBtn title="Verify Images"  margin="52%" fontweight="bolder" /></Link>
            <Link to="/AllTenantOne"><CommonBtn title="Add 3D Tour Link"  margin="52%" fontweight="bolder" /></Link>
            </div>
       

        

          


            
            

      </div>

       

        <Footer />
      </div>
    </>
  );
}
export default AdminFront;