import React, { Component, useEffect, useState } from "react";
// import Dashboardcss from  "./Dashboard.css";
// import "./DashComponent.css";
import { Link } from "react-router-dom";
import axios from "axios";

import Footer from "../Footer";
import vector from "../Assets/Images/vector.png";
import backgroundSecond from "../Assets/Images/other_bg.png";
import listing from "../Assets/Images/AgentDashboard/listing.png";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";

import ExtraCommonButton from "../ExtraCommonButton";

function AddImage() {
  const [agents, setAgents] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState();
  const [properties, setProperties] = useState([]);
  const [images, setImages] = useState([]);
  const [imageRank, setImageRank] = useState({});

  useEffect(() => {
    const getAgentData = async () => {
      try {
        const res = await axios.get("https://b8rliving.com/agent");
        console.log(res.data.data);
        const agentRes = res.data.data.agents.filter(
          (agent) => agent.isFieldAgent === false
        );
        console.log(agentRes);
        setAgents(agentRes);
      } catch (err) {
        console.log(err);
      }
    };

    getAgentData();
  }, []);


  const getProperties = async (agentId) => {
    try {
      const res = await axios.get(
        `https://b8rliving.com/property/agent-property/${agentId}`,
      );
      console.log(res.data.data.properties);
      const unverifiedProperties = res.data.data.properties.filter(
        (property) => property.status === "Pending" && property.fieldAgentStatus === "Completed"
      );
      console.log(unverifiedProperties);
      setProperties(unverifiedProperties);
    } catch (err) {
      console.log(err);
    }
  };

  const getImagesForS3 = async (propertyId) => {
    try {
      const res = await axios.get(
        `https://b8rliving.com/property/s3-img/${propertyId}`
      );
      console.log(res.data.data.images);
      setImages(res.data.data.images);
    } catch (error) {
      console.log(error);
      alert("No image uploaded to final folder in S3 bucket");
      window.location.reload();
    }
  };

  const handleAgentSelection = (event) => {
    const agentId = event.target.value;
    console.log(agentId);
    getProperties(agentId);
  };

  const handlePropertySelected = (event) => {
    const propertyId = event.target.value;
    console.log(propertyId);
    setSelectedProperty(propertyId);
    getImagesForS3(propertyId);
  };

  const handleImageRankChange = (event) => {
    const { value, name } = event.target;
    if (value === "" || value > images.length || value <= 0) return;
    let imageRankCopy = imageRank;
    imageRankCopy[name] = Number(value);
    console.log(imageRankCopy);
    setImageRank(imageRankCopy);
  };

  const handleSubmitRank = async () => {
    console.log("in submit rank");
    try {
      const res = await axios.post(`https://b8rliving.com/property/add-images/${selectedProperty}`, imageRank)
      console.log(res);
      alert("Images added successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

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
        <h3 className="Htitle text-2xl font-bold mb-4">Assign Property to Field Agent</h3>
        <div className="px-6 flex flex-col items-center">
          <h3>Choose agent:</h3>
          <select name="agent" onChange={handleAgentSelection}>
            <option disabled selected value>
              {" "}
              -- select an option --{" "}
            </option>
            {agents.map((agent) => {
              return <option value={agent._id}>{agent.name}</option>;
            })}
          </select>

          <h3>Choose Property:</h3>
          <select name="property" onChange={handlePropertySelected}>
            <option disabled selected value>
              {" "}
              -- select an option --{" "}
            </option>
            {properties.map((property) => {
              return (
                <option value={property._id}>
                  {property.houseName}, {property.societyName}
                </option>
              );
            })}
          </select>
          {images.length > 0 && <h3 className="mb-4">Give rank to the images:</h3>}
          <div className="grid grid-cols-3 gap-4">
          {images.map((image) => {
            return (
              <div>
                <img
                  src={image.link}
                  style={{
                    width: "30vw",
                    height: "30vw",
                    marginBottom: "0.5rem",
                  }}
                  alt=""
                />
                <label htmlFor="">Rank: </label>
                <input
                  type="number"
                  name={image.link}
                  onChange={handleImageRankChange}
                  onWheel={(e) => e.target.blur()}
                  id=""
                />
              </div>
            );
          })}
          </div>
          {images.length > 0 && (
            <div className="w-fit" onClick={handleSubmitRank}>
            <CommonBtn
              title="Submit"
              margin="52%"
              fontweight="bolder"
            />
            </div>
          )}
        </div>

        <div className="btnGroup">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginLeft: "-150%",
            }}
          >
            <Link to="/AuthCode">
              <CommonBtn
                title="Add Auth Code"
                margin="52%"
                fontweight="bolder"
              />
            </Link>
            <Link to="/AssignProperty">
              <CommonBtn
                title="Assign Property"
                marginTop="72%"
                fontweight="bolder"
              />
            </Link>
            <Link to="/AllTenantOne">
              <CommonBtn
                title="Verify Images"
                margin="52%"
                fontweight="bolder"
              />
            </Link>
            <Link to="/AllTenantOne">
              <CommonBtn
                title="Add 3D Tour Link"
                margin="52%"
                fontweight="bolder"
              />
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
export default AddImage;
