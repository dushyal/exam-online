// "use client";

// import { useState } from "react";
// import api from "../../../../api/axios";

// export default function AddExamPage() {
//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [level, setLevel] = useState("");
//   const [totalQuestions, setTotalQuestions] = useState("");
//   const [totalMarks, setTotalMarks] = useState("");
//   const [passingMarks, setPassingMarks] = useState("");
//   const [duration, setDuration] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/exam/create", {
//         name,
//         subject,
//         level,
//         totalQuestions,
//         totalMarks,
//         passingMarks,
//         duration,
//       });

//       alert("Exam created successfully!");
//       window.location.href = "/admin/exams";

//     } catch (error) {
//       console.log(error);
//       alert("Error creating exam!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Create New Exam</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <div>
//           <label className="block mb-1">Exam Name</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Eg: Math Basic Test"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Subject</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             placeholder="Eg: Math"
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Level</label>
//           <select
//             className="border p-2 w-full"
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             required
//           >
//             <option value="">Select Level</option>
//             <option value="1">Level 1</option>
//             <option value="2">Level 2</option>
//             <option value="3">Level 3</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1">Total Questions</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalQuestions}
//             onChange={(e) => setTotalQuestions(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Total Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalMarks}
//             onChange={(e) => setTotalMarks(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Passing Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={passingMarks}
//             onChange={(e) => setPassingMarks(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Duration (in minutes)</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             required
//             placeholder="Eg: 30"
//           />
//         </div>

//         <button
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Saving..." : "Create Exam"}
//         </button>

//       </form>
//     </div>
//   );
// }



















// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AddExamPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [level, setLevel] = useState("");
//   const [totalQuestions, setTotalQuestions] = useState("");
//   const [totalMarks, setTotalMarks] = useState("");
//   const [passingMarks, setPassingMarks] = useState("");
//   const [duration, setDuration] = useState("");

//   const handleNext = (e) => {
//     e.preventDefault();

//     // pass data to next page
//     const query = new URLSearchParams({
//       name,
//       subject,
//       level,
//       totalQuestions,
//       totalMarks,
//       passingMarks,
//       duration,
//     }).toString();

//     router.push(`/admin/exam/add-questions?${query}`);
//   };



// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../../../api/axios";

// export default function AddExamPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [level, setLevel] = useState("");
//   const [totalQuestions, setTotalQuestions] = useState("");
//   const [totalMarks, setTotalMarks] = useState("");
//   const [passingMarks, setPassingMarks] = useState("");
//   const [duration, setDuration] = useState("");

//   const [subjects, setSubjects] = useState([]); // dynamic subjects

//   // Fetch subjects from API
//   useEffect(() => {
//     //    const fetchSubjects = async () => {
//     //   try {
//     //     const res = await api.get("/admin/questions");
//     //     setSubjects(res.data.questions || []);
//     //     console.log("subjects",res.data.questions)
//     //   } catch (error) {
//     //     console.error("Error fetching questions:", error);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     const fetchSubjects = async () => {
//       try {
//         const res = await api.get("/admin/questions");
//         const questions = res.data.questions || [];

//         // Extract unique subjects
//         const uniqueSubjects = [...new Set(questions.map(q => q.subject))];

//         setSubjects(uniqueSubjects);
//         console.log("subjects", uniqueSubjects);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       } finally {
//         // setLoading(false);
//       }
//     };

//     fetchSubjects();
//   }, []);

//   const handleNext = (e) => {
//     e.preventDefault();
//     const query = new URLSearchParams({
//       name,
//       subject,
//       level,
//       totalQuestions,
//       totalMarks,
//       passingMarks,
//       duration,
//     }).toString();
//     router.push(`/admin/exam/add-questions?${query}`);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Create New Exam</h1>

//       <form onSubmit={handleNext} className="space-y-4">

//         <div>
//           <label className="block mb-1">Exam Name</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Eg: HTML Basic Test"
//             required
//           />
//         </div>

//         {/* <div>
//           <label className="block mb-1">Subject</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             placeholder="Eg: Math"
//             required
//           />
//         </div> */}

//         <div>
//           <label className="block mb-1">Subject</label>
//           <select
//             className="border p-2 w-full"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           >
//             <option value="">Select Subject</option>
//             {subjects.map((sub, index) => (
//               <option key={index} value={sub}>
//                 {sub}
//               </option>
//             ))}
//           </select>
//         </div>




//         {/* <div>
//           <label className="block mb-1">Level</label>
//           <select
//             className="border p-2 w-full"
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//             required
//           >
//             <option value="">Select Level</option>
//             <option value="1">Level 1</option>
//             <option value="2">Level 2</option>
//             <option value="3">Level 3</option>
//           </select>
//         </div> */}

//         <div>
//           <label className="block mb-1">Total Questions</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalQuestions}
//             onChange={(e) => setTotalQuestions(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Total Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalMarks}
//             onChange={(e) => setTotalMarks(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Passing Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={passingMarks}
//             onChange={(e) => setPassingMarks(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Duration (in minutes)</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             required
//             placeholder="Eg: 30"
//           />
//         </div>

