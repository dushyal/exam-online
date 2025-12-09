// "use client";

// import { useEffect, useState } from "react";
// import api from "../../../api/axios";

// export default function AdminQuestionsPage() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all questions
//   const fetchQuestions = async () => {
//     try {
//       const res = await api.get("/admin/questions");
//       setQuestions(res.data.questions || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   if (loading) return <p className="p-6 text-xl">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Manage Questions</h1>

//       <a
//         href="/admin/questions/add"
//         className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add New Question
//       </a>

//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Subject</th>
//             <th className="border p-2">Level</th>
//             <th className="border p-2">Question</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {questions.map((q) => (
//             <tr key={q.id}>
//               <td className="border p-2">{q.id}</td>
//               <td className="border p-2">{q.subject}</td>
//               <td className="border p-2">{q.level}</td>
//               <td className="border p-2">{q.text}</td>

//               <td className="border p-2 space-x-2">
//                 <a
//                   href={`/admin/questions/edit/${q.id}`}
//                   className="px-3 py-1 bg-green-600 text-white rounded"
//                 >
//                   Edit
//                 </a>

//                 <button
//                   onClick={() => handleDelete(q.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import api from "../../../api/axios";

// export default function AdminQuestionsPage() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all questions
//   const fetchQuestions = async () => {
//     try {
//       const res = await api.get("/admin/questions");
//       setQuestions(res.data.questions || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this question?")) return;

//     try {
//       await api.delete(`/admin/questions/${id}`);
//       fetchQuestions(); // refresh list
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   if (loading) return <p className="p-6 text-xl">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Manage Questions</h1>

//       <a
//         href="/admin/questions/add"
//         className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add New Question
//       </a>

//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Subject</th>
//             <th className="border p-2">Level</th>
//             <th className="border p-2">Question</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {questions.map((q) => (
//             <tr key={q.id}>
//               <td className="border p-2">{q.id}</td>
//               <td className="border p-2">{q.subject}</td>

//               {/* FIXED FIELD NAMES */}
//               <td className="border p-2">{q.level_number}</td>
//               <td className="border p-2">{q.question}</td>

//               <td className="border p-2 space-x-2">
//                 <a
//                   href={`/admin/questions/edit/${q.id}`}
//                   className="px-3 py-1 bg-green-600 text-white rounded"
//                 >
//                   Edit
//                 </a>

//                 <button
//                   onClick={() => handleDelete(q.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }






// "use client";

// import { useEffect, useState } from "react";
// import api from "../../../api/axios"; // make sure this is your Axios instance

// export default function AdminQuestionsPage() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all questions
//   const fetchQuestions = async () => {
//     try {
//       const token = localStorage.getItem("token"); 
//         console.log("Axios sending token que:", token);
//       if (!token) throw new Error("No auth token found");

//       const res = await api.get("/admin/questions", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setQuestions(res.data.questions || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching questions:", error);
//       setLoading(false);
//     }
//   };

//   // Delete a question
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this question?")) return;

//     try {
//       const token = localStorage.getItem("token");
//       await api.delete(`/admin/questions/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       fetchQuestions(); // refresh list
//     } catch (error) {
//       console.error("Delete error:", error);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   if (loading) return <p className="p-6 text-xl">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Manage Questions</h1>

//       <a
//         href="/admin/questions/add"
//         className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add New Question
//       </a>

//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Subject</th>
//             <th className="border p-2">Level</th>
//             <th className="border p-2">Question</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {questions.map((q) => (
//             <tr key={q.id}>
//               <td className="border p-2">{q.id}</td>
//               <td className="border p-2">{q.subject}</td>
//               <td className="border p-2">{q.level_number}</td>
//               <td className="border p-2">{q.question}</td>
//               <td className="border p-2 space-x-2">
//                 <a
//                   href={`/admin/questions/edit/${q.id}`}
//                   className="px-3 py-1 bg-green-600 text-white rounded"
//                 >
//                   Edit
//                 </a>
//                 <button
//                   onClick={() => handleDelete(q.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import api from "../../../api/axios";

// export default function AdminQuestionsPage() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch all questions
//   const fetchQuestions = async () => {
//     try {
//       const res = await api.get("/admin/questions"); // token added automatically
//       setQuestions(res.data.questions || []);
//     } catch (error) {
//       console.error("Error fetching questions:", error.response?.data || error);
//     } finally {
//       setLoading(false);
//     }
//   };

//    // Delete a question
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this question?")) return;

//     try {
//       await api.delete(`/admin/questions/${id}`); // token added automatically
//       fetchQuestions(); // refresh list
//     } catch (error) {
//       console.error("Delete error:", error.response?.data || error);
//     }
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   if (loading) return <p className="p-6 text-xl">Loading...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-4">Manage Questions</h1>

//       <a
//         href="/admin/questions/add"
//         className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
//       >
//         + Add New Question
//       </a>

//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Subject</th>
//             <th className="border p-2">Level</th>
//             <th className="border p-2">Question</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {questions.map((q) => (
//             <tr key={q.id}>
//               <td className="border p-2">{q.id}</td>
//               <td className="border p-2">{q.subject}</td>
//               <td className="border p-2">{q.level_number}</td>
//               <td className="border p-2">{q.question}</td>
//               <td className="border p-2 space-x-2">
//                 <a
//                   href={`/admin/questions/edit/${q.id}`}
//                   className="px-3 py-1 bg-green-600 text-white rounded"
//                 >
//                   Edit
//                 </a>
//                 <button
//                   onClick={() => handleDelete(q.id)}
//                   className="px-3 py-1 bg-red-600 text-white rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import api from "../../../api/axios";

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all questions
  const fetchQuestions = async () => {
    try {
      const res = await api.get("/admin/questions");
      setQuestions(res.data.questions || []);
    } catch (error) {
      console.error("Error fetching questions:", error);
      // No need to manually redirect; interceptor handles it.
    } finally {
      setLoading(false);
    }
  };

  // Delete a question
  const handleDelete = async (id) => {
    if (!confirm("Delete this question?")) return;

    try {
      await api.delete(`/admin/questions/${id}`);
      fetchQuestions(); // refresh list
    } catch (error) {
      console.error("Delete error:", error);
      // Token handling already done by axios interceptor
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (loading) return <p className="p-6 text-xl">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Manage Questions</h1>

      <a
        href="/admin/questions/add"
        className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add New Question
      </a>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Level</th>
            <th className="border p-2">Question</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td className="border p-2">{q.id}</td>
              <td className="border p-2">{q.subject}</td>
              <td className="border p-2">{q.level_number}</td>
              <td className="border p-2">{q.text}</td>

              <td className="border p-2 space-x-2">
                <a
                  href={`/admin/questions/edit/${q.id}`}
                  className="px-3 py-1 bg-green-600 text-white rounded"
                >
                  Edit
                </a>

                <button
                  onClick={() => handleDelete(q.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
