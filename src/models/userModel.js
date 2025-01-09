import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Designer", "Client"],
  },
  job: {
    type: String, // Optional field for the designer's job
    default: "",
  },
  region: {
    type: String, // Designer's region or country
    default: "",
  },
  email: {
    type: String,
    required: true, // Email is required for all users
  },
  profileImage: {
    type: String, // URL or path to the profile image
    default: "",
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