//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           Next → Select Questions
//         </button>

//       </form>
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../../../api/axios";

// export default function AddExamPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [level, setLevel] = useState("");
//   const [totalQuestions, setTotalQuestions] = useState("");
//   const [totalMarks, setTotalMarks] = useState("");
//   const [passingMarks, setPassingMarks] = useState("");
//   const [duration, setDuration] = useState("");

//   const [startDateTime, setStartDateTime] = useState("");
//   const [endDateTime, setEndDateTime] = useState("");

//   const [subjects, setSubjects] = useState([]);

//   // Fetch subjects from API
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await api.get("/admin/questions");
//         const questions = res.data.questions || [];

//         // Extract unique subjects
//         const uniqueSubjects = [...new Set(questions.map(q => q.subject))];

//         setSubjects(uniqueSubjects);
//         console.log("subjects", uniqueSubjects);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };

//     fetchSubjects();
//   }, []);

//   const handleNext = (e) => {
//     e.preventDefault();

//     const query = new URLSearchParams({
//       name,
//       subject,
//       level,
//       totalQuestions,
//       totalMarks,
//       passingMarks,
//       duration,
//       startDateTime,
//       endDateTime,
//     }).toString();

//     router.push(`/admin/exam/add-questions?${query}`);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Create New Exam</h1>

//       <form onSubmit={handleNext} className="space-y-4">

//         {/* Exam Name */}
//         <div>
//           <label className="block mb-1">Exam Name</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Eg: HTML Basic Test"
//             required
//           />
//         </div>

//         {/* Subject Dropdown */}
//         <div>
//           <label className="block mb-1">Subject</label>
//           <select
//             className="border p-2 w-full"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           >
//             <option value="">Select Subject</option>

//             {subjects.length > 0 ? (
//               subjects.map((sub, index) => (
//                 <option key={index} value={sub}>
//                   {sub}
//                 </option>
//               ))
//             ) : (
//               <option disabled>No subjects found</option>
//             )}
//           </select>
//         </div>

//         {/* Total Questions */}
//         <div>
//           <label className="block mb-1">Total Questions</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalQuestions}
//             onChange={(e) => setTotalQuestions(e.target.value)}
//             required
//           />
//         </div>

//         {/* Total Marks */}
//         <div>
//           <label className="block mb-1">Total Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalMarks}
//             onChange={(e) => setTotalMarks(e.target.value)}
//             required
//           />
//         </div>

//         {/* Passing Marks */}
//         <div>
//           <label className="block mb-1">Passing Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={passingMarks}
//             onChange={(e) => setPassingMarks(e.target.value)}
//             required
//           />
//         </div>

//         {/* Duration */}
//         <div>
//           <label className="block mb-1">Duration (in minutes)</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             required
//             placeholder="Eg: 30"
//           />
//         </div>

//         {/* Start Date & Time */}
//         <div>
//           <label className="block mb-1">Exam Start Date & Time</label>
//           <input
//             type="datetime-local"
//             className="border p-2 w-full"
//             value={startDateTime}
//             onChange={(e) => setStartDateTime(e.target.value)}
//             required
//           />
//         </div>

//         {/* End Date & Time */}
//         <div>
//           <label className="block mb-1">Exam End Date & Time</label>
//           <input
//             type="datetime-local"
//             className="border p-2 w-full"
//             value={endDateTime}
//             onChange={(e) => setEndDateTime(e.target.value)}
//             required
//           />
//         </div>

//         {/* Submit */}
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Next → Select Questions
//         </button>

//       </form>
//     </div>
//   );
// }



// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "../../../../api/axios";

// export default function AddExamPage() {
//   const router = useRouter();

//   const [name, setName] = useState("");
//   const [subject, setSubject] = useState("");
//   const [level, setLevel] = useState("");
//   const [totalQuestions, setTotalQuestions] = useState("");
//   const [totalMarks, setTotalMarks] = useState("");
//   const [passingMarks, setPassingMarks] = useState("");
//   const [duration, setDuration] = useState("");

//   const [startDateTime, setStartDateTime] = useState("");
//   const [endDateTime, setEndDateTime] = useState("");

//   const [subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await api.get("/admin/questions");
//         const questions = res.data.questions || [];
//         const uniqueSubjects = [...new Set(questions.map(q => q.subject))];
//         setSubjects(uniqueSubjects);
//       } catch (error) {
//         console.error("Error fetching questions:", error);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   const handleNext = async (e) => {
//     e.preventDefault();

//     // Convert datetime-local to ISO string
//     const startISO = startDateTime ? new Date(startDateTime).toISOString() : null;
//     const endISO = endDateTime ? new Date(endDateTime).toISOString() : null;

//     const payload = {
//       name,
//       subject,
//       level,
//       totalQuestions: Number(totalQuestions),
//       totalMarks: Number(totalMarks),
//       passingMarks: Number(passingMarks),
//       duration: Number(duration),
//       examStart: startISO,
//       examEnd: endISO,
//     };

