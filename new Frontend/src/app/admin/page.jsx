// "use client";
// import { useAuth } from "../../context/AuthContext";

// export default function AdminRoot() {

//   const { user, login, loading } = useAuth();

// console.log("user", user)

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <a href="/admin/questions" className="p-4 border rounded shadow hover:bg-gray-100">Manage Questions</a>
//         <a href="/admin/exam" className="p-4 border rounded shadow hover:bg-gray-100">Manage Exams</a>
//         <a href="/admin/results" className="p-4 border rounded shadow hover:bg-gray-100">View Results</a>
//         <a href="/admin/students" className="p-4 border rounded shadow hover:bg-gray-100">Manage Students</a>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useAuth } from "../../context/AuthContext";

// export default function AdminRoot() {
//   const { user, loading } = useAuth();

//   if (loading) return <p>Loading...</p>;
//   if (!user) return <p>Unauthorized</p>;

//   const panelTitle = {
//     ADMIN: "Admin Panel",
//     SUBJECT: "Subject Panel",
//     EXAMINATION: "Examination Panel",
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">
//         {panelTitle[user.role] || "Dashboard"}
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* SUBJECT → Manage Questions */}
//         {(user.role === "SUBJECT" || user.role === "ADMIN") && (
//           <a
//             href="/admin/questions"
//             className="p-4 border rounded shadow hover:bg-gray-100"
//           >
//             Manage Questions
//           </a>
//         )}

//         {/* EXAMINATION → Manage Exams */}
//         {(user.role === "EXAMINATION" || user.role === "ADMIN") && (
//           <a
//             href="/admin/exam"
//             className="p-4 border rounded shadow hover:bg-gray-100"
//           >
//             Manage Exams
//           </a>
//         )}

//         {/* ADMIN only */}
//         {user.role === "ADMIN" && (
//           <>
//             <a
//               href="/admin/results"
//               className="p-4 border rounded shadow hover:bg-gray-100"
//             >
//               View Results
//             </a>

//             <a
//               href="/admin/students"
//               className="p-4 border rounded shadow hover:bg-gray-100"
//             >
//               Manage Students
//             </a>

//              <a
//               href="/admin/faculty"
//               className="p-4 border rounded shadow hover:bg-gray-100"
//             >
//               Manage Faculty
//             </a>

//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useAuth } from "../../context/AuthContext";
// import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaFileAlt } from "react-icons/fa";

// export default function AdminRoot() {
//   const { user, loading } = useAuth();

//   if (loading) return <p className="text-center mt-20 text-xl">Loading...</p>;
//   if (!user) return <p className="text-center mt-20 text-xl text-red-500">Unauthorized</p>;

//   const panelTitle = {
//     ADMIN: "Admin Panel",
//     SUBJECT: "Subject Panel",
//     EXAMINATION: "Examination Panel",
//   };

//   const cards = [
//     {
//       role: ["SUBJECT", "ADMIN"],
//       href: "/admin/questions",
//       title: "Manage Questions",
//       icon: <FaFileAlt className="text-4xl text-white" />,
//       bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
//     },
//     {
//       role: ["EXAMINATION", "ADMIN"],
//       href: "/admin/exam",
//       title: "Manage Exams",
//       icon: <FaClipboardList className="text-4xl text-white" />,
//       bg: "bg-gradient-to-r from-green-400 to-blue-500",
//     },
//     {
//       role: ["ADMIN"],
//       href: "/admin/results",
//       title: "View Results",
//       icon: <FaUserGraduate className="text-4xl text-white" />,
//       bg: "bg-gradient-to-r from-pink-500 to-red-500",
//     },
//     {
//       role: ["ADMIN"],
//       href: "/admin/students",
//       title: "Manage Students",
//       icon: <FaUserGraduate className="text-4xl text-white" />,
//       bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
//     },
//     {
//       role: ["ADMIN"],
//       href: "/admin/faculty",
//       title: "Manage Faculty",
//       icon: <FaChalkboardTeacher className="text-4xl text-white" />,
//       bg: "bg-gradient-to-r from-teal-400 to-blue-600",
//     },
//   ];

//   return (
//     <div className="p-6">
//       <h1 className="text-4xl font-extrabold mb-6 text-gray-800">
//         {panelTitle[user.role] || "Dashboard"}
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {cards.map(
//           (card, idx) =>
//             card.role.includes(user.role) && (
//               <a
//                 key={idx}
//                 href={card.href}
//                 className={`${card.bg} flex flex-col items-center justify-center gap-2 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl`}
//               >
//                 {card.icon}
//                 <span className="text-white font-semibold text-lg text-center">
//                   {card.title}
//                 </span>
//               </a>
//             )
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useAuth } from "../../context/AuthContext";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaClipboardList,
  FaFileAlt,
} from "react-icons/fa";

export default function AdminRoot() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <p className="text-center mt-20 text-xl text-gray-500">Loading...</p>
    );
  if (!user)
    return (
      <p className="text-center mt-20 text-xl text-red-500">Unauthorized</p>
    );

  const panelTitle = {
    ADMIN: "Admin Panel",
    SUBJECT: "Subject Panel",
    EXAMINATION: "Examination Panel",
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        {panelTitle[user.role] || "Dashboard"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* SUBJECT → Manage Questions */}
        {(user.role === "SUBJECT" || user.role === "ADMIN") && (
          <a
            href="/admin/questions"
            className="flex flex-col items-center justify-center gap-2 p-6 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-2xl shadow-lg text-white text-center font-semibold text-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
          >
            <FaFileAlt className="text-4xl text-white" /> Manage Questions
          </a>
        )}

        {/* EXAMINATION → Manage Exams */}
        {(user.role === "EXAMINATION" || user.role === "ADMIN") && (
          <a
            href="/admin/exam"
            className=" flex flex-col items-center justify-center gap-2 p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-lg text-white text-center font-semibold text-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
          >
            <FaClipboardList className="text-4xl text-white" /> Manage Exams
          </a>
        )}

        {/* ADMIN only */}
        {user.role === "ADMIN" && (
          <>
            <a
              href="/admin/results"
              className=" flex flex-col items-center justify-center gap-2 p-6 bg-gradient-to-r from-pink-400 to-red-500 rounded-2xl shadow-lg text-white text-center font-semibold text-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
            >
              <FaUserGraduate className="text-4xl text-white" /> View Results
            </a>

            <a
              href="/admin/students"
              className=" flex flex-col items-center justify-center gap-2 p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg text-white text-center font-semibold text-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
            >
              <FaUserGraduate className="text-4xl text-white" /> Manage Students
            </a>

            <a
              href="/admin/faculty"
              className=" flex flex-col items-center justify-center gap-2 p-6 bg-gradient-to-r from-teal-400 to-blue-600 rounded-2xl shadow-lg text-white text-center font-semibold text-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:brightness-110"
            >
              <FaChalkboardTeacher className="text-4xl text-white" /> Manage
              Faculty
            </a>
          </>
        )}
      </div>
    </div>
  );
}
