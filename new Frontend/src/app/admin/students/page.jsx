"use client";
import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AdminStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get("/admin/students");
        setStudents(res.data.students || []);
      } catch (err) { console.error(err); }
    };
    fetchStudents();
  }, []);

  const handleBlock = async (id, block) => {
    try {
      await api.put(`/admin/students/${id}/block`, { block });
      setStudents(students.map(s => s.id === id ? { ...s, blocked: block } : s));
    } catch (err) { console.error(err); }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Students</h1>
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
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.blocked ? "Blocked" : "Active"}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleBlock(s.id, !s.blocked)} className="px-3 py-1 bg-red-600 text-white rounded">
                  {s.blocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
