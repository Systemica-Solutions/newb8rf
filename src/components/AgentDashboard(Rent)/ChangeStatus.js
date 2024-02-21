import React, { Component, useState, useEffect } from "react";
import Dashboardcss from "../Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import UserLoginDetails from "../UserLoginDetails";
import homeDown from "../Assets/Images/AgentDashboard/homeDown.png";
import peopleDown from "../Assets/Images/AgentDashboard/peopleDown.png";
import Footer from "../Footer";
import vector from "../Assets/Images/AgentDashboard/vector.png";
import backgroundSecond from "../Assets/Images/AgentDashboard/other_bg.png";
import rentedOut from "../Assets/Images/AgentDashboard/rentedOut.png";
import sharedOut from "../Assets/Images/AgentDashboard/sharedOut.png";
import shortListed from "../Assets/Images/AgentDashboard/shortListed.png";
import yetShared from "../Assets/Images/AgentDashboard/yetShared.png";
import PVbackground from "../Assets/Images/AgentDashboard/Pvbackground.png";
import newImg from "../Assets/Images/AgentDashboard/newImg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import BackButton from "../CommonButtonBack";
import editButton from "../Assets/Button.png";
import { useNavigate } from "react-router-dom";

function ChangeStatus() {
  const queryParameters = new URLSearchParams(window.location.search);
  const propertyId = queryParameters.get("propertyId");
  console.log(propertyId);

  const [RenderRent, setRenderRent] = useState("rent");
  const [RenderRentName, setRenderRentName] = useState("Rented on B8R");
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [closeListingReason, setCloseListingReason] = useState("Delist (Owner Denied)");
  const [tenantName, setTenantName] = useState("");
  const [tenancyStartDate, setTenancyStartDate] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [agreementFor, setAgreementFor] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [feedback, setFeedback] = useState("");

  // console.log("name -:> " + tenantName);

  const token = localStorage.getItem("token");

  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  const [formData, setFormData] = useState({
    closeListingReason: RenderRentName,
    closeListingDetails: {
      tenantName: "",
      tenancyStartDate: "",
      rentAmount: "",
      agreementFor: "",
      phoneNumber: "",
    },
  });

  const [formDataTwo, setFormDataTwo] = useState({
    closeListingReason: "",
    closeListingDetails: {
      feedback: "",
    },
  });

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  const navigate = useNavigate();
  const handleClick = () => {
    // Now you can navigate programmatically to other pages using navigate
    navigate(-1);
  };

  useEffect(() => {
    const fetchpropertyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/property/${propertyId}`,
          axiosConfig
        );
        console.log(response);

        const responseData = response.data.data.property;
        setPropertyDetails(responseData);
        if (responseData.status === 'pendingVerification') {
          setCloseListingReason("Rented Outside");
        }
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchpropertyDetails(); // Call the fetch function
  }, []); // Make sure to include propertyId in the dependency array if it's dynamic.

  const handlePageAvailable = (condition) => {
    switch (condition) {
      case "rent":
        setIsActive1(true);
        setIsActive2(false);
        setIsActive3(false);
        setRenderRent(condition);
        setRenderRentName("Rented on B8R");
        setFormData({ closeListingReason: "Rented on B8R" });
        break;

      case "delist":
        setIsActive2(true);
        setFormDataTwo({ closeListingReason: "Rented on B8R" });
        setRenderRentName("Delist (Owner Denied)");
        setRenderRent(condition);

        setIsActive1(false);
        setIsActive3(false);

        break;

      case "rented":
        setIsActive3(true);
        setRenderRentName("Rented Outside");
        setRenderRent(condition);
        setIsActive1(false);
        setIsActive2(false);
        break;

      // default:
      //   setFilteredTenants(responseTenat); // Show all tenants when no specific condition is selected
      //   break;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    // setFormData((prevState) => ({ ...prevState, [name]: value }));

    setFormData((prevState) => {
      if (name in prevState.closeListingDetails) {
        return {
          ...prevState,

          closeListingDetails: {
            ...prevState.closeListingDetails,
            [name]: value,
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

  const handleChangeTwo = (event) => {
    const { name, value } = event.target;
    // setFormData((prevState) => ({ ...prevState, [name]: value }));

    setFormData((prevState) => {
      if (name in prevState.closeListingDetails) {
        return {
          ...prevState,

          closeListingDetails: {
            ...prevState.closeListingDetails,
            [name]: value,
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

  const validateSubmit = () => {
    if (closeListingReason === "Delist (Owner Denied)")
      if (feedback == "") {
        alert("please ");
      }
  };

  const submitRent = async (event) => {
    event.preventDefault();

    //  console.log(formData);
    // console.log(JSON.stringify(formData));
    if (
      closeListingReason !== "" &&
      closeListingReason === "Delist (Owner Denied)"
    ) {
      console.log("condition 2");
      try {
        const response = await axios.put(
          `https://b8rliving.com/property/close-listing/${propertyId}`,
          {
            closeListingReason,
            closeListingDetails: {
              feedback,
            },
          },
          axiosConfig
        );

        // Log the updated state
        console.log(JSON.stringify(response));
        var nameResponse = response.data.data.property.houseName;
        var nameResponse2 = response.data.data.property.societyName;
        var ClosedStatus = response.data.data.property.closeListingReason;

        alert("Property Closed sucessfully!");
        window.location.href = `/PropertyClosed?name=${nameResponse}&closed=${ClosedStatus}&societyname=${nameResponse2}`;
      } catch (error) {
        // Handle any errors that occur during the API request
        alert(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("else case");
      try {
        const response = await axios.put(
          `https://b8rliving.com/property/close-listing/${propertyId}`,
          {
            closeListingReason,
            closeListingDetails: {
              tenantName,
              tenancyStartDate,
              rentAmount,
              agreementFor,
              phoneNumber,
            },
          },
          axiosConfig
        );

        // Log the updated state
        console.log(JSON.stringify(response));
        var nameResponse = response.data.data.property.houseName;
        var nameResponse2 = response.data.data.property.societyName;
        var ClosedStatus = response.data.data.property.closeListingReason;

        alert("Property Closed sucessfully!");
        window.location.href = `/PropertyClosed?name=${nameResponse}&closed=${ClosedStatus}&societyname=${nameResponse2}`;
      } catch (error) {
        // Handle any errors that occur during the API request
        alert(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log(propertyDetails);

  return (
    <>
      <div
        className="form"
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${PVbackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="Change Status/Close Property" color="#52796F" />
        <div className="px-[1rem]">
          <div
            className="bg-white px-[1rem] py-[0.5rem]"
            style={{
              borderRadius: "15px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              border: "1px solid #DAF0EE",
            }}
          >
            <div className="flex">
              {/* for image */}
              <div>
                <img src={newImg} />
              </div>
              {/* for title and text */}

              <div className="flex justify-end items-center flex-col px-[1rem] font-bold">
                <p className="text-left">{propertyDetails.houseName}</p>
                <p className="text-left">{propertyDetails.societyName}</p>
              </div>
              {/* <Link to="/EditPropertyInfo">
                <img src={editButton} />
              </Link> */}
            </div>
          </div>
        </div>

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}
        <div className="px-[1rem] py-[1rem]">
          <div
            className="bg-white px-[1rem] py-[0.5rem] flex justify-center items-center flex-col"
            style={{
              // height: "250px",
              border: "1px solid #DAF0EE",
              borderRadius: "15px",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <p className="text-[1.2rem] font-bold">Close Listing</p>
            <div className="flex justify-center  items-center flex-col w-[75%] py-[1rem] gap-y-[1.5rem]">
            {propertyDetails.status === 'verified' && (  <CommonTopButton
                bgColor={
                  closeListingReason === "Rented on B8R" ? "#52796F" : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={
                  closeListingReason === "Rented on B8R" ? "#FFFFFF" : "#77A8A4"
                }
                text="Rented On B8R"
                onclicked={() => setCloseListingReason("Rented on B8R")}
              />
            )}
              <CommonTopButton
                bgColor={
                  closeListingReason === "Delist (Owner Denied)"
                    ? "#52796F"
                    : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={
                  closeListingReason === "Delist (Owner Denied)"
                    ? "#FFFFFF"
                    : "#77A8A4"
                }
                text="Delist (Owner Denied)"
                onclicked={() => setCloseListingReason("Delist (Owner Denied)")}
              />
              <CommonTopButton
                bgColor={
                  closeListingReason === "Rented Outside"
                    ? "#52796F"
                    : "#D2D7D6"
                }
                borderColor="#DAF0EE"
                color={
                  closeListingReason === "Rented Outside"
                    ? "#FFFFFF"
                    : "#77A8A4 "
                }
                text="Rented Outside"
                onclicked={() => setCloseListingReason("Rented Outside")}
              />
            </div>
          </div>
        </div>

        {/* -----------------------------------------------2nd div----------------------------------------------------- */}

        {/* -----------------------------------------------3rd div----------------------------------------------------- */}
        {closeListingReason === "Rented on B8R" ? (
          <form className="login-form" onSubmit={submitRent}>
            <div className="px-[1rem]">
              <div
                className="bg-white"
                style={{
                  // height: "500px",
                  borderRadius: "15px",
                  border: "1px solid #DAF0EE",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* for image */}
                  <div className="text-[1.2rem]">
                    <b>Enter Details if Rented on B8R</b>
                  </div>
                  {/* for title and text */}

                  <div style={{ marginTop: "20px" }}>
                    <label
                      for="tenantName"
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "300",
                        float: "left",
                      }}
                    >
                      Select Tenant Name
                    </label>
                    <input
                      type="text"
                      id="tenantName"
                      name="tenantName"
                      value={tenantName}
                      onChange={(e) => setTenantName(e.target.value)}
                      // placeholder="Google Maps Plug-in"
                      style={{
                        backgroundColor: "#F5F5F5",
                        padding: "10px",
                        borderRadius: "10pxpx",
                        border: "1px solid #52796F",
                      }}
                      required
                    />

                    <label
                      for="rentAmount"
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "300",
                        float: "left",
                      }}
                    >
                      Select Rent Amount (Rent + Maintenance)
                    </label>
                    <input
                      type="text"
                      id="rentAmount"
                      name="rentAmount"
                      value={rentAmount}
                      onChange={(e) => setRentAmount(e.target.value)}
                      // placeholder="Google Maps Plug-in"
                      style={{
                        backgroundColor: "#F5F5F5",
                        padding: "10px",
                        borderRadius: "10pxpx",
                        border: "1px solid #52796F",
                      }}
                      required
                    />

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
                      Enter Tenant Contact Number
                    </label>
                    <input
                      type="text"
                      id="mapphoneNumber"
                      name="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      // placeholder="Google Maps Plug-in"
                      style={{
                        backgroundColor: "#F5F5F5",
                        padding: "10px",
                        borderRadius: "10pxpx",
                        border: "1px solid #52796F",
                      }}
                      required
                    />

                    <label
                      for="tenancyStartDate"
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "300",
                        float: "left",
                      }}
                    >
                      Tenancy Start Date
                    </label>
                    <input
                      type="date"
                      id="tenancyStartDate"
                      name="tenancyStartDate"
                      value={tenancyStartDate}
                      onChange={(e) => setTenancyStartDate(e.target.value)}
                      style={{
                        backgroundColor: "#F5F5F5",
                        padding: "10px",
                        borderRadius: "10pxpx",
                        border: "1px solid #52796F",
                      }}
                      required
                    />

                    <label
                      for="agreementFor"
                      style={{
                        textAlign: "left",
                        display: "block",
                        marginBottom: "0.5rem",
                        fontWeight: "300",
                        float: "left",
                      }}
                    >
                      Agreement For
                    </label>
                    <input
                      type="text"
                      id="agreementFor"
                      name="agreementFor"
                      value={agreementFor}
                      onChange={(e) => setAgreementFor(e.target.value)}
                      // placeholder="Google Maps Plug-in"
                      style={{
                        backgroundColor: "#F5F5F5",
                        padding: "10px",
                        borderRadius: "10pxpx",
                        border: "1px solid #52796F",
                      }}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="py-[1rem] flex justify-center items-center">
              {/* <BackButton title="Go Back" margin="" fontweight="bolder" /> */}
              <CommonBtn
                title="Yes, close listing"
                margin="40%"
                fontweight="bolder"
              />
            </div>
          </form>
        ) : null}

        {/* -----------------------------------------------3rd div----------------------------------------------------- */}
        {/* BODY */}

        {closeListingReason === "Delist (Owner Denied)" ? (
          <div>
            <form className="login-form" onSubmit={submitRent}>
              <p className="text-[1.2rem] py-[1rem]">
                <b>Write the reason for Delisting</b>
              </p>
              <div className="px-[1rem]">
                <div
                  className="p-[0.5rem]"
                  style={{
                    // height: "250px",
                    // width: "320px",
                    border: "1px solid #DAF0EE",
                    borderRadius: "15px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <textarea
                    id="feedback"
                    name="feedback"
                    rows="4"
                    cols="50"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    style={{
                      outline: "none",
                      border: "none",
                      background: "transparent",
                      boxShadow: "none",
                    }}
                    required
                    placeholder="
                    Enter your reason"
                  >
                    Enter your reason
                  </textarea>
                </div>
              </div>
              <div className="flex justify-center items-center py-[1rem]">
                {/* <BackButton title="Go Back" margin="" fontweight="bolder" /> */}
                <CommonBtn
                  title="Yes, close listing"
                  margin="40%"
                  fontweight="bolder"
                />
              </div>
            </form>
          </div>
        ) : null}
        {/* ---------------------------------------------------------------------------------------------------------------- */}
        {closeListingReason === "Rented Outside" ? (
          <div className=" px-[1rem]">
            <div
              style={{
                // height: "400px",
                border: "1px solid #DAF0EE",
                borderRadius: "15px",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <form className="login-form" onSubmit={submitRent}>
                {/* for image */}
                <div className="pt-[0.5rem] text-[1.2rem]">
                  <b>Enter Details if Rented outside</b>
                </div>
                {/* for title and text */}

                <div style={{ marginTop: "20px" }}>
                  <label
                    for="tenantName"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Select Tenant Name
                  </label>
                  <input
                    type="text"
                    id="tenantName"
                    name="tenantName"
                    value={tenantName}
                    onChange={(e) => setTenantName(e.target.value)}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                    required
                  />

                  <label
                    for="rentAmount"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Select Rent Amount (Rent + Maintenance)
                  </label>
                  <input
                    type="text"
                    id="rentAmount"
                    name="rentAmount"
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                    required
                  />

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
                    Enter Tenant Contact Number
                  </label>
                  <input
                    type="text"
                    id="mapphoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                    required
                  />

                  <label
                    for="tenancyStartDate"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Agreement For
                  </label>
                  <input
                    type="date"
                    id="tenancyStartDate"
                    name="tenancyStartDate"
                    value={tenancyStartDate}
                    onChange={(e) => setTenancyStartDate(e.target.value)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                    required
                  />
                  <label
                    for="agreementFor"
                    style={{
                      textAlign: "left",
                      display: "block",
                      marginBottom: "0.5rem",
                      fontWeight: "300",
                      float: "left",
                    }}
                  >
                    Agreement For
                  </label>
                  <input
                    type="text"
                    id="agreementFor"
                    name="agreementFor"
                    value={agreementFor}
                    onChange={(e) => setAgreementFor(e.target.value)}
                    // placeholder="Google Maps Plug-in"
                    style={{
                      backgroundColor: "#F5F5F5",
                      padding: "10px",
                      borderRadius: "10pxpx",
                      border: "1px solid #52796F",
                    }}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center py-[1rem]">
              {/* <div>
                <BackButton title="Go Back" margin="" fontweight="bolder" />
              </div> */}

              <CommonBtn
                title="Yes, close listing"
                margin="40%"
                fontweight="bolder"
              />
            </div>
          </div>
        ) : null}

        <div className="py-[1rem]">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default ChangeStatus;
