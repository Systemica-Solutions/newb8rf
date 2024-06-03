import React, { Component, useState, useEffect } from "react";
// import Signp from "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import bgm from "../Assets/Images/BuyerAdditionFlow/BuyerBg.png";
import key_1 from "../PropertyAdditionPageIcons/key_1/24.png";
import "./BuyerDesign.css";
import backgroundSecond from "../Assets/Images/other_bg.png";
import CommonHeaderS from "../CommonHeaderS";
import Footer from "../Footer";
import CommonBtn from "../CommonButton";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import { useNavigate } from "react-router-dom";
import { MdVpnKey } from "react-icons/md";
import CommonTopButton from "../CommonTopButton";

import ReactSwitch from "react-switch";
import { ToastContainer , toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MdOutlineSecurity,
  MdPower,
  MdOutlineSportsHandball,
} from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { BiSwim } from "react-icons/bi";
import { CgGym } from "react-icons/cg";
import { RxDimensions } from "react-icons/rx";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { RiParkingBoxFill } from "react-icons/ri";
import { FaBath } from "react-icons/fa6";
import { MdBalcony, MdOutlineCleaningServices } from "react-icons/md";
import { LuArmchair } from "react-icons/lu";
import { TbAirConditioning } from "react-icons/tb";
import { GiRoastChicken } from "react-icons/gi";
import { BiSolidCalendarEdit } from "react-icons/bi";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaUserLock } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { BsFillHouseLockFill } from "react-icons/bs";

function AddBuyer() {
  const [errorMessage, setErrorMessage] = useState('');

  const [checkedStateOne, setCheckedStateOne] = useState(true);
  const [checkedStateTwo, setCheckedStateTwo] = useState(false);
  const [checkedStateThree, setCheckedStateThree] = useState(false);


  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkedStateOne]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkedStateTwo]);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    buyerData: {
      name: "",
      email: "",
      panNumber: "PAP10007G",
      houseConfiguration: "",
      houseType: "",
      furnishingType: "",
      preferredLocation: "",
      moveIn: "",
      budget: "",
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

  const [formError, setFormError] = useState({
    email: "",
    phoneNumber: "",
  });

  const handleChangeOne = () => {
    setCheckedStateOne((current) => !current);
    setCheckedStateTwo((current) => !current);
  };

  const handleChangeTwo = (event) => {
    event.preventDefault();
    
      setCheckedStateTwo((current) => !current);
      setCheckedStateThree((current) => !current);
      console.log("Received from TenantPref In state:", formData);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  const validateSubmit = () => {
    if (
      (formData.tenantData.gatedSecurity ||
        formData.tenantData.powerBackup ||
        formData.tenantData.groceryStore ||
        formData.tenantData.swimmingPool ||
        formData.tenantData.gym ||
        formData.tenantData.clubHouse ||
        formData.tenantData.carParking ||
        formData.tenantData.bikeParking ||
        formData.tenantData.bathroom ||
        formData.tenantData.ac ||
        formData.tenantData.nonVeg) == false
    ) {
      toast.error("Please select atleast one");
      return false;
    }
    return true;
  };


  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    if (name === "budget") {
      if (value <= 15) {
        setFormData({
          ...formData,
          buyerData: {
            ...formData.buyerData,
            [name]: value,
          },
        });
        setErrorMessage("");
      } else {
        setErrorMessage("Budget should not exceed 15");
        return;
      }
    }

    if (name === "phoneNumber") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        buyerData: {
          ...prevState.buyerData,
          [name]: value,
        },
      }));
    }
  };

  const token = localStorage.getItem("token");
  // console.log(token);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(JSON.stringify(formData));
    // const Jdata = JSON.stringify(formData, null, 2);
    // console.log("JSON VARIABLE", Jdata);

    //Validation
    let inputError = {
      email: "",
      phoneNumber: "",
    };
