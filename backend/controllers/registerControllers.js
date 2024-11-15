const registerModel = require("../models/registerModel");

exports.createRegisters = async (req, res) => {
  try {
    console.log(req.body, 'server data')
    const { username, email, password } = req.body;

    // Attempt to create a new user in the database
    const register = await registerModel.create({ username, email, password });

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