import React from 'react'
import "./Home.css";
import logo from "./Assets/image2.png"
import { Link } from '@mui/material';

const Home = () => {
  return (
    <div className='home_'>
      <div className="top">
        <div className='logo_div'>
          <img src={logo} className='logo_'></img>
          <h4>Better Homes</h4>
        </div>
        <div className='login_link'>
          <a href="https://newb8rf.dpuq1w4vh0e12.amplifyapp.com/FrontLogin"><h2>Partner Login</h2></a>
        </div>
      </div>
      <div className='main_'>
        <div>

        </div>
        <div>
          <h1>
            B8R HOMES
          </h1>
          <h4>
          Experience next generation residential living. Coming soon...
          </h4>
          <h4>
          Property Dealers interested in partnering with us
          </h4>
          <button className='button-1'>Register Interest</button>
        </div>
      </div>
    </div>
  )
}

export default Home