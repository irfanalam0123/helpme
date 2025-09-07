


// const UserModel = mongoose.model("users", UserSchema);
// export default  UserModel;
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hashed password
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
