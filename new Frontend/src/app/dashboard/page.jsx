// "use client";

// import ProtectedRoute from "../../components/ProtectedRoute";

// export default function DashboardPage() {
//   return (
//     <ProtectedRoute>
//       <section className="card">
//         <h1 className="text-2xl font-semibold mb-3">Dashboard</h1>
//         <p>Welcome to the exam dashboard. Build tests, view results, and manage students from here.</p>
//         <div className="mt-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             <div className="p-4 border rounded">
//               <h3 className="font-semibold">Create Exam</h3>
//               <p className="text-sm">Add new exams with time limits and sections.</p>
//             </div>
//             <div className="p-4 border rounded">
//               <h3 className="font-semibold">Student Results</h3>
//               <p className="text-sm">View performance summaries and download reports.</p>
//             </div>
//             <div className="p-4 border rounded">
//               <h3 className="font-semibold">Proctoring</h3>
//               <p className="text-sm">Configure camera monitoring and exam rules.</p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </ProtectedRoute>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import ProtectedRoute from "../../components/ProtectedRoute";
// import api from "../../api/axios";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// export default function DashboardPage() {
//   const [profile, setProfile] = useState(null);
//   const [subjects] = useState(["HTML", "CSS", "JavaScript", "Java", "Python"]);
//   const [selectedSubject, setSelectedSubject] = useState("HTML");
//   const [pendingExam, setPendingExam] = useState(null);
//   const [summary, setSummary] = useState([]);

//   useEffect(() => {
//     fetchProfile();
//     fetchPendingExam();
//     fetchSummary();
//   }, []);

//   const fetchProfile = async () => {
//     const res = await api.get("/auth/me");
//     setProfile(res.data.user);
//   };

//   const fetchPendingExam = async () => {
//     const res = await api.get("/exam/candidate/pending-exam");
//     setPendingExam(res.data.pending_exam);
//   };

//   const fetchSummary = async () => {
//     const res = await api.get("/exam/candidate/summary");
//     setSummary(res.data.summary);
//   };

//   if (!profile) return <p className="p-10">Loading...</p>;

//   return (
//     <ProtectedRoute>
//       <section className="p-6">
//         {/* ---------------- PROFILE ---------------- */}
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
//             {profile.name.charAt(0).toUpperCase()}
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold">{profile.name}</h2>
//             <p className="text-sm text-gray-600">{profile.email}</p>
//           </div>
//         </div>

//         {/* ---------------- SUBJECT SELECTOR ---------------- */}
//         <div className="mb-6">
//           <label className="text-sm font-semibold">Select Subject</label>
//           <select
//             className="border p-2 rounded ml-2"
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//           >
//             {subjects.map((sub) => (
//               <option key={sub} value={sub}>
//                 {sub}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* ---------------- PENDING EXAM ---------------- */}
//         <div className="bg-white rounded shadow p-5 mb-6">
//           <h3 className="text-lg font-semibold mb-2">Pending Exam</h3>

//           {pendingExam ? (
//             <div>
//               <p className="font-medium">
//                 Level {pendingExam.level_number}: {pendingExam.title}
//               </p>
//               <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded">
//                 Start Exam
//               </button>
//             </div>
//           ) : (
//             <p className="text-green-600 font-semibold">🎉 All levels completed!</p>
//           )}
//         </div>

//         {/* ---------------- SUMMARY CHART ---------------- */}
//         <div className="bg-white rounded shadow p-5">
//           <h3 className="text-lg font-semibold mb-4">Recent Performance</h3>

//           {summary.length === 0 ? (
//             <p>No exam summary available.</p>
//           ) : (
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={summary}>
//                   <XAxis dataKey="level" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="score" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </div>
//       </section>
//     </ProtectedRoute>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import ProtectedRoute from "../../components/ProtectedRoute";
// import api from "../../api/axios";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// export default function DashboardPage() {
//   const [profile, setProfile] = useState(null);
//   const [pendingExam, setPendingExam] = useState(null);
//   const [summary, setSummary] = useState([]);

//   useEffect(() => {
//     fetchProfile();
//     fetchPendingExam();
//     fetchSummary();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await api.get("/auth/me");
//       setProfile(res.data.user);
//     } catch (e) {
//       console.log("Profile Error", e);
//     }
//   };

//   const fetchPendingExam = async () => {
//     try {
//       const res = await api.get("/exam/candidate/pending-exam");

//       if (res.data.pending === true) {
//         setPendingExam(res.data.exam);
//       } else {
//         setPendingExam(null);
//       }
//     } catch (e) {
//       console.log("Pending Exam Error:", e);
//     }
//   };

