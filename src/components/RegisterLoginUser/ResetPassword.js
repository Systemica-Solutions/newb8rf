import React, { Component, useState, useEffect } from "react";
import ResetPasswordcss from "./ResetPassword.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
import vector from "../Assets/Images/RegisterLoginUser/vector.png";
import UserLoginDetails from "../UserLoginDetails";
import logo from "../Assets/Images/Logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CommonBtn from "../CommonButton";
// import commonBtn from "../commonBtn";

function ResetPassword() {
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState({
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const phone = formData["phone"];

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData["phone"]);
    const phone = formData["phone"];
    // console.log(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`);
    try {
      axios
        .get(
          `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          // do something with the response
          // const token = response.data.token;

          const OTP_SESSION = response.data.Details;

          // //set JWT token to local
          // localStorage.setItem("token", token);
          // localStorage.setItem("username", username);

          //set token to axios common header
          //  setAuthToken(token);

          toast.success("OTP has been send!");
          //redirect user to Dashboard
          window.location.href = `/EnterOTP?sessionId=${OTP_SESSION}&phone=${phone}`;
        })
        .catch((error) => {
          console.log(error);
          // handle the error
        });
    } catch (error) {
      console.log("ASYNC ERROR:".error);
    }
  };

  return (
    <>
      <ToastContainer
        className="my-[3rem] text-[1.1rem] font-bold"
        autoClose={1000}
        // hideProgressBar={true}
      />
      {/* <div className="login-page"> */}
      {/* <div className="form"  style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${backgroundSecond})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%', width: "100%" }} > */}
      <div className="login-page">
        <div
          class="form"
          style={{
            borderRadius: "16px",
            backgroundRepeat: "no-repeat",
            backgroundImage: `url(${backgroundSecond})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
            width: "100%",
          }}
        >
          <div className="w-[20vw] m-[0.5rem]">
            <Link to="/dashboard">
              <img src={logo} height={40} alt="fireSpot" />
            </Link>
          </div>
          <div className="font-bold text-[1.3rem] py-[1rem] text-[#52796F]">
            {" "}
            Reset Password Link
          </div>
          {/* <UserLoginDetails /> */}

          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="phone" className="label-phone">
              Enter Phone Number
            </label>
            <input
              type="number"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              name="phone"
              required
            />
            {/* <button className="CommonnButton button-reset-password">
        Send Password Reset Link
        <img className="vectorResetPassword" src={vector} alt="fireSpot" />
      </button> */}

            {/* <div className="w-50"> */}
            <div className="flex justify-center items-center py-[1.5rem]">
              <CommonBtn
                title="Send Password Reset Link"
                margin="7%"
                fontweight="bolder"
              />
            </div>
            {/* </div> */}
            {/* <div className="mt-[20rem]" /> */}
            <Footer />
          </form>
          <br />
        </div>
      </div>
    </>
  );
}
export default ResetPassword;
