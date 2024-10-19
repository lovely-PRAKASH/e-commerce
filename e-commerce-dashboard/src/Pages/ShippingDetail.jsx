import React, { useState } from "react";
import "../styles/ShippingDetail.css";
import { useLocation, useNavigate } from "react-router-dom";

const ShippingDetail = () => {
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const navigate=useNavigate();
  const location=useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({ ...shippingInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    localStorage.setItem("shippingDetails", JSON.stringify(shippingInfo));

    console.log("Shipping Information:", shippingInfo);
    navigate("/payment",{
      state:{
        cartItems:location.state.cartItems,
        total:location.state.total
      }
    })
  };

  return (
    <div className="shipping-form-container mt-3">
     {/* shipping detail block */}
      <h2>Shipping Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          {/*  */}
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={shippingInfo.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          {/* address block */}
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={shippingInfo.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          {/* city block  */}
          <label>City</label>
          <input
            type="text"
            name="city"
            value={shippingInfo.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={shippingInfo.state}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={shippingInfo.zipCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={shippingInfo.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-submit font-weight-bold">Submit & Continue</button>
      </form>
    </div>
  );
};

export default ShippingDetail;