//   const fetchSummary = async () => {
//     try {
//       const res = await api.get("/exam/candidate/summary");

//       const formatted = res.data.attempts?.map((item) => ({
//         level: item.Exam.level,
//         score: item.score || 0,
//       })) || [];

//       setSummary(formatted);
//     } catch (e) {
//       console.log("Summary Error:", e);
//     }
//   };

//   if (!profile) return <p className="p-10">Loading...</p>;

//   return (
//     <ProtectedRoute>
//       <section className="p-6">
        
//         {/* PROFILE */}
//         <div className="flex items-center gap-4 mb-6">
//           <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
//             {profile.name.charAt(0).toUpperCase()}
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold">Name : {profile.name}</h2>
//             <p className="text-sm text-gray-600">Email : {profile.email}</p>
//           </div>
//         </div>

//         {/* PENDING EXAM */}
//         <div className="bg-white rounded shadow p-5 mb-6">
//           <h3 className="text-lg font-semibold mb-2">Pending Exam</h3>

//           {pendingExam ? (
//             <div>
//               <p className="font-medium">
//                 Level {pendingExam.level}: {pendingExam.title}
//               </p>

//               <button className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded">
//                 Start Exam
//               </button>
//             </div>
//           ) : (
//             <p className="text-green-600 font-semibold">🎉 All levels completed!</p>
//           )}
//         </div>

//         {/* SUMMARY */}
//         <div className="bg-white rounded shadow p-5">
//           <h3 className="text-lg font-semibold mb-4">Recent Performance</h3>

//           {summary.length === 0 ? (
//             <p>No exam summary available.</p>
//           ) : (
//             <div className="h-64">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={summary}>
//                   <XAxis dataKey="level" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="score" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </div>
//       </section>
//     </ProtectedRoute>
//   );
// }



// "use client"; // Required for client-side hooks

// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function DashboardPage() {
//   const [dashboard, setDashboard] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const { data } = await axios.get("/api/student/dashboard", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`
//           }
//         });
//         setDashboard(data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch dashboard:", err);
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <p className="p-4">Loading...</p>;
//   if (!dashboard) return <p className="p-4">No dashboard data available</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">
//         Welcome, {dashboard.user.name}
//       </h1>

//       {/* Subjects Table */}
//       <h2 className="text-2xl font-semibold mb-3">Subjects & Scores</h2>
//       <table className="w-full border border-gray-300 mb-6">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="border px-4 py-2 text-left">Subject</th>
//             <th className="border px-4 py-2 text-left">Latest Score</th>
//             <th className="border px-4 py-2 text-left">Pending Level</th>
//           </tr>
//         </thead>
//         <tbody>
//           {dashboard.subjects.map((subject) => (
//             <tr key={subject}>
//               <td className="border px-4 py-2">{subject}</td>
//               <td className="border px-4 py-2">{dashboard.subjectScores[subject]}</td>
//               <td className="border px-4 py-2">{dashboard.pendingLevels[subject]}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Level-wise Scores */}
//       <h2 className="text-2xl font-semibold mb-3">Level-wise Scores</h2>
//       {dashboard.subjects.map((subject) => (
//         <div key={subject} className="mb-4">
//           <h3 className="font-semibold mb-1">{subject}</h3>
//           <div className="flex flex-wrap gap-2">
//             {dashboard.levelScores[subject] &&
//               Object.entries(dashboard.levelScores[subject]).map(([level, score]) => (
//                 <div
//                   key={level}
//                   className="px-3 py-1 rounded border bg-gray-100"
//                 >
//                   Level {level}: {score}
//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }




// "use client";

// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/student/dashboard", {
//           withCredentials: true, // only if backend uses cookies
//         });
//         setData(res.data);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
//   if (!data) return <p className="p-6">No dashboard data available.</p>;

//   const { user, subjects, pendingLevels, subjectScores, levelScores } = data;
// console.log(data);
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
//       <h2 className="text-xl mb-2">Subjects & Scores</h2>

//       <table className="border-collapse border border-gray-300 w-full">
//         <thead>
//           <tr>
//             <th className="border border-gray-300 px-2 py-1">Subject</th>
//             <th className="border border-gray-300 px-2 py-1">Pending Level</th>
//             <th className="border border-gray-300 px-2 py-1">Latest Score</th>
//             <th className="border border-gray-300 px-2 py-1">Level Scores</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subjects.map((sub) => (
//             <tr key={sub}>
//               <td className="border border-gray-300 px-2 py-1">{sub}</td>
//               <td className="border border-gray-300 px-2 py-1">{pendingLevels[sub]}</td>
//               <td className="border border-gray-300 px-2 py-1">{subjectScores[sub]}</td>
//               {/* <td className="border border-gray-300 px-2 py-1">
//                 {Object.entries(levelScores[sub])
//                   .map(([lvl, score]) => `L${lvl}: ${score}`)
//                   .join(", ")}
//               </td> */}

