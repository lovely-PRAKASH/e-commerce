import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import "../styles/ShippingDetail.css";
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { cartItems, total } = location.state;
  
  const handlePayment = async () => {
    const stripe = await loadStripe('pk_test_51Q5PyvAQeC3Gz7CyXV3MTcjnalQm7gyVdhxi3om8s2e6ADPMboOEnIixBwrhrRW5bg02gKGwTW2cqcQHdTivyllX00QwPWxcLu');
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/get-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CartItems: cartItems // Send cartItems array as CartItems
        })
      });
  
      const session = await response.json();
  
      if (session.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (result.error) {
          console.error(result.error);
        }
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Review Your Order</h2>
      
      {/* Display Cart Items */}
      <div className="cart-items-list table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.product._id}>
                <td>{item.product.name}</td>
                <td>₹{(item.product.price * 61.06).toFixed(2)}</td>
                <td>{item.qty}</td>
                <td>₹{(item.product.price * 61.06 * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display Total Amount */}
      <div className="total-amount mt-3 text-right">
        <h4 className='font-weight-bold'>Total: ₹{total.toFixed(2)}</h4>
      </div>

      <button 
        onClick={handlePayment} 
        className="btn btn-success mt-4 w-100 font-weight-bold"
      >
        {`Pay ₹ ${total.toFixed(2)}`}
      </button>
    </div>
  );
};

export default PaymentPage;
