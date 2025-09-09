import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Signup
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const exist = await User.findOne({ email });
//     if (exist) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hashedPassword });

//     res.status(201).json({ message: "User created", user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Hash password before saving
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const exist = await User.findOne({ email });
//         if (exist) return res.status(400).json({ message: "User already exists" });
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword, // 👈 hashed password save
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully", newUser });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Login
// export const login = async (req, res) => {
//   try {
//     const { email, password ,name}=req.body

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = jwt.sign(
//       { _id: user._id, email: user.email, name:user.name},
//       process.env.JWT_SECRET,
//       { expiresIn: "1h" }
//     );
  
//    const id =user.id
//     res.json({ message: "Login success", token,id,name});
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";


// 🔹 REGISTER
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // create token (include name, email, _id)
    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login success",
      token,
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// import User from "../models/User.js";

// Get all users except logged-in user
export const getAllUsersExceptMe = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } }).select(
      "-password"
    );
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
