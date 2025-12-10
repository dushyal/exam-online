// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import api from "../../../../../api/axios";

// export default function EditExamPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [loading, setLoading] = useState(true);
//   const [exam, setExam] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [selected, setSelected] = useState([]);

//   console.log("Component rendered with id:", id);

//   // Load exam + questions
//   useEffect(() => {
//     if (id) {
//       console.log("Fetching exam and questions for id:", id);
//       fetchExam();
//       fetchQuestions();
//     }
//   }, [id]);

//   const fetchExam = async () => {
//     try {
//       console.log("Calling API: GET /admin/exams/", id);
//       const res = await api.get(`/admin/exams/${id}`);
//       const data = res.data.exam;
//       console.log("Exam fetched:", data);
//       setExam(data);
//       setSelected(data.questions.map((q) => q.id));
//       console.log("Selected questions initialized:", data.questions.map((q) => q.id));
//     } catch (err) {
//       console.error("Error fetching exam:", err);
//       alert("Failed to load exam!");
//     }
//   };

//   const fetchQuestions = async () => {
//     try {
//       console.log("Calling API: GET /admin/questions");
//     //   const res = await api.get("/admin/questions");
//       console.log("Questions fetched:", res.data.questions);
//       setQuestions(res.data.questions);
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//     } finally {
//       setLoading(false);
//       console.log("Loading set to false");
//     }
//   };

//   const toggleSelect = (id) => {
//     console.log("Toggling question selection for id:", id);
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
//     );
//     console.log("Updated selected questions:", selected);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     console.log("Submitting updated exam:", exam);
//     console.log("Selected questions to update:", selected);

//     try {
//       setLoading(true);
//       const payload = {
//         name: exam.name,
//         subject: exam.subject,
//         total_questions: selected.length,
//         total_marks: exam.total_marks,
//         passing_percent: exam.passing_percent,
//         duration_minutes: exam.duration_minutes,
//         selectedQuestions: selected,
//         start_time: exam.start_time,
//         end_time: exam.end_time,
//       };

//       console.log("Payload for PUT request:", payload);
//       await api.put(`/admin/exams/update/${id}`, payload);

//       console.log("Exam updated successfully!");
//       alert("Exam updated successfully!");
//       router.push("/admin/exam");
//     } catch (err) {
//       console.error("Error updating exam:", err);
//       alert("Failed to update exam!");
//     } finally {
//       setLoading(false);
//       console.log("Loading set to false after update");
//     }
//   };

//   if (loading || !exam) {
//     console.log("Loading state or exam not ready yet");
//     return <p className="p-6">Loading...</p>;
//   }

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Edit Exam: {exam.name}</h1>

//       {/* Exam Details */}
//       <form onSubmit={handleUpdate} className="space-y-4">

//         <div>
//           <label className="block mb-1">Exam Name</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={exam.title}
//             onChange={(e) => {
//               console.log("Updating exam name to:", e.target.value);
//               setExam({ ...exam, name: e.target.value });
//             }}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Subject</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={exam.subject}
//             disabled
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Total Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={exam.total_marks}
//             onChange={(e) => {
//               console.log("Updating total_marks to:", Number(e.target.value));
//               setExam({ ...exam, total_marks: Number(e.target.value) });
//             }}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Passing Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={exam.passing_percent}
//             onChange={(e) => {
//               console.log("Updating passing_percent to:", Number(e.target.value));
//               setExam({ ...exam, passing_percent: Number(e.target.value) });
//             }}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Duration (minutes)</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={exam.duration_minutes}
//             onChange={(e) => {
//               console.log("Updating duration_minutes to:", Number(e.target.value));
//               setExam({ ...exam, duration_minutes: Number(e.target.value) });
//             }}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Start Date & Time</label>
//           <input
//             type="datetime-local"
//             className="border p-2 w-full"
//             value={exam.start_time?.slice(0, 16)}
//             onChange={(e) => {
//               console.log("Updating start_time to:", e.target.value);
//               setExam({
//                 ...exam,
//                 start_time: new Date(e.target.value).toISOString(),
//               });
//             }}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">End Date & Time</label>
//           <input
//             type="datetime-local"
//             className="border p-2 w-full"
//             value={exam.end_time?.slice(0, 16)}
//             onChange={(e) => {
//               console.log("Updating end_time to:", e.target.value);
//               setExam({
//                 ...exam,
//                 end_time: new Date(e.target.value).toISOString(),
//               });
//             }}
//           />
//         </div>

//         <button
//           className="bg-green-600 text-white px-5 py-2 rounded mt-4"
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Update Exam"}
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../../api/axios";

export default function EditExamPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);

  // Load exam data on mount
  useEffect(() => {
    if (id) fetchExam();
  }, [id]);

  const fetchExam = async () => {
    try {
      const res = await api.get(`/admin/exams/${id}`);
      setExam(res.data.exam);
    } catch (err) {
      console.error("Failed to fetch exam:", err);
      alert("Failed to load exam!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        name: exam.title,
        total_marks: exam.total_marks,
        passing_percent: exam.passing_percent,
        duration_minutes: exam.duration_minutes,
        start_time: exam.start_time,
        end_time: exam.end_time,
      };

      // Correct URL for updating exam
      await api.put(`/admin/exams/${id}`, payload);

      alert("Exam updated successfully!");
      router.push("/admin/exam");
    } catch (err) {
      console.error("Failed to update exam:", err);
      alert("Failed to update exam!");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !exam) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Edit Exam: {exam.name}</h1>
      <form onSubmit={handleUpdate} className="space-y-4">

        {/* Exam Name */}
        <div>
          <label className="block mb-1">Exam Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={exam.title}
            onChange={(e) => setExam({ ...exam, title: e.target.value })}
          />
        </div>

        {/* Subject (disabled) */}
        <div>
          <label className="block mb-1">Subject</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={exam.subject}
            disabled
          />
        </div>

        {/* Total Marks */}
        <div>
          <label className="block mb-1">Total Marks</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={exam.total_marks}
            onChange={(e) =>
              setExam({ ...exam, total_marks: Number(e.target.value) })
            }
          />
        </div>

        {/* Passing Marks */}
        <div>
          <label className="block mb-1">Passing Marks</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={exam.passing_percent}
            onChange={(e) =>
              setExam({ ...exam, passing_percent: Number(e.target.value) })
            }
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1">Duration (minutes)</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={exam.duration_minutes}
            onChange={(e) =>
              setExam({ ...exam, duration_minutes: Number(e.target.value) })
            }
          />
        </div>

        {/* Start Date & Time */}
        <div>
          <label className="block mb-1">Start Date & Time</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={exam.start_time?.slice(0, 16)}
            onChange={(e) =>
              setExam({ ...exam, start_time: new Date(e.target.value).toISOString() })
            }
          />
        </div>

        {/* End Date & Time */}
        <div>
          <label className="block mb-1">End Date & Time</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={exam.end_time?.slice(0, 16)}
            onChange={(e) =>
              setExam({ ...exam, end_time: new Date(e.target.value).toISOString() })
            }
          />
        </div>

        {/* Submit Button */}
        <button
          className="bg-green-600 text-white px-5 py-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "Saving..." : "Update Exam"}
        </button>
      </form>
    </div>
  );
}
