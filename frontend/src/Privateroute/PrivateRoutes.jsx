


// src/Privateroute/PrivateRoutes.js
// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoutes = ({ children }) => {
//   // Check if user is authenticated
//   // You can replace this with your own logic (Context, Redux, LocalStorage, etc.)
//   const isAuthenticated = localStorage.getItem("authToken");

//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoutes;


// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import  Mycontext  from "../context/AuthContext";

// const PrivateRoutes = ({ children }) => {
//   const { user } = useContext(Mycontext);

//   return user ? children : <Navigate to="/login" replace />;
// };

// export default PrivateRoutes;



// src/Privateroute/PrivateRoutes.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Mycontext } from "../context/CreateContext";

const PrivateRoutes = ({ children }) => {
  const { user } = useContext(Mycontext);

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
