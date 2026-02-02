import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/axiosConfig";

export default function AdminLogin() {
  const navigate = useNavigate(); // ✅ FIX
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
  const { data } = await api.post("/api/auth/login", {
    email,
    password,
  });

      localStorage.setItem("adminInfo", JSON.stringify(data));
      navigate("/admin/videos"); // ✅ WORKS
    } catch (error) {
      alert(
        error.response?.data?.message || "Invalid login credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="email"
          className="w-full mb-4 px-4 py-3 border rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full mb-6 px-4 py-3 border rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-900 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
