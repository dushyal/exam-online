"use client";
import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalStudents: 0, attempts: 0, passRate: 0, avgScore: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded shadow">Total Students: {stats.totalStudents}</div>
        <div className="p-4 border rounded shadow">Total Attempts: {stats.attempts}</div>
        <div className="p-4 border rounded shadow">Pass Rate: {stats.passRate}%</div>
        <div className="p-4 border rounded shadow">Average Score: {stats.avgScore}</div>
      </div>
    </div>
  );
}
