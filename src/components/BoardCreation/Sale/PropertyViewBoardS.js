import React, { useEffect, useState } from "react";

import backgroundImg from "../../Assets/Images/BoardCreation/BackgroundBoard.png";
import CommonHeader from "../../CommonHeader";
import CommonBtn from "../../CommonButton";
import CommonTopButton from "../../CommonTopButton";
import Footer from "../../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import deactivateImg from "../../Assets/Deactivate.png";
import CreateB from "../../Assets/Images/BoardCreation/CreateB.png";
import loadingGif from "../../Assets/Images/loading.gif";
import PropertyComp from "./PropertyComp";
import ViewBoardCompS from "./ViewBoardCompS";

import { ImCross } from "react-icons/im";
import Back from "../../Back";

function PropertyViewBoardS() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const boardId = queryParameters.get("boardId");
  const buyerId = queryParameters.get("buyerId");
  const addedItemsId = queryParameters.get("addedItemsId");
  console.log(boardId);
  console.log(buyerId);

  console.log("addedPropetyId -> " + addedItemsId);


  const [responseDataBoard, setResponseDataBoard] = useState([]);
  const [responseDataProperty, setResponseDataProperty] = useState([]);
  const [addedProperty, setAddedProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // console.log( window.location.origin);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchBoardDetails = async () => {
      if (boardId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://b8rliving.com/board/${boardId}`,
            axiosConfig
          );
          console.log(response.data)
          // const responseData = response.data.data.tenant.tenantDetails;
          const responseDataBoardData = response.data.data.board;
          const responseDataPropertiesData =
            response.data.data.board.propertyId;

          if (responseDataPropertiesData) {
            // Filter properties where 'imagesApproved' is true
            const filteredProperties = responseDataPropertiesData.filter(
              (property) =>
                property.status == "Verified" &&
                property.closeListingDetails == null
            );
            setResponseDataProperty(responseDataPropertiesData); // Set All properties added to board
          }

          // console.log(responseDataBoardData);

          // Update the formData state with the response data
          setResponseDataBoard(responseDataBoardData);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false); // Set loading to false when the request is complete
        }
      }
    };

    fetchBoardDetails(); // Call the fetch function
  }, [boardId]);

  const finalizeBoard =  () => {

    console.log("Finalize");

    if (typeof window !== "undefined") {
      var path = window.location.origin + "/OTPScreen?boardId=" + boardId + "&sharing=true";
      console.log(path);

      try {
        const response = axios.put(
          `https://b8rliving.com/board/finalize/${boardId}`,
          { shareBoardLink: path },
          axiosConfig
        );
        console.log(response);

        // LOCATION
        window.location.href = `boardCreatedS?boardId=${boardId}&path=${path}`;
      } catch (error) {
        // Handle any errors that occur during the API request
        // console.error("Error fetching data:", error);
        alert(error.message);
      } finally {
        // setLoading(false); // Set loading to false when the request is complete
      }
    } else {
      console.log("Some Error in generating URL");
    }
  };

  return (
    <>
      <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="View Board" color="#3F007F" style={{fontWeight:"600"}}/>

        <div style={{ Display: "flex" }}>
          <div>
            <h2>
              <u>{name}</u>
            </h2>
          </div>

          <ViewBoardCompS
            props={responseDataProperty}
            loading={loading}
            Id={boardId}
            responseDataBoard={responseDataBoard}
          />

          <div className="flex justify-center items-center py-[1rem] gap-x-[1rem]">
          <Link
              to={`/CreateBoardS?buyerId=${buyerId}&name=${name}&boardId=${boardId}`}
            >
         <p><CommonBtn bgColor="#3F007F" title="Add More" margin="0px" marginRight="0px" width="120px" /></p>
         </Link>
          <p onClick={finalizeBoard} > <CommonBtn
              onClick={finalizeBoard}
              title="Finalize Board"
              margin="160px"
              bgColor="#3F007F"
            />
          </p>
          </div>


          <div className="flex flex-col justify-center items-center py-[2rem]">
            <Link
              to={`/DeactivateTenant?tenantId=${boardId}&name=${name} `}
              className="flex bg-[#FBF1F1] justify-center items-center border-[#daf0ee] border-2 rounded-[0.5rem] px-[0.6rem] py-[0.2rem]"
              style={{
                border: "1px solid #E13018",
              }}
            >
              <ImCross className="text-[#CC3333]  lg:text-[2rem]  mr-[0.5rem]" />
              <p className="text-[1.5rem] font-bold px-[1rem]">Deactivate Tenet</p>
            </Link>
            <Back/>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default PropertyViewBoardS;