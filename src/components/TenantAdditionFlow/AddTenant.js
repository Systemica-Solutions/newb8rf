import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import AddTenantcss from "./AddTenant.css";
import PropertDI from "./PropertyDI.css";
import TenantPref from "./TenantPref.css";
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import vector from "../Assets/Images/vector.png";
import Footer from "../Footer";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";

// import TenantPref from "./TenantPref";
// import TenantPref2 from "./TenantPref2";

import ReactSwitch from "react-switch";
import num3 from "../Assets/Images/num3.png";
import gated_sec from "../Assets/Images/PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import Power_backup from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import Ac_png from "../Assets/Images/PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import car_parking from "../Assets/Images/PropertyAdditionPageIcons/car_parking/24.png";
import club_house from "../Assets/Images/PropertyAdditionPageIcons/club_house/24.png";
import construction_year from "../Assets/Images/PropertyAdditionPageIcons/construction_year/24.png";
import convenience_store from "../Assets/Images/PropertyAdditionPageIcons/convenience_store/24.png";
import floor_number from "../Assets/Images/PropertyAdditionPageIcons/floor_number/24.png";
import furniture_1 from "../Assets/Images/PropertyAdditionPageIcons/furniture_1/24.png";
import gym_1 from "../Assets/Images/PropertyAdditionPageIcons/gym_1/24.png";
import hamburger_1 from "../Assets/Images/PropertyAdditionPageIcons/hamburger_1/24.png";
import key_1 from "../Assets/Images/PropertyAdditionPageIcons/key_1/24.png";
import mainteance_1 from "../Assets/Images/PropertyAdditionPageIcons/mainteance_1/24.png";
import num_of_bathrooms from "../Assets/Images/PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../Assets/Images/PropertyAdditionPageIcons/Power_backup/24.png";
import rent_1 from "../Assets/Images/PropertyAdditionPageIcons/rent_1/24.png";
import security_deposit from "../Assets/Images/PropertyAdditionPageIcons/security_deposit/24.png";
import space_or_area from "../Assets/Images/PropertyAdditionPageIcons/space_or_area/24.png";
import swimming_pool from "../Assets/Images/PropertyAdditionPageIcons/swimming_pool/24.png";
import veg_nonveg from "../Assets/Images/PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import { useNavigate } from "react-router-dom";

