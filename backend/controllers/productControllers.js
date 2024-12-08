const productModel = require("../models/productModel");
const multer = require('multer');

// get product api-/api/v1/products/
exports.getProduct = async (req, res, next) => {
  try {
    // Create query object based on keyword and category
    const query = {};

    // If keyword exists, add regex-based name search to the query
    if (req.query.keyword) {
      query.name = {
        $regex: req.query.keyword,
        $options: "i", // case-insensitive search
      };
    }

    // If category exists, add category filter to the query
    if (req.query.category) {
      query.category = {
        $regex: req.query.category,
        $options: 'i',
      }
    }

    // Fetch products based on the constructed query
    const products = await productModel.find(query);

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// get product api -/api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "unable to find data",
    });
  }
};


exports.updateProduct = async (req, res, next) => {
  try {
    console.log("serverdata", req.body); // Log incoming data to verify it

    // Update product by ID
    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id, // Filter to find the product by ID
      req.body,      // Update the fields with req.body
      { new: true }  // Return the updated product after the update
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ updatedProduct, message: "Product updated successfully" });
  } catch (error) {
    console.error("Update error:", error); // Log the error
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    console.log("deleted server product: ", req.body);

    const deletedProduct = await productModel.findByIdAndDelete(req.params.id)

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      deletedProduct,
      message: "product deleted Successfully"
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
}


exports.addProduct = async (req, res, next) => {
  try {
    console.log("server added data", req.body);

    const {
      name,
      price,
      description,
      ratings,
      count,
      category,
      seller,
      stock,
      offers,
    } = req.body;

    let BASE_URL = process.env.BACKEND_URL;
    console.log(BASE_URL);
    if(process.env.NODE_ENV === "production"){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    // Generate the URLs for the uploaded images
    const images = req.files.map((file) => ({
      image: `${BASE_URL}/uploads/products/${file.filename}`,
    }));

    // Limit ratings to a maximum of 5
    const editedRating = ratings > 5 ? 5 : ratings;

    // Save the product in the database
    const newProduct = await productModel.create({
      name,
      price,
      description,
      ratings: editedRating,
      count,
      images, // Save the image URLs in the database
      category,
      seller,
      stock,
      offers,
    });

    // Send success response
    res.status(200).json({
      newProduct,
      message: "Product added successfully",
    });
  } catch (error) {
    // Handle errors
    res.status(400).json({
      message: error.message,
    });
  }
};

