// src/pages/EditProfile.jsx
import { useState, useContext } from "react";
import { Mycontext } from "../context/CreateContext";

const EditProfile = () => {
  const { user } = useContext(Mycontext);
  const userId = user?._id;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    summary: user?.summary || "",
    photo: null,
  });

  const [message, setMessage] = useState("");
  const [profile, setProfile] = useState(null);

  // handle change
  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // handle submit
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("summary", formData.summary);
      if (formData.photo) {
        data.append("photo", formData.photo);
      }

      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PUT",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully!");
        setProfile(result.user);
      } else {
        setMessage(result.message || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700">Summary:</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700">Photo:</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Save Changes
        </button>
      </form>

      {message && (
        <div className="mt-4 p-2 bg-green-100 text-green-800 rounded">
          {message}
        </div>
      )}

      {profile && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-semibold">Updated Profile:</h3>
          <p>
            <b>Name:</b> {profile.name}
          </p>
          <p>
            <b>Email:</b> {profile.email}
          </p>
          <p>
            <b>Summary:</b> {profile.summary}
          </p>
          {profile.photo && (
            <img
              src={`http://localhost:5000/uploads/${profile.photo}`}
              alt="Profile"
              className="mt-2 w-24 h-24 rounded-full object-cover border"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
