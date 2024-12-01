import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
const ordersPerPage = 5; // Number of products per page


const indexOfLastOrder = currentPage * ordersPerPage;
const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const navigate=useNavigate();
  useEffect(() => {
    // Fetch Orders
    const fetchOrders = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/getorders");
        const ordersData = res.data.orders || [];
        setOrders(ordersData);

        // Calculate metrics based on orders data
        setTotalOrders(ordersData.length);
        setTotalSales(
          ordersData.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
        );
        setPendingOrders(
          ordersData.filter((order) => order.status === "pending").length
        );
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    // Fetch Users (if available from API)
    const fetchUsers = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/getusers");
        console.log("users",res)
        setTotalUsers(res.data.users?.length || 0);
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };

    fetchOrders();
    fetchUsers();
  }, []);

  const handleUsers=()=>{
    navigate("/users")
  }

  const handleProduct=()=>{
    navigate("/products")
  }
  const handleAddProduct=()=>{
    navigate("/addProducts")
  }

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
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-2 d-none d-md-block  sidebar">
          <div className="sidebar-sticky">
            <h5 className="text-center mt-3">Admin Dashboard</h5>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  <FaHome className="me-2" /> Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleProduct}>
                  <FaBox className="me-2" /> Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleAddProduct}>
                  <FaShoppingCart className="me-2" /> Add Products
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleUsers}>
                  <FaUsers className="me-2" /> Users
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <FaCog className="me-2" /> Settings
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
          </div>

          {/* Dashboard Cards */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card text-white bg-primary mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Sales</h5>
                  <p className="card-text">₹ {totalSales.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-success mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Orders</h5>
                  <p className="card-text">{totalOrders}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-warning mb-3">
                <div className="card-body">
                  <h5 className="card-title">Pending Orders</h5>
                  <p className="card-text">{pendingOrders}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card text-white bg-danger mb-3">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <p className="card-text">{totalUsers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  currentOrders.map((order, index) => (
                    <tr key={order._id}>
                      <td>{index + 1}</td>
                      <td>{order._id}</td>
                      <td>{order.shippingInfo?.fullName}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Completed"
                              ? "bg-success"
                              : "bg-warning"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>{order.currencySymbol|| "₹"} {order.totalAmount.toFixed(2)}</td>
                      <td>
                        <button className="btn btn-sm btn-primary">View</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
