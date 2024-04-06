import React from 'react'
import { useNavigate } from 'react-router';
import { IoMdArrowRoundBack,IoIosArrowDropleft } from "react-icons/io";
const Back = () => {
    const navigate = useNavigate();
 //navigate back to the previous page
    const back =()=>{
        navigate(-1);
    }

  return (
    // <div className=''>
    //   <IoMdArrowRoundBack onClick={back} className="m-2 text-[#52796f] hover:text-red-700 relative top-0 right-0 " size={42}/>
      
    // </div>

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
      className="m-5  "
     
    >
      <button
        className="flex text-white justify-center items-center border-[#daf0ee] border-2 rounded-[0.5rem] px-[0.6rem] py-[0.2rem] commonbtn"
        style={{
          background: "#818683",
        }}
        onClick={back}
      >
        
        <div>
          <IoIosArrowDropleft className="text-[1.4rem] lg:text-[2rem] text-white mr-[0.5rem] " />
        </div>
        <div className="text-[1.2rem]">back</div>
      </button>
    </div>
  </>
  )
}

export default Back
