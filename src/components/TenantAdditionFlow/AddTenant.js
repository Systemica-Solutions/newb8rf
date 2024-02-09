import React, { Component, useState, useEffect } from "react";
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
import { ToastContainer, toast } from "react-toastify";
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
import { MdVpnKey } from "react-icons/md";
import { HiCurrencyRupee } from "react-icons/hi2";
import { FaUserLock } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { BsFillHouseLockFill } from "react-icons/bs";

function AddTenant() {
  const [checkedStateOne, setCheckedStateOne] = useState(true);
  const [checkedStateTwo, setCheckedStateTwo] = useState(false);
  const [checkedStateThree, setCheckedStateThree] = useState(false);

  // scrollToTop

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

  const validateStageTwo = () => {
    if (formData.tenantData.stayDuration == "") {
      toast.error("Please select stay duration ");
      return false;
    }
    if (
      formData.tenantData.numberOfMonth == "" ||
      formData.tenantData.numberOfMonth > 12
    ) {
      toast.error(
        "Please select preferred deposite month or select less than 12"
      );
      return false;
    }
    if (formData.tenantData.houseConfiguration == "") {
      toast.error("Please select house configuration ");
      return false;
    }
    if (formData.tenantData.furnishingType == "") {
      toast.error("Please select furnishing type");
      return false;
    }
    if (formData.tenantData.houseType == "") {
      toast.error("Please select house type");
      return false;
    }
    if (formData.tenantData.preferredLocation == "") {
      toast.error("Please select preferred location");
      return false;
    }
    if (formData.tenantData.moveIn == "") {
      toast.error("Please select availability date");
      return false;
    }
    if (formData.tenantData.rent == "") {
      toast.error("Please select preferred rent");
      return false;
    }
    return true;
  };

  const handleChangeTwo = (event) => {
    event.preventDefault();
    if (validateStageTwo()) {
      setCheckedStateTwo((current) => !current);
      setCheckedStateThree((current) => !current);
      console.log("Received from TenantPref In state:", formData);
    }
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
  const handleBack = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // const Jdata =  JSON.stringify(formData, null, 2);
    // console.log("JSON VARIABLE",Jdata);
    // console.log(JSON.stringify(formData));
    if (validateSubmit()) {
      axios
        .post("https://b8rliving.com/tenant", formData, axiosConfig)
        .then((response) => {
          // console.log("Inside this");
          // console.log(response.data.userID);
          toast.success("Your Tenant details has been submitted");
          // console.log(response.data);
          //redirect user to Dashboard
          window.location.href = `/TenantCreated?name=${formData.tenantData.name}&budget=${formData.tenantData.rent}`;
          // do something with the response
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          // console.log(err)
          console.log(error.response.data.message);
          // handle the error
        });
      console.log("Finale In state:", formData);
      // alert("Tenant Created!");
    }
  };
  //STYLES

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
        <div className="login-page">
          <div
            class="form"
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundSecond})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{color:"#52796F"}}>Add Tenant</h2> */}
            <CommonHeader title="Add Tenant" color="#52796F" />

            <form
              onSubmit={handleChangeOne}
              className="px-[1rem] py-[1rem] h-[70vh]"
            >
              <div className="flex flex-col">
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
                  Tenant Name{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
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
              </div>
              <div className="flex flex-col">
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
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  style={styles}
                />
              </div>
              <div className="flex flex-col">
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
                  Tenant Email{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
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
              </div>

              <div className="flex justify-around items-center py-[1rem]">
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
                  type="submit"
                />
              </div>
            </form>
            <Footer />
          </div>
        </div>
      ) : (
        ""
      )}
      {checkedStateTwo ? (
        <div className="">
          <div
            className=""
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundSecond})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{color:"#52796F"}}>Tenant Details (1/2)</h2> */}
            <CommonHeader title="Tenant Details (1/2)" color="#52796F" />

            <form className="px-[1rem] py-[1rem]" onSubmit={handleChangeTwo}>
              <div className="flex flex-col">
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
                  Duration of stay{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <select
                  name="stayDuration"
                  id="stayduration"
                  value={formData.tenantData.stayDuration}
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
              </div>
              <div className="flex flex-col">
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
                  Deposit amount prefered(in Months){" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>

                <input
                  type="number"
                  id="numberOfMonth"
                  min="1"
                  max="12"
                  value={formData.tenantData.numberOfMonth  }
                  onWheel={(e) => e.target.blur()}
                  onChange={handleChange}
                  maxLength="2"
                  name="numberOfMonth"
                  placeholder="-number only*-"
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #52796F",
                    width: "100%",
                    boxShadow:
                      "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                    // marginTop: "-10px",
                  }}
                />
              </div>
              <div className="flex flex-col">
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
                  Preference of House Configuration{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>

                <select
                  id="houseConfiguration"
                  name="houseConfiguration"
                  value={formData.tenantData.houseConfiguration}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #52796F",
                  }}
                >
                  {/* <option value="gated_apartment" disabled selected>
                    Select from Drop Down
                  </option> */}
                  {/* <option value="Studio">
                Studio
              </option> */}
                  {/* <option value="1BHK">1BHK</option> */}
                  <option value="" disabled selected>Select from Drop Down</option>

                  <option value="Studio">Studio</option>
                  <option value="1 BHK">1 BHK</option>
                  <option value="2 BHK">2 BHK</option>
                  <option value="3 BHK">3 BHK</option>
                  <option value="4 BHK">4 BHK</option>
                </select>
              </div>
              {/* <br></br> */}
              <div className="flex flex-col">
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
                  Type of Furnishing{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
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
              </div>
              <div className="flex flex-col">
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
                  Property Type?{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <select
                  id="houseType"
                  name="houseType"
                  value={formData.tenantData.houseType}
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
              </div>
              <div className="flex flex-col">
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
                  Preferred Location{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                </label>
                <input
                  type="text"
                  id="preferredLocation"
                  name="preferredLocation"
                  value={formData.tenantData.preferredLocation}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "white",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #52796F",
                  }}
                ></input>
              </div>

              <div className="px-[1rem]">
                <div className="grid grid-cols-2 gap-x-[1rem] py-[1rem]">
                  <div
                    className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                    }}
                  >
                    <HiCurrencyRupee className="text-[2rem] my-[0.5rem]" />
                    <p className="font-semibold text-center py-[0.5rem]">
                      Prefered Rent(per month)
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </p>
                    <input
                      type="number"
                      id="rent"
                      value={formData.tenantData.rent}
                      onChange={handleChange}
                      onWheel={(e) => e.target.blur()}
                      name="rent"
                      placeholder="-number only*-"
                      style={{
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                        width: "80%",
                        boxShadow:
                          "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        // marginTop: "-10px",
                      }}
                    />
                  </div>
                  <div
                    className="shadow-md flex items-center flex-col py-[1rem]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                    }}
                  >
                    <MdVpnKey className="text-[2rem] my-[0.5rem]" />
                    <p className="font-semibold text-center py-[0.5rem]">
                      Available from
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </p>
                    <input
                      type="date"
                      id="moveIn"
                      value={formData.tenantData.moveIn}
                      onChange={handleChange}
                      name="moveIn"
                      // placeholder="username"
                      style={{
                        backgroundColor: "white",
                        padding: "0.5rem",
                        borderRadius: "5px",
                        // marginTop: "-10px",
                        width: "80%",
                        border: "1px solid #52796F",
                        boxShadow:
                          "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* <div class="buttonBackNext">
            <button className="CommonnBackButton" style={{  fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Save and Next <img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
            </div> */}

              <div className="flex justify-around items-center py-[1rem]">
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
                  margin="50%"
                  fontweight="bolder"
                  type="submit"
                />
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
                // borderRadius: "16px",
                // marginTop: "10%",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${backgroundSecond})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              {/* <div class="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} > */}
              {/* <h2 style={{color:"#52796F"}}>Tenant Details (2/2)</h2> */}
              <CommonHeader title="Tenant Details (2/2)" color="#52796F" />
              <div className="text-left p-[1rem] text-[1.2rem]">
                <p> What all facilitites are must for tenant?</p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <MdPower className="text-[2rem]" />
                      <p className="font-semibold">24 x 7</p>
                      <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                        Power Back-Up
                      </p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <FaCartShopping className="text-[2rem]" />
                      <p className="font-semibold">Grocery Store</p>
                      <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                        In Campus
                      </p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <BiSwim className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">Swimming Pool</p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <CgGym className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">Gym</p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <MdOutlineSportsHandball className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">Club house</p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <RiParkingBoxFill className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">Car Parking</p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <RiParkingBoxFill className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">Bike Parking</p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <GiRoastChicken className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">
                        Non-Veg Allowed
                      </p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <TbAirConditioning className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">
                        Air Conditioner
                      </p>
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
                    <div className="flex justify-center items-center flex-col text-center">
                      <FaBath className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">
                        Attached Bathroom
                      </p>
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
                    margin="25%"
                    fontweight="bolder"
                    color="#DAF0EE"
                    type="submit"
                  />
                </div>
              </form>
              <Footer />
              <div className="mb-[1rem]" />
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
