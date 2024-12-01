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
import Dashboard from "./Components/admin/Dashboard.jsx";
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
  const [mode, setMode] = useState("light");
  const [exchangeRates, setExchangeRates] = useState({});
  const [convertedRate, setConvertedRate] = useState(null);
  const [currencySymbol, setCurrencySymbol]=useState("")

  const location = useLocation();

  useEffect(() => {
    const userRegistered = localStorage.getItem("isRegistered");
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    setIsRegistered(!!userRegistered);
    setIsLoggedIn(!!userLoggedIn);
    setLoading(false);
  }, []);

  useEffect(() => {
    getCountry("https://restcountries.com/v3.1/all");
    getExchangeRate("https://api.currencyfreaks.com/latest?apikey=6194e7a49b2d49ecbc501912bc3b6abc");
  }, []);

  const getCountry = async (url) => {
    try {
      const res = await axios.get(url);
      const processedCountries = res.data.map((country) => {
        // Extract necessary fields
        const countryName = country.name?.common || "Unknown Country";
        const cca2 = country.cca2 || "N/A";
        const cca3 = country.cca3 || "N/A";
        const currencyKey = Object.keys(country.currencies || {})[0];
        const currency = country.currencies?.[currencyKey] || { name: "N/A", symbol: "N/A" };
  
        return {
          name: countryName,
          cca2,
          cca3,
          currency: {
            code: currencyKey || "N/A",
            name: currency.name || "N/A",
            symbol: currency.symbol || "N/A",
          },
        };
      });
  
      setCountryList(processedCountries);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    if (countryList.length > 0) {
      console.log("Processed Country List:", countryList);
    }
  }, [countryList]);
  

  const getExchangeRate = async (url) => {
    try {
      const res = await axios.get(url);
      const rates = res.data.rates;
      const base = res.data.base;

      setExchangeRates(rates);
      calculateConversion(rates, base);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const calculateConversion = (rates, base) => {
    const countryCurrency = localStorage.getItem("selectedCurrency");
    const selectedSymbol = localStorage.getItem("selectedSymbol");

    if (countryCurrency && rates[countryCurrency]) {
      setConvertedRate(rates[countryCurrency]);
      setCurrencySymbol(selectedSymbol)
    } else {
      console.warn("Conversion rate not found for countryCurrency, using base currency rate.");
      alert("Conversion rate not found for countryCurrency, using base currency rate.")
      setConvertedRate(rates[base]);
      setCurrencySymbol("$")
    }
  };
console.log("exchange rate",convertedRate);
  const values = {
    countryList,
    cartItems,
    setCartItems,
    convertedRate,
    currencySymbol
  };

  const darkMode = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#1976d2" : "#ed6c02",
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#121212",
      },
      text: {
        primary: mode === "light" ? "#000000" : "#ffffff",
      },
    },
  });
  const showHeader = location.pathname !== "/login" && location.pathname !== "/signup";

  if (loading) {
    return (
      <div>
        <CircularProgress size={34} />
      </div>
    );
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
          <Route
            path="/"
            element={
              <ProtectedRoute isRegistered={isRegistered} isLoggedIn={isLoggedIn}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isRegistered={isRegistered} isLoggedIn={isLoggedIn}>
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
              </ProtectedRoute>
            }
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/shippingInfo" element={<ShippingDetail />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failure" element={<PaymentFailure />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UserTable />} />
          <Route path="/products" element={<ProductTable />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </myContext.Provider>
    </ThemeProvider>
  );
}

export default App;
export { myContext };
