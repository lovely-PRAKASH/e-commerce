import React, { useEffect, useState } from "react";
import axios from "axios";

function ProductTable() {
    const [products, setProducts] = useState([]);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(import.meta.env.VITE_API_URL + "/products");
                setProducts(
                    res.data.products.map((product) => ({
                        ...product,
                        images: product.images.map((img) => ({ image: img.image })), // Ensure images are objects
                        isEditMode: false, // Add isEditMode field
                    }))
                );
            } catch (error) {
                console.error(error);
            }
        };
        fetchProducts();
    }, []);

    // Update product
    const handleUpdateProduct = async (id, updatedProduct) => {
        try {
            // Exclude unnecessary fields and transform data
            const { isEditMode, _id, ...productData } = updatedProduct;

            // Ensure price and stock are strings
            productData.price = productData.price.toString();
            productData.stock = productData.stock.toString();

            // Ensure images array contains objects with an image property
            productData.images = productData.images.map((img) => ({ image: img.image }));

            console.log("Transformed Payload:", productData);

            // Make the API request
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/updateproduct/${id}`,
                productData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Update successful:", response.data);

            // Update local state after successful update
            setProducts(
                products.map((product) =>
                    product._id === id ? { ...updatedProduct, isEditMode: false } : product
                )
            );
        } catch (error) {
            console.error("Update failed:", error.response?.data || error.message);
        }
    };

    // Delete product
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(import.meta.env.VITE_API_URL + `/deleteproduct/${id}`);
            setProducts(products.filter((product) => product._id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    // Toggle Edit Mode
    const toggleEditMode = (id) => {
        setProducts(
            products.map((product) =>
                product._id === id ? { ...product, isEditMode: !product.isEditMode } : product
            )
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Product Management</h2>
            <div className="table-responsive">
                <table className="table table-striped table-hover w-100">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
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
                                        src={product.images[0]?.image}
                                        alt={product.name}
                                        width="40"
                                        height="40"
                                        style={{ borderRadius: "5%" }}
                                    />
                                </td>
                                <td>
                                    {product.isEditMode ? (
                                        <input
                                            type="text"
                                            value={product.name}
                                            onChange={(e) =>
                                                setProducts(
                                                    products.map((p) =>
                                                        p._id === product._id
                                                            ? { ...p, name: e.target.value }
                                                            : p
                                                    )
                                                )
                                            }
                                            className="form-control"
                                        />
                                    ) : (
                                        product.name
                                    )}
                                </td>
                                <td>
                                    {product.isEditMode ? (
                                        <textarea
                                            value={product.description}
                                            onChange={(e) =>
                                                setProducts(
                                                    products.map((p) =>
                                                        p._id === product._id
                                                            ? { ...p, description: e.target.value }
                                                            : p
                                                    )
                                                )
                                            }
                                            className="form-control"
                                        />
                                    ) : (
                                        product.description
                                    )}
                                </td>
                                <td>
                                    {product.isEditMode ? (
                                        <input
                                            type="number"
                                            value={product.price}
                                            onChange={(e) =>
                                                setProducts(
                                                    products.map((p) =>
                                                        p._id === product._id
                                                            ? { ...p, price: e.target.value }
                                                            : p
                                                    )
                                                )
                                            }
                                            className="form-control"
                                        />
                                    ) : (
                                        product.price
                                    )}
                                </td>
                                <td>
                                    {product.isEditMode ? (
                                        <input
                                            type="text"
                                            value={product.category}
                                            onChange={(e) =>
                                                setProducts(
                                                    products.map((p) =>
                                                        p._id === product._id
                                                            ? { ...p, category: e.target.value }
                                                            : p
                                                    )
                                                )
                                            }
                                            className="form-control"
                                        />
                                    ) : (
                                        product.category
                                    )}
                                </td>
                                <td>
                                    {product.isEditMode ? (
                                        <input
                                            type="number"
                                            value={product.stock}
                                            onChange={(e) =>
                                                setProducts(
                                                    products.map((p) =>
                                                        p._id === product._id
                                                            ? { ...p, stock: e.target.value }
                                                            : p
                                                    )
                                                )
                                            }
                                            className="form-control"
                                        />
                                    ) : (
                                        product.stock
                                    )}
                                </td>
                                <td>
                                    {product.isEditMode ? (
                                        <input
                                            type="number"
                                            value={product.offers}
                                            onChange={(e) =>
                                                setProducts(
                                                    products.map((p) =>
                                                        p._id === product._id
                                                            ? { ...p, offers: e.target.value }
                                                            : p
                                                    )
                                                )
                                            }
                                            className="form-control"
                                        />
                                    ) : (
                                        product.offers
                                    )}
                                </td>
                                <td>
                                    {product.isEditMode ? (
                                        <button
                                            className="btn btn-sm btn-success me-2"
                                            onClick={() => handleUpdateProduct(product._id, product)}
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-sm btn-warning me-2 w-100 mb-2"
                                            onClick={() => toggleEditMode(product._id)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        className="btn btn-sm btn-danger"
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
        </div>
    );
}

export default ProductTable;
