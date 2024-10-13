const bcrypt = require('bcrypt');
const registerModel = require('../models/registerModel');

exports.createLogin = async (req, res, next) => {
  try {
    console.log(req.body, 'server data');
    const { email, password } = req.body;

    // Find user by email
    const user = await registerModel.findOne({ email: email });

    if (!user) {
      // User not found
      return res.status(404).json({ success: false, message: 'No record exists' });
    }
 
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      return res.status(200).json({ success: true, message: 'Login success' });
    } else {
      // Password mismatch
      return res.status(401).json({ success: false, message: 'Incorrect password or email address' });
    }

  } catch (err) {
    // Handle errors
    return res.status(500).json({ success: false, error: err.message });
  }
};
