import {React,useState,useEffect} from "react";
import {React,useState,useEffect} from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from '../CommonTopButton';
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from 'axios';
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlineHideImage } from "react-icons/md";
import { FaHeart,FaUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6"; //eye
import { MdOutlineMobileScreenShare } from "react-icons/md";
import { MdOutlinePersonOutline} from "react-icons/md";
import { BiHeart } from 'react-icons/bi';
import { BiPersonFill } from 'react-icons/bi';
import { useParams } from 'react-router-dom';


function PropertyViewingStatus()
{
  const [loading, setLoading] = useState(false);
  const [propertyViewing, setPropertyViewing] = useState([]);
  const [propertyData, setPropertyData] = useState({});
  const { id } = useParams();
  const propertyId = id;
  
  const token = localStorage.getItem("token");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };
  useEffect(() =>{
    const fetchTenants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/property/viewing-status/${propertyId}`,
          axiosConfig
        );
        // Combine all arrays into one array
        const combinedArray = response.data.data.tenantDetails.map((item, index) => ({
          tenantDetail: item,
          tenantStatus: response.data.data.tenantStatus[index],
          shortListedDate: response.data.data.shortListedDate[index],
          viewedDate: response.data.data.viewedDate[index],
        }));
      
        // Set propertyViewing to the combined array
        setPropertyViewing(combinedArray);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle the error
        setLoading(false);
      }
    };
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://b8rliving.com/property/${propertyId}`,
          axiosConfig
        );
        // Update the countProperties state with the response data
        setPropertyData(response.data.data.property);
        setLoading(false);
      } catch (error) {
        console.log(error);
        // Handle the error
        setLoading(false);
      }
    };
    fetchProperty();
    fetchTenants();
  },[propertyId])

  const renderTenantDOM = (tenant, index) => {
    const { tenantDetail, tenantStatus, shortListedDate, viewedDate } = tenant;
    const tenantName = tenantDetail.name;

    if (tenantStatus === "Shared") {
      if (shortListedDate === -1 && viewedDate === -1) {
        return (
          <div key={index} style={{padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"43%"}}>
            <FaUser className="text-[#52796F] text-[1.7rem]"/>
            <div style={{textDecoration:"underline",fontWeight:"700",fontSize:"17px"}}>{tenantName}</div>
            <h4 style={{fontSize:"12px",fontWeight:"950",color:"#EF1C1C"}}>NOT VIEWED</h4>
          </div>
        );
      } else if (shortListedDate === -1 && viewedDate !== -1) {
        return (
          <div key={index} style={{padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"43%"}}>
            <FaUser className="text-[#52796F] text-[1.7rem]"/>
            <div style={{textDecoration:"underline",fontWeight:"700",fontSize:"17px"}}>{tenantName}</div>
            <h4 style={{fontSize:"10px",fontWeight:"500",color:"#000000"}}>Viewed {viewedDate} days ago</h4>
          </div>
        );
      }
    } else if (tenantStatus === "Shortlisted" && shortListedDate !== -1) {
      return (
        <div key={index} style={{padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"43%"}}>
          <FaUser className="text-[#52796F] text-[1.7rem]"/>
          <div style={{textDecoration:"underline",fontWeight:"700",fontSize:"17px"}}>{tenantName}</div>
          <div style={{display:"flex"}}>
            <FaHeart style={{color:"#EF1C1C"}}/><p style={{fontSize:"10px",fontWeight:"500",marginLeft:"1px"}}>Shortlisted {shortListedDate} days ago</p>
          </div>
        </div>
      );
    }
    else if(tenantStatus==='Deactivate'){
      return (
        <div key={index} style={{padding:"10px",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"43%"}}>
        <FaUser className="text-[#52796F] text-[1.7rem]"/>
        <div style={{textDecoration:"underline",fontWeight:"700",fontSize:"17px"}}>{tenantName}</div>
        <h4 style={{fontSize:"10px",fontWeight:"850",color:"rgba(0, 0, 0, 0.7)"}}>TENANT NOT ACTIVE</h4>
      </div>
      )
    }
    return null;
  };
    return(
        <>
         <div
        className="form"
        style={{
          borderRadius: "16px",
          marginTop: "10%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${oneBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <CommonHeader title="Property Viewing Status" color="#52796F" />
        <div >
          <div className="px-[1rem] py-[0.5rem]" >
            <div className="flex justify-between gap-x-[0.5rem]">
              {/* left-container */}
              <div
                className="bg-white p-[0.5rem] w-[85%] flex items-center"
                style={{
                  border: " 1px solid #DAF0EE",
                  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "15px",
                  width: '100%', 
                  textAlign: 'left'
                }}
              >
                {/* img/icon */}
                <div className="flex justify-center items-center w-[25%]">
                  <img
                    src="https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1646307294/Website/CMS-Uploads/s827q596xud9iirg1dvc.jpg"
                    alt="imgOne"
                    style={{
                      // marginLeft: "10px",
                      // marginTop: "10px",
                      borderRadius: "15px",
                    }}
                    //   height="60px"
                  />
                </div>
                {/* other-details */}
                <div className="pl-[1rem] flex flex-col  w-[75%]">
                  <div className="flex flex-col pb-[0.5rem]">
                    {propertyData.houseName}, {propertyData.societyName}
                  </div>
                  {/* shared or View */}
                  <div className="grid grid-cols-2">
                    <div className="flex font-bold items-center">
                      <MdOutlineMobileScreenShare className="text-[#52796F] text-[1.7rem]" />
                      <div className="px-[0.2rem] text-[0.9rem]">
                        <p>Shared</p>
                        <p> {propertyData.sharedProperty.length} tenants</p>
                      </div>
                    </div>
                    <div className="flex font-bold items-center">
                      <FaEye className="text-[#52796F] text-[1.7rem]" />
                      <div className="px-[0.2rem] text-[0.9rem]">
                        <p>Viewed</p>
                        <p>4 tenants</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* right-container */}
            </div>
          </div>
        </div>
        <h4 style={{textAlign:"left",fontWeight:"600",marginTop:"20px",padding:"10px"}}>Shared With</h4>
        <div style={{ border: " 1px solid #DAF0EE",boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",borderRadius: "15px",width: '95%',display:"flex",flexWrap:"wrap",flexDirection:"row",margin:"10px",textAlign:"center",justifyContent:"center",gap:"20px"}}>
        {propertyViewing  && propertyViewing.map((tenant, index) => renderTenantDOM(tenant, index))}
        </div>
        <Footer/>
        </div>
        </>
        
    );

    

}
export default PropertyViewingStatus;