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
import UserTable from "./Components/admin/UserTable.jsx";
import ProductTable from "./Components/admin/ProductTable.jsx";
import AddProducts from "./Components/admin/AddProduct.jsx";
import Orders from "./Pages/Orders.jsx";

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
      mode, // Dynamically set mode ('light' or 'dark')
      primary: {
        main: mode === 'light' ? '#1976d2' : '#ed6c02', // Blue for light, lighter blue for dark
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1', // Pink for both, slightly different
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212', // White for light, dark gray for dark
        paper: mode === 'light' ? '#f5f5f5' : '#1d1d1d',   // Light gray vs darker gray
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff', // Black text for light, white for dark
        secondary: mode === 'light' ? '#4f4f4f' : '#b0bec5', // Subtle grays for both modes
      },
      span: {
        primary: mode === 'light' ? '#000000' : '#ffffff', // Black text for light, white for dark
        secondary: mode === 'light' ? '#4f4f4f' : '#b0bec5', // Subtle grays for both modes
      },
      del: {
        primary: mode === 'light' ? '#0000004d' : '#ffffff', // Black text for light, white for dark
        secondary: mode === 'light' ? '#4f4f4f' : '#b0bec5', // Subtle grays for both modes
      },
      error: {
        main: '#d32f2f', // Same error color for both modes
      },
      warning: {
        main: '#ed6c02', // Same warning color for both modes
      },
      info: {
        main: mode === 'light' ? '#0288d1' : '#29b6f6', // Slightly lighter info for dark
      },
      success: {
        main: '#2e7d32', // Same success color for both modes
      },
      
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
          <Route path="/users" element={<UserTable/>}/>
          <Route path="/products" element={<ProductTable/>}/>
          <Route path="/addproducts" element={<AddProducts/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </myContext.Provider>
    </ThemeProvider>
  );
}

export default App;
export { myContext };
