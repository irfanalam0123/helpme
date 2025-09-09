

// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Loginn from "./pages/Loginn";
import Home from "./pages/Home";
import PrivateRoutes from "./Privateroute/PrivateRoutes";
import Navbar from "./layout/Navbar";
import Layout from "./layout/Layout";
import About from "./pages/About";
import Services from "./pages/Services";
import Contect from "./pages/Contect";
import ProfileData from "./pages/ProfileData";
import EditProfile from "./pages/EditProfile";
import Chatbot from "./chabot/Chatbot";



function App() {
  return (
    <BrowserRouter>
      {/* <Routes>

         <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />


      </Routes>  */}

      <Routes>
        <Route path="/login" element={<Loginn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contect />} />
          <Route path="/profile" element={<ProfileData></ProfileData>}></Route>
          <Route
            path="/edit-profile"
            element={<EditProfile></EditProfile>}
          ></Route>
          
        </Route>
      </Routes>
      <Chatbot />
    </BrowserRouter>
  );
}

export default App;







