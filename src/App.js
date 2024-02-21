import React, {
  Component,
  useEffect,
  useState,
  Redirect,
  Navigate,
} from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import { useMediaQuery } from "react-responsive";

// import FrontPage from "./components/FrontPage";
import AddTenant from "./components/TenantAdditionFlow/AddTenant";
// import SuccessfulSignup from "./components/SuccessfulSignup";
// import dropNav from "./components/dropNav";

// import TenantSideView from "./components/TenantSideView";

//Add Buyer
import AddBuyer from "./components/BuyerAdditionFlow/AddBuyer";

import BuyerDetails from "./components/BuyerAdditionFlow/BuyerDetails";
import BuyerCreated from "./components/BuyerAdditionFlow/BuyerCreated";

// RegisterLoginUser ------------------------------------------------------
import SignUp from "./components/RegisterLoginUser/SignUp";
import EnterOTP from "./components/RegisterLoginUser/EnterOTP";
import FrontLogin from "./components/RegisterLoginUser/FrontLogin";
import VerifyPage from "./components/RegisterLoginUser/VerifyPage";
import ResetPassword from "./components/RegisterLoginUser/ResetPassword";
// _________________________________________________________________________
import TenantCreated from "./components/TenantAdditionFlow/TenantCreated";
import AllTenantOne from "./components/AgentDashboard(Rent)/AllTenantOne";

// AgentDashBoard --------------------------------------------------
import Dashboard from "./components/AgentDashboard(Rent)/Dashboard";

import My_propertyPV from "./components/AgentDashboard(Rent)/My_propertyPV";
import My_PropertyYTS from "./components/AgentDashboard(Rent)/My_PropertyYTS";
import My_PropertySNA from "./components/AgentDashboard(Rent)/My_PropertySNA";
import My_PropertyS from "./components/AgentDashboard(Rent)/My_PropertyS";
import ChangeStatus from "./components/AgentDashboard(Rent)/ChangeStatus";
import ActiveLeads from "./components/AgentDashboard(Rent)/ActiveLeads";
import AllActiveProperties from "./components/AgentDashboard(Rent)/AllActiveProperties";
import AllProperty from "./components/AgentDashboard(Rent)/AllProperty";
import AvailablePropertyrental from "./components/AgentDashboard(Rent)/AvailablePropertyrental";
import PropertyClosed from "./components/AgentDashboard(Rent)/PropertyClosed";
import PropertyViewingStatus from "./components/AgentDashboard(Rent)/PropertyViewingStatus";
import ReactivateProperty from "./components/AgentDashboard(Rent)/ReactivateProperty";
import DeactivateTenant from "./components/AgentDashboard(Rent)/DeactivateTenant";
// _________________________________________________________________________

import AuthCode from "./components/AdminSide/AuthCode";
import AdminFront from "./components/AdminSide/AdminFront";
import AssignProperty from "./components/AdminSide/AssignProperty";
// AgentFlow --------------------------------------------------
import FieldAgentHomeN from "./components/FieldAgentFlow/FieldAgentHomeN";
import ConfirmOTPAgent from "./components/RegisterLoginUser/ConfirmOTPAgent";
// import FieldAgentDetails from "./components/FieldAgentFlow/FieldAgentDetails";
import FieldPending from "./components/FieldAgentFlow/FieldPending";
import FieldAgentVerifyProperty from "./components/FieldAgentFlow/FieldAgentVerifyProperty";
import FieldAgentVerifyPropertyF from "./components/FieldAgentFlow/FieldAgentVerifyPropertyF";
import PhotosCapture from "./components/FieldAgentFlow/PhotosCapture";
import PhotoCaptureTwo from "./components/FieldAgentFlow/PhotoCaptureTwo";
import PhotoCaptureThree from "./components/FieldAgentFlow/PhotoCaptureThree";
import UploadPhotos from "./components/FieldAgentFlow/UploadPhotos";
import UploadPhotos3 from "./components/FieldAgentFlow/UploadPhotos3";
import VerificationComplete from "./components/FieldAgentFlow/VerificationComplete";

