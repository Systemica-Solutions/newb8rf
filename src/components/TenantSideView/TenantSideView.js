import React, { useEffect, useRef, useState } from "react";
import Dashboardcss from "../Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Housimg from "../Assets/Images/TenantSideView/TenantSideViewS.png";
import Footer from "../Footer";
import logo from "../Assets/Images/Logo.png";
import TenantSideViewComp from "./TenantSideViewComp";
import CommonBtn from "../CommonButton";

//export  {globalTenantId};
let globalTenantId;

function TenantSideView() {
  const queryParameters = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const tenantId = queryParameters.get("tenantId");
  globalTenantId = tenantId;
  const boardId = queryParameters.get("boardId");
  console.log("TId -> " + tenantId);
  const handleGoBack = () => {
    console.log("hello")
    navigate(-1); 
  };

  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataTenant, setResponseDataTenant] = useState([]);
  const [responseDataTenantName, setResponseDataTenantName] = useState("");
  const [propertyAgentName, setPropertyAgentName] = useState("");
  const [responseDataTotalProperties, setResponseDataTotalProperties] =
    useState("");
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

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
        console.log("TOKEN", token);
        const response = await axios.get(
          `https://b8rliving.com/board/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        // const responseDataBoardData = response.data.data.board;
        const responseDataBoardtData = response.data.data.board;
        // setResponseDataTenantName(response.data.data.board.tenantId.tenantDetails[0]);
        const responseDataPropertiesData = response.data.data.board.propertyId;

        //const tenant_id = response.data.data.board.tenantId;
        //setPropertyAgentName(response.data.data.propertyDetails.ownerInfo.name.first)
        //console.log("hello" ,response.data.data.board.propertyId);

        //console.log(responseDataBoardtData);

        const filteredProperties = responseDataPropertiesData.filter(
          (property) => property.status != "Closed"
        );

        console.log(responseDataBoardtData);
        // Update the formData state with the response data
        setResponseDataBoard(responseDataBoardtData);
        setResponseDataProperty(filteredProperties);

        // Count the number of properties
        setResponseDataTotalProperties(filteredProperties.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };
    fetchBoardDetails(); // Call the fetch function
  }, []);

  //TENANT
  useEffect(() => {
    const fetchBoardDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/tenant/${tenantId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        // const responseDataBoardData = response.data.data.board;
        const responseDataTenantData = response.data.data.tenant;
        setResponseDataTenantName(
          response.data.data.tenant.tenantDetails[0].name
        );

        // const responseDataPropertiesData = response.data.data.board.propertyId;
        // Count the number of properties
        //  setResponseDataTotalProperties(responseDataPropertiesData.length);

        console.log(responseDataTenantData);

        // Update the formData state with the response data
        // setResponseDataBoard(responseDataBoardData);
        // setResponseDataProperty(responseDataPropertiesData);
        setResponseDataTenant(responseDataTenantData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };
    fetchBoardDetails(); // Call the fetch function
  }, [tenantId]);

  // console.log(responseDataTotalProperties);

  return (
    <>
      {/* header */}
      <div className="grid grid-cols-3">
        <div className="w-[60%] flex items-center justify-center m-[1rem]">
          /<img src={logo} alt="fireSpot" style={{ zoom: 1.4 }} />
        </div>
        <div className="flex justify-center items-center pt-[1rem]">
          <p
            className="text-[1.8rem] font-bold text-center text-[#52796F]"
            style={{
              fontFamily: "Algerian",
            }}
          >
            Welcome
          </p>
        </div>
      </div>
      {/* body */}
      <div className="px-[1rem] pt-[2rem] pb-[0.5rem]">
        <p className="text-[1.2rem] font-bold">
          {" "}
          Hey {responseDataTenantName},{" "}
        </p>
        <p className="text-[1rem] py-[0.5rem]">
          Your agent{propertyAgentName} has shared{" "}
          <strong className="text-[1.5rem] px-[0.3rem]">
            {responseDataTotalProperties}
          </strong>{" "}
          awesome properties with you!
          <br />
          Check them out and pick the one you like!
        </p>
      </div>

      <TenantSideViewComp boards={responseDataProperty} boardId={boardId} />
      <div style={{ display: 'flex', justifyContent: 'center',marginTop:"50px"}}>
            <button onClick={handleGoBack}>
              <CommonBtn title="Go Back" margin="90px" />
            </button>
      </div>
      <div className="flex justify-center items-center py-[2rem] text-[1.2rem] font-bold">
        <p style={{ fontFamily: "GlidaDisplay" }} className="text-center">
          That’s All for the Day!
          <br />
          Hope you love the properties shared.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default TenantSideView;
export { globalTenantId };
