import React, { Component, useEffect, useState } from "react";
import "./PropertyInfo.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
import Footer from "../Footer";
import ReactSwitch from "react-switch";
import num_1 from "../Assets/Images/num.png";
import CommonBtn from "../CommonButton";
import CommonHeader from "../CommonHeader";
import vector from "../Assets/Images/vector.png";
import num_2 from "../Assets/Images/num_2.png";
import BackButton from "../CommonButtonBack";
import CommonTopButton from "../CommonTopButton";
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
import number_of_balcony from "../Assets/Images/PropertyAdditionPageIcons/number_of_balcony/24.png";
import broom from "../Assets/Images/PropertyAdditionPageIcons/floor_number/broom.png";
import Movein from "../Assets/Images/Move-in.png";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
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

function PropertyInfo() {
  const [checkedStateOne, setCheckedStateOne] = useState(true);
  const [checkedStateTwo, setCheckedStateTwo] = useState(false);
  const [checkedStateThree, setCheckedStateThree] = useState(false);
  const [isCheckRent, setisCheckRent] = useState(Boolean);
  const [isCheckSale, setisCheckSale] = useState(Boolean);

  // scroll-to-top

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
    status: "Pending",
    houseName: "",
    societyName: "",
    pinCode: "",
    propertyData: {
      propertyInfo: {
        houseType: "",
        houseConfig: "",
        area: "",
        mapLocation: "",
        purposeRent: false,
        purposeSale: false,
      },
      ownerInfo: {
        phoneNumber: "8009832805",
        panNumber: "BIGPV7008G",
        country: "India",
        city: "Mumbai",
        name: {
          first: "",
          last: "",
        },
      },
      featureInfo: {
        gatedSecurity: false,
        powerBackup: false,
        groceryStore: false,
        swimmingPool: false,
        gym: false,
        clubHouse: false,
        carpetArea: "",
        houseHelpRoom: "",
        bathrooms: "",
        balconies: "",
        furnishingType: "",
        ac: false,
        nonVeg: false,
        constructionYear: "",
        availableFrom: "",
        rentAmount: 1,
        rentDeposit: 1,
        rentMaintenance: 1,
        lockInPeriod: 1,
        saleAmount: 1,
        saleDeposit: 1,
        saleMaintenance: 1,
        moveInFrom: "",
        floors: {
          total: "",
          your: "",
        },
        parking: {
          car: "",
          bike: "",
          type: "",
        },
      },
    },
  });
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  // };
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevState) => {
      if (name in prevState.propertyData.propertyInfo) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            propertyInfo: {
              ...prevState.propertyData.propertyInfo,
              [name]: value,
              [name]: type === "checkbox" ? checked : value,
            },
          },
        };
      } else if (name in prevState.propertyData.ownerInfo.name) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            ownerInfo: {
              ...prevState.propertyData.ownerInfo,
              name: {
                ...prevState.propertyData.ownerInfo.name,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyData.ownerInfo) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            ownerInfo: {
              ...prevState.propertyData.ownerInfo,
              [name]: value,
            },
          },
        };
      } else if (name in prevState.propertyData.featureInfo.floors) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            featureInfo: {
              ...prevState.propertyData.featureInfo,
              floors: {
                ...prevState.propertyData.featureInfo.floors,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyData.featureInfo.parking) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            featureInfo: {
              ...prevState.propertyData.featureInfo,
              parking: {
                ...prevState.propertyData.featureInfo.parking,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyData.featureInfo) {
        return {
          ...prevState,
          propertyData: {
            ...prevState.propertyData,
            featureInfo: {
              ...prevState.propertyData.featureInfo,
              [name]: value,
            },
          },
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  };
  // const handleChange = (event) => {
  //   //   const { name, value } = event.target;
  //   //   setFormData((prevState) => ({ ...prevState, [name]: value }));
  //   const { name, value, type, checked } = event.target;
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     propertyData: {
  //       ...prevState.propertyData,
  //       propertyInfo: {
  //         ...prevState.propertyData.propertyInfo,
  //         [name]: value,
  //         [name]: type === "checkbox" ? checked : value,
  //       },
  //     //   ownerInfo: {
  //     //     ...prevState.propertyData.ownerInfo,
  //     //     [name]: value,
  //     //     name: {
  //     //       ...prevState.propertyData.ownerInfo.name,
  //     //       [name]: value,
  //     //     },
  //     //   },
  //     //   featureInfo: {
  //     //     ...prevState.propertyData.featureInfo,
  //     //     [name]: value,
  //     //     // [name]: type === 'checkbox' ? checked : value,
  //     //     floors: {
  //     //       ...prevState.propertyData.featureInfo.floors,
  //     //       [name]: value,
  //     //     },
  //     //     parking: {
  //     //       ...prevState.propertyData.featureInfo.parking,
  //     //       [name]: value,
  //     //     },
  //     //   },
  //     // },
  //     [name]: value, // this will set houseName in the state
  //   },
  //   })
  //   );
  // };
  const token = localStorage.getItem("token");
  console.log(token);
  // console.log(formData);
  const validateOne = () => {
    if (formData.propertyData.propertyInfo.houseType == "") {
      toast.error("please select house type");
      return false;
    }
    if (formData.propertyData.propertyInfo.houseConfig == "") {
      toast.error("please select house configuration");
      return false;
    }
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pinCode)) {
      toast.error("Please enter valid Pin Code");
      return false;
    }
    const isRent = formData.propertyData.propertyInfo.purposeRent;
    const isSale = formData.propertyData.propertyInfo.purposeSale;
    if ((isRent || isSale) == false) {
      toast.error("please select property listing purpose");
      return false;
    }
    // if (formData.houseName == "") {
    //   alert("please enter house name/number");
    //   return false;
    // }
    // if (formData.societyName == "") {
    //   alert("please enter society name");
    //   return false;
    // }
    // if (formData.pinCode == "") {
    //   alert("please enter valid pincode");
    //   return false;
    // }
    // if (formData.propertyData.propertyInfo.area == "") {
    //   alert("please enter area/locality");
    //   return false;
    // }
    // if (formData.propertyData.propertyInfo.mapLocation == "") {
    //   alert("please enter GMap plug-in");
    //   return false;
    // }
    return true;
  };

  // console.log(
  //   "Purpose Sale -> " + formData.propertyData.propertyInfo.purposeRent
  // );
  // console.log(
  //   "Purpose Rent -> " + formData.propertyData.propertyInfo.purposeSale
  // );

  const handleChangeOne = (event) => {
    event.preventDefault();
    if (validateOne()) {
      setCheckedStateOne((current) => !current);
      setCheckedStateTwo((current) => !current);
      console.log("Received from PrpertyInfo - 1s In state:", formData);
      formData.propertyData.propertyInfo.purposeRent
        ? setisCheckRent(true)
        : setisCheckRent(false);
      formData.propertyData.propertyInfo.purposeSale
        ? setisCheckSale(true)
        : setisCheckSale(false);
    }
  };
  const getCurrentYear = () => {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    return currentYear;
  };
  const handleChangeTwo = (event) => {
    event.preventDefault();
    setCheckedStateTwo((current) => !current);
    setCheckedStateThree((current) => !current);
    console.log("Received from TenantPref In state:", formData);
  };
  // const pincodeRegex = /^\d{6}$/;
  // const validatePincode = () => {
  //   console.log("blur");
  //   if (pincodeRegex.test(formData.pinCode)) {
  //     // alert('Valid PIN code');
  //   } else {
  //     alert("Invalid PIN code");
  //   }
  // };
  //API REQUEST
  const validateSubmit = () => {
    const gatedSecurity = formData.propertyData.featureInfo.gatedSecurity;
    const powerBackup = formData.propertyData.featureInfo.powerBackup;
    const groceryStore = formData.propertyData.featureInfo.groceryStore;
    const swimmingPool = formData.propertyData.featureInfo.swimmingPool;
    const gym = formData.propertyData.featureInfo.gym;
    const clubHouse = formData.propertyData.featureInfo.clubHouse;

    if (
      (gatedSecurity ||
        powerBackup ||
        groceryStore ||
        swimmingPool ||
        gym ||
        clubHouse) == false
    ) {
      toast.error("Please select atleast one from about society");
      return false;
    }
    if (formData.propertyData.featureInfo.parking.car == "") {
      toast.error("please select number of car parking");
      return false;
    }
    if (formData.propertyData.featureInfo.parking.bike == "") {
      toast.error("please select number of bike parking");
      return false;
    }
    if (formData.propertyData.featureInfo.parking.type == "") {
      toast.error("please select parking type");
      return false;
    }
    if (formData.propertyData.featureInfo.houseHelpRoom == "") {
      toast.error("please select house help room ");
      return false;
    }
    if (formData.propertyData.featureInfo.bathrooms == "") {
      toast.error("please select number of bathrooms");
      return false;
    }
    if (formData.propertyData.featureInfo.balconies == "") {
      toast.error("please select number of balconies");
      return false;
    }
    if (formData.propertyData.featureInfo.furnishingType == "") {
      toast.error("please select furnishing type");
      return false;
    }
    return true;
  };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateSubmit()) {
      // const Jdata =  JSON.stringify(formData, null, 2);
      // console.log("JSON VARIABLE",Jdata);
      console.log(JSON.stringify(formData));

      // Create a copy of the formData
      const formDataCopy = { ...formData };
      //Check if sale and rent data are set
      if (formDataCopy.propertyData.featureInfo.moveInFrom === "") {
        // If it's empty, remove the moveInFrom property
        delete formDataCopy.propertyData.featureInfo.moveInFrom;
      }

      console.log(JSON.stringify(formDataCopy));

      axios
        .post("https://b8rliving.com/property", formDataCopy, axiosConfig)
        .then((response) => {
          console.log(response.data);
          alert("Your Property details has been submitted");
          // do something with the response
          if (response.data.data.property.propertyDetails.length > 0) {
            const rentAmountConst =
              response.data.data.property.propertyDetails[0].featureInfo
                .rentAmount;
            const saleAmountConst =
              response.data.data.property.propertyDetails[0].featureInfo
                .saleAmount;
            console.log("Rent Amount:", rentAmountConst);
            if (rentAmountConst > 1 && saleAmountConst > 1) {
              window.location.href = `/PropertyCreated?name=${formData.houseName}&furnishingType=${formData.propertyData.featureInfo.furnishingType}&rentAmount=${formData.propertyData.featureInfo.rentAmount}&rentDeposit=${formData.propertyData.featureInfo.rentDeposit}&saleAmount=${formData.propertyData.featureInfo.saleAmount}&saleDeposit=${formData.propertyData.featureInfo.saleDeposit}&houseConfig=${formData.propertyData.propertyInfo.houseConfig}`;
            } else if (rentAmountConst > 1) {
              window.location.href = `/PropertyCreated?name=${formData.houseName}&furnishingType=${formData.propertyData.featureInfo.furnishingType}&rentAmount=${formData.propertyData.featureInfo.rentAmount}&rentDeposit=${formData.propertyData.featureInfo.rentDeposit}&houseConfig=${formData.propertyData.propertyInfo.houseConfig}`;
            } else if (saleAmountConst > 1) {
              window.location.href = `/PropertyCreated?name=${formData.houseName}&furnishingType=${formData.propertyData.featureInfo.furnishingType}&saleAmount=${formData.propertyData.featureInfo.saleAmount}&saleDeposit=${formData.propertyData.featureInfo.saleDeposit}&houseConfig=${formData.propertyData.propertyInfo.houseConfig}`;
            }
          } else {
            console.log("propertyDetails array is empty. Try Again");
          }
        })
        .catch((error) => {
          console.log(error.response.data.message);
          toast.error(error.response.data.message);
          // handle the error
        });
      console.log("Finale In state:", formData);
    }
  };
  const styles = {
    width: "100%",
    backgroundColor: "white",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid grey",
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
            {/* <h2 style={{ color:"#52796f" }}>Create New Listing </h2> */}
            <CommonHeader title="Create New Listing" color="#52796f" />
            {/* <img src={num_1} alt="Image description" height={55} width={300} /> */}
            {/* stageCount */}
            <div className="grid grid-cols-3 py-[0.5rem]">
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#52796F] rounded-[999rem] w-[3rem] h-[3rem] text-[#DAF0EE] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  1
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#F0FBF8] rounded-[999rem] w-[3rem] h-[3rem] text-[#5D6560] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  2
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#F0FBF8] rounded-[999rem] w-[3rem] h-[3rem] text-[#5D6560] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  3
                </div>
              </div>
            </div>

            <form
              className="property-form inner-background"
              onSubmit={handleChangeOne}
            >
              <p
                style={{ color: "#52796f" }}
                className="text-[1.3rem] text-bold"
              >
                {" "}
                Let's get some basic details in
              </p>
              <label
                for="houseType"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left"
                }}
              >
                Property Type?{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <div className="">
                <select
                  id="houseType"
                  name="houseType"
                  value={formData.propertyData.propertyInfo.houseType}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "5px",
                    width: "100%",
                    border: "1px solid #52796F",
                  }}
                >
                  <option value="" disabled>
                    Select from Drop Down
                  </option>
                  <option value="Flat (in Gated Society)">
                    Flat (in Gated Society)
                  </option>
                  <option value="Individual Builder Floor">
                    {" "}
                    Individual Builder Floor
                  </option>
                  <option value="Individual House(in Gated Society)">
                    Individual House(in Gated Society)
                  </option>
                  <option value=" Standalone Individual House">
                    Standalone Individual House
                  </option>
                </select>
              </div>
              {/* <br></br> */}
              {/* house configuration */}
              <label
                for="houseConfig"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Property Configuration?{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <div className="">
                <select
                  id="houseConfig"
                  name="houseConfig"
                  value={formData.propertyData.propertyInfo.houseConfig}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "white",
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: "1px solid #52796F",
                  }}
                >
                  <option value="" disabled>
                    Select from Drop Down
                  </option>
                  <option value="Studio">Studio</option>
                  <option value="1 BHK">1BHK</option>
                  <option value="2 BHK">2BHK</option>
                  <option value="3 BHK">3BHK</option>
                  <option value="4 BHK">4BHK</option>
                </select>
              </div>
              {/* <br></br> */}
              {/* house_num type */}
              <label
                for="houseName"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                House Number/ Flat Number/ Name{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <input
                type="text"
                id="houseName"
                value={formData.houseName}
                required
                onChange={handleChange}
                name="houseName"
                placeholder="Text Input (e.g. EG01, 2604, C202)"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              ></input>
              {/* Society type */}
              <label
                for="society_type"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Society Name?{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <input
                type=""
                id="societyName"
                value={formData.societyName}
                onChange={handleChange}
                required
                name="societyName"
                placeholder="for eg(Oceanus Triton or Sushant Estate)"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  border: "1px solid #52796F",
                }}
              ></input>
              {/* Pin code */}
              <label
                for="pinCode"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Pin Code{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                required
                value={formData.pinCode}
                onChange={handleChange}
                // onBlur={validatePincode}
                placeholder="6 digit valid PIN Input"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  border: "1px solid #52796F",
                }}
              ></input>
              <br></br>
              {/* Area */}
              <label
                for="address"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Area/Locality{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <input
                type="text"
                id="area"
                name="area"
                required
                value={formData.propertyData.propertyInfo.area}
                onChange={handleChange}
                placeholder="Text input (e.g. Sector 52, Phase 2)"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  border: "1px solid #52796F",
                }}
              ></input>
              <br></br>
              {/* Map */}
              <label
                for="map"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Select Map Location{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <input
                type="text"
                id="mapLocation"
                name="mapLocation"
                required
                value={formData.propertyData.propertyInfo.mapLocation}
                onChange={handleChange}
                placeholder="Google Maps Plug-in"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "5px",
                  border: "1px solid #52796F",
                }}
              />
              <br></br>
              <div className="checkContainer">
                <label
                  htmlFor="checkboxGroup"
                  style={{
                    textAlign: "left",
                    display: "block",
                    marginBottom: "0.5rem",
                    fontWeight: "300",
                    float: "left",
                  }}
                >
                  Select Purpose:{" "}
                  <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                  <br />
                  (select both if property is open for sale as well as rent)
                </label>
                <br></br>
                <div className="checkboxes px-[1rem]">
                  <input
                    type="checkbox"
                    id="purposeRent"
                    name="purposeRent"
                    value={formData.propertyData.propertyInfo.purposeRent}
                    style={{
                      width: "10px",
                      padding: "1%",
                      boxShadow: "none",
                      zoom: "2",
                      borderRadius: "0px",
                    }}
                    // checked={rentChecked}
                    checked={formData.propertyData.propertyInfo.purposeRent}
                    onChange={handleChange}
                  />
                  <label for="purposeRent">For Rent</label>
                </div>
                <div className="checkboxes px-[1rem]">
                  <input
                    style={{
                      width: "10px",
                      padding: "1%",
                      boxShadow: "none",
                      zoom: "2",
                    }}
                    type="checkbox"
                    id="purposeSale"
                    name="purposeSale"
                    value={formData.propertyData.propertyInfo.purposeSale}
                    // checked={saleChecked}
                    checked={formData.propertyData.propertyInfo.purposeSale}
                    onChange={handleChange}
                  />
                  <label htmlFor="purposeSale">For Sale</label>
                </div>
              </div>
              <div className="flex justify-around items-center px-[1rem]">
                <div
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <BackButton title="Back" />
                </div>
                <CommonBtn title="Save & Next" margin="70px" type="submit" />
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
            class=""
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundSecond})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2> Add Landlord Details </h2> */}
            <CommonHeader title="Add Landlord/Owner Details" color="#52796F" />
            {/* <img src={num_2} alt="Image description" height={55} /> */}
            {/* stageCount */}
            <div className="grid grid-cols-3 py-[0.5rem]">
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#F0FBF8] rounded-[999rem] w-[3rem] h-[3rem] text-[#5D6560] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  1
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#52796F] rounded-[999rem] w-[3rem] h-[3rem] text-[#DAF0EE] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  2
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#F0FBF8] rounded-[999rem] w-[3rem] h-[3rem] text-[#5D6560] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  3
                </div>
              </div>
            </div>
            <form
              onSubmit={handleChangeTwo}
              style={{ borderRadius: "16px" }}
              className="inner-background"
            >
              {/* Owner's First NAME */}
              <div className="flex justify-center items-center pb-[1rem]">
                <h4
                  style={{ color: "#52796f" }}
                  className="text-[1.3rem] font-bold"
                >
                  {" "}
                  Who owns this Property?
                </h4>
              </div>
              <label
                className="mx-[0.2rem]"
                for="first"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Owner's First Name{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <input
                type="text"
                id="first"
                placeholder="Owner's First Name"
                name="first"
                required
                value={formData.propertyData.ownerInfo.name.first}
                onChange={handleChange}
                style={styles}
              />
              {/* <br></br> */}
              {/* Owner's Last NAME */}
              <label
                className="mx-[0.2rem]"
                for="last"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Owner's Last Name{" "}
                <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
              </label>
              <input
                type="text"
                id="last"
                placeholder="Owner's Last name"
                name="last"
                required
                value={formData.propertyData.ownerInfo.name.last}
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              {/* CONTACT NUM */}
              <label 
                className="mx-[0.2rem]"
                for="phoneNumber"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Contact Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                maxLength="10"
                placeholder="10 digit number"
                name="phoneNumber"
                // required
                // value={formData.propertyData.ownerInfo.phoneNumber}
                defaultValue=""
                onChange={handleChange}
                style={styles}
              /> 
              <br></br>
              {/* PAN CARD */}
              <label
                className="mx-[0.2rem] mt-[20px]"
                for="panNumber"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Pan Card(Useful for Rental Agreement)
              </label>
              <input
                type="text"
                id="panNumber"
                placeholder="Pan number"
                name="panNumber"
                // required
                // value={formData.propertyData.ownerInfo.panNumber}
                defaultValue=""
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              {/* Residing Country */}
              <label
                className="mx-[0.2rem]"
                for="country"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                Country of Residence 
              </label>
              <input
                type="text"
                id="country"
                placeholder="residing country"
                name="country"
                // required
                // value={formData.propertyData.ownerInfo.country}
                defaultValue=""
                onChange={handleChange}
                style={styles}
              />
              <br></br>
              <label
                className="mx-[0.2rem]"
                for="city"
                style={{
                  textAlign: "left",
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "300",
                  float: "left",
                }}
              >
                City of Residence
              </label>
              <input
                type="text"
                id="city"
                placeholder="residing city"
                name="city"
                // required
                // value={formData.propertyData.ownerInfo.city}
                defaultValue=""
                onChange={handleChange}
                style={styles}
              />
              {/* <br></br> */}
              {/* <br></br> */}
              <div className="flex justify-around items-center">
                {/* <div>
                  <BackButton
                    title="Back"
                    fontweight="bolder"
                    onClick={handleClick}
                  />
                </div> */}
                <div
                  onClick={() => {
                    setCheckedStateTwo(!checkedStateTwo);
                    setCheckedStateOne(!checkedStateOne);
                  }}
                >
                  <BackButton title="Back" />
                </div>
                <CommonBtn
                  title="Save and next"
                  margin="40%"
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
      {checkedStateThree ? (
        <div className="login-page">
          <div
            class="form"
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{color:"#52796F"}}>Property Features</h2> */}
            <CommonHeader title="Property Features" color="#52796F" />
            {/* <img src={num3} alt="Image description" height={55} /> */}
            {/* stageCount */}
            <div className="grid grid-cols-3 py-[0.5rem]">
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#F0FBF8] rounded-[999rem] w-[3rem] h-[3rem] text-[#5D6560] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  1
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#F0FBF8] rounded-[999rem] w-[3rem] h-[3rem] text-[#5D6560] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  2
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div
                  className="flex justify-center items-center bg-[#52796F] rounded-[999rem] w-[3rem] h-[3rem] text-[#DAF0EE] text-[1.3rem] font-bold"
                  style={{
                    border: "4px solid #DAF0EE",
                  }}
                >
                  3
                </div>
              </div>
            </div>

            {/* -----------Body----------- */}
            {/* societydetails */}
            <form onSubmit={handleSubmit}>
              <div className="px-[1rem]">
                <div
                  className="p-[1rem]"
                  style={{
                    border: "1px solid #CFD3D2",
                    background:
                      "linear-gradient(180deg, rgba(232, 231, 231, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)  ",
                  }}
                >
                  <p className="text-[1.3rem] font-bold text-[#3B413D] flex justify-start items-center">
                    About the Society{" "}
                    <span style={{ color: "red", fontSize: "1.5rem" }}>*</span>
                  </p>
                  {/* grid */}
                  <div className="grid grid-cols-3 py-[1rem] gap-y-[2rem]">
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
                        checked={
                          formData.propertyData.featureInfo.gatedSecurity
                        }
                        //  onChange={() =>  setFormData({
                        //    ...formData,
                        //    gatedSecurity: !formData.propertyData.featureInfo.gatedSecurity,
                        //  })}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["gatedSecurity"]:
                                  !formData.propertyData.featureInfo
                                    .gatedSecurity,
                              },
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
                      <MdPower className="text-[2rem]" />
                      <p className="font-semibold">24 x 7</p>
                      <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                        Power Back-Up
                      </p>
                      <ReactSwitch
                        checked={formData.propertyData.featureInfo.powerBackup}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["powerBackup"]:
                                  !formData.propertyData.featureInfo
                                    .powerBackup,
                              },
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
                        checked={formData.propertyData.featureInfo.groceryStore}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["groceryStore"]:
                                  !formData.propertyData.featureInfo
                                    .groceryStore,
                              },
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
                      {/* <p className="text-[#52796F] text-[0.8rem]">Swimming Pool</p> */}
                      <ReactSwitch
                        checked={formData.propertyData.featureInfo.swimmingPool}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["swimmingPool"]:
                                  !formData.propertyData.featureInfo
                                    .swimmingPool,
                              },
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
                        checked={formData.propertyData.featureInfo.gym}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["gym"]: !formData.propertyData.featureInfo.gym,
                              },
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
                      {/* <p className="text-[#52796F] text-[0.8rem]">Power Back-Up</p> */}
                    </div>
                    <div className="flex justify-center items-center flex-col text-center">
                      <MdOutlineSportsHandball className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem]">Club house</p>
                      <ReactSwitch
                        checked={formData.propertyData.featureInfo.clubHouse}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["clubHouse"]:
                                  !formData.propertyData.featureInfo.clubHouse,
                              },
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
                      {/* <p className="text-[#52796F] text-[0.8rem]">Power Back-Up</p> */}
                    </div>
                  </div>
                </div>
                {/* housedetails */}
                <div></div>
              </div>
              {/* maincontainer - house Details */}
              <div className="p-[1rem]">
                <div
                  className="p-[1rem]"
                  style={{
                    border: "1px solid #DAF0EE",
                    background:
                      "linear-gradient(180deg, rgba(218, 240, 238, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                  }}
                >
                  <p className="text-[1.3rem] font-bold text-[#3B413D] py-[1rem] flex justify-start items-center">
                    House Details
                  </p>
                  {/* floor container */}
                  <div
                    className="grid grid-cols-2 py-[1rem] gap-x-[1rem]"
                    // style={{
                    //   background:
                    //     "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                    // }}
                  >
                    {/* Carpet area */}
                    <div
                      className="shadow-md flex items-center flex-col py-[1rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                      }}
                    >
                      <RxDimensions className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold text-center pt-[0.5rem]">
                        Super Carpet Area
                        {/* <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span> */}
                      </p>
                      <p className="text-[0.9rem] pb-[0.4rem]">
                        (in square feet, sq.ft)
                      </p>
                      <input
                        type="number"
                        id="carpetArea"
                        value={formData.propertyData.featureInfo.carpetArea}
                        onChange={handleChange}
                        name="carpetArea"
                        required
                        placeholder="number only*"
                        style={{
                          backgroundColor: "white",
                          padding: "0.5rem",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          width: "75%",
                          // marginTop: "-15px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
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
                      <HiMiniBuildingOffice className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold">Property Floor Number</p>
                      <div className="grid grid-cols-2 text-center">
                        <div className="py-[0.5rem] flex flex-col justify-center items-center">
                          <label className="text-[0.9rem]">
                            Floor Number of Property{" "}
                            <span style={{ color: "red", fontSize: "1.2rem" }}>
                              *
                            </span>
                          </label>
                          <input
                            className="p-[0.3rem]"
                            type="number"
                            id="your"
                            value={
                              formData.propertyData.featureInfo.floors.your
                            }
                            onChange={handleChange}
                            name="your"
                            max={formData.propertyData.featureInfo.floors.total}
                            required
                            placeholder="number*"
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "5px",
                              border: "1px solid #52796F",
                              width: "80%",
                              height: "50%",
                              boxShadow:
                                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            }}
                          />
                        </div>
                        <div className="py-[0.5rem] flex flex-col justify-center items-center">
                          <label className="text-[0.9rem]">
                            Total Floors in Apartment Complex{" "}
                            <span style={{ color: "red", fontSize: "1.2rem" }}>
                              *
                            </span>
                          </label>
                          <input
                            className="p-[0.3rem]"
                            type="number"
                            id="total"
                            value={
                              formData.propertyData.featureInfo.floors.total
                            }
                            onChange={handleChange}
                            name="total"
                            placeholder="number*"
                            required
                            style={{
                              backgroundColor: "#F5F5F5",
                              borderRadius: "5px",
                              border: "1px solid #52796F",
                              width: "80%",
                              height: "50%",
                              boxShadow:
                                "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* car and bike parking */}
                  <div
                    className="shadow-md grid grid-cols-2 py-[1rem] my-[1rem]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                    }}
                  >
                    <div className="flex justify-center items-center flex-col">
                      <RiParkingBoxFill className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold text-center">
                        Car & Bike Parking Availability
                      </p>
                    </div>
                    <div className="">
                      <div className="py-[0.5rem] flex flex-col">
                        <label className="text-[0.9rem]">
                          Number of Car Parking{" "}
                          <span style={{ color: "red", fontSize: "1.2rem" }}>
                            *
                          </span>
                        </label>
                        <select
                          id="car"
                          name="car"
                          value={formData.propertyData.featureInfo.parking.car}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "90%",
                            // marginLeft: "50px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option value="" disabled selected>
                            Drop Down
                          </option>
                          <option
                            style={{
                              backgroundColor: "red",
                            }}
                            value="1 Car"
                          >
                            1 Car
                          </option>
                          <option value="2 Cars">2 Car</option>
                          <option value="3 Cars">3 Car</option>
                          <option value="No Car Parking">No Car Parking</option>
                        </select>
                      </div>
                      <div className="py-[0.5rem] flex flex-col">
                        <label className="text-[0.9rem]">
                          Number of Bike Parking{" "}
                          <span style={{ color: "red", fontSize: "1.2rem" }}>
                            *
                          </span>
                        </label>
                        <select
                          id="bike"
                          name="bike"
                          value={formData.propertyData.featureInfo.parking.bike}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "90%",
                            // marginLeft: "50px",

                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option value="" disabled>
                            Drop Down
                          </option>
                          <option
                            style={{
                              backgroundColor: "red",
                            }}
                            value="0"
                          >
                            1 Bike
                          </option>
                          <option value="1">Included with Car</option>
                          <option value="2">Owned Garage</option>
                        </select>
                      </div>
                      <div className="py-[0.5rem] flex flex-col">
                        <label className="text-[0.9rem]">
                          Parking Type{" "}
                          <span style={{ color: "red", fontSize: "1.2rem" }}>
                            *
                          </span>
                        </label>
                        <select
                          id="type"
                          name="type"
                          value={formData.propertyData.featureInfo.parking.type}
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "90%",
                            // marginTop: "5px",
                            // marginLeft: "50px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option value="" disabled>
                            Drop Down
                          </option>
                          <option
                            style={{
                              backgroundColor: "red",
                            }}
                            value="Covered Roof"
                          >
                            Covered Roof
                          </option>
                          <option value="Open">Open</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* bathroom and balconies */}
                  <div className="grid grid-cols-2 gap-x-[1rem]">
                    <div
                      className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                      }}
                    >
                      <FaBath className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold text-center py-[0.5rem]">
                        Number of Bathrooms
                        <span style={{ color: "red", fontSize: "1.5rem" }}>
                          *
                        </span>
                      </p>
                      <select
                        id="bathrooms"
                        name="bathrooms"
                        value={formData.propertyData.featureInfo.bathrooms}
                        onChange={handleChange}
                        style={{
                          backgroundColor: "white",
                          padding: "0.5rem",
                          width: "80%",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      >
                        <option value="" disabled>
                          Drop Down
                        </option>
                        <option
                          style={{
                            backgroundColor: "red",
                          }}
                          value="1"
                        >
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div
                      className="shadow-md flex items-center flex-col py-[1rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                      }}
                    >
                      <MdBalcony className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold text-center py-[0.5rem]">
                        No of Balconies
                        <span style={{ color: "red", fontSize: "1.5rem" }}>
                          *
                        </span>
                      </p>
                      <select
                        id="balconies"
                        name="balconies"
                        value={formData.propertyData.featureInfo.balconies}
                        onChange={handleChange}
                        style={{
                          backgroundColor: "white",
                          padding: "0.5rem",
                          width: "80%",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      >
                        <option value="" disabled>
                          Drop Down
                        </option>
                        <option
                          style={{
                            backgroundColor: "red",
                          }}
                          value="1"
                        >
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>
                  {/* househelproom */}
                  <div
                    className="shadow-md grid grid-cols-2 py-[1rem] my-[1rem]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                    }}
                  >
                    <div className="flex justify-center items-center flex-col">
                      <MdOutlineCleaningServices className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold">House Help Room</p>
                    </div>
                    <div className="">
                      <div className="py-[0.5rem] flex flex-col">
                        <label>
                          House Help Room
                          <span style={{ color: "red", fontSize: "1.5rem" }}>
                            *
                          </span>
                        </label>
                        <select
                          id="houseHelpRoom"
                          name="houseHelpRoom"
                          value={
                            formData.propertyData.featureInfo.houseHelpRoom
                          }
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            width: "90%",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            // marginLeft: "60px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option value="" disabled>
                            Drop Down
                          </option>
                          <option
                            style={{
                              backgroundColor: "red",
                            }}
                            value="1 Room"
                          >
                            1 Room
                          </option>
                          <option value="1 Room + Bathroom">
                            1 Room + Bathroom
                          </option>
                          <option value="None">None</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* furnishingType */}
                  <div
                    className="shadow-md grid grid-cols-2 py-[1rem] my-[1rem]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                    }}
                  >
                    <div className="flex justify-center items-center flex-col">
                      <LuArmchair className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold">Furnishing</p>
                    </div>
                    <div className="">
                      <div className="py-[0.5rem] flex flex-col">
                        <label>
                          Type of Furnishing?
                          <span style={{ color: "red", fontSize: "1.5rem" }}>
                            *
                          </span>
                        </label>
                        <select
                          id="furnishingType"
                          name="furnishingType"
                          value={
                            formData.propertyData.featureInfo.furnishingType
                          }
                          onChange={handleChange}
                          style={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            width: "90%",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            // marginTop: "-50px",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        >
                          <option value="" disabled>
                            Drop Down
                          </option>
                          <option value="Un-furnished">Un-Furnished</option>
                          <option value="Semi-furnished">Semi-Furnished</option>
                          <option value="Full-furnished">Full-Furnished</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* nonveg & ac */}
                  <div className="grid grid-cols-2 gap-x-[1rem]">
                    <div
                      className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                      }}
                    >
                      <TbAirConditioning className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold text-center py-[0.5rem]">
                        Air Conditioner
                      </p>
                      <ReactSwitch
                        checked={formData.propertyData.featureInfo.ac}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["ac"]: !formData.propertyData.featureInfo.ac,
                              },
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
                    <div
                      className="shadow-md flex items-center flex-col py-[1rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                      }}
                    >
                      <GiRoastChicken className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold text-center py-[0.5rem]">
                        Non Veg Allowed?
                      </p>
                      <ReactSwitch
                        checked={formData.propertyData.featureInfo.nonVeg}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyData: {
                              ...prevState.propertyData,
                              featureInfo: {
                                ...prevState.propertyData.featureInfo,
                                ["nonVeg"]:
                                  !formData.propertyData.featureInfo.nonVeg,
                              },
                            },
                          }))
                        }
                        onColor="#DAF0EE"
                        onHandleColor="#fff"
                        handleDiameter={20}
                        uncheckedIcon={
                          // <span
                          //   style={{
                          //     color: "#black",
                          //     fontSize: "15px",
                          //     marginTop: "10px",
                          //   }}
                          // >
                          //   No
                          // </span>
                          false
                        }
                        checkedIcon={false}
                        boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                      />
                    </div>
                  </div>
                  {/* Constructionyear and availableFrom */}
                  <div className="grid grid-cols-2 gap-x-[1rem] py-[1rem]">
                    <div
                      className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                      }}
                    >
                      <BiSolidCalendarEdit className="text-[2rem] my-[0.5rem]" />
                      <p className="font-semibold text-center py-[0.5rem]">
                        Construction Year
                        <span style={{ color: "red", fontSize: "1.5rem" }}>
                          *
                        </span>
                      </p>
                      <input
                        type="number"
                        id="constructionYear"
                        required
                        value={
                          formData.propertyData.featureInfo.constructionYear
                        }
                        onChange={handleChange}
                        name="constructionYear"
                        placeholder="-year drop-down* -"
                        max={getCurrentYear()}
                        style={{
                          backgroundColor: "white",
                          padding: "0.5rem",
                          borderRadius: "5px",
                          width: "80%",
                          border: "1px solid #52796F",
                          // marginTop: "-25px",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
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
                        id="availableFrom"
                        pattern="\d{2}-\d{2}-\d{4}"
                        required
                        value={formData.propertyData.featureInfo.availableFrom}
                        onChange={handleChange}
                        name="availableFrom"
                        // min={new Date().toISOString().split("T")[0]}
                        // placeholder="username"
                        style={{
                          backgroundColor: "white",
                          padding: "0.5rem",
                          width: "80%",
                          borderRadius: "5px",
                          // marginTop: "-10px",
                          border: "1px solid #52796F",
                          boxShadow:
                            "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* maincontainer - rent/sale - price details */}

              {/* rent  */}
              {isCheckRent ? (
                <div className="px-[1rem]">
                  <div
                    className="p-[1rem]"
                    style={{
                      border: "1px solid #CFD3D2",
                      background:
                        "linear-gradient(180deg, rgba(232, 231, 231, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)  ",
                    }}
                  >
                    <p className="flex justify-start items-center text-[1.3rem] font-bold text-[#3B413D]">
                      Rent Details
                    </p>
                    {/* rent/sale amount & token */}
                    <div className="grid grid-cols-2 gap-x-[1rem] py-[1rem]">
                      <div
                        className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                        }}
                      >
                        <HiCurrencyRupee className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center pt-[0.5rem]">
                          Rent (per month)
                        </p>
                        <p className="text-[0.9rem] pb-[0.5rem]">
                          (without Maintenance)
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>
                        <input
                          type="number"
                          id="rentAmount"
                          value={formData.propertyData.featureInfo.rentAmount}
                          onChange={handleChange}
                          name="rentAmount"
                          required
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
                        <FaUserLock className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center pt-[0.5rem]">
                          Security Deposit
                        </p>
                        <p className="text-[0.9rem] pb-[0.5rem]">
                          (Refundable)
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>
                        <input
                          type="number"
                          id="rentDeposit"
                          value={formData.propertyData.featureInfo.rentDeposit}
                          onChange={handleChange}
                          name="rentDeposit"
                          placeholder="-number only*-"
                          required
                          style={{
                            backgroundColor: "white",
                            // marginTop: "-15px",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "80%",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        />
                      </div>
                    </div>
                    {/* maint & movein */}
                    <div className="grid grid-cols-2 gap-x-[1rem]">
                      <div
                        className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                        }}
                      >
                        <GrHostMaintenance className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center pt-[0.5rem]">
                          Maintenance (per month)
                        </p>
                        <p className="text-[0.9rem] pb-[0.5rem]">
                          (for tenant)
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>
                        <input
                          type="number"
                          id="rentMaintenance"
                          value={
                            formData.propertyData.featureInfo.rentMaintenance
                          }
                          onChange={handleChange}
                          name="rentMaintenance"
                          placeholder="-number only*-"
                          required
                          style={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            // marginTop: "-20px",
                            width: "80%",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
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
                        <BsFillHouseLockFill className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center pt-[0.5rem]">
                          Lock-in Period
                        </p>
                        <p className="text-[0.9rem] pb-[0.5rem]">
                          (in Months)
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>
                        <input
                          type="number"
                          id="lockInPeriod"
                          value={formData.propertyData.featureInfo.lockInPeriod}
                          onChange={handleChange}
                          name="lockInPeriod"
                          required
                          max="12"
                          min="1"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            // marginTop: "-20px",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "80%",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p> </p>
              )}

              {/* sale */}
              {isCheckSale ? (
                <div className="px-[1rem]">
                  <div
                    className="p-[1rem]"
                    style={{
                      border: "1px solid #CFD3D2",
                      background:
                        "linear-gradient(180deg, rgba(232, 231, 231, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)  ",
                    }}
                  >
                    <p className="flex justify-start items-center text-[1.3rem] font-bold text-[#3B413D]">
                      Sale Details
                    </p>
                    {/*sale amount & token */}
                    <div className="grid grid-cols-2 gap-x-[1rem] py-[1rem]">
                      <div
                        className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                        }}
                      >
                        <HiCurrencyRupee className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center pt-[0.5rem]">
                          Sale amount
                        </p>
                        <p className="text-[0.9rem] pb-[0.5rem]">
                          (without Maintenance)
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>
                        <input
                          type="number"
                          id="saleAmount"
                          value={formData.propertyData.featureInfo.saleAmount}
                          onChange={handleChange}
                          name="saleAmount"
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
                        <FaUserLock className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center pt-[0.5rem]">
                          Token Money Deposit
                        </p>
                        <p className="text-[0.9rem] pb-[0.5rem]">
                          (Refundable)
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>
                        <input
                          type="number"
                          id="saleDeposit"
                          value={formData.propertyData.featureInfo.saleDeposit}
                          onChange={handleChange}
                          name="saleDeposit"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            // marginTop: "-15px",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "80%",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        />
                      </div>
                    </div>
                    {/* maint & movein */}
                    <div className="grid grid-cols-2 gap-x-[1rem]">
                      <div
                        className="shadow-md flex justify-center items-center flex-col py-[1rem]"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                        }}
                      >
                        <GrHostMaintenance className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center pt-[0.5rem]">
                          Maintenance
                        </p>
                        <p className="text-[0.9rem] pb-[0.5rem]">
                          (per month)
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>
                        <input
                          type="number"
                          id="saleMaintenance"
                          value={
                            formData.propertyData.featureInfo.saleMaintenance
                          }
                          onChange={handleChange}
                          name="saleMaintenance"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            // marginTop: "-20px",
                            width: "80%",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
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
                        <BsFillHouseLockFill className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold text-center py-[0.5rem]">
                          Preferred Move-in
                          <span style={{ color: "red", fontSize: "1rem" }}>
                            *
                          </span>
                        </p>

                        <input
                          type="date"
                          id="moveInFrom"
                          pattern="\d{2}-\d{2}-\d{4}"
                          value={formData.propertyData.featureInfo.moveInFrom}
                          onChange={handleChange}
                          name="moveInFrom"
                          placeholder="-number only*-"
                          style={{
                            backgroundColor: "white",
                            // marginTop: "-20px",
                            padding: "0.5rem",
                            borderRadius: "5px",
                            border: "1px solid #52796F",
                            width: "80%",
                            boxShadow:
                              "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p></p>
              )}

              <div className="flex justify-around items-center py-[1rem]">
                <div
                  onClick={() => {
                    setCheckedStateThree(!checkedStateThree);
                    setCheckedStateTwo(!checkedStateTwo);
                  }}
                >
                  <BackButton title="Back" />
                </div>
                <CommonBtn
                  title="Submit"
                  margin="50%"
                  fontweight="bolder"
                  type="submit"
                />
              </div>
            </form>
          </div>
          <Footer />
          <div className="mb-[1rem]" />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default PropertyInfo;
