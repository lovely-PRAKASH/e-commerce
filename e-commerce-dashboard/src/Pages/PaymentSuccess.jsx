import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

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
