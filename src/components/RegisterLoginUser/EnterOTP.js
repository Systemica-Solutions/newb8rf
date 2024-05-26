import React, { Component, useState, useEffect } from "react";
import "./UserLoginDetails.css";
import "./EnterOTP.css";
import { Link } from "react-router-dom";
import axios from "axios";
import vector from "../Assets/Images/RegisterLoginUser/vector.png";
import Footer from "../Footer";
import backgroundthird from "../Assets/Images/RegisterLoginUser/other_bg.png";
import CommonBtn from "../CommonButton";
import BackButton from "../CommonButtonBack";
import logo from "../Assets/Images/Logo.png";

function EnterOTP() {
  const queryParameters = new URLSearchParams(window.location.search);
  const OTP_SESSION = queryParameters.get("sessionId");
  const phone = queryParameters.get("phone");

  const [formData, setFormData] = useState({
    enter_otp: "",
    password: "",
    c_password: "",
    phone: phone,
  });

  const [passwordMatch, setPasswordMatch] = useState(true);

  const [timer, setTimer] = useState(60); // Initial timer value of 60 seconds

  function checkPasswordStrength(password) {
    // Define regular expressions to check for password strength
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\|]/;

    // Define the minimum length required for a strong password
    const minPasswordLength = 8;

    // Check for uppercase letter
    if (!uppercaseRegex.test(password)) {
      return "Weak: Password must contain at least one uppercase letter.";
    }

    // Check for lowercase letter
    if (!lowercaseRegex.test(password)) {
      return "Weak: Password must contain at least one lowercase letter.";
    }

    // Check for a number
    if (!numberRegex.test(password)) {
      return "Weak: Password must contain at least one number.";
    }

    // Check for a special character
    if (!specialCharRegex.test(password)) {
      return "Weak: Password must contain at least one special character.";
    }
    // Check password length
    if (password.length < minPasswordLength) {
      return "Weak: Password must be at least 8 characters long.";
    }
    // If all checks pass, the password is considered strong
    return (
      <p
        style={{
          fontSize: "10px",
          color: "green",
          marginTop: "-10px",
          textAlign: "right",
        }}
      >
        Strong: Password meets all strength criteria.{" "}
      </p>
    );
  }
  const getPasswordStrength = (password) => {
    return checkPasswordStrength(password);
  };

  const passwordStrength = getPasswordStrength(formData.password);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const [reFormData, setreFormData] = useState({
    phone: phone,
  });

  const resendPassword = (event) => {
    try {
      console.log(reFormData);

      axios
        .get(
          `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`,
          reFormData
        )
        .then((response) => {
          console.log(response.data);
          // do something with the response
          // const token = response.data.token;

          const OTP_SESSION = response.data.Details;

          // //set JWT token to local
          // localStorage.setItem("token", token);
          // localStorage.setItem("username", username);
          //3366cd24-9941-4ac2-89ce-c0e675466cf1
          //set token to axios common header
          //  setAuthToken(token);

          alert("OTP has been send!");
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.password !== formData.c_password) {
      setPasswordMatch(false);
      // return;
    }

    setPasswordMatch(true);

    console.log(formData["enter_otp"]);
    const enter_otp = formData["enter_otp"];

    console.log(
      `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OTP_SESSION}/${enter_otp}`
    );
    try {
      axios
        .get(
          `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OTP_SESSION}/${enter_otp}`,
          formData
        )
        .then((response) => {
          console.log(response.data);
          // alert(response.data);
          const OTP_CHECK = response.data.Details;
          alert(OTP_CHECK);

          axios
            .put("https://b8rliving.com/agent/reset-password", {
              password: formData.password,
              phoneNumber: formData.phone,
              confirmPassword: formData.c_password,
            })
            .then((response) => {
              console.log(response.data);
              alert(response.data.message);
              window.location.href = "/FrontLogin";
              // alert("Your Password has been Updated!");
            })
            .catch((error) => {
              console.log(error);
              const errorMessage = error.response.data.message;
              alert(errorMessage);
            });
          console.log(OTP_CHECK);
        })
        .catch((error) => {
          console.log(error);
          const OTP_CHECK = error.response.data.Details;
          alert("Please Re-enter: " + OTP_CHECK);
        });
    } catch (error) {
      console.log("ASYNC ERROR:", error);
    }
  };

  return (
    <>
      <div className="startPage login-page">
        <div className="login-page">
          <div
            className="form"
            style={{
              borderRadius: "16px",
              // marginTop: "10%",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${backgroundthird})`,
              backgroundSize: "100% 100%",
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
            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="enter_otp" className="form-label">
                Enter OTP (Check Phone)
              </label>
              <input
                type="text"
                id="enter_otp"
                value={formData.enter_otp}
                onChange={handleChange}
                name="enter_otp"
                required
              />
              <p
                style={{
                  marginTop: "-9px",
                  marginRight: "-230px",
                  fontSize: "10px",
                }}
              >
                <b>
                  <u onClick={resendPassword}>Resend OTP? ({timer}s)</u>
                </b>
              </p>

              <label htmlFor="password" className="form-label">
                Enter New Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
              />

              <p
                style={{
                  fontSize: "10px",
                  color: "red",
                  marginTop: "-10px",
                  textAlign: "right",
                }}
              >
                {passwordStrength}
              </p>

              <label htmlFor="c_password" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="c_password"
                value={formData.c_password}
                onChange={handleChange}
                name="c_password"
                required
              />
              {passwordMatch ? (
                "Password Matched"
              ) : (
                <>
                  <p
                    style={{
                      fontSize: "10px",
                      color: "red",
                      marginTop: "-10px",
                      textAlign: "right",
                    }}
                  >
                    Password did not match!!!
                  </p>
                </>
              )}
              <div className="flex justify-center items-center py-[1rem] gap-x-[1rem]">
                <BackButton title="Back" margin="" fontweight="bolder" />
                <CommonBtn
                  title="Set Password"
                  margin="40%"
                  fontweight="bolder"
                />
              </div>

              <Footer />
            </form>

            <br />
          </div>
        </div>
      </div>
    </>
  );
}

export default EnterOTP;