//               <td className="border border-gray-300 px-2 py-1">
//   {Object.entries(levelScores[sub] || {})
//     .map(([lvl, score]) => `L${lvl}: ${score}`)
//     .join(", ") || "No scores"}
// </td>

//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/student/dashboard", {
//           withCredentials: true,
//         });
//         setData(res.data);
//         setSelected(res.data.subjects[0]); // default first subject
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
//   if (!data) return <p className="p-6">No dashboard data available.</p>;

//   const { user, subjects, pendingLevels, subjectScores, levelScores } = data;

//   // Bar chart data
//   const barData = subjects.map((sub) => ({
//     name: sub,
//     Latest: subjectScores[sub],
//   }));

//   // Selected subject levels
//   const radarData = Object.entries(levelScores[selected] || {}).map(
//     ([lvl, score]) => ({
//       level: "L" + lvl,
//       value: score,
//     })
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

//       {/* ----------------------------------------------------------- */}
//       {/* SUBJECT RECTANGLE CARDS */}
//       {/* ----------------------------------------------------------- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {subjects.map((sub) => (
//           <div
//             key={sub}
//             onClick={() => setSelected(sub)}
//             className={`cursor-pointer p-4 rounded-2xl border shadow-md bg-white transition 
//               ${selected === sub ? "border-blue-500 shadow-blue-200" : "border-gray-300"}`}
//           >
//             <h2 className="text-lg font-semibold">{sub}</h2>
//             <p className="text-sm text-gray-500">
//               Pending Level: <b>{pendingLevels[sub]}</b>
//             </p>

//             <div className="mt-2">
//               <p className="text-2xl font-bold">{subjectScores[sub]}</p>
//               <p className="text-xs text-gray-400">Latest Score</p>
//             </div>

//             <div className="mt-3 w-full text-xs bg-gray-100 p-2 rounded-md">
//               {Object.entries(levelScores[sub] || {}).map(([lvl, score]) => (
//                 <span key={lvl} className="mr-2">
//                   L{lvl}: {score}
//                 </span>
//               ))}
//             </div>

//             {/* Progress bar */}
//             <div className="mt-3 w-full">
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-2 bg-blue-400"
//                   style={{
//                     width: `${Math.min(
//                       100,
//                       (subjectScores[sub] / 160) * 100
//                     )}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ----------------------------------------------------------- */}
//       {/* GRAPHS */}
//       {/* ----------------------------------------------------------- */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* BAR CHART */}
//         <div className="p-4 bg-white rounded-2xl shadow-md">
//           <h3 className="font-semibold mb-2">Latest Scores (All Subjects)</h3>
//           <div style={{ width: "100%", height: 260 }}>
//             <ResponsiveContainer>
//               <BarChart data={barData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Latest" barSize={40} fill="#60a5fa" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* RADAR CHART */}
//         <div className="p-4 bg-white rounded-2xl shadow-md">
//           <h3 className="font-semibold mb-2">
//             Level Breakdown — {selected}
//           </h3>

//           <div className="flex flex-col items-center">
//             <ResponsiveContainer width="100%" height={300}>
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
//                 <PolarGrid />
//                 <PolarAngleAxis dataKey="level" />
//                 <PolarRadiusAxis />
//                 <Radar dataKey="value" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.6} />
//                 <Tooltip />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>


//         {/* BAR CHART — SHOW ALL LEVEL SCORES (BLUE COLOR FAMILY) */}
// <div className="p-4 bg-white rounded-2xl shadow-md">
//   <h3 className="font-semibold mb-2">All Level Scores (All Subjects)</h3>

//   <div style={{ width: "100%", height: 300 }}>
//     <ResponsiveContainer>
//       <BarChart
//         data={subjects.map((sub) => ({
//           subject: sub,
//           ...levelScores[sub],
//         }))}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="subject" />
//         <YAxis />
//         <Tooltip />
//         <Legend />

//         {/* Color-coded bars (blue family) */}
//         <Bar dataKey="L1" fill="#bfdbfe" barSize={30} />
//         <Bar dataKey="L2" fill="#93c5fd" barSize={30} />
//         <Bar dataKey="L3" fill="#60a5fa" barSize={30} />
//         <Bar dataKey="L4" fill="#3b82f6" barSize={30} />
//         <Bar dataKey="L5" fill="#1d4ed8" barSize={30} />
//       </BarChart>
//     </ResponsiveContainer>
//   </div>
// </div>

