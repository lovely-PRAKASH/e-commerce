const registerModel = require("../models/registerModel");

exports.createRegisters = async (req, res) => {
  try {
    console.log(req.body, 'server data')
    const { username, email, password, avatar } = req.body;

    // Attempt to create a new user in the database
    const register = await registerModel.create({ username, email, password, avatar });

    // Respond with success if user creation is successful
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      register,
    });

  } catch (err) {
    // Check for duplicate email error (MongoDB error code 11000)
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email.",
      });
    }

    // Handle any other errors
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: err.message,
    });
  }
};

exports.getUsers=async(req, res, next)=>{
 try {
  const users=await registerModel.find();

  res.status(200).json({"users":users})
 } catch (error) {
  res.status(400).json({
    error
  })
 }
}


exports.checkAdminByEmail = async (req, res, next) => {
  console.log(req.query);
  try {
    const { email } = req.query; // Assuming email is passed as a query parameter

    if (!email) {
      return res.status(400).json({ error: "Email ID is required to fetch orders" });
    }

    const user = await registerModel.find({ email }); 

    if (!user.length) {
      return res.status(404).json({ message: "No users found for the given email ID" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
};
