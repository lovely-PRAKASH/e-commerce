import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineMail } from "react-icons/md";
import { IoKey } from "react-icons/io5";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Reset any previous errors
console.log(credentials,'client data')
    axios
      .post(import.meta.env.VITE_API_URL + "/login", credentials)
      .then((res) => {
        console.log("Server response:", res);
        if (res.data.success) {
          localStorage.setItem('isLoggedIn', true);
          localStorage.setItem("user",JSON.stringify({email:credentials.email}));
          console.log("Login successful");
          navigate("/ ");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          setError("Invalid email or password");
        } else if (err.response && err.response.status === 404) {
          setError("User not found");
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container login d-flex">
      <div className="mt-5 loginPage d-flex">
        <h2>Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit} className="m-3">
          <div className="form-group d-flex">
            <label><MdOutlineMail/></label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="E-mail"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group d-flex">
            <label><IoKey/></label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button
            type="submit"
            className="btnLogin btn-success mt-3"
            disabled={loading} fullWidth
          >
            {loading ? <CircularProgress size={24} /> : "Login"}{" "}
            {/* Show loader when submitting */}
          </Button>
        </form>
        <p>If Your are not Signup?</p>
        <Link to="/signup">
          <Button variant="contained" type="submit" className="d-flex btnSignup btn-success mt-2 login-btn" fullWidth>
            Signup
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
