// "use client";

// import { useState } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionPage() {
//   const [subject, setSubject] = useState("");
//   const [level, setLevel] = useState("");
//   const [text, setText] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctIndex, setCorrectIndex] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleOptionChange = (value, index) => {
//     const updated = [...options];
//     updated[index] = value;
//     setOptions(updated);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/questions/create", {
//         subject,
//         level,
//         text,
//         options,
//         correctIndex,
//       });

//       alert("Question added successfully!");
//       window.location.href = "/admin/questions";

//     } catch (error) {
//       console.log(error);
//       alert("Error adding question!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Add New Question</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <div>
//           <label className="block mb-1">Subject</label>
//           <input
//             type="text"
//             className="border p-2 w-full"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="block mb-1">Level</label>
//           <select
//             className="border p-2 w-full"
//             value={level}
//             onChange={(e) => setLevel(e.target.value)}
//           >
//             <option value="">Select Level</option>
//             <option value="1">Level 1</option>
//             <option value="2">Level 2</option>
//             <option value="3">Level 3</option>
//              <option value="4">Level 4</option>
//               <option value="5">Level 5</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-1">Question Text</label>
//           <textarea
//             className="border p-2 w-full"
//             rows="3"
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//           ></textarea>
//         </div>

//         <div>
//           <label className="block mb-2 font-semibold">Options</label>
//           {options.map((opt, idx) => (
//             <div key={idx} className="flex items-center gap-2 mb-2">
//               <input
//                 type="text"
//                 className="border p-2 flex-1"
//                 placeholder={`Option ${idx + 1}`}
//                 value={opt}
//                 onChange={(e) => handleOptionChange(e.target.value, idx)}
//               />
//               <input
//                 type="radio"
//                 name="correct"
//                 onChange={() => setCorrectIndex(idx)}
//               />
//               <span>Correct</span>
//             </div>
//           ))}
//         </div>

//         <button
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Saving..." : "Add Question"}
//         </button>

//       </form>
//     </div>
//   );
// }









// "use client";
// import { useState, useEffect } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionPage() {
//   const [subjects, setSubjects] = useState([]);
//   const [levels, setLevels] = useState([1, 2, 3, 4, 5]);

//   const [form, setForm] = useState({
//     subject: "",
//     level_number: "",
//     question: "",
//     optionA: "",
//     optionB: "",
//     optionC: "",
//     optionD: "",
//     correctAnswer: "",
//   });

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       const res = await api.get("/student/dashboard");
//       setSubjects(res.data.subjects);
//       console.log(res.data.subjects)
//     };
//     fetchSubjects();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!form.subject || !form.level_number || !form.question) {
//       alert("All fields required");
//       return;
//     }

//     await api.post("/admin/questions/add", form);
//     alert("Question added successfully!");
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add Question</h1>

//       <div className="grid gap-3">

//         <select name="subject" onChange={handleChange} className="p-2 border rounded">
//           <option>Select Subject</option>
//           {subjects.map((sub) => (
//             <option key={sub} value={sub}
//             style={{ backgroundColor: "#f0f0f0", color: "black" }}>
//               {sub}
//             </option>
//           ))}
//         </select>

//         <select name="level_number" onChange={handleChange} className="p-2 border rounded">
//           <option>Select Level</option>
//           {levels.map((lvl) => (
//             <option key={lvl} value={lvl}>
//               Level {lvl}
//             </option>
//           ))}
//         </select>

//         <textarea
//           name="question"
//           placeholder="Enter Question"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />

//         <input name="optionA" placeholder="Option A" onChange={handleChange} className="p-2 border rounded" />
//         <input name="optionB" placeholder="Option B" onChange={handleChange} className="p-2 border rounded" />
//         <input name="optionC" placeholder="Option C" onChange={handleChange} className="p-2 border rounded" />
//         <input name="optionD" placeholder="Option D" onChange={handleChange} className="p-2 border rounded" />

//         <select name="correctAnswer" onChange={handleChange} className="p-2 border rounded">
//           <option>Select Correct Answer</option>
//           <option value="A">Option A</option>
//           <option value="B">Option B</option>
//           <option value="C">Option C</option>
//           <option value="D">Option D</option>
//         </select>

