import React, { useEffect, useState } from "react";

import TenantSideBack from "../Assets/Images/TenantSideView/TenantSideBack.png";
import bgm from "../Assets/Images/TenantSideView/TenantSideImg.png";
import Footer from "../Footer";
import axios from "axios";
import CommonBtn from "../CommonButton";
import style from "./OtpScreen.css";
import loadingGif from "../Assets/Images/loading.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPscreen() {
  const queryParameters = new URLSearchParams(window.location.search);
  const boardId = queryParameters.get("boardId");
  // const path = queryParameters.get("path");
  //console.log(boardId);

  const [formData, setFormData] = useState({
    phone: "",
  });

  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOTP] = useState("");
  const [OtpSession, setOtpSession] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [FormDisable, setFormDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataTenant, setResponseDataTenant] = useState([]);
  const [responseDataTenantNumber, setResponseDataTenantNunber] = useState("");
  const token = localStorage.getItem("token");
  console.log("TOKEN", token);
  // const [responseDataTotalProperties, setResponseDataTotalProperties] = useState("");
  const [responseDataPropertyId, setResponseDataTenantPropertyId] =
    useState("");

  console.log("TOKEN ", token);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchBoardDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/board/details/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        const responseDataBoardData = response.data.data.board;
        const responseDataTenantData = response.data.data.board.tenantId;
        const responseDataTenantId = response.data.data.board.tenantId._id;
        console.log("teney id", responseDataBoardData);
        setResponseDataTenantNunber(
          response.data.data.board.tenantId.phoneNumber
        );
        setResponseDataTenantPropertyId(response.data.data.board.propertyId);

        // const responseDataPropertiesData = response.data.data.board.propertyId;
        // Count the number of properties
        //  setResponseDataTotalProperties(responseDataPropertiesData.length);

        // console.log(responseDataTenantData);

        // Update the formData state with the response data
        setResponseDataBoard(responseDataBoardData);
        // setResponseDataProperty(responseDataPropertiesData);
        setResponseDataTenant(responseDataTenantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };
    fetchBoardDetails(); // Call the fetch function
  }, [boardId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Validate phone number length

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // const handleOTPChange = (event) => {
  //   setOTP(event.target.value);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    //console.log(formData["phone"]);
    const phone = formData["phone"];
    if (phone.length !== 10) {
      toast.error("please enter valid phone number");
    } else {
      if (responseDataTenantNumber == phone) {
        try {
          axios
            .get(
              `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`,
              formData
            )
            .then((response) => {
              //console.log(response.data);
              // do something with the response
              // const token = response.data.token;

              const OTP_SESSION = response.data.Details;
              setOtpSession(OTP_SESSION);
              setFormDisable(false);
              toast.success("OTP has been sent!");
              //redirect user to Dashboard
              // window.location.href = `/EnterOTP?sessionId=${OTP_SESSION}&phone=${phone}`;
            })
            .catch((error) => {
              console.log(error);
              // handle the error
            });
        } catch (error) {
          console.log("ASYNC ERROR:".error);
        }
      } else {
        toast.error("Please login with Registered Mobile Number");
      }
    }
    // console.log(`https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/+91.${phone}/AUTOGEN`);
  };
  ////////////////////////////
  const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber && phoneNumber.length === 10) {
      const masked = "******" + phoneNumber.slice(-4);
      return masked;
    }
    return phoneNumber;
  };

  /////////////////////////////////
  //console.log(OtpSession);
  const handleSubmitVeriy = (event) => {
    event.preventDefault();

    //console.log(formData["enter_otp"]);
    const enter_otp = formData["enter_otp"];
    // 599325
    console.log(
      `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OtpSession}/${enter_otp}`
    );
    try {
      axios
        .get(
          `https://2factor.in/API/V1/c68dfb13-f09f-11ed-addf-0200cd936042/SMS/VERIFY/${OtpSession}/${enter_otp}`,
          formData
        )
        .then((response) => {
          //console.log(response.data);
          // alert(response.data);
          const OTP_CHECK = response.data.Details;
          toast.success(OTP_CHECK);

          axios
            .post("https://b8rliving.com/tenant/login", {
              phoneNumber: formData.phone,
              boardId : boardId,
            })
            .then((response) => {
              // console.log(response.data);
              alert(response.data.message);
              const token = response.data.data.jwtToken;
              // const name = response.data.data.agent.name;
              const phone = response.data.data.tenant.phoneNumber;
              // const tenantDetails = response.data.data.tenant.tenantDetails;
              console.log("Tenent id ", response.data.data.tenant._id);

              //set JWT token to local
              // if (typeof localStorage !== 'undefined') {
              // localStorage is available
              // Your code using localStorage goes here
              localStorage.setItem("token", token);
              localStorage.removeItem("name");
              localStorage.setItem("phone", phone);
              localStorage.removeItem("isClickArray")
              axios.get(
                `https://b8rliving.com/tenant/board/${response.data.data.tenant._id}`,
                axiosConfig
              );
              window.location.href = `/TenantSideView?tenantId=${response.data.data.tenant._id}&boardId=${boardId}`;
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
      <ToastContainer
        className="my-[3rem] text-[1.1rem] font-bold"
        autoClose={1000}
        // hideProgressBar={true}
      />
      {loading ? (
        <div>
          <img src={loadingGif} height={180} />
        </div>
      ) : (
        <div className="startPage">
          <div
            className=""
            style={{
              borderRadius: "16px",
              marginTop: "10%",
              backgroundImage: `url(${TenantSideBack})`,
              backgroundSize: "100% 100%",
            }}
          >
            <form className="login-form" onSubmit={handleSubmit}>
              {/* img-container */}
              <div className="flex justify-center items-center">
                <img src={bgm} alt="headImage" />
              </div>
              {/* welcome-container */}
              <div className="p-[1rem]">
                <div
                  className="bg-[#F0FBF8] px-[1rem] py-[0.5rem] flex flex-col"
                  style={{
                    borderRadius: "15px",
                  }}
                >
                  <p className="text-[1.1rem] font-bold text-center">
                    Welcome to betterhomes
                  </p>
                  <p className="pt-[0.5rem] pb-[1rem]">
                    {" "}
                    Your agent has shared{" "}
                    <strong>{responseDataPropertyId}</strong> awesome
                    properties.
                  </p>
                  <p className="">
                    Log in using{" "}
                    <strong>{maskPhoneNumber(responseDataTenantNumber)}</strong>
                    , mobile number to view details
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center flex-col">
                <label className="Inputfield" htmlFor="phone">
                  Enter Mobile Number
                </label>
                <input
                  className="mb-[1rem]"
                  type="number"
                  id="phone"
                  value={formData.phone}
                  onWheel={(e) => e.target.blur()}
                  onChange={handleChange}
                  name="phone"
                  required
                  style={{
                    width: "90%",
                    borderColor: "#52796F",
                    border: "3px",
                  }}
                />
                <CommonBtn
                  title="Send OTP"
                  margin="25%"
                  fontweight="bolder"
                  color="#DAF0EE"
                />
              </div>
            </form>
            <form className="login-form pt-[2rem]" onSubmit={handleSubmitVeriy}>
              <div className="flex justify-center items-center flex-col">
                <label className="Inputfield font-bold" htmlFor="enter_otp">
                  {" "}
                  Enter OTP Recieved{" "}
                </label>
                <input
                  className="InputF mb-[1rem]"
                  type="number"
                  name="enter_otp"
                  disabled={FormDisable}
                  id="enter_otp"
                  value={formData.enter_otp}
                  onWheel={(e) => e.target.blur()}
                  onChange={handleChange}
                  style={{
                    width: "90%",
                    borderColor: "#52796F",
                    border: "3px",
                    marginRight: "10px",
                  }}
                />
                <CommonBtn
                  title="Confirm OTP"
                  margin="25%"
                  fontweight="bolder"
                  color="#DAF0EE"
                />
              </div>
            </form>

            <Footer />
            <br />
          </div>
        </div>
      )}
    </>
  );
}

export default OTPscreen;
