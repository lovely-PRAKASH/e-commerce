import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import logo from '/logo/logo-removebg-preview.png'
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError]=useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setError(null)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("User Data:", formData);
    // console.log(import.meta.env.VITE_API_URL + "/register",'routes');
    axios
      .post(import.meta.env.VITE_API_URL + "/register", formData)
      .then((res) => {
        if (res.data.success) {
          console.log("Registration successful");
          localStorage.setItem("isRegistered", "true"); // Set a flag in localStorage
          toast.success("Registration successful", { theme: "colored" });
          navigate("/login");
          // Handle successful registration, and redirect the user
        }
      })
      .catch((error) => {
        console.error("Error signup:", error.response?.data?.message || error.message);
        setError(error.response?.data?.message || error.message)

      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
<div className="container signup d-flex flex-column flex-md-row justify-content-center align-items-center col-12 mt-5">
  {/* Logo Section */}
  <img src={logo} alt="GoCart" className="shadow mb-4 mb-md-0" />

  {/* Signup Form Section */}
  <div className="signupPage d-flex flex-column p-4 shadow-lg">
    <h2 className="text-center">Signup</h2>
   {error&& <p style={{color:"red"}}>{error}</p>}

    {/* Signup Form */}
    <form onSubmit={handleSubmit} className="mt-3">
      {/* Username Field */}
      <div className="form-group d-flex align-items-center mb-3">
        <label className="mr-2 d-flex align-items-center">
          <FaRegUser />
        </label>
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email Field */}
      <div className="form-group d-flex align-items-center mb-3">
        <label className="mr-2 d-flex align-items-center">
          <MdOutlineMail />
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password Field */}
      <div className="form-group d-flex align-items-center mb-4">
        <label className="mr-2 d-flex align-items-center">
          <RiLockPasswordFill />
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Password must be 7 char"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Signup Button */}
      {/* <Button variant="contained" type="submit" className="btnSignup btn-primary mt-3 w-100">
       {loading?"Loading...": Signup}
      </Button> */}
      <Button
            type="submit"
            className="btnSignup btn-primary mt-3 w-100"
            disabled={loading} fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Signup"}{" "}
            {/* Show loader when submitting */}
          </Button>
    </form>

    {/* Already Have an Account */}
    <p className="mt-3 text-center">Already have an Account?</p>

    {/* Login Button */}
    <Link to="/login" className="w-100">
      <Button variant="contained" className="btnLogin btn-success w-100 mt-1">
        Login
      </Button>
    </Link>
  </div>
</div>

  );
};

export default Signup;