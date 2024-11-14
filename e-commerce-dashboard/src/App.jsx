import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home.jsx";
import Header from "./Components/Header/Header";
import Cart from "./Pages/Cart.jsx";
import Signup from "./Components/signup/Signup";
import Login from "./Components/login/Login";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import { CircularProgress, createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import UserProfile from "./Pages/UserProfile.jsx";
import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import PaymentFailure from "./Pages/PaymentFailure.jsx";
import ShippingDetail from "./Pages/ShippingDetail.jsx";
import PaymentPage from "./Pages/PaymentPage.jsx";
import  Dashboard  from "./Components/admin/Dashboard.jsx";

const myContext = createContext();

function App() {
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [mode, setMode] = useState('light');
  const dollarToRupees = 61.06;
  const location = useLocation();

  useEffect(() => {
    const userRegistered = localStorage.getItem("isRegistered");
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    setIsRegistered(!!userRegistered);
    setIsLoggedIn(!!userLoggedIn);
    setLoading(false);
  }, []);

  useEffect(() => {
    getCountry("https://countriesnow.space/api/v0.1/countries");
  }, []);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      setCountryList(res.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const values = {
    countryList,
    cartItems,
    setCartItems,
    dollarToRupees,
  };

  const darkMode = createTheme({
    palette: {
      mode: mode,
      color: 'text.primary',
    },
  });
  const showHeader = location.pathname !== "/login" && location.pathname !== "/signup";

  if (loading) {
    return <div><CircularProgress size={34} /></div>;
  }  

  return (
    <ThemeProvider theme={darkMode}>
      <CssBaseline />
      <myContext.Provider value={values}>
        <ToastContainer />
        {showHeader && <Header cartItems={cartItems} setMode={setMode} mode={mode} />}

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute isRegistered={isRegistered} isLoggedIn={isLoggedIn}>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/search" element={<Home />} />
          <Route path="/cart" element={
            <ProtectedRoute isRegistered={isRegistered} isLoggedIn={isLoggedIn}>
              <Cart cartItems={cartItems} setCartItems={setCartItems} />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute isRegistered={isRegistered} isLoggedIn={isLoggedIn}>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/shippingInfo" element={<ShippingDetail cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/payment" element={<PaymentPage cartItems={cartItems}  />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failure" element={<PaymentFailure />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </myContext.Provider>
    </ThemeProvider>
  );
}

export default App;
export { myContext };
