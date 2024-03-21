import React, { Component,useState }  from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import backgroundSecond from "../Assets/Images/other_bg.png";
// import Tp from "../TenantPref.css";
import style from "./BuyerDesign.css";
import vector from "../Assets/Images/vector.png"
import Footer from '../Footer';
import key_1 from "../PropertyAdditionPageIcons/key_1/24.png";
import rent_1 from "../PropertyAdditionPageIcons/rent_1/24.png";
import bgm from "../Assets/Images/BuyerAdditionFlow/BuyerBg.png";
import "./BuyerDesign.css";

import CommonHeader from "../CommonHeader";
import CommonBtn from "../CommonButton";
import BackButton from "../CommonButtonBack";


function BuyerDetails(){

  const [checkedState, setCheckedState] = useState(
    []
  );


  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item 
     
    );
    setCheckedState(updatedCheckedState);
  }

    const [formData, setFormData] = useState({
		duration_of_stay: '',
		deposit_comfortable_for: '',
    house_conf:'',
		type_of_furnishing: '',
    house_type:'',
    movein_from:'',
    location: ''
	  });

    
	
	  const handleChange = event => {
		const { name, value } = event.target;
		setFormData(prevState => ({ ...prevState, [name]: value }));
    
	  };
	
	  const handleSubmit = event => {
		event.preventDefault();
		console.log()
		axios.post('https://b8rliving.com/tenantpref', formData)
		  .then(response => {
			console.log(response.data);
			alert("Your tenant preferences has been submitted");
			// do something with the response
      window.location.href = '/tenantpref2'

		  })
		  .catch(error => {
			console.log(error);
			// handle the error
		  });
	  };


    return(
            
        <div className="login-page">
          <div className="form" style={{  borderRadius: "16px", marginTop: "10%", backgroundRepeat: 'no-repeat' , backgroundImage: `url(${bgm})`, backgroundRepeat: 'no-repeat' , backgroundSize : '100% 100%' }} >
          {/* <h2 style={{color:"#52796F"}}>Tenant Details (1/2)</h2> */}
          <CommonHeader title="Buyer Details" color="#1E0058"/>

    <form className="login-form"  onSubmit={handleSubmit}>
{/*    
                //house configuration */}
                <label for="house_conf" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}>Preference of House Configuration</label>
                <select
              id="house_conf"
              name="house_conf"
              value={formData.house_conf}
              onChange={handleChange}
              style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #52796F",
               
              }}
            >
              <option value="gated_apartment">Select from Drop Down</option>
              <option value="Studio">
                Studio
              </option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="2.5BHK">2.5BHK</option>
              <option value="3BHK">3BHK</option>
              <option value="3.BHK">3.5BHK</option>
              <option value="4BHK">4BHK</option>
              <option value="4.5BHK">4.5BHK+</option>
            </select>


            <label for="furnishing" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Type of Furnishing</label>
                <select name="type_of_furnishing" id="furnishing" value={formData.type_of_furnishing} onChange={handleChange}  style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #52796F",
               
              }}>
                <option value="full">Type of Furnishing</option>   
                <option value="full">Full-Furnished</option>
                <option value="semi">Semi-Furnished</option>
                <option value="un">Un-Furnished</option>
                </select>


                <label for="house_type" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left",}}>Preference of House Type</label>
            <select
              id="house_type"
              name="house_type"
              value={formData.house_type}
              onChange={handleChange}
              style={{
                      backgroundColor: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #52796F",
                     
                    }}
            >
			 
              <option value="Selectfromdropdown" >Select from Drop Down</option>
              <option value="Flat(ingatedsociety)">Flat(in Gated Society)</option>
              <option value="Individual"> Individual Builder Floor</option>
              <option value="Indvidualhouse"> Individual House(in Gated Society)</option>
              <option value="standalonehouse">
                Standalone Individual House
              </option>
            </select>

                {/* <label for="duration" style={{textAlign: "left",display: "block",marginBottom: "0.5rem",fontWeight: "300",float: "left"}}>Preferred Budget(in Crore)</label>
                <select name="deposit_comfortable_for" id="deposit" value={formData.deposit_comfortable_for} onChange={handleChange}  style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #52796F",
               
              }}>
                <option>Deposit Comfortable For</option>    
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="anything">Anything would be okay</option>
                </select> */}

<label htmlFor="phone" className="fieldTitle">
              Preferred Location
              </label>
              <input
              className={"fieldInput-add"}
                type="tel"
                id="phone"
                name="phone"
                value={formData.deposit_comfortable_for}
                onChange={handleChange}
                placeholder="map"
                required
              />

                 <label htmlFor="phone" className="fieldTitle">
               Preferred Budget(in Crore)
              </label>
              <input
              className={"fieldInput-add"}
                type="tel"
                id="phone"
                name="phone"
                value={formData.deposit_comfortable_for}
                onChange={handleChange}
                required
              />           
            <br></br>

              
                
             
                
            <div style={{display:"flex",marginBottom:"20px"}}>
                    <div style={{width:"150px",height:"130px",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", marginRight:"10px",boxShadow:"0px 4px 4px rgba(0, 0, 0, 0.25)",borderRadius:"5px"}}>
                    {/* <div class="grid-item"  style={{marginTop:"20px",width:"150px",marginBottom:"10px",boxShadow:"0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24", border:"none",background:"linear-gradient(180deg, rgba(207, 211, 210, 0.5) 0%, rgba(232, 231, 231, 0) 100%)", boxShadow:" 0px 4px 4px rgba(0, 0, 0, 0.25)",boxShadow:"5px"}}> */}
                        <img src={key_1} alt="Icon description" />
                        <h5 style={{marginTop:"-5px"}}>Move in from</h5>
                        <input
                        type="date"
                        id="movein_from"
                        value={formData.movein_from}
                        onChange={handleChange}
                        name="movein_from"
                        // placeholder="username"
                        style={{  backgroundColor:"white",
                        padding: "10px",
                        borderRadius: "5px",
                        marginTop:"-10px",
                        border: "1px solid #52796F",
                        boxShadow: "0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)",
                        }}
                      />
                       
                        {/* </div> */}
                    </div>
                  
            </div>
                       
                      
            {/* <div class="buttonBackNext">
            <button className="CommonnBackButton" style={{  fontSize: "16px", fontWeight: "1000" , textAlign: "right", fontStyle: "normal", width: "35%" }}>Back <img className="vectorBack" src={vector} alt="fireSpot"  style={{ float: "left", marginLeft: "-5%" }}/></button>
            <button className="CommonnButton" style={{  fontWeight: "1000" , textAlign: "left", fontStyle: "normal", width: "55%" }}>Save and Next <img className="vectorSignIn" src={vector} alt="fireSpot"/></button>
            </div> */}
              
                   <div style={{ display: "flex", flexDirection: "row" }}>
                    <BackButton title="Back" margin="" fontweight="bolder" />
                    <CommonBtn title="Save & Next" margin="40%" fontweight="bolder" color="#DAF0EE" bgColor="#3F007F" />
                    </div>
         
                  

               <Footer/>
                </form>
            </div>
        </div>
           
        
       
        
    );
}
// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const amenities = [
  { title: 'Gated Society' },
  { title: '24*7 power back-up'  },
  { title: 'convenience Store'   },
  { title: 'swimming pool'  },
  { title: 'Gym & club-house'   },
  { title: 'parking'  },
  { title: 'balcony'  },
  { title: 'air-conditioning'  },
  
  
  
 

 
 
 
 
];
export default BuyerDetails;