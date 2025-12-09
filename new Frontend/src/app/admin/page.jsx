"use client";

export default function AdminRoot() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/admin/questions" className="p-4 border rounded shadow hover:bg-gray-100">Manage Questions</a>
        <a href="/admin/exam" className="p-4 border rounded shadow hover:bg-gray-100">Manage Exams</a>
        <a href="/admin/results" className="p-4 border rounded shadow hover:bg-gray-100">View Results</a>
        <a href="/admin/students" className="p-4 border rounded shadow hover:bg-gray-100">Manage Students</a>
      </div>
    </div>
  );
}
