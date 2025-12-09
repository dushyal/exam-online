"use client";

import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AdminResultsPage() {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
      const res = await api.get("/admin/results");
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Error fetching results:", err);
    }
  };
useEffect(() => {
    console.log(results)
  }, [results]);


  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Student Results</h1>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Student</th>
            <th className="border p-2">Exam</th>
            <th className="border p-2">Attempt</th>
            <th className="border p-2">Score</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Submitted At</th>
          </tr>
        </thead>

        <tbody>
          {results.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.user?.name}</td>
              <td className="border p-2">{r.exam?.title}</td>
              <td className="border p-2">{r.attempt_number}</td>
              <td className="border p-2">{r.score}</td>
              <td className="border p-2">{r.pass_status}</td>
              <td className="border p-2">{new Date(r.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
