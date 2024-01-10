import React, { Component, useState, useEffect } from "react";
//import FronLogin from "../RegisterLoginUser/FrontLogin.css";
//import "./AssignProperty.css"; 
import { Link } from "react-router-dom";
import axios from "axios";
import backgroundSecond from "../Assets/Images/RegisterLoginUser/other_bg.png";
import Footer from "../Footer";
// import vector from "../../../Assets/Images/RegisterLoginUser/vector.png";
import logo from "../Assets/Images/Logo.png";
import CommonBtn from "../CommonButton";


function AssignProperty() {
  //States
  const [formData, setFormData] = useState({
    fieldAgentId: "",
    propertyId: "",
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
 // const [data, setData] = useState(null);
 const [property, setproperty] = useState([]);
 const [selectedProperty, setSelectedProperty] = useState(null);
 


  ///////////////use effect
  //for agent
  ///////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No JWT token found");
      return;
    }
    // Fetch users from the API
    axios.get("https:/b8rliving.com/agent", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        
        const filteredUsers = response.data.data.agents.filter(user => user.inviteCode.startsWith("FA"));
        console.log(filteredUsers);
        setUsers(filteredUsers);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  
  ////////////////////////////////////////////
  // for property
  //////////////////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No JWT token found");
      return;
    }
    // Fetch users from the API
    axios.get("https://b8rliving.com/property/all")
      .then((response) => {
        
        const filteredProperty = response.data.data.properties.filter(user=> user.fieldAgentStatus === 'Unassigned');
        setproperty(filteredProperty);
        //setproperty(response.data.data.properties);
        console.log("All",response);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  /////////////////////////handleAgentNameChange
  
    const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find((user) => user.name === selectedUserId);
    setSelectedUser(selectedUser);
    console.log(selectedUserId);
    console.log(selectedUser);
  };
  ////////////////////
  
  const handlePropertyChange = (event) => {
  const selectedPropertyId = event.target.value;
  const selectedProperty = property.find((property) => property.houseName === selectedPropertyId);
  setSelectedProperty(selectedProperty);
  console.log(selectedPropertyId);
  console.log(selectedProperty);
  };
  
  ///////////////////////////////////////////
  const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevState) => ({ ...prevState, [name]: value }));

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello",formData.fieldAgentId);
    console.log("world",formData.propertyId);
    formData.fieldAgentId = selectedUser._id;
    formData.propertyId = selectedProperty._id;
   axios
      .post("https://b8rliving.com/property/assign", formData)
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

        alert("Property has been assigned to the Field Agent");
        //redirect user to Dashboard
        // window.location.href = "/SignUp";
      })
      .catch((error) => {
        console.log(error);
        // if (error.response && error.response.data) {
        //   const errorMessage = error.response.data.message;
        //   if (errorMessage.includes("E11000 duplicate key")) {
        //     alert("Entity Code already exists");
        //   } else {
        //     alert(error);
        //   }
        // }
        // alert(error.response.data.message);
        // handle the error
      });
  };
  
  
 //handleUserChange

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
          <h3 className="Htitle">Assign Property to Field Agent</h3>

        <form onSubmit={handleSubmit} className="login-form">
           { /* ty */} 
          <label htmlFor="entity" className="label-phone">
              Field Agent Name
          </label>
           <select className="label-phone" onChange={handleUserChange} value={selectedUser?.name || ""}>
             <option value="" disabled>Select a Field Agent</option>
               {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

     { /* Property change*/ } 
      <label htmlFor="entity" className="label-phone">
              Property Name
          </label>
          
            <select className="label-phone" onChange={handlePropertyChange} value={selectedProperty?.houseName || ""}>
             <option value="" disabled>Select a Property</option>
               {property.map((property) => (
                <option key={property.id} value={property.id}>{property.houseName}</option>
        ))}
      </select>
               
            {/* Entity */}
            <label htmlFor="entity" className="label-phone">
              Field Agent Id
            </label>
            <input
              type="text"
              id="fieldAgentId"
              value={selectedUser?._id ?? formData.fieldAgentId}
             
              onChange={handleChange}
              name="fieldAgentId"
              className="input-field"
              required
            />

            {/* Code */}
            <label htmlFor="code" className="label-password">
              Property Id
            </label>
            <input
              type="text"
              id="propertyId"
              value={selectedProperty?._id ?? formData.propertyId}
              onChange={handleChange}
              name="propertyId"
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
export default AssignProperty;