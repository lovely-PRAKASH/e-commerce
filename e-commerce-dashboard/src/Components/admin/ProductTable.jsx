import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductTable() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        category: '',
        seller: '',
        stock: '',
        offers: ''
    });

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/products");
                setProducts(res.data.products);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    // Add a product
    const handleAddProduct = async () => {
        try {
            const res = await axios.post(import.meta.env.VITE_API_URL + "/addproduct", newProduct);
            setProducts([...products, res.data]);
            setNewProduct({ name: '', price: '', description: '', category: '', seller: '', stock: '', offers: '' });
        } catch (error) {
            console.error(error);
        }
    };

    // Update a product
    const handleUpdateProduct = async (id, updatedData) => {
        try {
            await axios.put(import.meta.env.VITE_API_URL + `/updateproduct/${id}`, updatedData);
            setProducts(products.map(product => (product._id === id ? { ...product, ...updatedData } : product)));
        } catch (error) {
            console.error(error);
        }
    };

    // Delete a product
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL + `/deleteproduct/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Product Management</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Stock</th>
                            <th>Offers</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={product.images[0].image}
                                        alt={product.name}
                                        width="40"
                                        height="40"
                                        style={{ borderRadius: '5%' }}
                                    />
                                </td>
                                <td>{product.name}</td>
                                <td>₹ {Number(product.price *61.06).toFixed(2)}</td>
                                <td>{product.category}</td>
                                <td>{product.stock}</td>
                                <td>{product.offers}%</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-warning me-2 mb-2 w-100"
                                        onClick={() => {
                                            const updatedData = { ...product, stock: parseInt(product.stock) + 1 };
                                            handleUpdateProduct(product._id, updatedData);
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger w-100"
                                        onClick={() => handleDeleteProduct(product._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add New Product Form */}
            <div className="mt-4">
                <h4>Add New Product</h4>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddProduct();
                    }}
                >
                    <div className="row">
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Category"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Stock"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Offers"
                                value={newProduct.offers}
                                onChange={(e) => setNewProduct({ ...newProduct, offers: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ProductTable;
