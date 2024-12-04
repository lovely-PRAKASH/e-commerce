import React, { useContext, useEffect, useState } from "react";
import NavBar from "./Navigation/NavBar"
import logo from "/logo/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CountryDrop from "../CountryDropDown/CountryDrop.jsx";
import { Button, Checkbox, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { FaRegUser } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import Badge from "@mui/material/Badge";
import SearchBox from "./SearchBox/SearchBox";
import { myContext } from "../../App.jsx";
import { IoMdSunny } from "react-icons/io";
import { HiOutlineMoon } from "react-icons/hi2";
import axios from "axios";

function Header({ cartItems, setMode, mode }) {
  const { countryList, convertedRate, currencySymbol } = useContext(myContext);
  const [isOpen, setisOpen] = useState(null); // State to control the menu visibility
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation();
  const [isNight, setIsNight] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userCheck, setUserCheck] = useState([])

  const showNavbar = location.pathname !== '/cart' && location.pathname !== '/profile' && location.pathname !== '/search';
  const showSearch = location.pathname !== '/products'
    && location.pathname !== '/profile'
    && location.pathname !== '/dashboard'
    && location.pathname !== '/addproducts'
    && location.pathname !== '/users'
    && location.pathname !== '/orders'
    ;

  // const userName=JSON.parse(localStorage.getItem('user'))
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.qty * convertedRate,
    0
  );

  const user = JSON.parse(localStorage.getItem('user'))
  const email = user?.email ? String(user.email) : "";
  // console.log(email)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/checkadmin`,
          { params: { email } }
        );
        setUserCheck(response.data.user);

        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [email]);


  // console.log("userdata", userCheck)
  // console.log("avatar", userCheck[0]?.avatar)
  const role = userCheck && userCheck.length > 0 ? userCheck[0].role : null; // Safely access the role
  // console.log(role);

  const handleClick = (event) => {
    setisOpen(event.currentTarget); // Open the menu when the user icon is clicked
  };

  const handleClose = () => {
    setisOpen(null); // Close the menu
  };

  const handleLogout = () => {
    // Clear user data and redirect to login page
    // localStorage.removeItem("isRegistered");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user")
    navigate("/login");
  };

  const handleProfile = () => {
    // Navigate to profile page or perform relevant action
    console.log("Profile clicked");
    navigate("/profile")
    handleClose();
  };

  const handleDashboard = () => {
    navigate("/dashboard");
    handleClose();
  }
  const handleOrders = () => {
    navigate("/orders");
    handleClose();
  }
  return (
    <div className="headerWrapper">
      <div className="top-strip bg-blue py-2">
        <div className="container scrolling-container">
          <p className="mb-0 text-center scrolling-text">
            New Customers: Use Code WELCOME10 for 10% Off! | Low Stock Alert:
            Grab Your Favorites Before They're Gone!
          </p>
        </div>
      </div>

      <header className="header py-3">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {/* Logo Wrapper */}
            <div className="logoWrapper col-6 col-sm-4 col-md-2 d-flex align-items-center">
              <Link to={"/"}>
                <img src={logo} alt="logo" className="img-fluid" />
              </Link>
            </div>

            {/* Search Bar and Profile */}
            <div className="col-12 col-sm-8 col-md-10 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center w-100">
                {countryList?.length !== 0 && <CountryDrop />}
                {/* Search bar */}
                {showSearch ? <div className="searchboxWrapper flex-grow-1 mx-2">
                  <SearchBox />
                </div> : <div className=" flex-grow-1 mx-2"></div>
                }
                {/* Profile and Cart Section */}
                <div className="profileCartWrapper part3 d-flex align-items-center">
                  <Tooltip title={`${userCheck[0]?.username} profile`} arrow placement="top">
                    <Button className="circle mr-3" id="demo-positioned-menu" onClick={handleClick}>
                      {userCheck[0]?.avatar ?
                        <img
                          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                          src={`./profile/${userCheck[0]?.avatar}`}
                          alt="" /> : <FaRegUser />}
                    </Button>
                  </Tooltip>
                  <Menu
                    id="demo-positioned-menu"
                    anchorEl={isOpen}
                    open={Boolean(isOpen)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    {role == "admin" && <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>}
                    <MenuItem onClick={handleProfile}>Profile</MenuItem>
                    <MenuItem onClick={handleOrders}>Your Orders</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>

                  {/* Cart Section */}
                  <div className="cartTab d-flex align-items-center ml-auto">
                    <Tooltip title="Total Amount" arrow placement="top">
                      <span className="price headerprice">{currencySymbol}&nbsp;{totalAmount.toFixed(2)}</span>
                    </Tooltip>
                    <div className="position-relative ml-1">
                      <Tooltip title="Cart" arrow placement="top">
                        <Button className="cartIcon ml-auto shadow">
                          <Link to={"/cart"}>
                            <Badge badgeContent={cartItems.length} color="error">
                              <LiaShoppingBagSolid />
                            </Badge>
                          </Link>
                        </Button>
                      </Tooltip>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div className="darkMode shadow ml-2">
                      <Tooltip title="Dark Mode" arrow placement="top">
                        <IconButton
                          aria-label="toggle dark mode"
                          onChange={() => setMode(mode === "light" ? "dark" : "light")}
                        >
                          <Checkbox
                            icon={<HiOutlineMoon className="moonSvg" />}
                            checkedIcon={<IoMdSunny className="sunSvg" />}
                            checked={isNight}
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navbar (if needed) */}
      {/* {showNavbar && <NavBar />} */}
    </div>

  );
}

export default Header;
