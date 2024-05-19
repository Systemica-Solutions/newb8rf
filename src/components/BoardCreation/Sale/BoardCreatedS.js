import React, { useEffect, useState } from "react";

import backgroundImg from "../../Assets/Images/Sale/RestBg.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from '../../CommonTopButton';
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import axios from 'axios';

import { FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BoardCreatedS(){

const queryParameters = new URLSearchParams(window.location.search);
  const boardId = queryParameters.get("boardId");
  const path = queryParameters.get("path");
  // console.log(boardId);

  const navigate = useNavigate();

  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataBuyer, setResponseDataBuyer] = useState([]);
  const [responseDataBuyerName, setResponseDataBuyerName] = useState("");
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

  const handleClick = async () => {
    console.log("Handle");
    const linkToCopy = path; // The link you want to copy

    // Create a temporary input element to copy the link to the clipboard
    const input = document.createElement("input");
    input.setAttribute("value", linkToCopy);
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    // Optionally, you can provide some user feedback (e.g., a notification)
    alert(`Link copied to clipboard: ${linkToCopy}`);

    try {
      const response = await axios.put(
        `https://b8rliving.com/board/share/${boardId}`,
        {},
        axiosConfig
      );
      console.log(response);
      alert(response.data.message);
    } catch (error) {
      // Handle any errors that occur during the API request
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  useEffect(() => {
    const fetchBoardDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/board/${boardId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        const responseDataBoardData = response.data.data.board;
        const responseDataBuyerData = response.data.data.board.buyerId;
        setResponseDataBuyerName(
          response.data.data.board.buyerId.buyerDetails[0].name
        );
        const responseDataPropertiesData = response.data.data.board.propertyId;
        // Count the number of properties
        setResponseDataTotalProperties(responseDataPropertiesData.length);

        console.log(responseDataBuyerData);

        // Update the formData state with the response data
        setResponseDataBoard(responseDataBoardData);
        setResponseDataProperty(responseDataPropertiesData);
        setResponseDataBuyer(responseDataBuyerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };
    fetchBoardDetails(); // Call the fetch function
  }, [boardId]);

    return(
        <>
          <div
        className=""
        style={
          {
            // borderRadius: "16px",
            // marginTop: "10%",
            // height:"740px"
          }
        }
      >
        <CommonHeader title="Board Created" color="#3F007F" />
        <div className="flex justify-between items-center flex-col">
          <div className="flex py-[2rem]">
            <div>
              <FaHandshake className="text-[3rem] text-[#52796F] background-rgba(59, 65, 61, 0.70)" style={{color:"#3F007F"}}/>
            </div>
            <div className="px-[1rem]">
              <p className="text-[2rem] text-[#52796F] font-bold text-center color-#3F007F" style={{color:"#3F007F"}}>
                {responseDataTotalProperties} properties
              </p>
              <p className="text-[1.2rem] font-semibold text-center">
                added to board
              </p>
            </div>
          </div>
          <div className="flex py-[2rem]">
            <div className="px-[1rem]">
              <p className="text-[1.2rem] font-semibold text-center">
                Buyer Name
              </p>
              <p className="text-[2rem] text-[#52796F] font-bold text-center" style={{color:"#3F007F"}}>
                {responseDataBuyerName}
              </p>
            </div>
          </div>
          <div className="flex pb-[1rem]">
            <div className="px-[1rem]">
              <p className="text-[1.2rem] font-semibold text-center">
                Log-in Mobile Number
              </p>
              <p className="text-[2rem] text-[#52796F] font-bold text-center" style={{color:"#3F007F"}}>
                {responseDataBuyer.phoneNumber}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col py-[1rem]">
          <Link to={`/TenantSideView?boardId=${boardId}`}>
            <CommonBtn title="Preview Board" margin="90px" bgColor="#3F007F"/>
          </Link>
          <p onClick={handleClick} className="py-[1rem]">
            <CommonBtn
              title={`Share Link with ${responseDataBuyerName}`}
              margin="90px"
              bgColor="#3F007F"
            />
          </p>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <CommonBtn title="View Board" margin="90px" bgColor="#3F007F"/>
          </button>
        </div>
        <div className="mb-[3rem]" />
        <Footer />
      </div>
        </>
        
    );
}
export default BoardCreatedS;