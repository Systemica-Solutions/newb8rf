import React, { Component, useState, useEffect } from "react";
import Signp from "./SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";
import vector from "../Assets/Images/RegisterLoginUser/vector.png";
import bgm from "../Assets/Images/RegisterLoginUser/bg_img.png";
import background from "../Assets/Images/RegisterLoginUser/main_bg.png";
import backgroundthird from "../Assets/Images/other_bg.png";
import BackButton from "../CommonButtonBack";
import CommonHeader from "../CommonHeader";

import Footer from "../Footer";
import CommonBtn from "../CommonButton";

function SignUp() {
  const [isOTP, setIsOTP] = useState(true);
  const [OTPSESSION, setOTP_SESSION] = useState("");
  const [enter_otp, setEnter_otp] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    inviteCode: "",
    phoneNumber: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isTimerRunning) {
      timerInterval = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(timerInterval);
          setIsTimerRunning(false);
        }
      }, 1000); // Update timer every 1 second
      console.log(timer);
      if (timer == 0) {
        handleSubmit();
      }
    }

    return () => {
      clearInterval(timerInterval); // Clear the interval on unmount
    };
  }, [timer, isTimerRunning]);
  useEffect(() => {
    // Start the timer automatically when the component mounts
    startTimer();
  }, []);

  const startTimer = () => {
    if (!isOTP) {
      if (!isTimerRunning) {
        setIsTimerRunning(true);
      }
    }
  };

  const resetTimer = () => {
    // Reset the timer to its initial value and stop it
    setTimer(60); // You can adjust the initial timer value here
    setIsTimerRunning(false);
  };

  // console.log(timer);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    // console.log(formData);
  };

  const handleChangeOTP = (event) => {
    // Update the enter_otp state when the input value changes
    setEnter_otp(event.target.value);
    console.log(formData);
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

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

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
      startTimer();
      setIsTimerRunning(true);

      //Validation
      let inputError = {
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
      };

      if (!formData.email && !formData.password) {
        setFormError({
          ...inputError,
          email: "Enter valid email address",
          password: "Password should not be empty",
        });
        return;
      }

      if (!formData.email) {
        setFormError({
          ...inputError,
          email: "Enter valid email address",
        });
        return;
      }

      if (formData.confirmPassword !== formData.password) {
        setFormError({
          ...inputError,
          confirmPassword: "Password and confirm password should be same",
        });
        return;
      }

      if (!formData.password) {
        setFormError({
          ...inputError,
          password: "Password should not be empty",
        });
        return;
      }
      setFormError(inputError);
    }
    // alert("Register Hit");
    console.log("Submit Clicked");
    console.log(formData["phoneNumber"]);
    const phone = formData["phoneNumber"];

    // Get OTP
    axios
      .get(
        `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`,
        formData
      )
      .then((response) => {
        console.log(response.data);
        // do something with the response
        // const token = response.data.token;

        setOTP_SESSION(response.data.Details);

        alert("OTP has been send!");
        setIsOTP(false);
        console.log("hello")
        //redirect user to Dashboard
        // window.location.href = `/ConfirmOTPAgent?sessionId=${OTP_SESSION}&phone=${phone}&username=${username}`;
      })
      // .catch((error) => {
      //   alert( error );
      //   // handle the OTP error
      // });

      .catch((error) => {
        // console.log(error);
        console.warn(error.response.data.message);
        alert(error.response.data.message);
        // handle the form error
      });

    //Handle Submit
  };

  const handleSubmitConfirm = (event) => {
    event.preventDefault();
    console.log(formData);

    try {
      axios
        .get(
          `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OTPSESSION}/${enter_otp}`,
          enter_otp
        )
        .then((response) => {
          // alert(response.data);
          const OTP_CHECK = response.data.Details;
          alert(OTP_CHECK);

          axios
            .post("https://b8rliving.com/agent/signup", formData)
            .then((response) => {
              console.log(response.data);
              // do something with the response 144221
              const token = response.data.token;
              const username = response.data.name;
              //set JWT token to local
              localStorage.setItem("token", token);
              localStorage.setItem("username", username);

              window.location.href = "/FrontLogin";

              alert("You're Registerd!");
            })
            .catch((error) => {
              // console.log(error);
              alert(error);
            });
          alert("OTP is valid!");

          //redirect user to Dashboard
          // window.location.href = "/FrontLogin";
        });
    } catch (error) {
      // console.log("ASYNC ERROR:", error);
      alert("ASYNC ERROR:", error);
    }
  };

  return (
    <>
      {isOTP ? (
        <>
          <div className="startPage ">
            <div
              className="form"
              style={{
                borderRadius: "16px",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(${background})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
              }}
            >
              <form onSubmit={handleSubmit} className="login-form">
                <div className="flex justify-center items-center ">
                  <img src={bgm} alt="headImage" />
                </div>

                <div
                  className="flex flex-col bg-[#f0fbf8] justify-center items-center py-[2rem] mx-[2rem] my-[1rem] rounded-[0.5rem]"
                  style={{
                    boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <div className="md:text-[2rem] text-[1.6rem] font-bold py-[1rem]">
                    {/* <p className=""></p> */}
                    Already a member?
                  </div>
                  <div>
                    <Link to="/FrontLogin">
                      <CommonBtn
                        title="Sign In"
                        fontweight="bolder"
                        color="#DAF0EE"
                      />
                    </Link>
                  </div>
                </div>

                {/* <Link to="/FrontLogin">
                  <p className="message">
                    New Here? <a href="#">Create new account</a>
                  </p>
                </Link> */}

                <label htmlFor="email" className="label-email">
                  Enter email-ID
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                  required
                />
                <p className="error-message">{formError.email}</p>

                <label htmlFor="name" className="label-name">
                  Enter your full name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  required
                />

                <label htmlFor="password" className="label-password">
                  Enter password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  required
                />
                <p className="error-message">{formError.password}</p>
                {formData.password && (
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
                )}
                <label
                  htmlFor="confirmPassword"
                  className="label-confirmPassword"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  name="confirmPassword"
                  required
                />
                <p className="error-message">{formError.confirmPassword}</p>

                <label htmlFor="inviteCode" className="label-inviteCode">
                  Invitation Code
                </label>

                <input
                  type="text"
                  id="inviteCode"
                  value={formData.inviteCode}
                  onChange={handleChange}
                  name="inviteCode"
                />

                <label htmlFor="phoneNumber" className="label-phoneNumber">
                  Enter mobile number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />

                {/* <button className="CommonnButton button-create-account">
                Create Account
                <img className="vectorSignUp" src={vector} alt="fireSpot" />
              </button> */}
                <div className="flex justify-center items-center py-[1rem]">
                  <CommonBtn
                    title="Send OTP"
                    // margin="25%"
                    // fontweight="bolder"
                    // color="#DAF0EE"
                  />
                </div>
              </form>
              <Footer />
              <br />
            </div>
          </div>

          {/* </div> */}
        </>
      ) : (
        <>
          <div
            className="startPage login-page"
            style={{
              backgroundImage: `url("")`,
            }}
          >
            <div className="login-page">
              <div
                className="form"
                style={{
                  borderRadius: "16px",
                  marginTop: "40%",
                  borderRadius: "16px",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: `url(${backgroundthird})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              >
                <form onSubmit={handleSubmitConfirm} className="login-form">
                  <CommonHeader title="Confirm OTP" color="#52796F" />

                  <div style={{ marginTop: "100px" }}></div>

                  <label
                    htmlFor="enter_otp"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                    }}
                  >
                    Enter OTP (Check Phone)
                  </label>
                  <input
                    type="text"
                    id="enter_otp"
                    // value={setEnter_otp}
                    onChange={handleChangeOTP}
                    name="enter_otp"
                    required
                  />

                  {/* <p
              style={{
                marginTop: "-9px",
                marginRight: "-230px",
                fontSize: "10px",
              }}
            >
              <b> */}
                  <u
                    style={{
                      marginTop: "-9px",
                      marginRight: "-230px",
                      fontSize: "10px",
                    }}
                    onClick={resetTimer}
                  >
                    Resend OTP? ({timer}s)
                  </u>
                  {/* </b>
            </p> */}

                  <div style={{ marginTop: "50px" }}></div>

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <BackButton title="Back" margin="" fontweight="bolder" />
                    <CommonBtn
                      title="Submit"
                      margin="50%"
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
      )}
    </>
  );
}
export default SignUp;
