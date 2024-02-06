import React, { Component, useState, useEffect } from "react";
import FronLogin from "./FrontLogin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
import vector from "../Assets/Images/RegisterLoginUser/vector.png";
import logo from "../Assets/Images/Logo.png";
import CommonBtn from "../CommonButton";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import Modal from "react-modal";

function FrontLogin() {
  //States
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "2px solid #9DB5B2",
      borderRadius: "0.5rem",
    },
  };

  // Modal.setAppElement("#yourAppElement");

  let subtitle;

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const validateEmail = () => {
  //   if (emailRegex.test(formData.email)) {
  //     // alert('Valid email address');
  //   } else {
  //     alert("Invalid email address");
  //   }
  // };

  const handleChange = (event) => {
    console.log("in handle submit start")
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    // alert("SignIn Hit");
    event.preventDefault();
    axios
      .post("https://b8rliving.com/agent/signin", formData)
      .then((response) => {
        // console.log(response.data);
        // setData(response.data);

        // alert(response.data.data.jwtToken);
        // alert(response.data.data.user.name);
        // console.log(response.data.data);

        const token = response.data.data.jwtToken;
        const name = response.data.data.agent.name;
        const phone = response.data.data.agent.phone;
        const inviteCode = response.data.data.agent.inviteCode;
        console.log(inviteCode.substring(0, 2));
        const usertype = inviteCode.substring(0, 2);

        //set JWT token to local
        // if (typeof localStorage !== 'undefined') {
        // localStorage is available
        // Your code using localStorage goes here
        localStorage.setItem("token", token);
        localStorage.setItem("username", name);
        localStorage.setItem("phone", phone);
        localStorage.setItem("usertype", usertype);
        // } else {
        //   // localStorage is not available or disabled
        //   // Handle this situation gracefully
        //    alert("Localstorage");
        // }

        //set token to axios common header
        //  setAuthToken(token);
        console.log("Invite Code:", inviteCode);
console.log("User Type:", usertype);
console.log("Redirecting to:", inviteCode.substring(0, 2) == "FA" ? "/FieldAgentHomeN" : "/dashboard");


        alert("You're Logged In");
        //redirect user to Dashboard
        if (inviteCode.substring(0, 2) == "FA") {
          window.location.href = "/FieldAgentHomeN";
        }

        if (inviteCode.substring(0, 2) == "PA") {
          window.location.href = "/dashboard";
        }
      })
      .catch((error) => {
        console.log(error);
        // handle the error
        alert(error.response.data.message);
      });
      console.log("in handle submit end")
  };

  // console.log(data);

  // const styles = {
  //   backgroundColor:"white",
  //   padding: "10px",
  //   borderRadius: "5px",
  //   border: "1px solid grey",
  //   boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
  // };

  return (
    <>
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
            {/* <Link to="/dashboard">
            </Link> */}
            <img src={logo} height={40} alt="fireSpot" />
          </div>
          {/* <h3 className="Htitle">Agent Sign In</h3> */}
          <div className="font-bold text-[1.3rem] py-[1rem]">Agent Sign In</div>

          <form onSubmit={handleSubmit} className="login-form h-[60vh]">
            {/* phone */}
            <label htmlFor="phoneNumber" className="label-phone">
              Mobile Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              name="phoneNumber"
              className="input-field"
              required
            />

            {/* Password */}
            <label htmlFor="password" className="label-password">
              Enter Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              name="password"
              className="input-field"
              required
            ></input>
            <div className="flex px-[1rem] items-center text-[1.3rem] pb-[1rem]">
              {/* <button
                className="flex justify-center items-center"
                onClick={handleTogglePassword}
              >
                {showPassword ? (
                  <div className="flex justify-center items-center">
                    <FaEyeSlash />
                    <p className="text-left font-bold px-[0.5rem]">Hide</p>
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <FaRegEye />
                    <p className="text-left font-bold px-[0.5rem]">Show</p>
                  </div>
                )}
              </button> */}
              <div className="px-[0.5rem] flex justify-center items-center">
                <input
                  type="checkbox"
                  style={{
                    zoom: 2,
                    margin: "0.1rem 0 0 0 ",
                  }}
                  checked={showPassword}
                  onChange={handleTogglePassword}
                />
              </div>
              <div className="flex justify-center items-center">
                <p>{showPassword ? "Hide Password" : "Show Password"}</p>
              </div>
            </div>
            {/* Submit */}
            <Link to="/Resetpassword">
              <p className="message">
                Forgot password? <t className="messageUnderline"> Click here</t>
              </p>
            </Link>

            {/* <button className="CommonnButton">Sign In <img className="vectorSignIn" src={vector} alt="fireSpot"/></button> */}
            <div className="flex justify-center items-center py-[1rem]">
              <CommonBtn title="Sign In" margin="25%" fontweight="bolder" />
            </div>
          </form>
          <Footer />
          <br />
        </div>
      </div>

      {/* Success & error model */}
      {/* <button
        onClick={() => {
          setIsModelVisible(true);
        }}
      >
        Open Model
      </button>
      <Modal
        isOpen={isModelVisible}
  
        style={customStyles}
      >
     
        <div className="px-[1rem]">hello</div>
      </Modal> */}
    </>
  );
}
export default FrontLogin;
