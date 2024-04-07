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
import { FcBusinessman } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";
import Back from "../../Back";

function ViewBoard() {
  const queryParameters = new URLSearchParams(window.location.search);
  const name = queryParameters.get("name");
  const tenantId = queryParameters.get("tenantId");

  const [responseDataTenantData, setResponseDataTenantData] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const createNewBoard = async () => {
    window.location.href = `/CreateBoard?tenantId=${tenantId}&name=${name}`;
    // try {
    //   const response = await axios.post(
    //     `https://b8rliving.com/board`,
    //     { tenantId: tenantId },
    //     axiosConfig
    //   );

    //   // const responseData = response.data.data.tenant.tenantDetails;
    //   const responseDataBoard = response.data.data.board.tenantId.boardId;
    //   console.log(responseDataBoard);

    //   // Update the formData state with the response data
    //   // setResponseDataTenant(responseData);
    //   // setResponseDataTenantData(responseDataTenant);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // } finally {
    //   setLoading(false); // Set loading to false when the request is complete
    // }
  };

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchTenantDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/tenant/${tenantId}`,
          axiosConfig
        );

        // const responseData = response.data.data.tenant.tenantDetails;
        const responseDataTenant = response.data.data.tenant;

        // Update the formData state with the response data
        // setResponseDataTenant(responseData);
        setResponseDataTenantData(responseDataTenant);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };
    fetchTenantDetails(); // Call the fetch function
  }, [tenantId]);

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
        {/* name and status  */}
        <div className="flex justify-center items-center flex-col py-[2rem]">
          <FcBusinessman className="text-[3rem]" />
          <p className="text-[1.5rem] font-bold text-center">
            <u>{name}</u>
          </p>
          <p>No Properties Shared Yet</p>
        </div>
        {/* create board container */}
        <div className="px-[2rem] cursor-pointer" onClick={createNewBoard}>
          <div
            className="flex justify-center items-center p-[1rem] flex-col"
            style={{
              background: "rgba(217, 217, 217, 0.47)",
              border: "1px dashed #000",
              borderRadius: "1rem",
            }}
          >
            <IoMdAddCircleOutline className="text-[5rem] mt-[2rem] mb-[1rem]" />
            <p className="text-[2rem] mb-[2rem] font-bold">Create New Board</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center py-[2rem]">
          
          <Link
              to={`/DeactivateTenant?tenantId=${tenantId}&name=${name} `}
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

        {/* <Link>
          <img src={deactivateImg} style={{ marginTop: "100px" }} />
        </Link> */}
        <Footer />
      </div>
    </>
  );
}
export default ViewBoard;
