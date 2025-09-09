


// import jwt from "jsonwebtoken";

// const ensureAuthenticated = (req, res, next) => {
//   try {
//     // 1. Header check
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//       return res
//         .status(401)
//         .json({ message: "Unauthorized: Authorization header missing" });
//     }

//     // 2. Token extract (Bearer <token>)
//     const token = authHeader.startsWith("Bearer ")
//       ? authHeader.split(" ")[1]
//       : authHeader;

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized: Token not found" });
//     }

//     // 3. Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 4. Attach user info to request
//     req.user = decoded; // { _id, email, iat, exp }

//     next();
//   } catch (err) {
//     console.error("Auth Error:", err.message);
//     return res.status(403).json({
//       message: "Unauthorized: Invalid or expired token",
//     });
//   }
// };

// export default ensureAuthenticated;
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fix: use _id instead of id
      req.user = await User.findById(decoded._id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found" });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
