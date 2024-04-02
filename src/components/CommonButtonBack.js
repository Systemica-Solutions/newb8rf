import React, { Component, useState, useEffect } from "react";
import { IoIosArrowDropleft } from "react-icons/io";

import vector from "./Assets/Vector.png";
import "./commonButton.css";

function CommonButtonBack(props) {
  // console.log(props.title);
  const { title, margin, fontweight, color, bgColor, isHeight, width } = props;

  const [isBColor, setIsBColor] = useState(false);
  // const [isColor, setIsColor] = useState("");

  if (props.color) {
    //   setIsColor(props.color);
    // setIsBColor(true);
    //   console.log(isColor);
    //   console.log(isBColor);
  }

  return (
    <>
      {/* <div className="buttonClassContainer Cbutton Cbutton-reset-password CCommonnButton" 
style={{
  background: '#818683',
  margin: margin ? `${margin}` : '0%',
}}
>
<div className="buttonClass">
          <img
            className="CvectorResetPasswordVecBack "
            src={vector}
            alt="fireSpot"
          />
        </div>
        <div className="buttonClassBtn ">
          <button className="cBtn " style={{
  fontWeight: fontweight ? `${fontweight}` : '100',
  color: color ? `${color}` : '100'    }}
  >{title}</button>
        </div>
       
      </div> */}
      <div
        className=" m-6"
        // style={{
        //   background: bgColor ? `${bgColor}` : "#52796f",
        //   margin: margin ? `${margin}` : "0%",
        //   height: isHeight ? '80px' : '',
        // }}
      >
        <button
          className=" flex text-white justify-center items-center border-[#daf0ee] border-2 rounded-[0.5rem] px-[0.6rem] py-[0.2rem] commonbtn"
          style={{
            background: bgColor ? `${bgColor}` : "#818683",
          }}
        >
          {/* <button
            className=""
            style={{
              fontWeight: fontweight ? `${fontweight}` : "100",
              width: width ? `${width}` : '100%',
              color: color ? `${color}` : "100",
            }}
          >
          </button> */}
          <div>
            <IoIosArrowDropleft className="text-[1.4rem] lg:text-[2rem] text-white mr-[0.5rem] " />
          </div>
          <div className="text-[1.2rem]">{title}</div>
        </button>
        {/* <div className="">
        
        </div> */}
      </div>
    </>
  );
}
export default CommonButtonBack;
