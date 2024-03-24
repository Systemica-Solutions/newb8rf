import React, { Component, useState, useEffect } from "react";

import './DashboardS.css';
import './ListingComp.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/AgentDashboard/homeDown.png";
import peopleDown from "../Assets/Images/AgentDashboard/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Images/AgentDashboard/vector.png"
import backgroundSecond from "../Assets/Images/AgentDashboard/other_bg.png";
import rentedOut from "../Assets/Images/AgentDashboard/rentedOut.png";
import sharedOut from "../Assets/Images/AgentDashboard/sharedOut.png";
import shortListed from "../Assets/Images/AgentDashboard/shortListed.png";
import yetShared from "../Assets/Images/AgentDashboard/yetShared.png";
import PVbackground from "../Assets/Images/Sale/AllPropertyBg.png";
import imgOne from "../Assets/Images/AgentDashboard/imgOne.png";
import checkP from "../Assets/Images/AgentDashboard/CheckP.png";
import noImg from "../Assets/Images/AgentDashboard/noImg.png";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import ListingComp from "./ListingComp";


function My_propertyPVS(){

    const [loading, setLoading] = useState(false);
  const [statusListing, setstatusListing] = useState(1);
  const [statusListingAwait, setstatusListingAwait] = useState(0);
  const [responseNoImageProperty, setresponseNoImageProperty] = useState([]);
  const [responseProperty, setresponseProperty] = useState([]);

    const token = localStorage.getItem("token");
    console.log(token);

    let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Basic ${token}`,
        },
      };

      useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          axios
            .get(`https://b8rliving.com/property`, axiosConfig)
            .then((response) => {
              console.log(response.data.data);
              var propertiesData = response.data.data.properties;
              // Filter out properties where propertyDetails.purposeSale is true
              const noImageProperties = propertiesData.filter((property) => {
                return (
                  property.images.length == 0 &&
                  property.propertyDetails.propertyInfo.purposeSale === true
                  
                );
              });
    
              // Filter out properties where propertyDetails.purposeSale is true
              const underReviewProperties = propertiesData.filter((property) => {
                return property.fieldAgentStatus === "Completed" && property.status === "Pending" &&  property.propertyDetails.propertyInfo.purposeSale === true;
              });
    
              // var myArrayPropertyCount = response.data.data.properties;
              setresponseNoImageProperty(noImageProperties);
              setresponseProperty(underReviewProperties);
    
            })
            .catch((error) => {
              console.log(error);
              // handle the error
            });
          setLoading(false);
        };
    
        fetchPosts();
      }, []);
      console.log(responseProperty);
    
    const handleSubmit = event => {
	event.preventDefault();
       localStorage.removeItem("token");
        alert("You have been logged out.");
	  };

      const username = localStorage.getItem("username");
    const name = username.substring(0, username.indexOf(" "));

    return(
        <>

        <div className="form" style={{ borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${PVbackground})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%'}}>
            {/* <h2 style={{color:"#52796F"}}>My Properties</h2> */}
            <CommonHeader title="Sale Properties" color= "#1E0058" />
        

            
            {/* -------------------------------button---------------------------------------------- */}
            <div>

           
            <Link to="/My_PropertyPVS"><CommonTopButton
              bgColor= "#1E0058"
              borderColor= "#F5F5F5"
              color="#DAF0EE"
               text="Pending Verification"
        //        onclicked={handlePageAvailable}
            /></Link>
              <Link to="/My_PropertyYTSS"><CommonTopButton
              bgColor= "#F5F5F5"
              borderColor= "#B3A8C8"
              color="#B3A8C8"
               text="Yet to Share "
        //        onclicked={handlePageAvailable}
            /></Link>
             </div>
             <div style={{marginTop:"10px"}}>
             <Link to="/My_PropertySS"><CommonTopButton
              bgColor= "#F5F5F5"
              borderColor= "#B3A8C8"
              color="#B3A8C8"
               text="Shortlisted"
        //        onclicked={handlePageAvailable}
            /></Link>
               <Link to="/MyPropSNAS"><CommonTopButton
              bgColor= "#F5F5F5"
              borderColor= "#B3A8C8"
              color="#B3A8C8"
               text="Shared "
        //        onclicked={handlePageAvailable}
            /></Link>

             </div>
        {/* -------------------------------button---------------------------------------------- */}
       



<div>
    <p style={{textAlign:"left"}}>Hey {name}, <br/>

Properties shown here are not verified. Correct wherever necessary to get them ready to share</p>


{/* <h3>Pending Verification by Internal Team</h3> */}

    <ListingComp
          responseNoImageProperty={responseNoImageProperty}
          responseProperty={responseProperty}
        />

   
     
     
    {/* <h3>Pending Photos from Field Agent</h3> */}
    


     </div>









               
               
       
        {/* --------------------------------------first tab-------------------------------------------- */}
         
               

               
               
        {/* </div> */}
         {/* --------------------------------------Second tab-------------------------------------------- */}
        

            <Footer/>
        </div>
        </>
    );
}
export default My_propertyPVS;