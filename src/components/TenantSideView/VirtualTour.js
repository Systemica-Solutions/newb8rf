import React, { useEffect, useState } from "react";
import axios from "axios";

function VirtualTour() {
  
  const queryParameters = new URLSearchParams(window.location.search);
  const propertyId = queryParameters.get("propertyId");
  const token = localStorage.getItem("token");
  const [tourLink, setTourLink] = useState(""); 

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Basic ${token}`,
    },
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `https://b8rliving.com/property/${propertyId}`,
          axiosConfig
        );

        setTourLink(response.data.data.property.tourLink3D);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPropertyDetails(); 
  }, [propertyId, axiosConfig]);

  return (
    <div>
     
      {/* Virtual Tour Component  */}
      <iframe
        width="100%"
        height="640"
        frameborder="0"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowfullscreen
        scrolling="no"
        src={tourLink}
        id="tourIframe"
      ></iframe>
    </div>
  );
}

export default VirtualTour;