//       </div>
//     </div>
//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import api from "../../api/axios";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/student/dashboard", {
//           withCredentials: true,
//         });

//         // Convert levelScores keys -> L1, L2, L3 format
//         const updated = { ...res.data };
//         updated.levelScores = {};

//         for (let sub of res.data.subjects) {
//           const levels = res.data.levelScores[sub];
//           const newLevels = {};

//           Object.entries(levels).forEach(([lvl, score]) => {
//             if (lvl.startsWith("L")) {
//               newLevels[lvl] = score;
//             } else {
//               newLevels["L" + lvl] = score; // convert numeric 1 → L1
//             }
//           });

//           updated.levelScores[sub] = newLevels;
//         }

//         setData(updated);
//         setSelected(updated.subjects[0]);

//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
//   if (!data) return <p className="p-6">No dashboard data available.</p>;

//   const { user, subjects, pendingLevels, subjectScores, levelScores } = data;

//   // DATA FOR ALL LEVEL BAR CHART
//   const levelBarData = subjects.map((sub) => ({
//     subject: sub,
//     ...levelScores[sub],
//   }));

//   // DATA FOR RADAR CHART
//   const radarData = Object.entries(levelScores[selected] || {}).map(
//     ([lvl, score]) => ({
//       level: lvl,
//       value: score,
//     })
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>

//       {/* SUBJECT CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {subjects.map((sub) => (
//           <div
//             key={sub}
//             onClick={() => setSelected(sub)}
//             className={`cursor-pointer p-4 rounded-2xl border shadow-md bg-white transition 
//               ${selected === sub ? "border-blue-500 shadow-blue-200" : "border-gray-300"}`}
//           >
//             <h2 className="text-lg font-semibold">{sub}</h2>
//             <p className="text-sm text-gray-500">
//               Pending Level: <b>{pendingLevels[sub]}</b>
//             </p>

//             <div className="mt-2">
//               <p className="text-2xl font-bold">{subjectScores[sub]}</p>
//               <p className="text-xs text-gray-400">Latest Score</p>
//             </div>

//             <div className="mt-3 w-full text-xs bg-gray-100 p-2 rounded-md">
//               {Object.entries(levelScores[sub]).map(([lvl, score]) => (
//                 <span key={lvl} className="mr-2">
//                   {lvl}: {score}
//                 </span>
//               ))}
//             </div>

//             <div className="mt-3 w-full">
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-2 bg-blue-400"
//                   style={{
//                     width: `${Math.min(
//                       100,
//                       (subjectScores[sub] / 160) * 100
//                     )}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* GRAPHS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* RADAR CHART */}
//         <div className="p-4 bg-white rounded-2xl shadow-md">
//           <h3 className="font-semibold mb-2">Level Breakdown — {selected}</h3>
//           <div className="flex flex-col items-center">
//             <ResponsiveContainer width="100%" height={300}>
//               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
//                 <PolarGrid />
//                 <PolarAngleAxis dataKey="level" />
//                 <PolarRadiusAxis />
//                 <Radar
//                   dataKey="value"
//                   stroke="#3b82f6"
//                   fill="#93c5fd"
//                   fillOpacity={0.6}
//                 />
//                 <Tooltip />
//               </RadarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* ALL LEVEL SCORE BAR CHART */}
//         <div className="p-4 bg-white rounded-2xl shadow-md">
//           <h3 className="font-semibold mb-2">All Level Scores (All Subjects)</h3>

//           <div style={{ width: "100%", height: 300 }}>
//             <ResponsiveContainer>
//               <BarChart data={levelBarData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="subject" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />

//                 <Bar dataKey="L1" fill="#bfdbfe" barSize={30} />
//                 <Bar dataKey="L2" fill="#93c5fd" barSize={30} />
//                 <Bar dataKey="L3" fill="#60a5fa" barSize={30} />
//                 <Bar dataKey="L4" fill="#3b82f6" barSize={30} />
//                 <Bar dataKey="L5" fill="#1d4ed8" barSize={30} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }







// "use client";

// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/student/dashboard", {
//           withCredentials: true,
//         });

//         let updated = { ...res.data };
//         updated.levelScores = {};

//         // Convert 1→L1, 2→L2 etc.
//         for (let sub of res.data.subjects) {
//           let newLevels = {};
//           for (const [lvl, score] of Object.entries(res.data.levelScores[sub])) {
//             newLevels["L" + lvl] = score;
//           }
//           updated.levelScores[sub] = newLevels;
//         }

//         setData(updated);
//         setSelected(updated.subjects[0]);

//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
//   if (!data) return <p className="p-6">No dashboard data available.</p>;

//   const { user, subjects, pendingLevels, subjectScores, levelScores } = data;

