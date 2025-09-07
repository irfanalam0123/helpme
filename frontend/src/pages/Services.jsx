import { useState } from "react";
import { Link } from "react-router-dom";

const dummyProfiles = [
  {
    id: 1,
    name: "Rahul Kumar",
    skill: "Electrician",
    location: "Patna, Bihar",
    description: "5 saal ka experience ghar aur office wiring me.",
  },
  {
    id: 2,
    name: "Aman Verma",
    skill: "Plumber",
    location: "Lucknow, UP",
    description: "Water tank aur pipe fitting expert.",
  },
  {
    id: 3,
    name: "Sita Devi",
    skill: "Tailor",
    location: "Bhopal, MP",
    description: "Ladies & kids clothes stitching specialist.",
  },
];

const Services = () => {
  const [search, setSearch] = useState("");

  const filteredProfiles = dummyProfiles.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.skill.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Available Services</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, skill, or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border p-2 rounded-lg mb-6"
      />

      {/* Profiles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold">{profile.name}</h2>
            <p className="text-blue-600 font-medium">{profile.skill}</p>
            <p className="text-gray-500 text-sm">{profile.location}</p>
            <p className="text-gray-700 mt-2">{profile.description}</p>

            <Link
              to={`/profile/${profile.id}`}
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
    </div>
  );
};

export default Services;
