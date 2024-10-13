const mongoose = require("mongoose");
const validator=require('validator');
const bcrypt=require('bcrypt');
const registerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true,'please enter name'],
  },
  email: {
    type: String,
    required: true,
    validator:[validator.isEmail,'please enter a valid email'],
    unique: true,  // To prevent duplicate emails
  },
  password: {
    type: String,
    required: [true,'please enter password'],
    maxlength:[7,'passwod cannot exceed more than 7 characters']
  },
  avatar:{
    type:String,
    default:'user123.jpg',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

registerSchema.pre('save',async function(next){
  this.password= await bcrypt.hash(this.password,10);
})
const registerModel = mongoose.model("Register", registerSchema);

module.exports = registerModel;
