// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "../../../api/axios";
// import { motion } from "framer-motion";
// import { Lock, CheckCircle } from "lucide-react";

// export default function SubjectPage() {
//   const { subject } = useParams();
//   console.log(subject);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await api.get(`/student/subject/${subject.toUpperCase()}`, {
//           withCredentials: true,
//         });
//         setData(res.data);
//       } catch (err) {
//         console.log("Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [subject]);

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (!data) return <p className="p-6">No data found</p>;

//   return (
//     <div className="p-6">
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-2xl font-bold mb-4"
//       >
//         {data.subject} — Levels
//       </motion.h1>

//       {/* LEVEL CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.levels.map((lvl, index) => (
//           <motion.div
//             key={lvl.level}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className={`p-4 rounded-2xl shadow-md border bg-white ${
//               lvl.isUnlocked ? "border-blue-400" : "border-gray-300 opacity-60"
//             }`}
//           >
//             <h2 className="text-xl font-semibold">Level {lvl.level}</h2>

//             <p className="mt-1 text-gray-600">
//               Score: <b>{lvl.score !== null ? lvl.score : "--"}</b>
//             </p>

//             {/* STATUS */}
//             {lvl.score !== null ? (
//               <div className="flex items-center gap-1 mt-2 text-green-600">
//                 <CheckCircle size={18} />
//                 <span>Completed</span>
//               </div>
//             ) : lvl.isUnlocked ? (
//               <div className="flex items-center gap-1 mt-2 text-blue-600">
//                 <span>Unlocked</span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-1 mt-2 text-red-500">
//                 <Lock size={18} />
//                 <span>Locked</span>
//               </div>
//             )}

//             <div className="mt-4">
//               {lvl.isUnlocked ? (
//                 <button
//                   onClick={() =>
//                     alert(
//                       `Start Exam: ${data.subject} (Level ${lvl.level})`
//                     )
//                   }
//                   className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600"
//                 >
//                   Start Exam
//                 </button>
//               ) : (
//                 <button
//                   disabled
//                   className="w-full py-2 rounded-xl bg-gray-300 text-gray-700 cursor-not-allowed"
//                 >
//                   Locked
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "../../../api/axios";
// import { motion } from "framer-motion";
// import { Lock, CheckCircle } from "lucide-react";

// export default function SubjectPage() {
//   const { subject } = useParams();
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(false);

//       try {
//         const res = await api.get(`/student/subject/${subject.toUpperCase()}`, {
//           withCredentials: true,
//         });
//         // Ensure levels is always an array
//         setData({
//           subject: res.data.subject || subject,
//           levels: Array.isArray(res.data.levels) ? res.data.levels : [],
//         });
//       } catch (err) {
//         console.error("Error fetching subject data:", err);
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (subject) {
//       fetchData();
//     }
//   }, [subject]);

//   if (loading) return <p className="p-6">Loading...</p>;
//   if (error) return <p className="p-6 text-red-500">Failed to fetch data</p>;
//   if (!data || !data.levels.length) return <p className="p-6">No data found</p>;

//   return (
//     <div className="p-6">
//       <motion.h1
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-2xl font-bold mb-4"
//       >
//         {data.subject} — Levels
//       </motion.h1>

//       {/* LEVEL CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {data.levels.map((lvl, index) => (
//           <motion.div
//             key={lvl.level || index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className={`p-4 rounded-2xl shadow-md border bg-white ${
//               lvl.isUnlocked ? "border-blue-400" : "border-gray-300 opacity-60"
//             }`}
//           >
//             <h2 className="text-xl font-semibold">Level {lvl.level}</h2>

//             <p className="mt-1 text-gray-600">
//               Score: <b>{lvl.score !== null && lvl.score !== undefined ? lvl.score : "--"}</b>
//             </p>

//             {/* STATUS */}
//             {lvl.score !== null && lvl.score !== undefined ? (
//               <div className="flex items-center gap-1 mt-2 text-green-600">
//                 <CheckCircle size={18} />
//                 <span>Completed</span>
//               </div>
//             ) : lvl.isUnlocked ? (
//               <div className="flex items-center gap-1 mt-2 text-blue-600">
//                 <span>Unlocked</span>
//               </div>
//             ) : (
//               <div className="flex items-center gap-1 mt-2 text-red-500">
//                 <Lock size={18} />
//                 <span>Locked</span>
//               </div>
//             )}

//             <div className="mt-4">
//               {lvl.isUnlocked ? (
//                 <button
//                   onClick={() => alert(`Start Exam: ${data.subject} (Level ${lvl.level})`)}
//                   className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600"
//                 >
//                   Start Exam
//                 </button>
//               ) : (
//                 <button
//                   disabled
//                   className="w-full py-2 rounded-xl bg-gray-300 text-gray-700 cursor-not-allowed"
//                 >
//                   Locked
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }








"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../api/axios";
import { motion } from "framer-motion";
import { Lock, CheckCircle } from "lucide-react";

export default function SubjectPage() {
  const { subject } = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const res = await api.get(`/student/subject/${subject.toUpperCase()}`, {
          withCredentials: true,
        });

        setData({
          subject: res.data.subject || subject,
          levels: Array.isArray(res.data.levels) ? res.data.levels : [],
        });
      } catch (err) {
        console.error("Error fetching subject data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (subject) fetchData();
  }, [subject]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to fetch data</p>;
  if (!data || !data.levels.length) return <p className="p-6">No data found</p>;

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-4"
      >
        {data.subject} — Levels
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.levels.map((lvl, index) => (
          <motion.div
            key={lvl.level || index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-2xl shadow-md border bg-white ${
              lvl.isUnlocked ? "border-blue-400" : "border-gray-300 opacity-60"
            }`}
          >
            <h2 className="text-xl font-semibold">Level {lvl.level}</h2>

            <p className="mt-1 text-gray-600">
              Score: <b>{lvl.score != null ? lvl.score : "--"}</b>
            </p>

            {/* STATUS */}
            {lvl.score != null ? (
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <CheckCircle size={18} />
                <span>Completed</span>
              </div>
            ) : lvl.isUnlocked ? (
              <div className="flex items-center gap-1 mt-2 text-blue-600">
                <span>Unlocked</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 mt-2 text-red-500">
                <Lock size={18} />
                <span>Locked</span>
              </div>
            )}

            {/* BUTTON */}
            <div className="mt-4">
              {lvl.isUnlocked ? (
                <button
                  onClick={() => router.push(`/exam/${subject}/${lvl.level}`)}
                  className="w-full py-2 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600"
                >
                  Start Exam
                </button>
              ) : (
                <button
                  disabled
                  className="w-full py-2 rounded-xl bg-gray-300 text-gray-700 cursor-not-allowed"
                >
                  Locked
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
