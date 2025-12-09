"use client";

import { useState } from "react";
import api from "../../api/axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/register-init", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Save for verify page
      localStorage.setItem("reg_email", form.email);

      if (res.data?.message) {
        router.push(`/verify?email=${form.email}`);
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card max-w-md mx-auto mt-8 p-6">
      <h2 className="text-xl font-semibold mb-4">Create an account</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm">Full Name</label>
          <input
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm">Email Address</label>
          <input
            name="email"
            type="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <input
            name="password"
            type="password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="text-sm">Confirm Password</label>
          <input
            name="confirmPassword"
            type="password"
            className="form-input"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      </form>
    </section>
  );
}