//   // Latest Score Chart
//   const barData = subjects.map((sub) => ({
//     name: sub,
//     Latest: subjectScores[sub],
//   }));

//   // Radar Chart
//   const radarData = Object.entries(levelScores[selected] || {}).map(
//     ([lvl, score]) => ({
//       level: lvl,
//       value: score,
//     })
//   );

//   // Multi-level chart data
//   const levelBarData = subjects.map((sub) => ({
//     subject: sub,
//     ...levelScores[sub],
//   }));

//   return (
//     <div className="p-6">

//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-2xl font-bold mb-6"
//       >
//         Welcome, {user.name}
//       </motion.h1>

//       {/* SUBJECT CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {subjects.map((sub, index) => (
//           <motion.div
//             key={sub}
//             onClick={() => router.push(`/subject/${sub}`)}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             whileHover={{ scale: 1.03 }}
//             className="cursor-pointer p-4 rounded-2xl border shadow-md bg-white transition"
//           >
//             <h2 className="text-lg font-semibold">{sub}</h2>

//             <p className="text-sm text-gray-500">
//               Pending Level: <b>{pendingLevels[sub]}</b>
//             </p>

//             <div className="mt-2">
//               <p className="text-2xl font-bold">{subjectScores[sub]}</p>
//               <p className="text-xs text-gray-400">Latest Score</p>
//             </div>

//             <div className="mt-3 w-full text-xs bg-gray-100 p-2 rounded-md">
//               {Object.entries(levelScores[sub] || {}).map(([lvl, score]) => (
//                 <span key={lvl} className="mr-2">
//                   {lvl}: {score}
//                 </span>
//               ))}
//             </div>

//             <div className="mt-3 w-full">
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-2 bg-blue-400"
//                   style={{
//                     width: `${Math.min(
//                       100,
//                       (subjectScores[sub] / 160) * 100
//                     )}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* GRAPHS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Latest Score Bar */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="p-4 bg-white rounded-2xl shadow-md"
//         >
//           <h3 className="font-semibold mb-2">Latest Scores (All Subjects)</h3>

//           <div style={{ width: "100%", height: 260 }}>
//             <ResponsiveContainer>
//               <BarChart data={barData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Latest" barSize={40} fill="#60a5fa" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>

//         {/* Radar Chart */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="p-4 bg-white rounded-2xl shadow-md"
//         >
//           <h3 className="font-semibold mb-2">
//             Level Breakdown — {selected}
//           </h3>

//           <ResponsiveContainer width="100%" height={300}>
//             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="level" />
//               <PolarRadiusAxis />
//               <Radar
//                 dataKey="value"
//                 stroke="#3b82f6"
//                 fill="#93c5fd"
//                 fillOpacity={0.6}
//               />
//               <Tooltip />
//             </RadarChart>
//           </ResponsiveContainer>
//         </motion.div>
//       </div>

//       {/* MULTI LEVEL BAR CHART */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="p-4 mt-6 bg-white rounded-2xl shadow-md"
//       >
//         <h3 className="font-semibold mb-2">All Level Scores (All Subjects)</h3>

//         <div style={{ width: "100%", height: 300 }}>
//           <ResponsiveContainer>
//             <BarChart data={levelBarData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="subject" />
//               <YAxis />
//               <Tooltip />
//               <Legend />

//               <Bar dataKey="L1" fill="#bfdbfe" barSize={30} />
//               <Bar dataKey="L2" fill="#93c5fd" barSize={30} />
//               <Bar dataKey="L3" fill="#60a5fa" barSize={30} />
//               <Bar dataKey="L4" fill="#3b82f6" barSize={30} />
//               <Bar dataKey="L5" fill="#1d4ed8" barSize={30} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
        
//       </motion.div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/student/dashboard", {
//           withCredentials: true,
//         });

//         const responseData = res.data || {};

//         // Safe defaults
//         const subjects = responseData.subjects || [];
//         const levelScoresRaw = responseData.levelScores || {};
//         const subjectScores = responseData.subjectScores || {};
//         const pendingLevels = responseData.pendingLevels || {};
//         const user = responseData.user || {};

//         // Convert level numbers → L1, L2...
//         const levelScores = {};
//         for (let sub of subjects) {
//           const levelsObj = levelScoresRaw?.[sub];
//           const newLevels = {};

//           if (levelsObj && typeof levelsObj === "object") {
//             for (const [lvl, score] of Object.entries(levelsObj)) {
//               newLevels["L" + lvl] = score;
//             }
//           }

//           levelScores[sub] = newLevels;
//         }

//         setData({
//           user,
//           subjects,
//           pendingLevels,
//           subjectScores,
//           levelScores,
//         });

