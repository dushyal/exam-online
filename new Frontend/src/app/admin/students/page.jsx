"use client";
import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Include /admin because your axios baseURL is /api
        const res = await api.get("/admin/students");
        console.log("Fetched students:", res.data);
        setStudents(res.data.students || []);
      } catch (err) {
        console.error("API Error:", err.response || err);
        alert("Failed to load students. Make sure you are logged in as admin.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // Block/unblock
  const handleBlock = async (id, block) => {
    if (!confirm(`Are you sure you want to ${block ? "block" : "unblock"} this student?`)) return;
    try {
      const res = await api.put(`/admin/students/${id}/block`, { block });
      setStudents(students.map(s => s.id === id ? res.data.student : s));
    } catch (err) {
      console.error(err);
      alert("Failed to update block status");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      await api.delete(`/admin/students/${id}`);
      setStudents(students.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete student");
    }
  };

  // Start editing
  const startEdit = (student) => {
    setEditingId(student.id);
    setEditData({ name: student.name, email: student.email });
  };

  // Save edit
  const saveEdit = async (id) => {
    try {
      const res = await api.put(`/admin/students/${id}`, editData);
      setStudents(students.map(s => s.id === id ? res.data.student : s));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update student");
    }
  };

  if (loading) return <div className="p-6">Loading students...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
      {students.length === 0 ? (
        <div>No students found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td className="border p-2">{s.id}</td>
                  <td className="border p-2">
                    {editingId === s.id ? (
                      <input
                        className="border p-1 w-full"
                        value={editData.name}
                        onChange={e => setEditData({ ...editData, name: e.target.value })}
                      />
                    ) : s.name}
                  </td>
                  <td className="border p-2">
                    {editingId === s.id ? (
                      <input
                        className="border p-1 w-full"
                        value={editData.email}
                        onChange={e => setEditData({ ...editData, email: e.target.value })}
                      />
                    ) : s.email}
                  </td>
                  <td className="border p-2">{s.blocked ? "Blocked" : "Active"}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => handleBlock(s.id, !s.blocked)}
                      className={`px-3 py-1 rounded text-white ${s.blocked ? "bg-green-600" : "bg-red-600"}`}
                    >
                      {s.blocked ? "Unblock" : "Block"}
                    </button>
                    {editingId === s.id ? (
                      <button
                        onClick={() => saveEdit(s.id)}
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(s)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="px-3 py-1 bg-gray-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
