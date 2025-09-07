// src/pages/Contact.jsx
import { useState } from "react";

const Contect = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    alert("Message sent successfully! ✅");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-8 max-w-lg mx-auto bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Contact Us
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md"
        >
          Send Message
        </button>
      </form>

      <div className="mt-6 text-center text-gray-600">
        <p>📍 Address: Patna, Bihar, India</p>
        <p>📞 Phone: +91 98765 43210</p>
        <p>✉️ Email: contact@ourcompany.com</p>
      </div>
    </div>
  );
};

export default Contect;