//         setSelected(subjects[0] || null);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
//   if (!data) return <p className="p-6">No dashboard data available.</p>;

//   const { user, subjects, pendingLevels, subjectScores, levelScores } = data;

//   // Latest Score Chart
//   const barData = subjects.map((sub) => ({
//     name: sub,
//     Latest: subjectScores[sub] || 0,
//   }));

//   // Radar Chart
//   const radarData = Object.entries(levelScores[selected] || {}).map(
//     ([lvl, score]) => ({
//       level: lvl,
//       value: score,
//     })
//   );

//   // Multi-level chart data
//   const levelBarData = subjects.map((sub) => ({
//     subject: sub,
//     ...levelScores[sub],
//   }));

//   return (
//     <div className="p-6">
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-2xl font-bold mb-6"
//       >
//         Welcome, {user.name || "Student"}
//       </motion.h1>

//       {/* SUBJECT CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
//         {subjects.map((sub, index) => (
//           <motion.div
//             key={sub}
//             onClick={() => router.push(`/subject/${sub}`)}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             whileHover={{ scale: 1.03 }}
//             className="cursor-pointer p-4 rounded-2xl border shadow-md bg-white transition"
//           >
//             <h2 className="text-lg font-semibold">{sub}</h2>

//             <p className="text-sm text-gray-500">
//               Pending Level: <b>{pendingLevels[sub] ?? "-"}</b>
//             </p>

//             <div className="mt-2">
//               <p className="text-2xl font-bold">{subjectScores[sub] ?? 0}</p>
//               <p className="text-xs text-gray-400">Latest Score</p>
//             </div>

//             <div className="mt-3 w-full text-xs bg-gray-100 p-2 rounded-md">
//               {Object.entries(levelScores[sub] || {}).map(([lvl, score]) => (
//                 <span key={lvl} className="mr-2">
//                   {lvl}: {score ?? 0}
//                 </span>
//               ))}
//             </div>

//             <div className="mt-3 w-full">
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-2 bg-blue-400"
//                   style={{
//                     width: `${Math.min(100, ((subjectScores[sub] ?? 0) / 160) * 100)}%`,
//                   }}
//                 ></div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* GRAPHS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Latest Score Bar */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="p-4 bg-white rounded-2xl shadow-md"
//         >
//           <h3 className="font-semibold mb-2">Latest Scores (All Subjects)</h3>
//           <div style={{ width: "100%", height: 260 }}>
//             <ResponsiveContainer>
//               <BarChart data={barData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Latest" barSize={40} fill="#60a5fa" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>

//         {/* Radar Chart */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="p-4 bg-white rounded-2xl shadow-md"
//         >
//           <h3 className="font-semibold mb-2">
//             Level Breakdown — {selected || "-"}
//           </h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="level" />
//               <PolarRadiusAxis />
//               <Radar
//                 dataKey="value"
//                 stroke="#3b82f6"
//                 fill="#93c5fd"
//                 fillOpacity={0.6}
//               />
//               <Tooltip />
//             </RadarChart>
//           </ResponsiveContainer>
//         </motion.div>
//       </div>

//       {/* MULTI LEVEL BAR CHART */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="p-4 mt-6 bg-white rounded-2xl shadow-md"
//       >
//         <h3 className="font-semibold mb-2">All Level Scores (All Subjects)</h3>
//         <div style={{ width: "100%", height: 300 }}>
//           <ResponsiveContainer>
//             <BarChart data={levelBarData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="subject" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="L1" fill="#bfdbfe" barSize={30} />
//               <Bar dataKey="L2" fill="#93c5fd" barSize={30} />
//               <Bar dataKey="L3" fill="#60a5fa" barSize={30} />
//               <Bar dataKey="L4" fill="#3b82f6" barSize={30} />
//               <Bar dataKey="L5" fill="#1d4ed8" barSize={30} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </motion.div>
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import api from "../../api/axios";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   CartesianGrid,
//   RadarChart,
//   PolarGrid,
//   PolarAngleAxis,
//   PolarRadiusAxis,
//   Radar,
// } from "recharts";

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selected, setSelected] = useState(null);

//   const router = useRouter();

//   useEffect(() => {
//     const fetchDashboard = async () => {
//       try {
//         const res = await api.get("/student/dashboard", {
//           withCredentials: true,
//         });

//         const responseData = res.data || {};

//         const subjects = responseData.subjects || [];
//         const levelScoresRaw = responseData.levelScores || {};
//         const subjectScores = responseData.subjectScores || {};
//         const pendingLevels = responseData.pendingLevels || {};
//         const user = responseData.user || {};

