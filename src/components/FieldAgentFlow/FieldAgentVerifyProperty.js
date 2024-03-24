import React, { Component, useEffect, useState, useRef } from "react";
import ReactSwitch from "react-switch";

import { Link, redirect } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/FieldAgent/homeDown.png";
import peopleDown from "../Assets/Images/FieldAgent/peopleDown.png";
import Footer from "../Footer";
import vector from "../vector.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import swimming_pool from "../PropertyAdditionPageIcons/swimming_pool/24.png";
import veg_nonveg from "../PropertyAdditionPageIcons/veg_non-veg_1/24.png";
import number_of_balcony from "../PropertyAdditionPageIcons/number_of_balcony/24.png";
import broom from "../PropertyAdditionPageIcons/floor_number/broom.png";

import backgroundSecond from "../Assets/Images/FieldAgent/other_bg.png";
import num3 from "../Assets/Images/FieldAgent/num3.png";
import gated_sec from "../PropertyAdditionPageIcons/gatedsecurity_1/24.png";
import Power_backup from "../PropertyAdditionPageIcons/Power_backup/24.png";
import Ac_png from "../PropertyAdditionPageIcons/air_cond/airconditioner/24.png";
import car_parking from "../PropertyAdditionPageIcons/car_parking/24.png";
import club_house from "../PropertyAdditionPageIcons/club_house/24.png";
import construction_year from "../PropertyAdditionPageIcons/construction_year/24.png";
import convenience_store from "../PropertyAdditionPageIcons/convenience_store/24.png";
import floor_number from "../PropertyAdditionPageIcons/floor_number/24.png";
import furniture_1 from "../PropertyAdditionPageIcons/furniture_1/24.png";
import gym_1 from "../PropertyAdditionPageIcons/gym_1/24.png";
import hamburger_1 from "../PropertyAdditionPageIcons/hamburger_1/24.png";
import key_1 from "../PropertyAdditionPageIcons/key_1/24.png";
import mainteance_1 from "../PropertyAdditionPageIcons/mainteance_1/24.png";
import num_of_bathrooms from "../PropertyAdditionPageIcons/number_of_bathroom_1/24.png";
import onboarded from "../PropertyAdditionPageIcons/Power_backup/24.png";
import rent_1 from "../PropertyAdditionPageIcons/rent_1/24.png";
import LiftLobby from "../Assets/Images/FieldAgent/LiftLobby.png";
import Door from "../Assets/Images/FieldAgent/Door.png";
import LivingRoom from "../Assets/Images/FieldAgent/LivingRoom.png";
import TVarea from "../Assets/Images/FieldAgent/TVarea.png";
import Kitchen from "../Assets/Images/FieldAgent/Kitchen.png";
import UtilityArea from "../Assets/Images/FieldAgent/UtilityArea.png";
import Backyard from "../Assets/Images/FieldAgent/Backyard.png";
import CommonWashroom from "../Assets/Images/FieldAgent/CommonWashroom.png";
import Balcony from "../Assets/Images/FieldAgent/Balcony.png";
import bedroom from "../Assets/Images/FieldAgent/Bedroom.png";
import washroom from "../Assets/Images/FieldAgent/washroom.png";
import balcony from "../Assets/Images/FieldAgent/Balcony_two.png";
import broom_clean from "../Assets/Images/FieldAgent/Broom_clean.png";
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
// photocapture
import { GiLift } from "react-icons/gi"; //lift lobby
import { FaDoorOpen } from "react-icons/fa"; //entry door
import { GiCryptEntrance } from "react-icons/gi"; //home entrance
import { MdLiving } from "react-icons/md"; //living room
import { PiTelevisionSimpleBold } from "react-icons/pi"; //tv area
import { TbToolsKitchen3 } from "react-icons/tb"; //kitchen
import { BiSolidHomeHeart } from "react-icons/bi"; // utility area
import { GiWoodenFence } from "react-icons/gi"; //backyard
import { PiToiletDuotone } from "react-icons/pi"; //common washroom
import { IoBed } from "react-icons/io5"; //bedroom
import { GiGate } from "react-icons/gi"; //maingate

// ------------------------------------------------------
// import BackButton from "../ComMdPowermonButtonBack";
// import CommonHeader from "../CommonHeader";
// import CommonBtn from "../CommonButton";

