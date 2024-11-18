import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    ratings: "",
    count: "",
    images: [{ image: "" }],
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
    const { value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      images: [{ image: value }], // Single image input for now
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL+"/addproduct", productData);
      console.log("Product added successfully:", response.data);
      // alert("Product added successfully!");
      setProductData({
        name: "",
        price: "",
        description: "",
        ratings: "",
        count: "",
        images: [{ image: "" }],
        category: "",
        seller: "",
        stock: "",
        offers: "",
      });
    } catch (error) {
      console.error("Error adding product:", error.response.data.message || error.message);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={productData.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="text" className="form-control" name="price" value={productData.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={productData.description} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Reviews</label>
          <input type="number" placeholder="Rate between (1 to 5)" className="form-control" name="numofReviews" value={productData.ratings} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Count</label>
          <input type="text" className="form-control" name="count" value={productData.count} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input type="text" className="form-control" name="image" value={productData.images[0].image} onChange={handleImageChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" name="category" value={productData.category} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Seller</label>
          <input type="text" className="form-control" name="seller" value={productData.seller} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input type="text" className="form-control" name="stock" value={productData.stock} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Offers</label>
          <input type="text" className="form-control" name="offers" value={productData.offers} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
