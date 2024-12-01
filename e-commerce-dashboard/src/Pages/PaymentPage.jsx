import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import "../styles/ShippingDetail.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  console.log(location);
  const { cartItems, total, shippingInfo,currencySymbol,convertedRate} = location.state;
console.log("total",total)
  const handlePayment = async () => {
    const stripe = await loadStripe('pk_test_51Q5PyvAQeC3Gz7CyXV3MTcjnalQm7gyVdhxi3om8s2e6ADPMboOEnIixBwrhrRW5bg02gKGwTW2cqcQHdTivyllX00QwPWxcLu');

    try {
      // Step 1: Initiate payment request
      const response = await fetch(import.meta.env.VITE_API_URL + "/get-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          CartItems: cartItems // Send cartItems as part of the payment request
        })
      });

      const session = await response.json();

      if (!session.id) {
        console.error("Session ID is missing.");
        return;
      }

      // Step 2: Send order details to the server after getting the payment session ID
      await axios.post(`${import.meta.env.VITE_API_URL}/order`, {
        shippingInfo,
        cartItems,
        totalAmount: total,
        currencySymbol,
        convertedRate,
        paymentSessionId: session.id // Store the session ID with the order
      }).then(response => {
        console.log("Order submission response:", response.data);
      }).catch(error => {
        console.error("Error submitting order:", error);
      });

      // Step 3: Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Payment initiation or order submission failed:", error);
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
                <td>
                  <img
                    src={`/products/${item.product.images[0].image}`}
                    alt={item.product.name}
                    style={{ width: "50px", height: "50px" }}
                  />                  
                  {item.product.name}</td>
                <td>{currencySymbol}&nbsp;{(item.product.price * 61.06).toFixed(2)}</td>
                <td>{item.qty}</td>
                <td>{currencySymbol}&nbsp;{(item.product.price * 61.06 * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display Total Amount */}
      <div className="total-amount mt-3 text-right">
        <h4 className="font-weight-bold">Total + Tax: {currencySymbol}&nbsp;{total.toFixed(2)}</h4>
      </div>

      <button
        onClick={handlePayment}
        className="btn btn-success mt-4 w-100 font-weight-bold"
      >
        {`Pay ${currencySymbol} ${total.toFixed(2)}`}
      </button>
    </div>
  );
};

export default PaymentPage;
