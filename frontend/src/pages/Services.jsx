import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Services = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem("token"); // login ke baad save kiya hua
        const res = await axios.get("http://localhost:5000/api/auth/other", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfiles(res.data);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  // Search filter
  const filteredProfiles = profiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Services</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded-lg mb-6"
      />

      {loading ? (
        <p className="text-gray-500">Loading profiles...</p>
      ) : (
        <>
          {/* Profiles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold">{profile.name}</h2>
                <p className="text-blue-600 font-medium">{profile.email}</p>
                {profile.location && (
                  <p className="text-gray-500 text-sm">{profile.location}</p>
                )}
                {profile.description && (
                  <p className="text-gray-700 mt-2">{profile.description}</p>
                )}

                <Link
                  to={`/profile/${profile._id}`}
                  className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProfiles.length === 0 && (
            <p className="text-gray-500 mt-6">No profiles found...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Services;
