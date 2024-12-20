import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Barcode from 'react-barcode';
// @ts-nocheck
import html2pdf from 'html2pdf.js';
import { myContext } from '../App';


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2; // Number of products per page


  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);


  const user = JSON.parse(localStorage.getItem('user'))
  const email = user?.email ? String(user.email) : "";
  console.log(email)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orderbyemail`,
          { params: { email } }
        );
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [email]); // This will only run when email changes

  if (loading) {
    return <div className="d-flex justify-content-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="d-flex justify-content-center text-danger mt-5">{error}</div>;
  }

  if (!orders.length) {
    return <div className="d-flex justify-content-center mt-5">No orders found.</div>;
  }

  const handlePrint = (orderId) => {
    const element = document.querySelector(`#invoice-${orderId}`);
    if (!element) {
      console.error(`Element with ID #invoice-${orderId} not found`);
      return;
    }
    const options = {
      margin: 1,
      filename: `invoice_${orderId}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().set(options).from(element).save();
  };

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };


  return (
    <>
      {loading ? <div className="d-flex justify-content-center">Loading...</div> :
        <div className="container mt-4">
          <h2 className="text-center mb-4">Your Orders</h2>

          {/* List of Orders */}
          {currentOrders.map((order) => {
            const { shippingInfo, cartItems, totalAmount, currencySymbol, convertedRate, createdAt, _id } = order;

            return (
              <div key={_id} className="order-invoice my-4 p-3 border">
                {/* Invoice to Print */}
                <div id={`invoice-${_id}`} className="invoice-container">
                  <div className="barcode d-flex justify-content-between align-items-center">
                    <h3>Order ID: {_id}</h3>
                    <Barcode value={_id} width={1} height={50} displayValue={false} renderer="img" />
                  </div>
                  <p><strong>Shipping Info:</strong></p>
                  <p>{shippingInfo.fullName}</p>
                  <p><strong>Address:</strong></p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.zipCode}</p>
                  <p><strong>Phone:&nbsp;</strong>{shippingInfo.phone}</p>
                  <p><strong>Email:&nbsp;</strong>{shippingInfo.email}</p>
                  <p><strong>Order Date:&nbsp;</strong>{new Date(createdAt).toLocaleDateString()}</p>
                  <p><strong>Total Amount:&nbsp;</strong>{currencySymbol || "₹"}&nbsp;{totalAmount.toFixed(2)}</p>

                  {/* Cart Items Table */}
                  <table className="table table-bordered">
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
                          <td>{currencySymbol || "₹"}&nbsp;{(item.product.price * (convertedRate || 61.06)).toFixed(2)}</td>
                          <td>{item.qty}</td>
                          <td>{currencySymbol || "₹"}&nbsp;{(item.product.price * item.qty * (convertedRate || 61.06)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Print Button for Each Order */}
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handlePrint(_id)}
                >
                  Print Invoice
                </button>
              </div>
            );
          })}

        </div>}
      <div className="pagination-container d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary mx-2"
          onClick={handlePrevPage}
          disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="btn btn-primary mx-2"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

    </>
  );
};

export default Orders;