// _________________________________________________________________________

//TenantSideView
import DetailImgView from "./components/TenantSideView/DetailImgView";
import DetailView from "./components/TenantSideView/DetailView";
import OTPscreen from "./components/TenantSideView/OTPscreen";
import TenantSideView from "./components/TenantSideView/TenantSideView";
import VirtualTour from "./components/TenantSideView/VirtualTour";

//PropertyCreate -Imports ---------------------------------------------------
// import PropertyDetails from "./components/PropertyDetails";
import PropertyInfo from "./components/PropertyCreate/PropertyInfo";
import EditPropertyInfo from "./components/PropertyCreate/EditPropertyInfo";
// import PropertyDI from "./components/PropertyCreate/PropertyDI";
// import LandlordInfo from "./components/PropertyCreate/LandlordInfo";
// _________________________________________________________________________

//Board Creation Rent
import CreateBoard from "./components/BoardCreation/Rent/CreateBoard";
import ViewBoard from "./components/BoardCreation/Rent/ViewBoard";
import BoardCreated from "./components/BoardCreation/Rent/BoardCreated";
import PropertyViewBoard from "./components/BoardCreation/Rent/PropertyViewBoard";

//Board Creation Sale
import CreateBoardS from "./components/BoardCreation/Sale/CreateBoardS";
import ViewBoardS from "./components/BoardCreation/Sale/ViewBoardS";
import BoardCreatedS from "./components/BoardCreation/Sale/BoardCreatedS";

//Sale
import ActiveLeadsS from "./components/AgentDashboard(Sale)/ActiveLeadsS";
import AllActivePropertyS from "./components/AgentDashboard(Sale)/AllActivePropertiesS";
import AllPropertyS from "./components/AgentDashboard(Sale)/AllPropertyS";
import AllTenantOneS from "./components/AgentDashboard(Sale)/AllTenantOneS";
import AvailablePropertyrentalS from "./components/AgentDashboard(Sale)/AvailablePropertyrentalS";
import ChangeStatusS from "./components/AgentDashboard(Sale)/ChangeStatusS";
import DashboardS from "./components/AgentDashboard(Sale)/DashboardS";
import DeactivateTenantS from "./components/AgentDashboard(Sale)/DeactivateTenantS";
import My_propertyPVS from "./components/AgentDashboard(Sale)/My_propertyPVS";
import MyPropSNAS from "./components/AgentDashboard(Sale)/MyPropSNAS";
import My_PropertySS from "./components/AgentDashboard(Sale)/My_PropertySS";
import My_PropertyYTSS from "./components/AgentDashboard(Sale)/My_PropertyYTSS";
import PropertyClosedS from "./components/AgentDashboard(Sale)/PropertyClosedS";
// import propertyComp from "./components/AgentDashboard(Sale)/propertyComp";
import PropertyViewingStatusS from "./components/AgentDashboard(Sale)/PropertyViewingStatusS";
import ReactivatePropertyS from "./components/AgentDashboard(Sale)/ReactivatePropertyS";
// _________________________________________________________________________

import UserLoginDetails from "./components/UserLoginDetails";
// import TenantDetails from "./components/TenantDetails";
// import TenantAdded from "./components/TenantAdded";

// import UploadPhotos from "./components/FieldAgentFlow/UploadPhotos";
// import UploadPhoto2 from "./components/UploadPhoto2";
// import UploadPhotos3 from "./components/FieldAgentFlow/UploadPhotos3";

import PropertyCreated from "./components/PropertyCreate/PropertyCreated";

//Field Agent

//footer
import Footer from "./components/Footer";
import Home from "./components/Home";