//         <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 rounded">
//           Save Question
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useState, useEffect } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionPage() {
//   const [subjects, setSubjects] = useState([]);
//   const [levels, setLevels] = useState([1, 2, 3, 4, 5]);

//   const [form, setForm] = useState({
//     subject: "",
//     level_number: "",
//     question: "",
//     optionA: "",
//     optionB: "",
//     optionC: "",
//     optionD: "",
//     correctAnswer: "",
//   });

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await api.get("/student/dashboard");
//         setSubjects(res.data.subjects || []);
//       } catch (err) {
//         console.log("Error loading subjects:", err);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (
//       !form.subject ||
//       !form.level_number ||
//       !form.question ||
//       !form.optionA ||
//       !form.optionB ||
//       !form.optionC ||
//       !form.optionD ||
//       !form.correctAnswer
//     ) {
//       alert("All fields are required!");
//       return;
//     }

//     try {
//       await api.post("/admin/questions/add", form);
//       alert("Question added successfully!");
//     } catch (err) {
//       alert(err.response?.data?.message || "Error saving question");
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add Question</h1>

//       <div className="grid gap-3">

//         {/* Subject */}
//         <select
//           name="subject"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         >
//           <option>Select Subject</option>

//           {subjects.map((sub, idx) => (
//             <option
//               key={idx}
//               value={sub}
//               className="hover:bg-blue-200"
//               style={{ backgroundColor: "#f7f7f7", color: "black" }}
//             >
//               {sub}
//             </option>
//           ))}
//         </select>

//         {/* Level */}
//         <select
//           name="level_number"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         >
//           <option>Select Level</option>

//           {levels.map((lvl) => (
//             <option key={lvl} value={lvl}>
//               Level {lvl}
//             </option>
//           ))}
//         </select>

//         {/* Question */}
//         <textarea
//           name="question"
//           placeholder="Enter Question"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />

//         {/* Options */}
//         <input
//           name="optionA"
//           placeholder="Option A"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <input
//           name="optionB"
//           placeholder="Option B"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <input
//           name="optionC"
//           placeholder="Option C"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />
//         <input
//           name="optionD"
//           placeholder="Option D"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         />

//         {/* Correct Answer */}
//         <select
//           name="correctAnswer"
//           onChange={handleChange}
//           className="p-2 border rounded"
//         >
//           <option>Select Correct Answer</option>
//           <option value="A">Option A</option>
//           <option value="B">Option B</option>
//           <option value="C">Option C</option>
//           <option value="D">Option D</option>
//         </select>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           className="bg-blue-600 text-white py-2 rounded"
//         >
//           Save Question
//         </button>
//       </div>
//     </div>
//   );
// }







"use client";
import { useState, useEffect } from "react";
import api from "../../../../api/axios";

export default function AddQuestionPage() {
  const [subjects, setSubjects] = useState([]);
  const [levels, setLevels] = useState([1, 2, 3, 4, 5]);
  const [exams, setExams] = useState([]);

  const [form, setForm] = useState({
    exam_id: "",
    subject: "",
    level_number: "",
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
  });

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await api.get("/student/dashboard");
        setSubjects(res.data.subjects || []);
      } catch (err) {
        console.log("Error loading subjects:", err);
      }
    };

    const fetchExams = async () => {
      try {
        const res = await api.get("/admin/exams");
        setExams(res.data.exams || []);

        console.log("exam " ,res)

      } catch (err) {
        console.log("Error loading exams:", err);
      }
    };

    fetchSubjects();
    fetchExams();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    for (let key in form) {
      if (!form[key]) {
        alert("All fields are required!");
        return;
      }
    }

    try {
      await api.post("/admin/questions/add", form);
      alert("Question added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving question");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Question</h1>

      <div className="grid gap-3">

        {/* Exam */}
        <select name="exam_id" onChange={handleChange} className="p-2 border rounded">
          <option>Select Exam</option>
          {exams.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.subject} — Level {ex.level_number}
            </option>
          ))}
        </select>

        {/* Subject */}
        <select name="subject" onChange={handleChange} className="p-2 border rounded">
          <option>Select Subject</option>
          {subjects.map((sub, idx) => (
            <option key={idx} value={sub}>{sub}</option>
          ))}
        </select>

        {/* Level */}
        <select name="level_number" onChange={handleChange} className="p-2 border rounded">
          <option>Select Level</option>
          {levels.map((lvl) => (
            <option key={lvl} value={lvl}>Level {lvl}</option>
          ))}
        </select>

        {/* Question */}
        <textarea name="question" placeholder="Enter Question" onChange={handleChange} className="p-2 border rounded" />

        {/* Options */}
        <input name="optionA" placeholder="Option A" onChange={handleChange} className="p-2 border rounded" />
        <input name="optionB" placeholder="Option B" onChange={handleChange} className="p-2 border rounded" />
        <input name="optionC" placeholder="Option C" onChange={handleChange} className="p-2 border rounded" />
        <input name="optionD" placeholder="Option D" onChange={handleChange} className="p-2 border rounded" />

        {/* Correct Answer */}
        <select name="correctAnswer" onChange={handleChange} className="p-2 border rounded">
          <option>Select Correct Answer</option>
          <option value="A">Option A</option>
          <option value="B">Option B</option>
          <option value="C">Option C</option>
          <option value="D">Option D</option>
        </select>

        {/* Submit */}
        <button onClick={handleSubmit} className="bg-blue-600 text-white py-2 rounded">
          Save Question
        </button>
      </div>
    </div>
  );
}
