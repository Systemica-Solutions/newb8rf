import React, { Component, useState, useEffect } from "react";
// import Signp from "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import bgm from "../Assets/Images/BuyerAdditionFlow/BuyerBg.png";
import key_1 from "../PropertyAdditionPageIcons/key_1/24.png";
import "./BuyerDesign.css";

import Footer from "../Footer";
import CommonBtn from "../CommonButton";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";
import { useNavigate } from "react-router-dom";
import { MdVpnKey } from "react-icons/md";

function AddBuyer() {
  const [checkedStateOne, setCheckedStateOne] = useState(true);

  const [formData, setFormData] = useState({
    phoneNumber: "",
    buyerData: {
      name: "",
      email: "",
      panNumber: "",
      houseConfiguration: "",
      houseType: "",
      furnishingType: "",
      preferredLocation: "",
      moveIn: "",
      budget: "",
    },
  });

  const [formError, setFormError] = useState({
    email: "",
    phoneNumber: "",
  });

  const handleChangeOne = () => {
    setCheckedStateOne((current) => !current);
  };

  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };
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
      Authorization: `Basic ${token}`,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    const Jdata = JSON.stringify(formData, null, 2);
    console.log("JSON VARIABLE", Jdata);

    //Validation
    let inputError = {
      email: "",
      phoneNumber: "",
    };

    axios
      .post("https://b8rliving.com/buyer", formData, axiosConfig)
      .then((response) => {
        alert("Your Buyer details has been submitted");
        //redirect user to Dashboard
        window.location.href = `/BuyerCreated?name=${formData.buyerData.name}&budget=${formData.buyerData.budget}`;
        // do something with the response
      })
      .catch((error) => {
        console.log(error);
        // handle the error
      });
    console.log("Finale In state:", formData);
    alert("Buyer Added!");
  };

  return (
    <>
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
              <CommonHeader title="Add Buyer" color="#1E0058" />

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
                <label htmlFor="panNumber" className="fieldTitle">
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
                />

                <div className="flex justify-center items-center py-[1rem]">
                  {/* <div onClick={handleClick}>
                    <BackButton title="Back" margin="" fontweight="bolder" />
                  </div> */}
                  <CommonBtn
                    title="Submit"
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
            <CommonHeader title="Buyer Details" color="#1E0058" />

            <form className="login-form pt-[2rem]" onSubmit={handleSubmit}>
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
                <option value=" ">Select from Drop Down</option>
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
                <option value=" ">Type of Furnishing</option>
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
                <option value="Selectfromdropdown">
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
                <CommonBtn
                  title="Save & Next"
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
      )}
      ;
    </>
  );
}
export default AddBuyer;
