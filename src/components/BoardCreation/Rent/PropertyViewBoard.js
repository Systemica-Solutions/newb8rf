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
import ViewBoardComp from "./ViewBoardComp";
import { FcBusinessman } from "react-icons/fc";
import { ImCross } from "react-icons/im";

function PropertyViewBoard() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const boardId = queryParameters.get("boardId");
  const tenantId = queryParameters.get("tenantId");
  const addedItemsId = queryParameters.get("addedItemsId");
  console.log(boardId);
  console.log(tenantId);
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

  // const fetchAddedProperty = () => {
  //   if (addedProp.length !== 0) {
  //     setResponseDataProperty(...responseDataProperty, addedProp);
  //   }
  // };

  // useEffect(() => {
  //   fetchAddedProperty();
  // }, []);

  const finalizeBoard = () => {
    console.log("Finalize");

    if (typeof window !== "undefined") {
      var path =
        window.location.origin +
        "/OTPScreen?boardId=" +
        boardId +
        "&sharing=true";
      console.log(path);

      try {
        const response = axios.put(
          `https://b8rliving.com/board/finalize/${boardId}`,
          { shareBoardLink: path },
          axiosConfig
        );
        console.log(response);

        // LOCATION
        window.location.href = `boardCreated?boardId=${boardId}&path=${path}`;
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
        className=""
        style={{
          // borderRadius: "16px",
          // marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="View Board" color="#52796F" />

        <div style={{ Display: "flex" }}>
          <div className="flex justify-center items-center flex-col">
            <FcBusinessman className="text-[3rem]" />
            <p className="text-[1.5rem] font-bold text-center">
              <u>{name}</u>
            </p>
          </div>

          <ViewBoardComp
            props={responseDataProperty}
            loading={loading}
            Id={boardId}
            responseDataBoard={responseDataBoard}
          />

          <div className="flex justify-center items-center py-[1rem] gap-x-[1rem]">
            <Link
              to={`/CreateBoard?tenantId=${tenantId}&name=${name}&boardId=${boardId}`}
            >
              <p>
                <CommonBtn
                  title="Add More"
                  margin="0px"
                  marginRight="0px"
                  width="120px"
                />
              </p>
            </Link>

            <p onClick={finalizeBoard}>
              <CommonBtn
                onClick={finalizeBoard}
                title="Finalize Board"
                margin="160px"
              />
            </p>
          </div>
          <div className="flex justify-center items-center py-[2rem]">
            <Link
              to={`/DeactivateTenant?tenantId=${boardId}&name=${name} `}
              className="bg-[#FBF1F1] flex justify-center items-center py-[1rem] flex-col rounded-[1rem]"
              style={{
                border: "1px solid #E13018",
              }}
            >
              <ImCross className="text-[#CC3333] text-[3rem] my-[1rem]" />
              <p className="text-[1.5rem] font-bold px-[1rem]">Deactivate</p>
              <p className="text-[1.5rem] font-bold px-[1rem]">Tenant</p>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
export default PropertyViewBoard;
