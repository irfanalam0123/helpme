// src/pages/Profile.jsx
import { useContext } from "react";
import { Mycontext } from "../context/CreateContext";
 import { Link } from "react-router-dom";
const ProfileData = () => {
  const { user } = useContext(Mycontext);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        My Profile
      </h2>

      {user ? (
        <div className="flex flex-col items-center text-center">
          {/* Profile Picture */}
          <img
            src={
              user.avatar || "https://www.w3schools.com/w3images/avatar2.png" // default avatar
            }
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-md mb-4 object-cover"
          />

          {/* Name */}
          <p className="text-lg font-semibold text-gray-900">
            {user.name || "Anonymous"}
          </p>

          {/* Email */}
          <p className="text-gray-600">{user.email || "No email"}</p>

          {/* Summary */}
          <p className="mt-3 text-gray-700 italic">
            {user.summary || "No summary added"}
          </p>

          <Link
            to="/edit-profile"
            className="mt-5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
          >
            Edit Profile
          </Link>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No user data available</p>
      )}
    </div>
  );
};

export default ProfileData;
