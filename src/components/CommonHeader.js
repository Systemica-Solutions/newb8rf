import React, { Component, useState, useEffect } from "react";
import vector from "./Assets/Images/RegisterLoginUser/vector.png";
// import vector from "./Assets/Images/RegisterLoginUser/vector.png"
import "./commonHeader.css";
import { Link } from "react-router-dom";

import logo from "./Assets/Images/Logo.png";

function CommonHeader(props) {
  const { title, color } = props;

  // console.log(props.title);
  const [isLogin, setIsLogin] = useState(false);
  const [letter, setletter] = useState("");

  const username = localStorage.getItem("username");
  // const username = "Aparajita";

  const token = localStorage.getItem("token");

  const usertype = localStorage.getItem("usertype");
  // console.log(token);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      // console.log(isLogin);
      if (username) {
        let letter = username.charAt(0);
        setletter(letter);
      }
    } else {
      setIsLogin(false);
      // console.log(isLogin);
    }
  });

  const handleLogout = (event) => {
    event.preventDefault();
  //   console.log("Value hit");
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("usertype");
  //   alert("You have been logged out.");
  //   //redirect user to UploadPhotos
  //   window.location.href = "/FrontLogin";
  // };

  // warning before logging out
const confirmLogout = window.confirm("Are you sure you want to log out?");
if (confirmLogout) {
    console.log("Value hit");
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
    alert("You have been logged out.");
    // Redirect user to FrontLogin
    window.location.href = "/FrontLogin";
} else {
    // If user not logout
    console.log("Logout cancelled");
}

  }

  return (
    <>
      {/* <h1>commonHeader</h1> */}
      <div className="flex justify-between items-center px-[0.5rem] py-[0.5rem]">
        <div className="w-[15vw]">
          {usertype == "PA" ? (
            <Link to="/dashboard">
              <img src={logo} height={35} alt="fireSpot" />
            </Link>
          ) : (
            <Link to="/FieldAgentHomeN">
              <img src={logo} height={35} alt="fireSpot" />
            </Link>
          )}
        </div>

        <div className="flex justify-center items-center">
          <p
            className="text-[1.5rem] font-bold"
            style={{ color: color || "black" }}
          >
            {title}
          </p>
        </div>
        <div>
          {/* <img style={{ marginBottom: '-24px' }}
           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAZNJREFUaEPtmA1uwyAMhd2TrTtZt5O1PdmqpwUJTQH/PGeECqSoSAXiz34GnItM3i6T2y8LYHQEj4jAVUTwfGxw6H9v/YeI4Elr2QBfInJTrAMMxqW0LAB4GYbj19o+M6KRBfBjtboaBykBgmoZABbZtIyk5cQCQDJ3yoW/UQgnNgvAeL9wU1E4AwCVCyxAJHn/Km4oAPTv2Tpb6RJ2ZHjiZkkGwPQ5MBRg+m0USmK2Usr7eDmbAyUpo7lAv59eoLoye05kbJ3wfvgELp7LAijrWeREy6bei7MBsHYpaNDHFbt4+bn1aa8fDUDe7XzTj4iAzwJy9AIgHUhPZyOw9wXCYlRaYkcBIkW8BhbaXr0ARxheg7khPAAZFzctCuV/c51sBfhP410QVoCM0tHq" /> */}
          {isLogin ? (
            <button
              className="bg-[#d9d9d9] rounded-full px-[0.7rem] py-[0.2rem] flex justify-center items-center"
              onClick={handleLogout}
            >
              {/* {username}, Logout */}
              <p
                className="text-[1.5rem] font-bold"
                style={{ color: color || "black" }}
              >
                {letter}
              </p>
            </button>
          ) : (
            <Link to="/FrontLogin">
              <button className="logbtn-round" style={{ fontWeight: "300" }}>
                Sign-In
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
          }

export default CommonHeader
