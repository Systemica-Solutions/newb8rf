import React, { Component, useState, useEffect } from "react";
// import FronLogin from "./FrontLogin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
// import vector from "../../../Assets/Images/RegisterLoginUser/vector.png";
import logo from "../Assets/Images/Logo.png";

import CommonBtn from "../CommonButton";

function AuthCode() {

  const today = new Date().toISOString().substring(0, 10); //set today's date
  //States
  const [formData, setFormData] = useState({
    entity: "",
    code: "",
    codeType: "",
    startTime: today, //set the default start date to today
  });
  const [data, setData] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Auth Hit");
    axios
      .post("https://b8rliving.com/agent/authcode", formData)
      .then((response) => {
        console.log(response.data);
        // setData(response.data);

        // alert(response.data.data.jwtToken);
        // alert(response.data.data.user.name);
        console.log(response.data.data);

        // const token = response.data.data.jwtToken;
        // const name = response.data.data.user.name;
        // const phone = response.data.data.user.phone;

        //set JWT token to local
        // localStorage.setItem("token", token);
        // localStorage.setItem("username", name);
        // localStorage.setItem("phone", phone);

        //set token to axios common header
        //  setAuthToken(token);

        alert("New Invitation Code Has Been Created");
        //redirect user to Dashboard
        // window.location.href = "/SignUp";
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.message;
          if (errorMessage.includes("E11000 duplicate key")) {
            alert("Entity Code already exists");
          } else {
            alert(error);
          }
        }
        // alert(error.response.data.message);
        // handle the error
      });
  };

 

  return (
    <>
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
          <div className="MainLogoDesign">
            <Link to="/dashboard">
              <img src={logo} height={40} alt="fireSpot" />
            </Link>
          </div>
          <h3 className="Htitle">Invitation Code</h3>

          <form onSubmit={handleSubmit} className="login-form">
            {/* Entity */}
            <label htmlFor="entity" className="label-phone">
              Entity
            </label>
            <input
              type="text"
              id="entity"
              value={formData.entity}
              onChange={handleChange}
              name="entity"
              className="input-field"
              required
            />

            {/* Code */}
            <label htmlFor="code" className="label-password">
              Code
            </label>
            <input
              type="text"
              id="code"
              value={formData.code}
              onChange={handleChange}
              name="code"
              className="input-field"
              required
            ></input>

<label htmlFor="code" className="label-password">
              Code Type
            </label>
            <input
              type="text"
              id="codeType"
              value={formData.codeType}
              onChange={handleChange}
              name="codeType"
              className="input-field"
              required
            ></input>

<label htmlFor="code" className="label-password">
              Start Time
            </label>
            <input
              type="date"
              id="startTime"
              value={formData.startTime}
              defaultValue={today}
              onChange={handleChange}
              name="startTime"
              className="input-field"
              required
            ></input>

              <CommonBtn title="Add" margin="25%" fontweight="bolder" />

            <Footer />
          </form>
          <br />
        </div>
      </div>
    </>
  );
}
export default AuthCode;