function AddTenant() {
  const [checkedStateOne, setCheckedStateOne] = useState(true);
  const [checkedStateTwo, setCheckedStateTwo] = useState(false);
  const [checkedStateThree, setCheckedStateThree] = useState(false);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    tenantData: {
      name: "",
      email: "",
      onBoard: false,
      stayDuration: "",
      numberOfMonth: "",
      houseConfiguration: "",
      furnishingType: "",
      houseType: "",
      preferredLocation: "",
      moveIn: "",
      rent: "",
      gatedSecurity: false,
      powerBackup: false,
      groceryStore: false,
      swimmingPool: false,
      gym: false,
      clubHouse: false,
      carParking: false,
      bikeParking: false,
      bathroom: false,
      ac: false,
      nonVeg: false,
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    console.log(name, value);

    if (name === "phoneNumber") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        tenantData: {
          ...prevState.tenantData,
          [name]: value,
        },
      }));
    }
  };

  const handleChangeOne = () => {
    setCheckedStateOne((current) => !current);
    setCheckedStateTwo((current) => !current);
  };

  const handleChangeTwo = () => {
    setCheckedStateTwo((current) => !current);
    setCheckedStateThree((current) => !current);
    console.log("Received from TenantPref In state:", formData);
  };

  const token = localStorage.getItem("token");
  // console.log(token);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const Jdata =  JSON.stringify(formData, null, 2);
    // console.log("JSON VARIABLE",Jdata);
    // console.log(JSON.stringify(formData));
    axios
      .post("https://b8rliving.com/tenant", formData, axiosConfig)
      .then((response) => {
        // console.log(response.data.userID);
        alert("Your Tenant details has been submitted");
        //redirect user to Dashboard
        window.location.href = `/TenantCreated?name=${formData.tenantData.name}&budget=${formData.tenantData.rent}`;
        // do something with the response
      })
      .catch((error) => {
        alert(error);
        console.log(error);
        // handle the error
      });
    console.log("Finale In state:", formData);
    // alert("Tenant Created!");
  };

  //STYLES

  const styles = {
    backgroundColor: "#F5F5F5",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #52796F",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
  };

  return (
    <>
      {checkedStateOne ? (
        <div className="login-page">
          <div
            class="form"
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundSecond})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{color:"#52796F"}}>Add Tenant</h2> */}
            <CommonHeader title="Add Tenant" color="#52796F" />

            <form onSubmit={handleChangeOne}>
              <label
                for="name"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                {" "}
                Tenant Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.tenantData.name}
                onChange={handleChange}
                required
                style={styles}
              />

              <label
                for="phoneNumber"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Tenant Mobile Number{" "}
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                style={styles}
              />

              <label
                for="email"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Tenant Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.tenantData.email}
                onChange={handleChange}
                required
                style={styles}
              />

              <div style={{ marginTop: "50px" }}></div>

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div onClick={handleClick}>
                  <BackButton title="Back" margin="" fontweight="bolder" />
                </div>
                <CommonBtn title="Next" margin="50%" fontweight="bolder" />
              </div>

              <Footer />
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {checkedStateTwo ? (
        <div className="login-page">
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
            {/* <h2 style={{color:"#52796F"}}>Tenant Details (1/2)</h2> */}
            <CommonHeader title="Tenant Details (1/2)" color="#52796F" />

            <form className="login-form" onSubmit={handleChangeTwo}>
              <label
                for="stayDuration"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Duration of stay
              </label>
              <select
                name="stayDuration"
                id="stayduration"
                value={formData.stayDuration}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                <option value="" disabled selected>
                  Select from Drop Drown
                </option>
                <option value="0-3">0-3 months</option>
                <option value="3-6">3-6 months</option>
                <option value="6-11">6-11 months</option>
                <option value="30+">More than 11 months</option>
              </select>

              <label
                for="numberOfMonth"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Deposit amount prefered(in Months)
              </label>

              <input
                type="number"
                id="numberOfMonth"
                value={formData.numberOfMonth}
                onChange={handleChange}
                name="numberOfMonth"
                placeholder="-number only*-"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                  width: "350px",
                  boxShadow:
                    "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                  marginTop: "-10px",
                }}
              />

              <label
                for="houseConfiguration"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Preference of House Configuration
              </label>

              <select
                id="houseConfiguration"
                name="houseConfiguration"
                value={formData.houseConfiguration}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                <option value="gated_apartment" disabled selected>
                  Select from Drop Down
                </option>
                {/* <option value="Studio">
                Studio
              </option> */}
                {/* <option value="1BHK">1BHK</option> */}

                <option value="Studio">Studio</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>
              <br></br>

              <label
                for="furnishingType"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Type of Furnishing
              </label>
              <select
                name="furnishingType"
                id="furnishingType"
                value={formData.furnishingType}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                <option value="" disabled selected>
                  Select from drop down
                </option>

                <option value="Full-furnished">Full-Furnished</option>
                <option value="Semi-furnished">Semi-Furnished</option>
                <option value="Un-furnished">UnFurnished</option>
              </select>

              <label
                for="houseType"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                {/* houseType" must be one of [Flat (in Gated Society…r Floor, Standalone Individual House, 0, 1, 2, 3] */}
                What is the House type?
              </label>
              <select
                id="houseType"
                name="houseType"
                value={formData.houseType}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                {/* "houseType" must be one of [Flat (in Gated Society…r Floor, Standalone Individual House, 0, 1, 2, 3] */}
                <option value="" disabled selected>
                  Select from Drop Down
                </option>
                <option value="Flat (in Gated Society)">
                  Flat(in Gated Society)
                </option>
                <option value="Standalone Individual House">
                  Standalone Individual House
                </option>
                <option value="Individual House(in Gated Society)">
                  {" "}
                  Individual House(in Gated Society)
                </option>
                <option value="Individual Builder Floor">
                  Individual Builder Floor
                </option>
              </select>
              <label
                for="preferredLocation"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Preferred Location
              </label>
              <input
                type="text"
                id="preferredLocation"
                name="preferredLocation"
                value={formData.preferredLocation}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              ></input>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <div
                  style={{
                    width: "150px",
                    height: "130px",
                    background:
                      "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                    marginRight: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                  }}
                >
                  {/* <div class="grid-item"  style={{marginTop:"20px",width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}> */}
                  <img src={key_1} alt="Icon description" />
                  <h5 style={{ marginTop: "-5px" }}>Available from</h5>
                  <input
                    type="date"
                    id="moveIn"
                    value={formData.moveIn}
                    onChange={handleChange}
                    name="moveIn"
                    // placeholder="username"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: "-10px",
                      border: "1px solid #52796F",
                      boxShadow:
                        "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                    }}
                  />

                  {/* </div> */}
                </div>
                <div
                  style={{
                    width: "150px",
                    height: "130px",
                    background:
                      "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                    marginLeft: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                  }}
                >
                  {/* <div class="grid-item" style={{width:"150px", border:"1px solid #CFD3D2",background: "linear-gradient(180deg, rgba(232, 231, 231, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",borderRadius:"5px"}}> */}
                  <img src={rent_1} alt="Icon description" />
                  <h5 style={{ marginTop: "2px" }}>Prefered Rent(per month)</h5>
                  <h6 style={{ marginTop: "-20px" }}>(with Maintenance)</h6>
                  <input
                    type="number"
                    id="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    name="rent"
                    placeholder="-number only*-"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                      width: "130px",
                      boxShadow:
                        "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                      marginTop: "-10px",
                    }}
                  />
                  {/* </div> */}
                </div>
              </div>

              {/* <div class="buttonBackNext">
            <button className="CommonnBackButton" style={{  fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Save and Next <img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
            </div> */}

              <div style={{ display: "flex", flexDirection: "row" }}>
                <div>

                
                <BackButton title="Back" margin="" fontweight="bolder" onClick={handleClick}/>
                </div>
                <CommonBtn title="Submit" margin="50%" fontweight="bolder" />
              </div>

              <Footer />
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
      {checkedStateThree ? (
        <div>
          <div className="login-page">
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
              {/* <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} > */}
              {/* <h2 style={{color:"#52796F"}}>Tenant Details (2/2)</h2> */}
              <CommonHeader title="Tenant Details (2/2)" color="#52796F" />

              <h6
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  margin: "5px 0 0",
                  textAlign: "left",
                  marginLeft: "5px",
                }}
              >
                What all facilitites are must for tenant?
              </h6>
              <form className="login-form" onSubmit={handleSubmit}>
                <div
                  style={{
                    marginRight: "10px",
                    width: "300px",
                    padding: "10px",
                    borderRadius: "2%",
                  }}
                >
                  {/* <h3 style={{textAlign: "left", marginTop:"20px",marginLeft:"10px", marginBottom:"5px" }}>About the society</h3> */}
                  <div class="grid-container" style={{ width: "300px" }}>
                    {/* Gated Security-------------------------------------------------------------- */}

                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={gated_sec} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-2px",
                          fontSize: "10px",
                          fontFamily: "sans-serif",
                        }}
                      >
                        Gated Security
                      </h5>
                      <h6 style={{ marginTop: "-13px", fontSize: "8px" }}>
                        always secure
                      </h6>
                      <ReactSwitch
                        checked={formData.tenantData.gatedSecurity}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["gatedSecurity"]:
                                !formData.tenantData.gatedSecurity,
                            },
                          }))
                        }
                        // onChange={handleChange}
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>

                    {/* Power Backup-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={Power_backup} alt="Icon description" />
                      <h5 style={{ marginTop: "-5px" }}>24 X 7</h5>
                      <h5 style={{ marginTop: "-13px", fontSize: "8px" }}>
                        Power Back-up
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.powerBackup}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["powerBackup"]: !formData.tenantData.powerBackup,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>

                    {/* Grocery Store-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={convenience_store} alt="Icon description" />
                      <h5 style={{ marginTop: "-5px", fontSize: "10px" }}>
                        Grocery Store
                      </h5>
                      <h5 style={{ marginTop: "-9px", fontSize: "8px" }}>
                        In Campus
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.groceryStore}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["groceryStore"]:
                                !formData.tenantData.groceryStore,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Swimming Pool-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={swimming_pool} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-5px",
                          marginBottom: "15px",
                          fontSize: "10px",
                        }}
                      >
                        Swimming Pool
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.swimmingPool}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["swimmingPool"]:
                                !formData.tenantData.swimmingPool,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Gym-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={gym_1} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-1px",
                          marginBottom: "20px",
                          fontSize: "10px",
                        }}
                      >
                        Gym
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.gym}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["gym"]: !formData.tenantData.gym,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Club House-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={club_house} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-5px",
                          marginBottom: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Club house
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.clubHouse}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["clubHouse"]: !formData.tenantData.clubHouse,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Car Parking-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={car_parking} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-5px",
                          marginBottom: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Car Parking
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.carParking}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["carParking"]: !formData.tenantData.carParking,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Bike Parking-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={car_parking} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-5px",
                          marginBottom: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Bike Parking
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.bikeParking}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["bikeParking"]: !formData.tenantData.bikeParking,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Non-veg allowed-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={veg_nonveg} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-5px",
                          marginBottom: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Non-Veg Allowed
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.nonVeg}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["nonVeg"]: !formData.tenantData.nonVeg,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Air-Condition-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={Ac_png} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-5px",
                          marginBottom: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Air Condition
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.ac}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["ac"]: !formData.tenantData.ac,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                    {/* Attachecd bathroom-------------------------------------------------------------- */}
                    <div class="grid-item" style={{ border: "none" }}>
                      <img src={num_of_bathrooms} alt="Icon description" />
                      <h5
                        style={{
                          marginTop: "-5px",
                          marginBottom: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Attached Bathroom
                      </h5>
                      <ReactSwitch
                        checked={formData.tenantData.bathroom}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            tenantData: {
                              ...prevState.tenantData,
                              ["bathroom"]: !formData.tenantData.bathroom,
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "80px" }}></div>

                <CommonBtn
                  title="Submit"
                  margin="25%"
                  fontweight="bolder"
                  color="#DAF0EE"
                />

                <Footer />
              </form>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default AddTenant;