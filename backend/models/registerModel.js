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
    maxlength:[7,'password cannot exceed more than 7 characters'],
    validate:{validator:
      function (value){
        return value.length===7;
      },
      message:"Password must be exactly 7 characters long"
    },
  },
  avatar:{
    type:String,
    default:'user123.png',
  },
  role:{
    type:String,
    default:'user',
    set: (value) => value || 'user',
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