if(validateSubmit){
  axios
      .post("https://b8rliving.com/buyer/1", formData, axiosConfig)
      .then((response) => {
        toast.success("Your Buyer details has been submitted");
        //redirect user to Dashboard
        window.location.href = `/BuyerCreated?name=${formData.buyerData.name}&budget=${formData.buyerData.budget}`;
        // do something with the response
      })
      .catch((error) => {
        console.log(error);
        // handle the error
        toast.error(error.response.data.message);
      });
    console.log("Finale In state:", formData);
    alert("Buyer Added!");
}
    
  };
  const styles = {
    width: "100%",
    backgroundColor: "#F5F5F5",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #52796F",
    boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
  };

  return (
    <>
    <ToastContainer
        className="my-[3rem] text-[1.1rem] font-bold"
        autoClose={1000}
        // hideProgressBar={true}
      />
      {checkedStateOne ? (
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
              <CommonHeaderS title="Add Buyer" color="#1E0058" />

              <form
                onSubmit={handleChangeOne}
                className="login-form inner-background-add"
              >
                <label htmlFor="name" className="fieldTitle">
                  Buyer Name{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <input
                  className={"fieldInput-add"}
                  type="text"
                  id="name"
                  value={formData.buyerData.name}
                  onChange={handleChange}
                  name="name"
                  required
                />

                <label htmlFor="email" className="fieldTitle">
                  Buyer Email{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <input
                  className={"fieldInput-add"}
                  type="email"
                  id="email"
                  value={formData.buyerData.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
                <p className="error-message">{formError.email}</p>

                <label htmlFor="phoneNumber" className="fieldTitle">
                  Buyer mobile number{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <input
                  className={"fieldInput-add"}
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                {/* <label htmlFor="panNumber" className="fieldTitle">
                  Pan Card Number{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <input
                  className={"fieldInput-add"}
                  type="text"
                  id="panNumber"
                  name="panNumber"
                  value={formData.buyerData.panNumber}
                  onChange={handleChange}
                  required
                /> */}

                <div className="flex justify-center items-center py-[1rem]">
                  {/* <div onClick={handleClick}>
                    <BackButton title="Back" margin="" fontweight="bolder" />
                  </div> */}
                  <button
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <BackButton title="Back" />
                </button>
                  <CommonBtn
                    title="Next"
                    margin="50%"
                    fontweight="bolder"
                    color="#DAF0EE"
                    bgColor="#3F007F"
                  />
                </div>
                {/* <CommonHeader /> */}

                <Footer />
              </form>
              <br />
            </div>
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
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${bgm})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{color:"#52796F"}}>Tenant Details (1/2)</h2> */}
            <CommonHeaderS title="Buyer Details" color="#1E0058" />

            <form className="login-form pt-[2rem]" onSubmit={handleChangeTwo}>
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
                value={formData.buyerData.houseConfiguration}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  width: "90%",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                [Studio, 1 BHK, 2 BHK, 3 BHK, 4 BHK, 0, 1, 2, 3, 4]
                <option value="" disabled selected>
                  Select from Drop Down
                </option>
                <option value="Studio">Studio</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4 BHK">4 BHK</option>
              </select>

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
                  width: "90%",
                  border: "1px solid #52796F",
                }}
              >
                <option value=" " disabled selected>
                  Select from Drop Down
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
                Preference of House Type
              </label>
              <select
                id="houseType"
                name="houseType"
                value={formData.buyerData.houseType}
                onChange={handleChange}
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  width: "90%",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              >
                <option value="Selectfromdropdown" disabled selected>
                  Select from Drop Down
                </option>
                {/* houseType" must be one of [Flat (in Gated Society…r Floor,
                Standalone Individual House, 0, 1, 2, 3] */}
                <option value="Flat (in Gated Society)">
                  Flat (in Gated Society)
                </option>
                {/* <option value="Individual"> Individual Builder Floor</option>
                <option value="Individual House">
                  Individual House(in Gated Society)
                </option> */}
                <option value="Individual House(in Gated Society)">
                  Individual House(in Gated Society)
                </option>
                <option value="Individual Builder Floor">
                  Individual Builder Floor
                </option>
                <option value="Standalone Individual House">
                  Standalone Individual House
                </option>
              </select>

              {/* <label for="duration" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}>Preferred Budget(in Crore)</label>
                <select name="deposit_comfortable_for" id="deposit" value={formData.deposit_comfortable_for} onChange={handleChange}  style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #52796F",
               
              }}>
                <option>Deposit Comfortable For</option>    
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="anything">Anything would be okay</option>
                </select> */}

              <label htmlFor="preferredLocation" className="fieldTitle">
                Preferred Location
              </label>
              <input
                className={"fieldInput-add"}
                type="text"
                id="preferredLocation"
                name="preferredLocation"
                value={formData.buyerData.preferredLocation}
                onChange={handleChange}
                placeholder="map"
                required
              />

              <label htmlFor="budget" className="fieldTitle">
                Preferred Budget(in Crore)
              </label>
              <input
                className={"fieldInput-add"}
                type="number"
                id="budget"
                onWheel={(e) => e.target.blur()}
                name="budget"
                value={formData.buyerData.budget}
                onChange={handleChange}
                required
              />
              <p>{errorMessage}</p>
              <br></br>
              <div className="flex justify-center items-center py-[1rem]">
                <div
                  className="p-[0.5rem] flex justify-center items-center flex-col"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)",
                    // marginRight: "10px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "5px",
                  }}
                >
                  <MdVpnKey className="text-[2rem] my-[0.5rem]" />
                  <p className="font-semibold text-center pb-[0.5rem]">
                    Move-in from
                    <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                  </p>
                  <input
                    type="date"
                    id="moveIn"
                    value={formData.buyerData.moveIn}
                    onChange={handleChange}
                    name="moveIn"
                    required
                    // placeholder="username"
                    style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      // marginTop: "-10px",
                      border: "1px solid #52796F",
                      boxShadow:
                        "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center py-[1rem]">
                {/* <div>
                  <BackButton
                    title="Back"
                    margin=""
                    fontweight="bolder"
                    onClick={handleClick}
                  />
                </div> */}
                <button
                  onClick={() => {
                    setCheckedStateTwo(!checkedStateTwo);
                    setCheckedStateOne(!checkedStateOne);
                  }}
                >
                  <BackButton title="Back" />
                </button>
                <CommonBtn
                  title="Next"
                  margin="40%"
                  fontweight="bolder"
                  color="#DAF0EE"
                  bgColor="#3F007F"
                />
              </div>

              <Footer />
            </form>
          </div>
        </div>
      ):(
        ""
      )}
      {checkedStateThree ? (
        <div>
        <div className="login-page">
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
            {/* <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} > */}
            {/* <h2 style={{color:"#52796F"}}>Tenant Details (2/2)</h2> */}
            <CommonHeader title="Buyer Details (2/2)" color="#1E0058" />
            <div className="text-left p-[1rem] text-[1.2rem]">
              <p> What all facilitites?</p>
              <p>
                {" "}
                (select atleast one)
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </p>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="flex justify-center items-center px-[1rem] py-[1rem]">
                <div className="grid grid-cols-3 gap-y-[1rem]">
                  <div className="flex justify-center items-center flex-col text-center">
                    <MdOutlineSecurity className="text-[2rem]" />
                    <p className="font-semibold">Gated Security</p>
                    <p
                      className="text-[#52796F] text-[0.8rem] pb-[0.4rem]
                "
                    >
                      always secure
                    </p>
                    <ReactSwitch
                      checked={formData.buyerData.gatedSecurity}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["gatedSecurity"]:
                              !formData.buyerData.gatedSecurity,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <MdPower className="text-[2rem]" />
                    <p className="font-semibold">24 x 7</p>
                    <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                      Power Back-Up
                    </p>
                    <ReactSwitch
                      checked={formData.buyerData.powerBackup}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["powerBackup"]: !formData.buyerData.powerBackup,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <FaCartShopping className="text-[2rem]" />
                    <p className="font-semibold">Grocery Store</p>
                    <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                      In Campus
                    </p>
                    <ReactSwitch
                      checked={formData.buyerData.groceryStore}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["groceryStore"]:
                              !formData.buyerData.groceryStore,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <BiSwim className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">Swimming Pool</p>
                    <ReactSwitch
                      checked={formData.buyerData.swimmingPool}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["swimmingPool"]:
                              !formData.buyerData.swimmingPool,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <CgGym className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">Gym</p>
                    <ReactSwitch
                      checked={formData.buyerData.gym}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["gym"]: !formData.buyerData.gym,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <MdOutlineSportsHandball className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">Club house</p>
                    <ReactSwitch
                      checked={formData.buyerData.clubHouse}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["clubHouse"]: !formData.buyerData.clubHouse,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <RiParkingBoxFill className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">Car Parking</p>
                    <ReactSwitch
                      checked={formData.buyerData.carParking}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["carParking"]: !formData.buyerData.carParking,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <RiParkingBoxFill className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">Bike Parking</p>
                    <ReactSwitch
                      checked={formData.buyerData.bikeParking}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["bikeParking"]: !formData.buyerData.bikeParking,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <GiRoastChicken className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">
                      Non-Veg Allowed
                    </p>
                    <ReactSwitch
                      checked={formData.buyerData.nonVeg}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["nonVeg"]: !formData.buyerData.nonVeg,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <TbAirConditioning className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">
                      Air Conditioner
                    </p>
                    <ReactSwitch
                      checked={formData.buyerData.ac}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["ac"]: !formData.buyerData.ac,
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
                  <div className="flex justify-center items-center flex-col text-center">
                    <FaBath className="text-[2rem]" />
                    <p className="font-semibold pb-[0.4rem]">
                      Attached Bathroom
                    </p>
                    <ReactSwitch
                      checked={formData.buyerData.bathroom}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          buyerData: {
                            ...prevState.buyerData,
                            ["bathroom"]: !formData.buyerData.bathroom,
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
              <div className="flex justify-around items-center py-[1rem]">
                <button
                  onClick={() => {
                    setCheckedStateThree(!checkedStateThree);
                    setCheckedStateTwo(!checkedStateTwo);
                  }}
                >
                  <BackButton title="Back" />
                </button>
                <CommonBtn
                 title="Submit"
                 margin="40%"
                 fontweight="bolder"
                 color="#DAF0EE"
                 bgColor="#3F007F"
                />
              </div>
            </form>
            <Footer />
            <div className="mb-[1rem]" />
          </div>
        </div>
      </div>
      ):(
        ""
      )}
    </>
  );
}
export default AddBuyer;