function App(props) {
  const [isLogin, setIsLogin] = useState(true);
  const username = localStorage.getItem("username");
  console.log(username);

  const token = localStorage.getItem("token");
  console.log(token);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
      console.log(isLogin);
    } else {
      setIsLogin(false);
      console.log(isLogin);
    }
  });

  // const isDesktopOrLaptop = useMediaQuery({
  //   query: '(min-width: 1224px)'
  // })
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

  const check = () => {
    alert("Please Login First 🙏🏻");
  };

  return (
    <>
      {/* {isTabletOrMobile && (
      )} */}
      <BrowserRouter>
        <div>
          <Routes>
            {/* Protected routes */}
            <Route
              exact
              path="Dashboard"
              element={isLogin ? <Dashboard /> : <FrontLogin />}
            />
            {/* Protected routes ends */}

            <Route exact path="AllProperty" element={<AllProperty />} />

            {/* RegisterLoginUser */}
            <Route exact path="/" element={<SignUp />} />
            <Route exact path="/Home" element={<Home/>} />
            <Route exact path="FrontLogin" element={<FrontLogin />} />
            <Route exact path="AuthCode" element={<AuthCode />} />
            <Route exact path="AdminFront" element={<AdminFront />} />
            <Route exact path="AssignProperty" element={<AssignProperty />} />
            <Route exact path="ResetPassword" element={<ResetPassword />} />
            <Route exact path="EnterOTP" element={<EnterOTP />} />
            <Route exact path="VerifyPage" element={<VerifyPage />} />

            <Route exact path="FieldAgentHomeN" element={<FieldAgentHomeN />} />
            <Route exact path="ConfirmOTPAgent" element={<ConfirmOTPAgent />} />
            <Route exact path="TenantCreated" element={<TenantCreated />} />
            {/* <Route exact path="FieldAgentDetails" element={<FieldAgentDetails />} /> */}
            <Route exact path="ChangeStatus" element={<ChangeStatus />} />
            <Route exact path="ActiveLeads" element={<ActiveLeads />} />
            <Route
              exact
              path="AllActiveProperties"
              element={<AllActiveProperties />}
            />
            <Route exact path="AllProperty" element={<AllProperty />} />
            <Route
              exact
              path="AvailablePropertyrental"
              element={<AvailablePropertyrental />}
            />
            <Route exact path="PropertyClosed" element={<PropertyClosed />} />
            <Route
              exact
              path="PropertyViewingStatus"
              element={<PropertyViewingStatus />}
            />
            <Route
              exact
              path="ReactivateProperty"
              element={<ReactivateProperty />}
            />
            <Route
              exact
              path="DeactivateTenant"
              element={<DeactivateTenant />}
            />

            <Route exact path="My_PropertyPV" element={<My_propertyPV />} />
            <Route exact path="My_PropertyYTS" element={<My_PropertyYTS />} />
            <Route exact path="My_PropertySNA" element={<My_PropertySNA />} />
            <Route exact path="My_PropertyS" element={<My_PropertyS />} />
            <Route exact path="CreateBoard" element={<CreateBoard />} />
            <Route exact path="ViewBoard" element={<ViewBoard />} />
            <Route exact path="BoardCreated" element={<BoardCreated />} />

            <Route exact path="CreateBoardS" element={<CreateBoardS />} />
            <Route
              exact
              path="PropertyViewBoard"
              element={<PropertyViewBoard />}
            />
            <Route exact path="ViewBoardS" element={<ViewBoardS />} />
            <Route exact path="BoardCreatedS" element={<BoardCreatedS />} />

            <Route exact path="FieldPending" element={<FieldPending />} />
            <Route
              exact
              path="FieldAgentVerifyProperty"
              element={<FieldAgentVerifyProperty />}
            />
            <Route
              exact
              path="FieldAgentVerifyPropertyF"
              element={<FieldAgentVerifyPropertyF />}
            />

            <Route exact path="PhotosCapture" element={<PhotosCapture />} />
            <Route exact path="PhotoCaptureTwo" element={<PhotoCaptureTwo />} />
            <Route
              exact
              path="PhotoCaptureThree"
              element={<PhotoCaptureThree />}
            />

            <Route
              exact
              path="VerificationComplete"
              element={<VerificationComplete />}
            />

            <Route exact path="SignUp" element={<SignUp />} />

            <Route
              exact
              path="UserLoginDetails"
              element={<UserLoginDetails isloggedIn={isLogin} />}
            />
            {/* <Route exact path="PropertyDetails" element={<PropertyDetails />} /> */}
            {/* <Route exact path="TenantDetails" element={<TenantDetails />} /> */}
            <Route exact path="AddTenant" element={<AddTenant />} />
            <Route exact path="AllTenantOne" element={<AllTenantOne />} />

            <Route exact path="AddBuyer" element={<AddBuyer />} />
            <Route exact path="BuyerDetails" element={<BuyerDetails />} />
            <Route exact path="BuyerCreated" element={<BuyerCreated />} />

            {/* TennantSide View */}
            <Route exact path="OTPscreen" element={<OTPscreen />} />
            <Route exact path="DetailView" element={<DetailView />} />

            <Route exact path="TenantSideView" element={<TenantSideView />} />
            <Route exact path="DetailImgView" element={<DetailImgView />} />
            <Route exact path="VirtualTour" element={<VirtualTour />} />

            {/* OTP VERIFY */}

            {/* <Route exact path="SuccesfulSignup" element={<SuccessfulSignup />} /> */}

            <Route
              exact
              path="AllActivePropertyS"
              element={<AllActivePropertyS />}
            />
            <Route exact path="ActiveLeadsS" element={<ActiveLeadsS />} />
            <Route exact path="AllPropertyS" element={<AllPropertyS />} />
            <Route exact path="AllTenantOneS" element={<AllTenantOneS />} />
            <Route
              exact
              path="AvailablePropertyrentalS"
              element={<AvailablePropertyrentalS />}
            />
            <Route exact path="ChangeStatusS" element={<ChangeStatusS />} />
            <Route exact path="DashboardS" element={<DashboardS />} />
            <Route
              exact
              path="DeactivateTenantS"
              element={<DeactivateTenantS />}
            />
            <Route exact path="My_propertyPVS" element={<My_propertyPVS />} />
            <Route exact path="MyPropSNAS" element={<MyPropSNAS />} />
            <Route exact path="My_PropertySS" element={<My_PropertySS />} />
            <Route exact path="My_PropertyYTSS" element={<My_PropertyYTSS />} />
            <Route exact path="PropertyClosedS" element={<PropertyClosedS />} />
            <Route
              exact
              path="PropertyViewingStatusS"
              element={<PropertyViewingStatusS />}
            />
            <Route
              exact
              path="ReactivatePropertyS"
              element={<ReactivatePropertyS />}
            />

            {/* <Route exact path="LandlordInfo" element={<LandlordInfo />} />
              <Route exact path="PropertyDI" element={<PropertyDI />} /> */}
            <Route exact path="PropertyInfo" element={<PropertyInfo />} />
            <Route
              exact
              path="EditPropertyInfo"
              element={<EditPropertyInfo />}
            />
            {/* <Route exact path="TenantAdded" element={<TenantAdded />} /> */}

            <Route exact path="UploadPhotos" element={<UploadPhotos />} />
            {/* <Route exact path="UploadPhoto2" element={<UploadPhoto2 />} /> */}
            <Route exact path="UploadPhotos3" element={<UploadPhotos3 />} />
            <Route exact path="dropNav" element={<dropNav />} />
            <Route exact path="PropertyCreated" element={<PropertyCreated />} />

            <Route exact path="Footer" element={<Footer />} />

            <Route exact path="fieldAgentHome" element={<fieldAgentHome />} />

            <Route exact path="AddBuyer" element={<AddBuyer />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;