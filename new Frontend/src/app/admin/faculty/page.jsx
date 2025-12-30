"use client";
import { useState } from "react";
import api from "../../../api/axios"; // your axios instance

export default function AddFaculty() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !role || (role === "SUBJECT" && !subject)) {
      alert("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Call API to create faculty
      const res = await api.post("/admin/faculty", { name, role, subject });

      // API response should include generated credentials
      const { userId, password } = res.data.credentials;

      alert(`Faculty created successfully!\nEmail/User ID: ${userId}\nPassword: ${password}`);
      // Optionally reset form
      setName("");
      setRole("");
      setSubject("");
    } catch (err) {
      console.error(err);
      alert("Failed to create faculty. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Faculty</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="border p-2 w-full rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="SUBJECT">ADMIN</option>
            <option value="EXAMINATION">CANDIDATE</option>
             <option value="SUBJECT">SUBJECT</option>
            <option value="EXAMINATION">EXAMINATION</option>
          </select>
        </div>

        {role === "SUBJECT" && (
          <div>
            <label className="block font-medium mb-1">Subject Name</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              className="border p-2 w-full rounded"
              required={role === "SUBJECT"}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Faculty"}
        </button>
      </form>
    </div>
  );
}
