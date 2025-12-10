// "use client";
// import { useEffect, useState } from "react";
// import api from "../../../api/axios";
// import { useParams } from "next/navigation";

// export default function EditExam() {
//   const { id } = useParams();
//   const [data, setData] = useState({
//     title: "",
//     subject: "",
//     level_number: "",
//     duration_minutes: "",
//     total_marks: "",
//   });

//   const loadExam = async () => {
//     const res = await api.get(`/admin/exams/${id}`);
//     setData(res.data);
//   };

//   const updateExam = async () => {
//     await api.put(`/admin/exams/${id}`, data);
//     alert("Updated Successfully");
//   };

//   useEffect(() => {
//     loadExam();
//   }, []);

//   return (
//     <div className="p-10">
//       <h2 className="text-xl font-bold mb-3">Edit Exam</h2>

//       {Object.keys(data).map((key) => (
//         <input
//           key={key}
//           className="border p-2 block my-2"
//           value={data[key]}
//           onChange={(e) => setData({ ...data, [key]: e.target.value })}
//         />
//       ))}

//       <button onClick={updateExam} className="bg-blue-600 text-white p-2">
//         Save
//       </button>
//     </div>
//   );
// }


// "use client";
// import { useEffect, useState } from "react";
// import api from "../../../api/axios";

// export default function AdminExams() {
//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const res = await api.get("/admin/exams");
//         setExams(res.data.exams || []);

        
//       } catch (err) {
//         console.error(err);
//       }
//     };

    
//     fetchExams();
//   }, []);

//   useEffect(() => {
//   console.log("Current exams state:", exams);
// }, [exams]);


//   const handleDelete = async (id) => {
//     if (!confirm("Delete this exam?")) return;
//     try {
//       await api.delete(`/admin/exams/${id}`);
//       setExams(exams.filter(e => e.id !== id)
//     );
//     console.log(exams)
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>
//       <a href="/admin/exam/add" className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded">+ Add Exam</a>
//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Subject</th>
//             <th className="border p-2">Level</th>
//             <th className="border p-2">Time Limit</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {exams.map(e => (
//             <tr key={e.id}>
//               <td className="border p-2">{e.id}</td>
//               <td className="border p-2">{e.subject}</td>
//               <td className="border p-2">{e.level_number}</td>
//               <td className="border p-2">{e.duration_minutes} mins</td>
//               <td className="border p-2 space-x-2">
//                 <a href={`/admin/exam/edit/${e.id}`} className="px-3 py-1 bg-green-600 text-white rounded">Edit</a>
//                 <button onClick={() => handleDelete(e.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
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

// export default function AdminExams() {
//   const [exams, setExams] = useState([]);

//   useEffect(() => {
//     const fetchExams = async () => {
//       try {
//         const res = await api.get("/admin/exams");
//         setExams(res.data.exams || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchExams();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!confirm("Delete this exam?")) return;

//     try {
//       await api.delete(`/admin/exams/${id}`);
//       setExams((prev) => prev.filter(e => e.id !== id));
//     } catch (err) { console.error(err); }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>

//       <a href="/admin/exam/add" className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded">+ Add Exam</a>

//       <table className="w-full border-collapse border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-2">ID</th>
//             <th className="border p-2">Subject</th>
//             <th className="border p-2">Level</th>
//             <th className="border p-2">Total Qs</th>
//             <th className="border p-2">Start Time</th>
//             <th className="border p-2">End Time</th>
//             <th className="border p-2">Time Limit</th>
//             <th className="border p-2">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {exams.map(e => (
//             <tr key={e.id}>
//               <td className="border p-2">{e.id}</td>
//               <td className="border p-2">{e.subject}</td>
//               <td className="border p-2">{e.level_number}</td>
//               <td className="border p-2">{e.total_questions}</td>
//               <td className="border p-2">{e.exam_start_datetime ? new Date(e.exam_start_datetime).toLocaleString() : "-"}</td>
//               <td className="border p-2">{e.exam_end_datetime ? new Date(e.exam_end_datetime).toLocaleString() : "-"}</td>
//               <td className="border p-2">{e.duration_minutes} mins</td>

//               <td className="border p-2 space-x-2">
//                 <a href={`/admin/exam/edit/${e.id}`} className="px-3 py-1 bg-green-600 text-white rounded">Edit</a>
//                 <button onClick={() => handleDelete(e.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
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
import Loader from "../../../components/Loader";
import NoData from "../../../components/noData";


export default function AdminExams() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch exams from backend
  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/exams"); // calls http://localhost:5000/api/admin/exams
        setExams(res.data.exams || []);
      } catch (err) {
        console.error("Failed to fetch exams:", err);
        alert("Failed to load exams from server.");
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  // Delete exam
  const handleDelete = async (id) => {
    if (!confirm("Delete this exam?")) return;

    try {
      await api.delete(`/admin/exams/${id}`);
      setExams((prev) => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error("Failed to delete exam:", err);
      alert("Failed to delete exam.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Exams</h1>

      <a
        href="/admin/exam/add"
        className="inline-block mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Add Exam
      </a>

      {loading ? (
        <Loader size={250} message="Loading Exam..." />
      ) : (
        <table className="w-full border-collapse border text-center">
  <thead>
    <tr className="bg-gray-100">
      <th className="border p-2">ID</th>
      <th className="border p-2">Subject</th>
      <th className="border p-2">Total Questions</th>
      <th className="border p-2">Start Time</th>
      <th className="border p-2">End Time</th>
      <th className="border p-2">Time Limit</th>
      <th className="border p-2">Actions</th>
    </tr>
  </thead>

  <tbody>
    {exams.length === 0 && (
      <tr>
        <td colSpan="8" className="text-center p-4">
          No exams found.
        </td>
      </tr>
    )}

    {exams.map((e) => (
      <tr key={e.id}>
        <td className="border p-2">{e.id}</td>
        <td className="border p-2">{e.subject}</td>
        <td className="border p-2">{e.total_questions}</td>
        <td className="border p-2">
          {e.start_time ? new Date(e.start_time).toLocaleString() : "-"}
        </td>
        <td className="border p-2">
          {e.end_time ? new Date(e.end_time).toLocaleString() : "-"}
        </td>
        <td className="border p-2">{e.duration_minutes} mins</td>

        <td className="border p-2 space-x-2">
          <a
            href={`/admin/exam/edit/${e.id}`}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Edit
          </a>
          <button
            onClick={() => handleDelete(e.id)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      )}
    </div>
  );
}
