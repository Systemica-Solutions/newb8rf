import React from "react";
import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import CommonTopButton from "../CommonTopButton";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import oneBg from "../Assets/Images/AgentDashboard/oneBg.png";
import searchImg from "../Assets/Search.png";
import SearchBar from "../SearchBar";
import CommonHeaderS from "../CommonHeaderS";

function AllActivePropertiesS() {
  const handleSearch = (searchValue) => {
    // Custom search handling logic
    console.log("Searching for:", searchValue);

    // Perform search operations here
  };

  return (
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
        <CommonHeaderS title="All Active Properties" color="#1E0058" />

        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by Tenant Name"
        />
        <p style={{ textAlign: "left" }}>
          Hey Yash, <br />
          Here are all the rent properties that you have onboarded{" "}
        </p>

        <Footer />
      </div>
    </>
  );
}
export default AllActivePropertiesS;
