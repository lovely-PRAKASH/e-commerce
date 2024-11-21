import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    ratings: "",
    count: "",
    images: [], // Array to store selected images
    category: "",
    seller: "",
    stock: "",
    offers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to an array
    setProductData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("price", productData.price);
    formData.append("description", productData.description);
    formData.append("ratings", productData.ratings);
    formData.append("count", productData.count);
    productData.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("category", productData.category);
    formData.append("seller", productData.seller);
    formData.append("stock", productData.stock);
    formData.append("offers", productData.offers);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/addproduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
      setProductData({
        name: "",
        price: "",
        description: "",
        ratings: "",
        count: "",
        images: [],
        category: "",
        seller: "",
        stock: "",
        offers: "",
      });
    } catch (error) {
      console.error("Error adding product:", error.response?.data?.message || error.message);
      alert("Failed to add product.");
    }
  };
console.log("images",productData.images)
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center" style={{ gap: 5 }}>
        <Link to="/dashboard">
          <p>Dashboard |</p>
        </Link>
        <Link to="/products">
          <p>Products |</p>
        </Link>
        <Link to="/addproducts">
          <p>Add product |</p>
        </Link>
        <Link to="/users">
          <p>Users</p>
        </Link>
      </div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Reviews</label>
          <input
            type="number"
            placeholder="Rate between (1 to 5)"
            className="form-control"
            name="ratings"
            value={productData.ratings}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Count</label>
          <input
            type="text"
            className="form-control"
            name="count"
            value={productData.count}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            name="images"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control"
            name="category"
            value={productData.category}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Seller</label>
          <input
            type="text"
            className="form-control"
            name="seller"
            value={productData.seller}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="text"
            className="form-control"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Offers</label>
          <input
            type="text"
            className="form-control"
            name="offers"
            value={productData.offers}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
