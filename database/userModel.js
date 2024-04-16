import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,

  },
  department: {
    type: String,
    required: true,
   
  },
  address: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required:true
  },
  salary: {
    type: Number,
    required:true 
  },
}, { timestamps: true });

// Create a User model from the schema
const UserModel = mongoose.model('User', userSchema);

export default UserModel