//         const levelScores = {};
//         for (let sub of subjects) {
//           const levelsObj = levelScoresRaw?.[sub];
//           const newLevels = {};

//           if (levelsObj && typeof levelsObj === "object") {
//             for (const [lvl, score] of Object.entries(levelsObj)) {
//               newLevels["LEVEL " + lvl] = score;
//             }
//           }

//           levelScores[sub] = newLevels;
//         }

//         setData({ user, subjects, pendingLevels, subjectScores, levelScores });
//         setSelected(subjects[0] || null);
//       } catch (err) {
//         console.error("Dashboard fetch error:", err);
//         setError(err.response?.data?.message || err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboard();
//   }, []);

//   if (loading) return <p className="p-6">Loading dashboard...</p>;
//   if (error) return <p className="p-6 text-red-600">Error: {error}</p>;
//   if (!data) return <p className="p-6">No dashboard data available.</p>;

//   const { user, subjects, pendingLevels, subjectScores, levelScores } = data;

//   // const barData = subjects.map((sub) => ({ name: sub, Latest: subjectScores[sub] || 0 }));


//   const barData = subjects
//   .filter(sub => (subjectScores[sub] || 0) > 0)
//   .map(sub => ({ name: sub, Latest: subjectScores[sub] }));


//   const radarData = Object.entries(levelScores[selected] || {}).map(([lvl, score]) => ({
//     level: lvl,
//     value: score,
//   }));

//   // const levelBarData = subjects.map((sub) => ({ subject: sub, ...levelScores[sub] }));

// const levelBarData = subjects
//   .filter(sub => levelScores[sub] && typeof levelScores[sub] === "object" && Object.values(levelScores[sub]).some(val => val > 0))
//   .map(sub => ({
//     subject: sub,
//     ...levelScores[sub]
//   }));

// const CenteredTick = ({ x, y, payload }) => (
//   <text
//     x={x}
//     y={y + 10}
//     textAnchor="middle"
//     className="fill-black text-sm"
//   >
//     {payload.value}
//   </text>
// );


//   return (
//     <div className="p-6 min-w-0">
//       <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-6">
//         Welcome, {user.name || "Student"}
//       </motion.h1>

//       {/* SUBJECT CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 min-w-0">
//         {subjects.map((sub, index) => (
//           <motion.div
//             key={sub}
//             onClick={() => router.push(`/subject/${sub}`)}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             whileHover={{ scale: 1.03 }}
//             className="cursor-pointer p-4 rounded-2xl border shadow-md bg-white transition min-w-0"
//           >
//             <h2 className="text-lg font-semibold">{sub}</h2>
//             <p className="text-sm text-gray-500">Pending Level: <b>{pendingLevels[sub] ?? "-"}</b></p>

//             <div className="mt-2">
//               <p className="text-2xl font-bold">{subjectScores[sub] ?? 0}</p>
//               <p className="text-xs text-gray-400">Latest Score</p>
//             </div>

//             {/* <div className="mt-3 w-full text-xs bg-gray-100 p-2 rounded-md min-w-0">
//               {Object.entries(levelScores[sub] || {}).map(([lvl, score]) => (
//                 <span key={lvl} className="mr-2">
//                   {lvl}: {score ?? 0}
//                 </span>
//               ))}
//             </div> */}

//             <div className="mt-3 w-full">
//               <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                 <div
//                   className="h-2 bg-blue-400"
//                   style={{ width: `${Math.min(100, ((subjectScores[sub] ?? 0) / 160) * 100)}%` }}
//                 ></div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* GRAPH SECTION */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
//         {/* Latest Score Bar */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-white rounded-2xl shadow-md min-w-0">
//           <h3 className="font-semibold mb-2">Latest Scores (All Subjects)</h3>
//           <div style={{ width: "100%", height: 260 }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={barData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="Latest" barSize={40} fill="#60a5fa" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>

//         {/* Radar Chart */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-white rounded-2xl shadow-md min-w-0">
//           <h3 className="font-semibold mb-2">Level Breakdown — {selected || "-"}</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
//               <PolarGrid />
//               <PolarAngleAxis dataKey="level" />
//               <PolarRadiusAxis />
//               <Radar dataKey="value" stroke="#3b82f6" fill="#93c5fd" fillOpacity={0.6} />
//               <Tooltip />
//             </RadarChart>
//           </ResponsiveContainer>
//         </motion.div>
//       </div>

//       {/* MULTI LEVEL BAR CHART */}
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 mt-6 bg-white rounded-2xl shadow-md min-w-0">
//         <h3 className="font-semibold mb-2">All Level Scores (All Subjects)</h3>
//         <div style={{ width: "100%", height: 300 }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={levelBarData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               {/* <XAxis dataKey="subject" /> */}
//               <XAxis dataKey="subject" tick={<CenteredTick />} />

