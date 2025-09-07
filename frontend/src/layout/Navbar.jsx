// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu, X, UserCircle } from "lucide-react";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   // Dummy auth state (later connect with Context)
//   const isLoggedIn = true;
//   const user = { name: "Irfan" };

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Services", path: "/services" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   return (
//     <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-xl  text-blue-600">
//           Help Me
//         </Link>

//         {/* Center Search Bar */}
//         <div className="hidden md:flex flex-1 justify-center px-6">
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-96 px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Desktop Links */}
//         <div className="hidden md:flex space-x-6 items-center">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               className="text-gray-700 hover:text-blue-600 font-medium transition"
//             >
//               {link.name}
//             </Link>
//           ))}

//           {isLoggedIn ? (
//             <div className="relative">
//               <button
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//                 className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition"
//               >
//                 <UserCircle className="text-blue-600" />
//                 <span className="hidden sm:inline text-gray-800 font-medium">
//                   {user.name}
//                 </span>
//               </button>

//               {dropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
//                   <Link
//                     to="/dashboard"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                   <Link
//                     to="/profile"
//                     className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
//                     onClick={() => setDropdownOpen(false)}
//                   >
//                     Profile
//                   </Link>
//                   <button
//                     onClick={() => {
//                       setDropdownOpen(false);
//                       // logout handler
//                     }}
//                     className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <Link
//               to="/login"
//               className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
//             >
//               Login
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Icon */}
//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {menuOpen && (
//         <div className="md:hidden bg-white px-4 pb-4 shadow">
//           <div className="flex flex-col space-y-3">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.name}
//                 to={link.path}
//                 className="text-gray-700 hover:text-blue-600 font-medium transition"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}

//             {isLoggedIn ? (
//               <>
//                 <Link
//                   to="/dashboard"
//                   className="text-gray-700 hover:text-blue-600 font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/profile"
//                   className="text-gray-700 hover:text-blue-600 font-medium"
//                   onClick={() => setMenuOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setMenuOpen(true);
//                     // logout handler
//                   }}
//                   className="text-red-500 font-medium text-left"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link
//                 to="/login"
//                 className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-center"
//                 onClick={() => setMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle } from "lucide-react";
import { Mycontext } from "../context/CreateContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Actual user & logout from Context
  const { user, logout } = useContext(Mycontext);
  const isLoggedIn = !!user;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    logout(); // clear context + localStorage token
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl text-blue-600 font-bold">
          Help Me
        </Link>

        {/* Center Search Bar */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-96 px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-1 rounded-full transition"
              >
                <UserCircle className="text-blue-600" />

                <span className="hidden sm:inline text-gray-800 font-medium">
                  {user.name}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Theme Light
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Setting
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    balance
                  </Link>

                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Withraw
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-blue-600 font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-medium text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
