import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <h1 className="text-danger display-4">Payment Failed</h1>
      <p className="lead">Something went wrong. Please try again.</p>
      <button className="btn btn-danger mt-3" onClick={() => navigate('/cart')}>
        Retry Payment
      </button>
    </div>
  );
};

export default PaymentFailure;
