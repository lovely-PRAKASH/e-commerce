import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  // const location = useLocation();
  // const { cartItems, total, shippingInfo } = location.state;

  // useEffect(async () => {
  //   await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
  //     shippingInfo,
  //     cartItems,
  //     totalAmount: total,
  //     // paymentSessionId: session.id // Store the session ID with the order
  //   }).then(response => {
  //     console.log("Order submission response:", response.data);
  //   }).catch(error => {
  //     console.error("Error submitting order:", error);
  //   });
  // }, [])
  return (
    <div className="text-center mt-5">
      <h1 className="text-success display-4">Payment Successful!</h1>
      <p className="lead">Thank you for your purchase.</p>
      <button className="btn btn-info  mt-3" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default PaymentSuccess;