//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="LEVEL 1" fill="#bfdbfe" barSize={30} />
//               <Bar dataKey="LEVEL 2" fill="#93c5fd" barSize={30} />
//               <Bar dataKey="LEVEL 3" fill="#60a5fa" barSize={30} />
//               <Bar dataKey="LEVEL 4" fill="#3b82f6" barSize={30} />
//               <Bar dataKey="LEVEL 5" fill="#1d4ed8" barSize={30} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </motion.div>
//     </div>
//   );
// }








"use client";

import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import Loader from "../../components/Loader";
import NoData from "../../components/noData";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/student/dashboard", { withCredentials: true });
        const responseData = res.data || {};
        const subjects = responseData.subjects || [];
        const levelScoresRaw = responseData.levelScores || {};
        const subjectScores = responseData.subjectScores || {};
        const pendingLevels = responseData.pendingLevels || {};
        const user = responseData.user || {};

        const levelScores = {};
        for (let sub of subjects) {
          const levelsObj = levelScoresRaw?.[sub];
          const newLevels = {};
          if (levelsObj && typeof levelsObj === "object") {
            for (const [lvl, score] of Object.entries(levelsObj)) {
              newLevels["LEVEL " + lvl] = score;
            }
          }
          levelScores[sub] = newLevels;
        }

        setData({ user, subjects, pendingLevels, subjectScores, levelScores });
        setSelected(subjects[0] || null);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Show Loader when loading
  if (loading) return <Loader size={250} message="Loading dashboard..." />;
  if (error) return <NoData size={250} message={"Error : " + error} />;
  if (!data) return <NoData size={250} message="No dashboard data available." />;

  const { user, subjects, pendingLevels, subjectScores, levelScores } = data;

  const barData = subjects
    .filter(sub => (subjectScores[sub] || 0) > 0)
    .map(sub => ({ name: sub, Latest: subjectScores[sub] }));

  const radarData = Object.entries(levelScores[selected] || {}).map(([lvl, score]) => ({
    level: lvl,
    value: score,
  }));

  const levelBarData = subjects
    .filter(sub => levelScores[sub] && Object.values(levelScores[sub]).some(val => val > 0))
    .map(sub => ({
      subject: sub,
      ...levelScores[sub]
    }));

  const CenteredTick = ({ x, y, payload }) => (
    <text x={x} y={y + 10} textAnchor="middle" className="fill-black text-sm">
      {payload.value}
    </text>
  );

  return (
    <div className="p-6 min-w-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 min-h-screen">

      <motion.h1 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent"
      >
        Welcome, {user.name || "Student"} 👋
      </motion.h1>

      {/* SUBJECT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {subjects.map((sub, index) => (
          <motion.div
            key={sub}
            onClick={() => router.push(`/subject/${sub}`)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="cursor-pointer p-5 rounded-2xl shadow-lg bg-white/60 backdrop-blur-xl border border-white/40"
          >
            <h2 className="text-lg font-bold text-indigo-700">{sub}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Pending Level: <span className="font-semibold">{pendingLevels[sub] ?? "-"}</span>
            </p>

            <div className="mt-4">
              <p className="text-3xl font-extrabold text-blue-600">{subjectScores[sub] ?? 0}</p>
              <p className="text-xs text-gray-500">Latest Score</p>
            </div>

            <div className="mt-4">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500"
                  style={{ width: `${Math.min(100, ((subjectScores[sub] ?? 0) / 160) * 100)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* GRAPH SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="p-5 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40"
        >
          <h3 className="font-semibold mb-3 text-indigo-700">Latest Scores (All Subjects)</h3>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Latest" barSize={40} fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Radar Chart */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="p-5 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40"
        >
          <h3 className="font-semibold mb-3 text-indigo-700">
            Level Breakdown — {selected}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="level" />
              <PolarRadiusAxis />
              <Radar dataKey="value" stroke="#6366f1" fill="#818cf8" fillOpacity={0.5} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* LEVEL BAR CHART */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="p-5 mt-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40"
      >
        <h3 className="font-semibold mb-3 text-indigo-700">All Level Scores (All Subjects)</h3>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={levelBarData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" tick={<CenteredTick />} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="LEVEL 1" fill="#c7d2fe" />
              <Bar dataKey="LEVEL 2" fill="#a5b4fc" />
              <Bar dataKey="LEVEL 3" fill="#818cf8" />
              <Bar dataKey="LEVEL 4" fill="#6366f1" />
              <Bar dataKey="LEVEL 5" fill="#4338ca" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}
