import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
function UserTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/getusers");
                setUsers(res.data.users);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);
console.log(users)
    return (
        <div className="container mt-4">
                       <div className="d-flex justify-content-center" 
           style={{gap:5}}>
            <Link to="/dashboard"><p>Dashboard |</p></Link>
            <Link to="/products"><p>Products |</p></Link>
            <Link to="/addproducts"><p>Add product |</p></Link>
            <Link to="/users"><p>Users</p></Link> 
           </div>
            <h2 className="text-center mb-4">User List</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={`/profile/${user.avatar}`}
                                        alt={`${user.username}'s avatar`}
                                        width="40"
                                        height="40"
                                        style={{ borderRadius: '50%' }}
                                    />
                                </td>               
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserTable;