//     // Navigate to add questions page with payload as query string
//     const query = new URLSearchParams(payload).toString();
//     router.push(`/admin/exam/add-questions?${query}`);
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Create New Exam</h1>

//       <form onSubmit={handleNext} className="space-y-4">
//         {/* Exam Name */}
//         <div>
//           <label className="block mb-1">Exam Name</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Eg: HTML Basic Test"
//             required
//           />
//         </div>

//         {/* Subject */}
//         <div>
//           <label className="block mb-1">Subject</label>
//           <select
//             className="border p-2 w-full"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//             required
//           >
//             <option value="">Select Subject</option>
//             {subjects.length > 0
//               ? subjects.map((sub, idx) => (
//                   <option key={idx} value={sub}>{sub}</option>
//                 ))
//               : <option disabled>No subjects found</option>}
//           </select>
//         </div>

//         {/* Total Questions */}
//         <div>
//           <label className="block mb-1">Total Questions</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalQuestions}
//             onChange={(e) => setTotalQuestions(e.target.value)}
//             required
//           />
//         </div>

//         {/* Total Marks */}
//         <div>
//           <label className="block mb-1">Total Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={totalMarks}
//             onChange={(e) => setTotalMarks(e.target.value)}
//             required
//           />
//         </div>

//         {/* Passing Marks */}
//         <div>
//           <label className="block mb-1">Passing Marks</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={passingMarks}
//             onChange={(e) => setPassingMarks(e.target.value)}
//             required
//           />
//         </div>

//         {/* Duration */}
//         <div>
//           <label className="block mb-1">Duration (minutes)</label>
//           <input
//             type="number"
//             className="border p-2 w-full"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             required
//             placeholder="Eg: 30"
//           />
//         </div>

//         {/* Start Date & Time */}
//         <div>
//           <label className="block mb-1">Exam Start Date & Time</label>
//           <input
//             type="datetime-local"
//             className="border p-2 w-full"
//             value={startDateTime}
//             onChange={(e) => setStartDateTime(e.target.value)}
//             required
//           />
//         </div>

//         {/* End Date & Time */}
//         <div>
//           <label className="block mb-1">Exam End Date & Time</label>
//           <input
//             type="datetime-local"
//             className="border p-2 w-full"
//             value={endDateTime}
//             onChange={(e) => setEndDateTime(e.target.value)}
//             required
//           />
//         </div>

//         {/* Submit */}
//         <button className="bg-blue-600 text-white px-4 py-2 rounded">
//           Next → Select Questions
//         </button>
//       </form>
//     </div>
//   );
// }









"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../../../api/axios";

export default function AddExamPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [passingMarks, setPassingMarks] = useState("");
  const [duration, setDuration] = useState("");

  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const [subjects, setSubjects] = useState([]);

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/admin/questions");
        const questions = res.data.questions || [];
        const uniqueSubjects = [...new Set(questions.map(q => q.subject))];
        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleNext = (e) => {
    e.preventDefault();

    // Convert datetime-local to ISO string
    const startISO = startDateTime ? new Date(startDateTime).toISOString() : null;
    const endISO = endDateTime ? new Date(endDateTime).toISOString() : null;

    const payload = {
      name,
      subject,
      level,
      totalQuestions: Number(totalQuestions),
      totalMarks: Number(totalMarks),
      passingMarks: Number(passingMarks),
      duration: Number(duration),
      startDateTime: startISO,
      endDateTime: endISO,
    };

    // Send payload via query string to AddQuestions page
    const query = new URLSearchParams(payload).toString();
    router.push(`/admin/exam/add-questions?${query}`);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Create New Exam</h1>

      <form onSubmit={handleNext} className="space-y-4">
        {/* Exam Name */}
        <div>
          <label className="block mb-1">Exam Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Eg: HTML Basic Test"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block mb-1">Subject</label>
          <select
            className="border p-2 w-full"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Subject</option>
            {subjects.map((sub, idx) => (
              <option key={idx} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Total Questions */}
        <div>
          <label className="block mb-1">Total Questions</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={totalQuestions}
            onChange={(e) => setTotalQuestions(e.target.value)}
            required
          />
        </div>

        {/* Total Marks */}
        <div>
          <label className="block mb-1">Total Marks</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={totalMarks}
            onChange={(e) => setTotalMarks(e.target.value)}
            required
          />
        </div>

        {/* Passing Marks */}
        <div>
          <label className="block mb-1">Passing Marks</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={passingMarks}
            onChange={(e) => setPassingMarks(e.target.value)}
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1">Duration (minutes)</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>

        {/* Start Date & Time */}
        <div>
          <label className="block mb-1">Exam Start Date & Time</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            required
          />
        </div>

        {/* End Date & Time */}
        <div>
          <label className="block mb-1">Exam End Date & Time</label>
          <input
            type="datetime-local"
            className="border p-2 w-full"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            required
          />
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Next → Select Questions
        </button>
      </form>
    </div>
  );
}
