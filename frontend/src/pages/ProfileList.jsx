import { useEffect, useState } from "react";

export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/profile")
      .then((res) => res.json())
      .then((data) => setProfiles(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Profiles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {profiles.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-xl p-4 flex items-center space-x-4"
          >
            <img
              src={`http://localhost:5000${user.photo}`}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
