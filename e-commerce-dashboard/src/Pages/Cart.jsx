import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import { myContext } from "../App.jsx";
import { toast, Bounce } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Cart = ({ cartItems, setCartItems }) => {
  const { dollerToRupees = 61.06 } = useContext(myContext);
  const [complete, setComplete] = useState(false);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Load cart items from localStorage when the component mounts
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    if (storedCartItems.length > 0) {
      setCartItems(storedCartItems);
    }
  }, [setCartItems]);

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Calculate subtotal and total when cartItems change
  useEffect(() => {
    const newSubtotal = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const newTotal = cartItems.reduce(
      (acc, item) => acc + item.product.price * item.qty * dollerToRupees,
      0
    );
    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }, [cartItems, dollerToRupees]);

  // Calculate tax based on total
  useEffect(() => {
    const calculatedTax = total > 10000 ? 20 : 10;
    setTax(calculatedTax);
  }, [total]);

  // Update quantity - minus
  const minus = (item) => {
    if (item.qty > 1) {
      const updatedItems = cartItems.map((i) =>
        i.product._id === item.product._id ? { ...i, qty: i.qty - 1 } : i
      );
      setCartItems(updatedItems);
    } else {
      toast.warn("Minimum quantity is 1", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  // Update quantity - plus
  const plus = (item) => {
    if (item.qty >= item.product.stock) {
      return toast.error("Maximum stock limit reached", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "colored",
        transition: Bounce,
      });
    }
    const updatedItems = cartItems.map((i) =>
      i.product._id === item.product._id ? { ...i, qty: i.qty + 1 } : i
    );
    setCartItems(updatedItems);
  };

  // Remove a single item
  const removeItem = (item) => {
    const filteredItems = cartItems.filter(
      (i) => i.product._id !== item.product._id
    );
    setCartItems(filteredItems);
    localStorage.setItem("cartItems", JSON.stringify(filteredItems));
  };

  // Remove all items
  const removeAll = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // Navigate to shipping details
  const placeOrderHandler = () => {
    const totalWithTax=total+tax;
    navigate("/shippingInfo", { state: { cartItems, total:totalWithTax} });
  };

  return cartItems.length > 0 ? (
    <div className="container mt-4">
      <div className="row">
        {/* Left side: Cart details */}
        <div className="col-md-8">
          <table className="table table-striped table-bordered table-hover mb-4">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th></th>
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
                    {item.product.name}
                  </td>
                  <td>₹{(item.product.price * dollerToRupees).toFixed(2)}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Button onClick={() => minus(item)}>-</Button>
                      <input
                        type="number"
                        value={item.qty}
                        className="form-control text-center"
                        style={{ width: "50px", margin: "0 10px" }}
                        readOnly
                      />
                      <Button onClick={() => plus(item)}>+</Button>
                    </div>
                  </td>
                  <td>
                    ₹{(item.product.price * dollerToRupees * item.qty).toFixed(2)}
                  </td>
                  <td>
                    <Button
                      onClick={() => removeItem(item)}
                      className="btn btn-danger btn-sm"
                    >
                      &times;
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-end m-2">
            <Button onClick={removeAll} className="btn btn-danger">
              Remove All
            </Button>
          </div>
        </div>

        {/* Right side: Cart totals */}
        <div className="col-md-4">
          <div className="border p-3">
            <h4>Order Summary</h4>
            <div className="d-flex justify-content-between">
              <span>Subtotal (Total Quantity)</span>
              <span><strong>{subtotal}</strong> units</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Tax Amount</span>
              <span>₹ <strong>{tax.toFixed(2)}</strong></span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Total (Order Amount)</span>
              <span>₹ <strong>{(total + tax).toFixed(2)}</strong></span>
            </div>
            <hr />
            <Button
              className="btn btn-success btn-block"
              onClick={placeOrderHandler}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container d-flex display-4 mt-4 justify-content-center">
      <p className="d-flex flex-column">Your cart is empty. <Link to="/" className="d-flex justify-content-center mt-5">Return to Shop</Link></p>
    </div>
  );
};

export default Cart;