function FieldAgentVerifyProperty() {
  const queryParameters = new URLSearchParams(window.location.search);
  const idProperty = queryParameters.get("propertyId");
  // console.log("id" + idProperty);
  const [isHomeArranged, setisHomeArranged] = useState(false);
  const [isBedroomArranged, setisBedroomArranged] = useState(false);
  const [checkedStateOne, setCheckedStateOne] = useState(true);
  const [checkedStateTwo, setCheckedStateTwo] = useState(false);
  const [checkedStateThree, setCheckedStateThree] = useState(false);
  const [checkedStateFour, setCheckedStateFour] = useState(false);
  const [checkedStateFive, setCheckedStateFive] = useState(false);

  const [loading, setLoading] = useState(false);
  const [responseDataPendingProperties, setresponseDataPendingProperties] =
    useState([]);
  const token = localStorage.getItem("token");
  const scrollRef = useRef(null);
  //   console.log(token);

  const [formData, setFormData] = useState({
    houseName: "",
    societyName: "",
    pinCode: "",
    propertyDetails: {
      propertyInfo: {
        houseType: "",
        houseConfig: "",
        area: "",
        mapLocation: "",
        purposeRent: false,
        purposeSale: false,
      },
      ownerInfo: {
        name: {
          first: "",
          last: "",
        },
        phoneNumber: "",
        panNumber: "",
        country: "",
        city: "",
      },
      featureInfo: {
        gatedSecurity: false,
        powerBackup: false,
        groceryStore: false,
        swimmingPool: false,
        gym: false,
        clubHouse: false,
        carpetArea: "",
        floors: {
          total: "",
          your: "",
        },
        parking: {
          car: "",
          bike: "",
          type: "",
        },
        houseHelpRoom: "",
        bathrooms: "",
        balconies: "",
        furnishingType: "",
        ac: false,
        nonVeg: false,
        constructionYear: "",
        availableFrom: "",
        rentAmount: 0,
        rentDeposit: 0,
        rentMaintenance: 0,
        lockInPeriod: 0,
        saleAmount: 0,
        saleDeposit: 0,
        saleMaintenance: 0,
        moveInFrom: 0,
      },
      verifyInfo: {
        liftLobby: false,
        entryDoor: false,
        homeEntry: false,
        livingRoom: false,
        tvArea: false,
        kitchen: false,
        utilityArea: false,
        backyard: false,
        commonWashroom: false,
        livingRoomBalcony: false,
        mainGate: false,
        clubHouse: false,
        groceryStore: false,
        swimmingPool: false,
        gym: false,
        parking: false,
        feature1: "",
        feature2: "",
        feature3: "",
      },
    },
  });

  // Define a JSON object with fields and their values
  const [featureData, setfeatureData] = useState({
    bed_one: false,
    bath_one: false,
    balcony: false,
    bedroom_two: false,
    bath_two: false,
    balcony_two: false,
    bedroom_three: false,
    bath_three: false,
    balcony_three: false,
    servant_room: false,
    servant_washroom: false,
    parking: false,
    // Add other fields and set their values as needed
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/property/${idProperty}`,
          axiosConfig
        );

        const responseData = response.data.data.property;
        // Create a copy of the existing formData
        const updatedFormData = { ...formData };
        // // Iterate over the keys in responseData
        // for (const key in responseData) {
        //   // Check if the key exists in updatedFormData
        //   if (updatedFormData.hasOwnProperty(key)) {
        //     // Update the corresponding field in updatedFormData
        //     updatedFormData[key] = responseData[key];
        //   }
        // }

        // Check if propertyDetails exists in responseData
        if (responseData.hasOwnProperty("propertyDetails")) {
          // Create a copy of the existing propertyDetails
          const updatedPropertyDetails = { ...updatedFormData.propertyDetails };

          // Iterate over the keys in responseData.propertyDetails
          for (const key in responseData.propertyDetails) {
            // Check if the key exists in updatedPropertyDetails
            if (updatedPropertyDetails.hasOwnProperty(key)) {
              // Update the corresponding field in updatedPropertyDetails
              updatedPropertyDetails[key] = responseData.propertyDetails[key];
            }
          }
          // Update top-level fields (houseName, societyName, pinCode)
          updatedFormData.houseName = responseData.houseName;
          updatedFormData.societyName = responseData.societyName;
          updatedFormData.pinCode = responseData.pinCode;

          // Update propertyDetails in updatedFormData
          updatedFormData.propertyDetails = updatedPropertyDetails;
        }

        // Update the state with the updatedFormData
        setFormData(updatedFormData);
        // console.log(JSON.stringify(formData));
        // Now, formData will contain the updated data

        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [idProperty]); // Add idProperty and formData as dependencies if

  // // This useEffect will log the updated state after it has been set.
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  //PUT
  const [isCheckRent, setisCheckRent] = useState(Boolean);
  const [isCheckSale, setisCheckSale] = useState(Boolean);

  const handleAddFeature = (event) => {
    const { name, value } = event.target;

    console.log(name, value);
    setFormData((prevState) => ({
      ...prevState,
      propertyDetails: {
        ...prevState.propertyDetails,
        verifyInfo: {
          ...prevState.propertyDetails.verifyInfo,
          [name]: value,
        },
      },
    }));
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prevState) => {
      if (name in prevState.propertyDetails.propertyInfo) {
        return {
          ...prevState,

          propertyDetails: {
            ...prevState.propertyDetails,
            propertyInfo: {
              ...prevState.propertyDetails.propertyInfo,
              [name]: value,
              [name]: type === "checkbox" ? checked : value,
            },
          },
        };
      } else if (name in prevState.propertyDetails) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            [name]: value,
          },
        };
      } else if (name in prevState.propertyDetails.featureInfo) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            featureInfo: {
              ...prevState.propertyDetails.featureInfo,
              [name]: value,
            },
          },
        };
      } else if (name in prevState.propertyDetails.featureInfo.floors) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            featureInfo: {
              ...prevState.propertyDetails.featureInfo,
              floors: {
                ...prevState.propertyDetails.featureInfo.floors,
                [name]: value,
              },
            },
          },
        };
      } else if (name in prevState.propertyDetails.featureInfo.parking) {
        return {
          ...prevState,
          propertyDetails: {
            ...prevState.propertyDetails,
            featureInfo: {
              ...prevState.propertyDetails.featureInfo,
              parking: {
                ...prevState.propertyDetails.featureInfo.parking,
                [name]: value,
              },
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

  // const [xToggle, setXToggle] = useState({
  //   xToggle: false,
  // });

  // const handleToggle = (btnId) => {
  //   // Toggle the state based on the button's ID
  //   setXToggle((prevState) => ({
  //     xToggle: btnId === 'specificButtonId' ? !prevState.xToggle : prevState.xToggle,
  //   }));
  // };

  // Create an object to store toggle states for different buttons
  const [buttonToggles, setButtonToggles] = useState({});

  const handleToggle = (btnId) => {
    // Update the toggle state for the button with the specified btnId
    setButtonToggles((prevState) => ({
      ...prevState,
      [btnId]: !prevState[btnId] || false,
    }));
  };

  const validatePincode = () => {
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(formData.pinCode)) {
      toast.error("Invalid Pincode");
      return false;
    }
    return true;
  };

  const handleChangeOne = (event) => {
    event.preventDefault();
    if (validatePincode()) {
      setCheckedStateOne((current) => !current);
      setCheckedStateTwo((current) => !current);
      console.log("Received from PrpertyInfo - 1s In state 1:", formData);
    }

    // formData.propertyData.propertyInfo.purposeRent
    //   ? setisCheckRent(true)
    //   : setisCheckRent(false);
    // formData.propertyInfo.houseType
    //   ? setisCheckSale(true)
    //   : setisCheckSale(false);
  };
  const handleChangeTwo = (event) => {
    event.preventDefault();
    console.log("CLICKED");

    // setCheckedStateOne((current) => !current);
    setCheckedStateTwo((current) => !current);
    setCheckedStateThree((current) => !current);
    console.log("Received from PrpertyInfo - 1s In state 2:", formData);
  };

  const validateStageThree = () => {
    // console.log(formData.propertyInfo.verifyInfo.entryDoor)
    if (!isHomeArranged) {
      toast.error("Please arrange all things");
      return false;
    }
    if (!formData.propertyDetails.verifyInfo.entryDoor) {
      toast.error("Please capture door photo");
      return false;
    }
    // if (formData.propertyDetails.verifyInfo.homeEntry == false) {
    //   toast.error("Please capture home entry photo");
    //   return false;
    // }
    if (formData.propertyDetails.verifyInfo.livingRoom == false) {
      toast.error("Please capture livingRoom photo");
      return false;
    }
    if (formData.propertyDetails.verifyInfo.kitchen == false) {
      toast.error("Please capture kitchen photo");
      return false;
    }
    // if (formData.propertyDetails.verifyInfo.commonWashroom == false) {
    //   toast.error("Please capture common washroom  photo");
    //   return false;
    // }
    return true;
  };

  const handleChangeThree = (event) => {
    event.preventDefault();
    if (validateStageThree()) {
      setCheckedStateThree((current) => !current);
      setCheckedStateFour((current) => !current);
      console.log("Received from PrpertyInfo - 1s In state 3:", formData);
    }
  };

  const validateStageFour = () => {
    if (!isBedroomArranged) {
      toast.error("please arrange bedrooms");
      return false;
    }
    if (
      (featureData.bed_one ||
        featureData.bedroom_two ||
        featureData.bedroom_three) == false
    ) {
      toast.error("please capture bedrooms photo");
      return false;
    }
    return true;
  };

  const handleChangeFour = (event) => {
    event.preventDefault();
    if (validateStageFour()) {
      setCheckedStateFour((current) => !current);
      setCheckedStateFive((current) => !current);
      console.log("Received from PrpertyInfo - 1s In state 4:", formData);
    }
  };
  const validateSubmit = () => {
    const isMainGate = formData.propertyDetails.verifyInfo.mainGate;
    if (isMainGate == false) {
      toast.error("Please Capture Main Gate Photo");
      return false;
    }
    return true;
  };
  //SUBMIT DATA
  const handleChangeSubmit = async (event) => {
    event.preventDefault();
    if (validateSubmit()) {
      console.log("Received from Final In state:", formData);

      // Extract feature1 and stringify it
      const feature1String = JSON.stringify(
        formData.propertyDetails.verifyInfo.feature1
      );

      // Create a copy of the formData and set the stringified feature1
      const updatedFormData = { ...formData };
      updatedFormData.propertyDetails.verifyInfo.feature1 = feature1String;
      console.log(feature1String);

      try {
        const response = await axios.put(
          `https://b8rliving.com/field-agent/verify/${idProperty}`,
          formData,
          axiosConfig
        );

        // setformData(response.data.data.property);
        // Assuming you have your response data stored in a variable called 'response'
        // const responseData = response.data.data.property;

        // Update the formData state with the response data
        // setFormData(responseData);
        // setFormDataNew(response.data.data.property);

        // Log the updated state
        console.log(response);
        toast.success(response.data.message);
        window.location.href = "/fieldAgentHomeN";
        // console.log(JSON.stringify(formData));
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching data:", error);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    }
  };

  useEffect(() => {
    console.log("scroll hits");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    console.log("scroll hits");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkedStateOne]);

  useEffect(() => {
    console.log("scroll hits");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkedStateTwo]);

  useEffect(() => {
    console.log("scroll hits");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkedStateThree]);

  useEffect(() => {
    console.log("scroll hits");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [checkedStateFour]);

  return (
    <>
      <ToastContainer
        className="my-[3rem] text-[1.1rem] font-bold"
        autoClose={1000}
        // hideProgressBar={true}
      />
      {checkedStateOne ? (
        <div
          className="form"
          style={{
            borderRadius: "16px",
            // marginTop: "10%",
            backgroundRepeat: "no-repeat",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          {/* <h2 style={{color:"#52796F"}}>Verification</h2> */}
          <CommonHeader title="Property Verification(1/2)" color="#52796F" />
          <h4
            style={{
              marginBottom: "-10px",
              fontSize: "25px",
              color: "#3B413D",
            }}
          >
            {formData.houseName}, {formData.societyName}
          </h4>

          <div
            className="containered"
            style={{
              padding: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div>
                <form
                  className="login-form inner-background"
                  onSubmit={handleChangeOne}
                >
                  <div className="">
                    <label
                      for="mapLocation"
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "300",
                        float: "left",
                      }}
                    >
                      Select Map Location{" "}
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="mapLocation"
                      name="mapLocation"
                      required
                      value={formData.propertyDetails.propertyInfo.mapLocation}
                      onChange={handleChange}
                      style={{
                        backgroundColor: "#F5F5F5",
                        padding: "10px",
                        borderRadius: "10pxpx",
                        border: "1px solid #52796F",
                      }}
                    />
                    <div className="px-[1rem]">
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
                        Property Type?{" "}
                        <span style={{ color: "red", fontSize: "1.5rem" }}>
                          *
                        </span>
                      </label>
                      <select
                        id="houseType"
                        name="houseType"
                        // value={formData.propertyData.propertyInfo.houseType}
                        onChange={handleChange}
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                        }}
                      >
                        <option
                          selected
                          value="{formData.propertyDetails.propertyInfo.houseType}"
                          disabled
                        >
                          {formData.propertyDetails.propertyInfo.houseType}
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
                    {/* house configuration */}
                    <div className="px-[1rem]">
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
                        <span style={{ color: "red", fontSize: "1.5rem" }}>
                          *
                        </span>
                      </label>
                      <select
                        id="houseConfig"
                        name="houseConfig"
                        // value={formData.data.property.propertyInfo.houseConfig}
                        onChange={handleChange}
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          border: "1px solid #52796F",
                        }}
                      >
                        <option
                          selected
                          value="{formData.propertyDetails.propertyInfo.houseConfig}"
                          disabled
                        >
                          {formData.propertyDetails.propertyInfo.houseConfig}
                        </option>

                        <option value="Studio">Studio</option>

                        <option value="1 BHK">1 BHK</option>

                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                      </select>
                    </div>

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
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      id="houseName"
                      required
                      value={formData.houseName}
                      onChange={handleChange}
                      name="houseName"
                      placeholder="Text Input (Do not Enter Block Number)"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
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
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </label>
                    <input
                      type=""
                      id="societyName"
                      required
                      value={formData.societyName}
                      onChange={handleChange}
                      name="societyName"
                      placeholder="for eg(Oceanus Triton or Sushant Estate)"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
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
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      id="pinCode"
                      name="pinCode"
                      required
                      value={formData.pinCode}
                      onChange={handleChange}
                      onWheel={(e) => e.target.blur()}
                      // onBlur={validatePincode}
                      placeholder="Pin code"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
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
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      id="area"
                      name="area"
                      required
                      value={formData.propertyDetails.propertyInfo.area}
                      // value={formData.propertyDetails.version}

                      onChange={handleChange}
                      placeholder="Area/Locality"
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #52796F",
                      }}
                    ></input>
                    <br></br>
                  </div>

                  {/* <div className="checkContainer">
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
                      Select Purpose:
                      <br />
                      (select both if property is open for sale as well as rent)
                    </label>
                    <br></br>
                    <div className="checkboxes">
                      <input
                        type="checkbox"
                        id="purposeRent"
                        name="purposeRent"
                        checked={
                          formData.propertyDetails.propertyInfo.purposeRent
                            ? true
                            : false
                        }
                        // value={formData.data.propertyData.propertyInfo.purposeRent}
                        style={{
                          width: "10px",
                          padding: "1%",
                          boxShadow: "none",
                          zoom: "2",
                          borderRadius: "0px",
                        }}
                        // checked={rentChecked}
                        onChange={handleChange}
                      />
                      <label for="purposeRent">For Rent</label>
                    </div>
                    <div className="checkboxes">
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
                        checked={
                          formData.propertyDetails.propertyInfo.purposeSale
                            ? true
                            : false
                        }
                        // value={formData.propertyData.propertyInfo.purposeSale}
                        // checked={saleChecked}
                        onChange={handleChange}
                      />
                      <label htmlFor="purposeSale">For Sale</label>
                    </div>
                  </div> */}
                  {/* <div style={{ marginTop: "-50px" }}> */}
                  {/* <Link to="/FieldAgentVerifyPropertyF"> */}
                  <div className="flex justify-center items-center py-[1rem]">
                    <CommonBtn
                      title="Save & Next"
                      margin="12%"
                      fontweight="bolder"
                    />
                  </div>
                </form>
              </div>
              <div></div>
            </div>
          </div>

          <div className="py-[1rem]">
            <Footer />
          </div>
        </div>
      ) : null}

      {checkedStateTwo ? (
        // FORM TWO
        <>
          <div
            className=""
            style={{
              borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <CommonHeader title="Property Verification(2/2)" color="#52796F" />
            <div className="flex justify-center items-center flex-col">
              <h4
                className="my-[1rem]"
                style={{
                  marginBottom: "-10px",
                  fontSize: "25px",
                  color: "#3B413D",
                }}
              >
                {formData.houseName}, {formData.societyName}
              </h4>
              <div style={{ padding: "1rem 0 0 0 " }}>
                <span style={{ color: "red", fontSize: "1rem" }}>
                  asterisk(*) are mandatory inputs
                </span>
              </div>
            </div>

            <div>
              <form className="" onSubmit={handleChangeTwo}>
                {/* societydetails */}
                <div className="px-[1rem]">
                  <div
                    className="p-[1rem]"
                    style={{
                      border: "1px solid #CFD3D2",
                      background:
                        "linear-gradient(180deg, rgba(232, 231, 231, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)  ",
                    }}
                  >
                    <p className="text-[1.3rem] font-bold text-[#3B413D]">
                      About the Society{" "}
                      <span style={{ color: "red", fontSize: "1.5rem" }}>
                        *
                      </span>
                    </p>
                    {/* grid */}
                    <div className="grid grid-cols-3 py-[1rem] gap-y-[2rem]">
                      <div className="flex justify-center items-center flex-col">
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
                            formData.propertyDetails.featureInfo.gatedSecurity
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  gatedSecurity:
                                    !prevState.propertyDetails.featureInfo
                                      .gatedSecurity,
                                },
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
                      <div className="flex justify-center items-center flex-col">
                        <MdPower className="text-[2rem]" />
                        <p className="font-semibold">24 x 7</p>
                        <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                          Power Back-Up
                        </p>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.powerBackup
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  powerBackup:
                                    !prevState.propertyDetails.featureInfo
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
                      <div className="flex justify-center items-center flex-col">
                        <FaCartShopping className="text-[2rem]" />
                        <p className="font-semibold">Grocery Store</p>
                        <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                          In Campus
                        </p>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.groceryStore
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  groceryStore:
                                    !prevState.propertyDetails.featureInfo
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
                      <div className="flex justify-center items-center flex-col">
                        <BiSwim className="text-[2rem]" />
                        <p className="font-semibold pb-[0.4rem]">
                          Swimming Pool
                        </p>
                        {/* <p className="text-[#52796F] text-[0.8rem]">Swimming Pool</p> */}
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.swimmingPool
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  swimmingPool:
                                    !prevState.propertyDetails.featureInfo
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
                      <div className="flex justify-center items-center flex-col">
                        <CgGym className="text-[2rem]" />
                        <p className="font-semibold pb-[0.4rem]">Gym</p>
                        <ReactSwitch
                          checked={formData.propertyDetails.featureInfo.gym}
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  gym: !prevState.propertyDetails.featureInfo
                                    .gym,
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
                      <div className="flex justify-center items-center flex-col">
                        <MdOutlineSportsHandball className="text-[2rem]" />
                        <p className="font-semibold pb-[0.4rem]">Club house</p>
                        <ReactSwitch
                          checked={
                            formData.propertyDetails.featureInfo.clubHouse
                          }
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  clubHouse:
                                    !prevState.propertyDetails.featureInfo
                                      .clubHouse,
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
                    <p className="text-[1.3rem] font-bold text-[#3B413D] py-[1rem]">
                      Apartment/House Details
                    </p>
                    {/* floor container */}
                    <div
                      className="shadow-md grid grid-cols-2 py-[1rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(207, 211, 210, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                      }}
                    >
                      <div className="flex justify-center items-center flex-col">
                        <HiMiniBuildingOffice className="text-[2rem] my-[0.5rem]" />
                        <p className="font-semibold">Floor Number</p>
                      </div>
                      <div className="">
                        <div className="py-[0.5rem] flex flex-col">
                          <label>
                            Your Floor{" "}
                            <span style={{ color: "red", fontSize: "1.5rem" }}>
                              *
                            </span>
                          </label>
                          <input
                            className="p-[0.2rem]"
                            type="number"
                            id="your"
                            value={
                              formData.propertyDetails.featureInfo.floors.your
                            }
                            onChange={handleChange}
                            name="your"
                            max={formData.propertyDetails.featureInfo.floors.total.toString()}
                            required
                            onWheel={(e) => e.target.blur()}
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
                        <div className="py-[0.5rem] flex flex-col">
                          <label>
                            Total Floor{" "}
                            <span style={{ color: "red", fontSize: "1.5rem" }}>
                              *
                            </span>
                          </label>
                          <input
                            className="p-[0.2rem]"
                            type="number"
                            id="total"
                            value={
                              formData.propertyDetails.featureInfo.floors.total
                            }
                            onChange={handleChange}
                            name="total"
                            placeholder="number*"
                            onWheel={(e) => e.target.blur()}
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
                            id="parking"
                            name="parking"
                            value={
                              formData.propertyDetails.featureInfo.parking.car
                            }
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
                            <option
                              value={
                                formData.propertyDetails.featureInfo.parking.car
                              }
                              selected
                              disabled
                            >
                              {formData.propertyDetails.featureInfo.parking.car !== ""? formData.propertyDetails.featureInfo.parking.car: "No Car Parking"}
                            </option>
                            <option
                              style={
                                {
                                  // textAlign: "center",
                                  // backgroundColor: "red",
                                }
                              }
                              value="1 Car"
                            >
                              1 Car
                            </option>
                            <option value="2 Cars">2 Car</option>
                          <option value="3 Cars">3 Car</option>
                          <option value="">No Car Parking</option>
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
                            id="parking"
                            name="parking"
                            value={formData.parking}
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
                            <option
                              value={
                                formData.propertyDetails.featureInfo.parking
                                  .bike
                              }
                              selected
                              disabled
                            >
                              {formData.propertyDetails.featureInfo.parking
                                  .bike !== ""?
                                formData.propertyDetails.featureInfo.parking
                                  .bike :
                                  "No Bike Parking"
                              }
                            </option>

                            <option
                              style={
                                {
                                  // textAlign: "center",
                                  // backgroundColor: "red",
                                }
                              }
                              value="1 Bike"
                            >
                              1 Bike
                            </option>
                            <option value="2 Bikes">
                              2 Bikes
                            </option>
                            <option value="Included with Car">
                              Included with Car
                            </option>
                            <option value="">
                              No Bike Parking
                            </option>
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
                            id="parking"
                            name="parking"
                            value={formData.parking}
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
                            <option
                              value={
                                formData.propertyDetails.featureInfo.parking
                                  .type
                              }
                              selected
                              disabled
                            >
                              {
                                formData.propertyDetails.featureInfo.parking
                                  .type
                              }
                            </option>

                            <option
                              style={
                                {
                                  // textAlign: "center",
                                  // backgroundColor: "red",
                                }
                              }
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
                          id="numofbath"
                          name="bathrooms"
                          value={formData.bathrooms}
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
                          <option
                            value={
                              formData.propertyDetails.featureInfo.bathrooms
                            }
                            selected
                            disabled
                          >
                            {formData.propertyDetails.featureInfo.bathrooms}
                          </option>

                          <option
                            style={
                              {
                                // textAlign: "center",
                                // backgroundColor: "red",
                              }
                            }
                            value="1"
                          >
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
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
                          value={formData.propertyDetails.featureInfo.balconies}
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
                          <option
                            value={
                              formData.propertyDetails.featureInfo.balconies
                            }
                            selected
                            disabled
                          >
                            {formData.propertyDetails.featureInfo.balconies}
                          </option>
                          {/* <option value="furnish">Drop Down</option> */}
                          <option
                            style={
                              {
                                // textAlign: "center",
                                // backgroundColor: "red",
                              }
                            }
                            value="1"
                          >
                            1
                          </option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
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
                            value={formData.houseHelpRoom}
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
                            <option
                              value={
                                formData.propertyDetails.featureInfo
                                  .houseHelpRoom
                              }
                              selected
                              disabled
                            >
                              {
                                formData.propertyDetails.featureInfo
                                  .houseHelpRoom
                              }
                            </option>

                            <option
                              style={
                                {
                                  // textAlign: "center",
                                  // backgroundColor: "red",
                                }
                              }
                              value="1 Room"
                            >
                              1 Room
                            </option>

                            <option value=" 1 Room + Bathroom">
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
                            // value={formData.propertyDetails.featureInfo.furnishingType}
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
                            <option
                              value={
                                formData.propertyDetails.featureInfo
                                  .furnishingType
                              }
                              selected
                              disabled
                            >
                              {
                                formData.propertyDetails.featureInfo
                                  .furnishingType
                              }
                            </option>

                            <option
                              style={
                                {
                                  // textAlign: "center",
                                  // backgroundColor: "red",
                                }
                              }
                              value="Un-furnished"
                            >
                              Un-furnished
                            </option>
                            <option value="Semi-furnished">
                              Semi-Furnished
                            </option>
                            <option value="Full-furnished">
                              Full-Furnished
                            </option>
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
                          checked={formData.propertyDetails.featureInfo.ac}
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  ac: !prevState.propertyDetails.featureInfo.ac,
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
                          checked={formData.propertyDetails.featureInfo.nonVeg}
                          onChange={() =>
                            setFormData((prevState) => ({
                              ...prevState,
                              propertyDetails: {
                                ...prevState.propertyDetails,
                                featureInfo: {
                                  ...prevState.propertyDetails.featureInfo,
                                  nonVeg:
                                    !prevState.propertyDetails.featureInfo
                                      .nonVeg,
                                },
                              },
                            }))
                          }
                          onColor="#DAF0EE"
                          onHandleColor="#fff"
                          handleDiameter={20}
                          uncheckedIcon={
                            <span
                              style={{
                                color: "#black",
                                fontSize: "15px",
                                marginTop: "10px",
                              }}
                            ></span>
                          }
                          checkedIcon={false}
                          boxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                          activeBoxShadow="0 1px 2px rgba(0, 0, 0, 0.2)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* back and submit btn */}
                <div className="flex justify-center items-center py-[1rem]">
                  {/* <BackButton title="Back" margin="" fontweight="bolder" /> */}
                  <CommonBtn
                    title="Submit & Photos Capture"
                    margin="38%"
                    fontweight="bolder"
                  />
                </div>
              </form>
            </div>
            <Footer />
          </div>
        </>
      ) : null}

      {checkedStateThree ? (
        <>
          <div
            className=""
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <form className="" onSubmit={handleChangeThree}>
              {/* <h2 style={{color:"#52796F"}}>Photo Capture</h2> */}
              <CommonHeader title="Photo Capture(1/3)" color="#52796F" />
              <div className="text-[1.3rem] text-left px-[1rem] py-[0.5rem]">
                <p className="py-[0.5rem]">
                  Please make sure to capture all the places inside the House as
                  well as the Society
                </p>
                <p className="py-[0.5rem]"> Make sure following is set-up</p>
                <p>
                  1. Keep all the <b>windows open</b>
                  <br />
                  2. Make sure the <b>curtains are wide open</b>
                  <br />
                  3. The <b>house is clean, tidy & well arranged</b>
                  <br />
                  4. Shoes & Footwear is locked inside
                  <br />
                  5. Bedsheets are well laid out and no open blankets
                  <br />
                  6. Pillow are well set
                  <br />
                  7. No random things on floor <br />
                </p>
              </div>
              {/* <CommonBtn
                title="Yes all the things are arranged"
                margin="20px"
              /> */}
              <div
                className=""
                style={{
                  display: "flex",
                  padding: "1rem",
                  justifyContent: "center",
                  backgroundColor: "#52796f",
                  margin: "1rem",
                  marginTop: "2rem",
                  alignItems: "center",
                  borderRadius: "0.8rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <input
                    type="checkbox"
                    style={{
                      zoom: 2,
                      margin: "0.1rem 0 0 0 ",
                    }}
                    checked={isHomeArranged}
                    onChange={() => {
                      setisHomeArranged(!isHomeArranged);
                    }}
                  />
                </div>
                <span
                  style={{
                    marginLeft: "1rem",
                    fontSize: "1.2rem",
                    color: "white",
                  }}
                >
                  Yes all the things are arranged
                </span>
              </div>
              {/* <h3 style={{ textAlign: "left", marginTop: "80px" }}>
                  <u>Basic Home Photos</u>
                </h3> */}
              <div className="text-[1.3rem] px-[1rem] text-left">
                <p>
                  Select <b>Yes</b> after clicking and checking the photo on the
                  Camera.
                </p>
                <p>
                  If it is not relevant or the space does not exist, select no
                </p>
              </div>
              {/* <p style={{ color: "red", fontSize: "0.9rem" }}>
                    asterisk(*) are mandatory photos
                  </p> */}
              {/* BODY */}
              {/* basic home photo checklist */}
              <div className="px-[1rem] py-[1rem]">
                {/* BasicHome text */}
                <p className="text-[1.3rem] font-semibold py-[0.2rem]">
                  <u>Basic Home Photos</u>
                </p>
                <div
                  className="p-[1rem] py-[2rem] grid grid-cols-4 gap-y-[2rem] shadow-md"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(218, 240, 238, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                  }}
                >
                  <div className="flex items-center flex-col">
                    <GiLift className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Lift Lobby
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.liftLobby}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              liftLobby:
                                !formData.propertyDetails.verifyInfo.liftLobby,
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
                  <div className="flex items-center flex-col text-[#AA223C]">
                    <FaDoorOpen className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Entry Door
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.entryDoor}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              entryDoor:
                                !formData.propertyDetails.verifyInfo.entryDoor,
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
                  {/* <div className="flex items-center flex-col text-[#AA223C]">
                    <GiCryptEntrance className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Home Entry
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.homeEntry}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              homeEntry:
                                !formData.propertyDetails.verifyInfo.homeEntry,
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
                  </div> */}
                  <div className="flex items-center flex-col text-[#AA223C]">
                    <MdLiving className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Living Room
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.livingRoom}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              livingRoom:
                                !formData.propertyDetails.verifyInfo.livingRoom,
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
                  <div className="flex items-center flex-col">
                    <PiTelevisionSimpleBold className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      TV Area
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.tvArea}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              tvArea:
                                !formData.propertyDetails.verifyInfo.tvArea,
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
                  <div className="flex items-center flex-col text-[#AA223C]">
                    <TbToolsKitchen3 className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Kitchen
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.kitchen}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              kitchen:
                                !formData.propertyDetails.verifyInfo.kitchen,
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
                  <div className="flex items-center flex-col">
                    <BiSolidHomeHeart className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Utility Area
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.utilityArea}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              utilityArea:
                                !formData.propertyDetails.verifyInfo
                                  .utilityArea,
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
                  <div className="flex items-center flex-col">
                    <GiWoodenFence className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Backyard
                    </p>
                    <ReactSwitch
                      checked={formData.propertyDetails.verifyInfo.backyard}
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              backyard:
                                !formData.propertyDetails.verifyInfo.backyard,
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
                  <div className="flex items-center flex-col text-[#AA223C]">
                    <PiToiletDuotone className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Common Washroom
                    </p>
                    <ReactSwitch
                      checked={
                        formData.propertyDetails.verifyInfo.commonWashroom
                      }
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              commonWashroom:
                                !formData.propertyDetails.verifyInfo
                                  .commonWashroom,
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
                  <div className="flex items-center flex-col">
                    <MdBalcony className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Living Room Balcony
                    </p>
                    <ReactSwitch
                      checked={
                        formData.propertyDetails.verifyInfo.livingRoomBalcony
                      }
                      onChange={() =>
                        setFormData((prevState) => ({
                          ...prevState,
                          propertyDetails: {
                            ...prevState.propertyDetails,
                            verifyInfo: {
                              ...prevState.propertyDetails.verifyInfo,
                              livingRoomBalcony:
                                !formData.propertyDetails.verifyInfo
                                  .livingRoomBalcony,
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
                </div>
                <p className="text-[1.3rem] text-center text-[#AA223C] font-bold">
                  <u>***Red onces are mandatory photos***</u>
                </p>
              </div>
              <div className="flex justify-center items-center py-[1rem]">
                <CommonBtn title="Click Bedroom Photos" margin="18%" />
              </div>
            </form>
            <Footer />
            <div className="mb-[1rem]" />
          </div>
        </>
      ) : null}

      {checkedStateFour ? (
        <>
          <div
            className=""
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            <form className="" onSubmit={handleChangeFour}>
              <CommonHeader title="Photo Capture(2/3)" color="#52796F" />

              <div className="text-left px-[1rem] py-[1rem] text-[1.3rem]">
                <text>
                  Bedroom Photos Checklist
                  <br />
                  <div style={{ marginTop: "20px" }}></div>
                  1. Keep all the <b> windows open</b>
                  <br />
                  2. Make sure the <b>curtains are wide open</b>
                  <br />
                  3. Bedsheets are well laid out and no open blankets
                  <br />
                  4. Pillow are well set
                  <br />
                  5. No random things on floor
                  <div
                    className=""
                    style={{
                      display: "flex",
                      padding: "1rem",
                      justifyContent: "center",
                      backgroundColor: "#52796f",
                      margin: "1rem",
                      marginTop: "2rem",
                      alignItems: "center",
                      borderRadius: "0.8rem",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "transparent",
                      }}
                    >
                      <input
                        type="checkbox"
                        style={{
                          zoom: 2,
                          margin: "0.1rem 0 0 0 ",
                        }}
                        checked={isBedroomArranged}
                        onChange={() => {
                          setisBedroomArranged(!isBedroomArranged);
                        }}
                      />
                    </div>
                    <span
                      style={{
                        marginLeft: "1rem",
                        fontSize: "1.2rem",
                        color: "white",
                      }}
                    >
                      Yes all the things are arranged
                    </span>
                  </div>
                </text>
              </div>
              <div className="px-[1rem] py-[1rem]">
                {/* bedroom text */}
                <p className="text-[1.3rem] font-semibold py-[0.2rem]">
                  <u>Bedroom & Other Details</u>
                </p>
                <div
                  className="p-[1rem] py-[2rem] grid grid-cols-3 gap-y-[2rem] shadow-md"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(218, 240, 238, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)",
                  }}
                >
                  <div className="flex items-center flex-col text-[#AA223C]">
                    <IoBed className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Bedroom 1
                    </p>
                    <ReactSwitch
                      checked={featureData.bed_one}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bed_one: !featureData.bed_one,
                        })
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
                  <div className="flex items-center flex-col">
                    <PiToiletDuotone className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Attached Bath 1
                    </p>
                    <ReactSwitch
                      checked={featureData.bath_one}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bath_one: !featureData.bath_one,
                        })
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
                  <div className="flex items-center flex-col">
                    <MdBalcony className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Balcony 1
                    </p>
                    <ReactSwitch
                      checked={featureData.balcony}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          balcony: !featureData.balcony,
                        })
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
                  <div className="flex items-center flex-col">
                    <IoBed className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Bedroom 2
                    </p>
                    <ReactSwitch
                      checked={featureData.bedroom_two}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bedroom_two: !featureData.bedroom_two,
                        })
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
                  <div className="flex items-center flex-col">
                    <PiToiletDuotone className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Attached Bath 2
                    </p>
                    <ReactSwitch
                      checked={featureData.bath_two}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bath_two: !featureData.bath_two,
                        })
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
                  <div className="flex items-center flex-col">
                    <MdBalcony className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Balcony 2
                    </p>
                    <ReactSwitch
                      checked={featureData.balcony_two}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          balcony_two: !featureData.balcony_two,
                        })
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
                  <div className="flex items-center flex-col">
                    <IoBed className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Bedroom 3
                    </p>
                    <ReactSwitch
                      checked={featureData.bedroom_three}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bedroom_three: !featureData.bedroom_three,
                        })
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
                  <div className="flex items-center flex-col">
                    <PiToiletDuotone className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Attached Bath 3
                    </p>
                    <ReactSwitch
                      checked={featureData.bath_three}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          bath_three: !featureData.bath_three,
                        })
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
                  <div className="flex items-center flex-col">
                    <MdBalcony className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Balcony 3
                    </p>
                    <ReactSwitch
                      checked={featureData.balcony_three}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          balcony_three: !featureData.balcony_three,
                        })
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
                  <div className="flex items-center flex-col">
                    <MdOutlineCleaningServices className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Servant Room
                    </p>
                    <ReactSwitch
                      checked={featureData.servant_room}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          servant_room: !featureData.servant_room,
                        })
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
                  <div className="flex items-center flex-col">
                    <PiToiletDuotone className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Servant Washroom
                    </p>
                    <ReactSwitch
                      checked={featureData.servant_washroom}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          servant_washroom: !featureData.servant_washroom,
                        })
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
                  <div className="flex items-center flex-col">
                    <RiParkingBoxFill className="text-[2rem]" />
                    <p className="text-[0.9rem] font-semibold py-[0.2rem] text-center">
                      Parking
                    </p>
                    <ReactSwitch
                      checked={featureData.parking}
                      onChange={() =>
                        setfeatureData({
                          ...featureData,
                          parking: !featureData.parking,
                        })
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
                <p className="text-[1.3rem] text-center text-[#AA223C] font-bold">
                  <u>***Red onces are mandatory photos***</u>
                </p>
              </div>
              {/* -----------------------------society related pressure-------------------------------------- */}

              <div className="flex justify-center items-center py-[1rem]">
                {/* <BackButton title="Back" margin="" fontweight="bolder" /> */}
                <CommonBtn
                  title="Click Society Photos"
                  margin="38%"
                  fontweight="bolder"
                />
              </div>
            </form>
            <Footer />
            <div className="mb-[1rem]" />
          </div>
        </>
      ) : null}

      {checkedStateFive ? (
        <>
          <div
            className=""
            style={{
              // borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {/* <h2 style={{ color: "#52796F" }}>Photo Capture</h2> */}
            <CommonHeader title="Photo Capture(3/3)" color="#52796F" />
            <form className="" onSubmit={handleChangeSubmit}>
              <div className="text-left py-[1rem] px-[1rem] text-[1.3rem]">
                <text>
                  Society Photos Checklist
                  <br />
                  <div style={{ marginTop: "20px" }}></div>
                  1. Below are mandatory pictures
                  <br />
                  2. If there are more places in the society relevant to the
                  tenant, please click all pictures.
                  <br />
                </text>
              </div>

              {/* -----------------------------society related pictures-------------------------------------- */}
              <div className="p-[1rem]">
                <p className="text-[1.3rem] font-semibold py-[0.2rem]">
                  <u>Society Related Pictures</u>
                </p>
                <div
                  className="p-[1rem]"
                  style={{
                    border: "1px solid #CFD3D2",
                    background:
                      "linear-gradient(180deg, rgba(232, 231, 231, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)  ",
                  }}
                >
                  {/* grid */}
                  <div className="grid grid-cols-3 py-[1rem] gap-y-[2rem]">
                    <div className="flex justify-center items-center flex-col">
                      <GiGate className="text-[2rem] text-[#AA223C]" />
                      <p className="font-semibold pb-[0.4rem] text-[#AA223C] text-center">
                        Main Gate
                      </p>
                      {/* <p
                        className="text-[#52796F] text-[0.8rem] pb-[0.4rem]
                  "
                      >
                        always secure
                      </p> */}
                      <ReactSwitch
                        checked={formData.propertyDetails.verifyInfo.mainGate}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyDetails: {
                              ...prevState.propertyDetails,
                              verifyInfo: {
                                ...prevState.propertyDetails.verifyInfo,
                                mainGate:
                                  !formData.propertyDetails.verifyInfo
                                    .gated_security,
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
                    {/* <div className="flex justify-center items-center flex-col">
                      <MdPower className="text-[2rem]" />
                      <p className="font-semibold">24 x 7</p>
                      <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                        Power Back-Up
                      </p>
                      <ReactSwitch
                        checked={
                          formData.propertyDetails.featureInfo.powerBackup
                        }
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyDetails: {
                              ...prevState.propertyDetails,
                              featureInfo: {
                                ...prevState.propertyDetails.featureInfo,
                                powerBackup:
                                  !prevState.propertyDetails.featureInfo
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
                    </div> */}
                    <div className="flex justify-center items-center flex-col">
                      <MdOutlineSportsHandball className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem] text-center">
                        Club house
                      </p>
                      <ReactSwitch
                        checked={formData.propertyDetails.verifyInfo.clubHouse}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyDetails: {
                              ...prevState.propertyDetails,
                              verifyInfo: {
                                ...prevState.propertyDetails.verifyInfo,
                                clubHouse:
                                  !formData.propertyDetails.verifyInfo
                                    .clubHouse,
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
                    <div className="flex justify-center items-center flex-col">
                      <FaCartShopping className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem] text-center">
                        Grocery Store
                      </p>
                      {/* <p className="text-[#52796F] text-[0.8rem] pb-[0.4rem]">
                        In Campus
                      </p> */}
                      <ReactSwitch
                        checked={
                          formData.propertyDetails.verifyInfo.groceryStore
                        }
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyDetails: {
                              ...prevState.propertyDetails,
                              verifyInfo: {
                                ...prevState.propertyDetails.verifyInfo,
                                groceryStore:
                                  !formData.propertyDetails.verifyInfo
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
                    <div className="flex justify-center items-center flex-col">
                      <BiSwim className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem] text-center">
                        Swimming Pool
                      </p>
                      {/* <p className="text-[#52796F] text-[0.8rem]">Swimming Pool</p> */}
                      <ReactSwitch
                        checked={
                          formData.propertyDetails.verifyInfo.swimmingPool
                        }
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyDetails: {
                              ...prevState.propertyDetails,
                              verifyInfo: {
                                ...prevState.propertyDetails.verifyInfo,
                                swimmingPool:
                                  !formData.propertyDetails.verifyInfo
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
                    <div className="flex justify-center items-center flex-col">
                      <CgGym className="text-[2rem]" />
                      <p className="font-semibold pb-[0.4rem] text-center">
                        Gym
                      </p>
                      <ReactSwitch
                        checked={formData.propertyDetails.verifyInfo.gym}
                        onChange={() =>
                          setFormData((prevState) => ({
                            ...prevState,
                            propertyDetails: {
                              ...prevState.propertyDetails,
                              verifyInfo: {
                                ...prevState.propertyDetails.verifyInfo,
                                gym: !formData.propertyDetails.verifyInfo.gym,
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
              </div>

              {/* -----------------------------------------------Add Features---------------------------------------------- */}
              <div className="p-[1rem]">
                <p className="text-[1.3rem] font-semibold py-[0.2rem]">
                  <u>Add other places for which you have clicked photos</u>
                </p>
                <div
                  className="p-[1rem]"
                  style={{
                    border: "1px solid #CFD3D2",
                    background:
                      "linear-gradient(180deg, rgba(232, 231, 231, 0.50) 0%, rgba(232, 231, 231, 0.00) 100%)  ",
                  }}
                >
                  <p className="text-[#5D6560] font-bold">Add Features</p>
                  {/* features container */}
                  <div className="flex justify-center items-center flex-col">
                    {/* feature1 */}
                    <input
                      type="text"
                      placeholder="**feature1"
                      id="feature1"
                      required
                      name="feature1"
                      value={formData.propertyDetails.verifyInfo.feature1}
                      onChange={handleAddFeature}
                    />
                    {/* feature2 */}
                    <input
                      type="text"
                      placeholder="**feature2"
                      id="feature2"
                      required
                      name="feature2"
                      value={formData.propertyDetails.verifyInfo.feature2}
                      onChange={handleAddFeature}
                    />
                    {/* feature3 */}
                    <input
                      type="text"
                      placeholder="**feature3"
                      required
                      id="feature3"
                      name="feature3"
                      value={formData.propertyDetails.verifyInfo.feature3}
                      onChange={handleAddFeature}
                    />
                  </div>
                </div>
                <p className="text-[1.3rem] text-center text-[#AA223C] font-bold">
                  <u>***Type "None" If no feature***</u>
                </p>
              </div>
              {/* <div class="buttonBackNext">
		                <button className="CommonnBackButton" style={{ fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
		                <button className="CommonnButton" style={{ fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "40%" }}>Submit<img className="vectorSignIn" src={vector} alt="fireSpot" style={{ float: "right", marginRight: "-5%",marginTop:"-25px" }}/></button>
		                </div> */}
              {/* BODY */}

              <div className="flex justify-center items-center py-[1rem]">
                {/* <BackButton title="Back" margin="" fontweight="bolder" /> */}
                <CommonBtn title="Submit" margin="38%" fontweight="bolder" />
              </div>
            </form>
            <Footer />
            <div className="mb-[1rem]" />
          </div>
        </>
      ) : null}

      {/* <div style={{ marginTop: "200px" }}>
            <Footer />
          </div> */}
    </>
  );
}
export default FieldAgentVerifyProperty;
