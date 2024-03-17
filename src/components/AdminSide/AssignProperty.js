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

  const [agents, setAgents] = useState([]);
  const [fieldAgents, setFieldAgents] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState();
  const [selectedProperty, setSelectedProperty] = useState();
  const [properties, setProperties] = useState([]);
  const [selectedFA, setSelectedFA] = useState();

  
  useEffect(() => {
    const getAgentData = async () => {
      try {
        const res = await axios.get("https://b8rliving.com/agent");
        console.log(res.data.data);
        const propertyAgentRes = res.data.data.agents.filter(
          (agent) => agent.isFieldAgent === false
        );

        const fieldAgentRes = res.data.data.agents.filter(
          (agent) => agent.isFieldAgent === true
        );
        console.log(propertyAgentRes);
        setAgents(propertyAgentRes);
        setFieldAgents(fieldAgentRes);
      } catch (err) {
        console.log(err);
      }
    };

    getAgentData();
  }, []);

  useEffect(() => {

  }, [properties])

  const getProperties = async (agentId) => {
    try {
      const res = await axios.get(
        `https://b8rliving.com/property/agent-property/${agentId}`, 
      );
      console.log(res.data.data.properties);
      const unverifiedProperties = res.data.data.properties.filter(
        (property) => property.status === "Pending"
      );
      console.log(unverifiedProperties);
      setProperties(unverifiedProperties);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAgentSelection = (event) => {
    const agentId = event.target.value;
    console.log(agentId);
    getProperties(agentId);
  };

  const handlePropertySelected = (event) => {
    const propertyId = event.target.value;
    console.log(propertyId);
    setSelectedProperty(propertyId);
  };

  const handleSubmit = async() => {
    try {
      const data = {
        "fieldAgentId": selectedFA,
        "propertyId": selectedProperty
      }
      const res = await axios.post('https://b8rliving.com/property/assign', data);
      alert("Property Assigned to Field Agent successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

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
              <img src={logo} height={40} width={40} alt="fireSpot" />
            </Link>
          </div>
          <h3 className="Htitle text-2xl font-bold mb-4">Assign Property to Field Agent</h3>
          <div className="px-6 flex flex-col items-center">
          <h3>Choose agent:</h3>
          <select name="agent" onChange={handleAgentSelection}>
            <option disabled selected value>
              {" "}
              -- select an option --{" "}
            </option>
            {agents.map((agent) => {
              return <option value={agent._id}>{agent.name}</option>;
            })}
          </select>

          <h3>Choose Property:</h3>
          <select name="property" onChange={handlePropertySelected}>
            <option disabled selected value>
              {" "}
              -- select an option --{" "}
            </option>
            {properties.map((property) => {
              return (
                <option value={property._id}>
                  {property.houseName}, {property.societyName}
                </option>
              );
            })}
          </select>

          <h3>Choose Field Agent:</h3>
          <select name="field agent" onChange={e => setSelectedFA(e.target.value)}>
            <option disabled selected value>
              {" "}
              -- select an option --{" "}
            </option>
            {fieldAgents.map((agent) => {
              return (
                <option value={agent._id}>
                  {agent.name}
                </option>
              );
            })}
          </select>
 
          {(
            <div className="w-fit" onClick={handleSubmit}>
            <CommonBtn
              title="Submit"
              margin="52%"
              fontweight="bolder"
            />
            </div>
          )}
        </div>

            <Footer />
          <br />
        </div>
      </div>
    </>
  );
}
export default AssignProperty;