// src/pages/About.jsx
const About = () => {
  return (
    <div className="p-8 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        About Us
      </h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Welcome to{" "}
        <span className="font-semibold text-blue-600">Our Company</span>! We are
        passionate about delivering high-quality solutions in{" "}
        <span className="italic">
          web development, AI integration, and digital services
        </span>
        .
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Our mission is to help businesses grow with modern technology. We
        believe in <b>innovation, trust, and customer satisfaction</b>.
      </p>

      <p className="text-gray-700 leading-relaxed">
        With a skilled team and years of experience, we aim to provide the best
        products and services that empower your digital journey.
      </p>
    </div>
  );
};

export default About;
