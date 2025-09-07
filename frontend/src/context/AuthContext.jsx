// src/context/AuthContext.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Mycontext } from "./CreateContext";
//import {jwtDecode} from "jwt-decode";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔹 Login function
  // const login = async (formData) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/login",
  //       formData
  //     );

  //     const { token, id } = res.data;

  //     // user state manually set karo
  //     const loggedInUser = {
  //       id,
  //       email: formData.email,
  //       name:formData.name /// kisname se registe hai wo malum karna hai

        
  //     };

  //     setUser(loggedInUser);

  //     // localStorage me save karo
  //     localStorage.setItem("token", token);
  //     localStorage.setItem("user", JSON.stringify(loggedInUser));

  //     console.log("Login User:", loggedInUser);

  //     return { success: true };
  //   } catch (err) {
  //     return {
  //       success: false,
  //       message: err.response?.data?.message || "Login failed",
  //     };
  //   }
  // };


// const login = async (formData) => {
//   const res = await axios.post(
//     "http://localhost:5000/api/auth/login",
//     formData
//   );
//   const { token } = res.data;

//   // token decode karke name nikaal lo
//   //const decoded = jwtDecode(token);
//   // decoded me { _id, email, name } hoga agar backend ne save kiya ho

//   const loggedInUser = {
//     id: FormData._id,
//     email: FormData.email,
//     name: FormData.name, // agar token me hai to mil jayega
//   };

//   setUser(loggedInUser);
//   localStorage.setItem("token", token);
//   localStorage.setItem("user", JSON.stringify(loggedInUser));

//   console.log("Login User:", loggedInUser);
// };

const login = async (formData) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData
    );

    const { token, id, name, email } = res.data;

    const loggedInUser = { id, email, name };

    setUser(loggedInUser);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    console.log("Login User:", loggedInUser);

    return { success: true }; // ✅ return karo
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};


  // 🔹 Register function
  // const register = async (formData) => {
  //   try {
  //     const res = await axios.post(
  //       "http://localhost:5000/api/auth/signup",
  //       formData
  //     );
  //     console.log(formData.name)
  //     return { success: true, message: res.data.message };
  //   } catch (err) {
  //     return {
  //       success: false,
  //       message: err.response?.data?.message || "Registration failed",
  //     };
  //   }
  // };
const register = async (formData) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/signup",
      formData
    );

    // Backend response me user ka naam
    const registeredUser = res.data.user;

    console.log("Registered User Name:", registeredUser?.name);

    return {
      success: true,
      message: res.data.message,
      user: registeredUser,
    };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Registration failed",
    };
  }
};

  // 🔹 Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logout successful 👋");
  };

  // 🔹 Refresh hone par user restore karna
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      console.log("Restored User:", JSON.parse(savedUser));
    }
  }, []);

  return (
    <Mycontext.Provider value={{ user, login, register, logout }}>
      {children}
    </Mycontext.Provider>
  );
};
