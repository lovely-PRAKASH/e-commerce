import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHome, FaBox, FaShoppingCart, FaUsers, FaCog } from 'react-icons/fa';

function Dashboard() {
    const [orders, setOrders] = useState({});
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(import.meta.VITE_API_URL + "/getorders");
                setOrders(res.data.orders);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrders()
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <h5 className="text-center mt-3">Admin Dashboard</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">
                                    <FaHome className="me-2" /> Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FaBox className="me-2" /> Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <FaShoppingCart className="me-2" /> Orders
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
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
                                    <p className="card-text">₹ 150,000</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-success mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Total Orders</h5>
                                    <p className="card-text">1,200</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-warning mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Pending Orders</h5>
                                    <p className="card-text">150</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-white bg-danger mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Total Users</h5>
                                    <p className="card-text">1,000</p>
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
                                <tr>
                                    <td>1</td>
                                    <td>#12345</td>
                                    <td>John Wick</td>
                                    <td>2024-11-10</td>
                                    <td>
                                        <span className="badge bg-success">Completed</span>
                                    </td>
                                    <td>₹ 2,500</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary">View</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>#12346</td>
                                    <td>Will Smith</td>
                                    <td>2024-11-11</td>
                                    <td>
                                        <span className="badge bg-warning">Pending</span>
                                    </td>
                                    <td>₹ 1,800</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary">View</button>
                                    </td>
                                </tr>
                                {/* Add more orders here */}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
