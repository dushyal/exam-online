// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "../../../../api/axios";
// export default function AddQuestionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Receive data from PAGE 1
//   const name = searchParams.get("name");
//   const subject = searchParams.get("subject");
//   const level = searchParams.get("level");
//   const totalQuestions = searchParams.get("totalQuestions");
//   const totalMarks = searchParams.get("totalMarks");
//   const passingMarks = searchParams.get("passingMarks");
//   const duration = searchParams.get("duration");

//   const [mode, setMode] = useState(""); // manual / auto
//   const [questions, setQuestions] = useState([]);
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Load questions when manual mode selected
//   useEffect(() => {
//     if (mode === "manual") {
//       fetchQuestionsBySubject();
//     }
//   }, [mode]);

//   const fetchQuestionsBySubject = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get(`/questions/subject/${subject}`);
//       setQuestions(res.data || []);
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       alert("Failed to load questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id)
//         ? prev.filter((q) => q !== id)
//         : [...prev, id]
//     );
//   };

//   const handleCreateExam = async () => {
//     if (mode === "") {
//       alert("Please select manual or automatic mode.");
//       return;
//     }

//     if (mode === "manual" && selected.length === 0) {
//       alert("Please select at least one question.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         name,
//         subject,
//         level,
//         totalQuestions,
//         totalMarks,
//         passingMarks,
//         duration,
//         mode,
//         selectedQuestions: selected,
//       };

//       const res = await api.post("/exam/create", payload);
//       alert("Exam created successfully!");
//       router.push("/admin/exam");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create exam!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p><strong>Exam Name:</strong> {name}</p>
//         <p><strong>Subject:</strong> {subject}</p>
//         <p><strong>Level:</strong> {level}</p>
//         <p><strong>Total Marks:</strong> {totalMarks}</p>
//         <p><strong>Duration:</strong> {duration} min</p>
//       </div>

//       {/* Select Mode */}
//       <div className="mb-6">
//         <label className="mr-6">
//           <input
//             type="radio"
//             name="mode"
//             value="manual"
//             className="mr-2"
//             onChange={() => setMode("manual")}
//           />
//           Add Manually
//         </label>

//         <label>
//           <input
//             type="radio"
//             name="mode"
//             value="auto"
//             className="mr-2"
//             onChange={() => setMode("auto")}
//           />
//           Add Automatically
//         </label>
//       </div>

//       {/* MANUAL MODE */}
//       {mode === "manual" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">
//             Questions for {subject}
//           </h2>

//           {loading && <p>Loading questions...</p>}

//           {questions.map((q) => (
//             <div
//               key={q.id}
//               className="p-3 border rounded mb-3 cursor-pointer"
//             >
//               <label>
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selected.includes(q.id)}
//                   onChange={() => toggleSelect(q.id)}
//                 />
//                 {q.text}
//               </label>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* AUTO MODE */}
//       {mode === "auto" && (
//         <div className="p-4 bg-blue-50 border rounded">
//           <p>
//             System will automatically pick <b>{totalQuestions}</b> questions from
//             subject: <b>{subject}</b>
//           </p>
//         </div>
//       )}

//       {/* SUBMIT BUTTON */}
//       <button
//         disabled={loading}
//         onClick={handleCreateExam}
//         className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Create Exam"}
//       </button>
//     </div>
//   );
// }






// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Receive data from previous page
//   const name = searchParams.get("name");
//   const subject = searchParams.get("subject");
//   const level = searchParams.get("level");
//   const totalQuestions = searchParams.get("totalQuestions");
//   const totalMarks = searchParams.get("totalMarks");
//   const passingMarks = searchParams.get("passingMarks");
//   const duration = searchParams.get("duration");

//   const [mode, setMode] = useState(""); // manual / auto
//   const [questions, setQuestions] = useState([]); // all questions for subject
//   const [filteredQuestions, setFilteredQuestions] = useState([]); // filtered by level
//   const [selectedLevel, setSelectedLevel] = useState(""); // 1-5
//   const [selected, setSelected] = useState([]); // selected question IDs
//   const [loading, setLoading] = useState(false);

//   // Load questions once when manual mode is selected
//   useEffect(() => {
//     if (mode === "manual" && subject) {
//       fetchQuestionsBySubject();
//     }
//   }, [mode, subject]);

//   const fetchQuestionsBySubject = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/questions"); // fetch all questions
//       const allQuestions = res.data.questions || [];

//       // Filter by subject initially
//       const filtered = allQuestions.filter((q) => q.subject === subject);
//       setQuestions(filtered);
//       setFilteredQuestions(filtered); // for dynamic level filtering
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       alert("Failed to load questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const toggleSelect = (id) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
//     );
//   };

//   const handleCreateExam = async () => {
//     if (!mode) {
//       alert("Please select manual or automatic mode.");
//       return;
//     }

//     if (mode === "manual" && selected.length === 0) {
//       alert("Please select at least one question.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         name,
//         subject,
//         level,
//         totalQuestions,
//         totalMarks,
//         passingMarks,
//         duration,
//         mode,
//         selectedQuestions: selected,
//       };

//       await api.post("/exam/create", payload);
//       alert("Exam created successfully!");
//       router.push("/admin/exam");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create exam!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

//       {/* Exam Info */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p><strong>Exam Name:</strong> {name}</p>
//         <p><strong>Subject:</strong> {subject}</p>
//         {/* <p><strong>Level:</strong> {level || "N/A"}</p> */}
//         <p><strong>Total Marks:</strong> {totalMarks}</p>
//         <p><strong>Duration:</strong> {duration} min</p>
//       </div>

//       {/* Select Mode */}
//       <div className="mb-6">
//         <label className="mr-6">
//           <input
//             type="radio"
//             name="mode"
//             value="manual"
//             className="mr-2"
//             onChange={() => setMode("manual")}
//           />
//           Add Manually
//         </label>

//         <label>
//           <input
//             type="radio"
//             name="mode"
//             value="auto"
//             className="mr-2"
//             onChange={() => setMode("auto")}
//           />
//           Add Automatically
//         </label>
//       </div>

//       {/* MANUAL MODE */}
//       {mode === "manual" && (
//         <div>
//           <h2 className="text-xl font-semibold mb-2">
//             Questions for {subject}
//           </h2>

//           {/* Level Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Filter by Level</label>
//             <select
//               className="border p-2 w-full"
//               value={selectedLevel}
//               onChange={(e) => {
//                 const levelValue = e.target.value;
//                 setSelectedLevel(levelValue);

//                 if (levelValue === "") {
//                   setFilteredQuestions(questions); // show all
//                 } else {
//                   setFilteredQuestions(
//                     questions.filter((q) => q.level_number === Number(levelValue))
//                   );
//                 }
//               }}
//             >
//               <option value="">All Levels</option>
//               <option value="1">Level 1</option>
//               <option value="2">Level 2</option>
//               <option value="3">Level 3</option>
//               <option value="4">Level 4</option>
//               <option value="5">Level 5</option>
//             </select>
//           </div>

//           {loading && <p>Loading questions...</p>}

//           {filteredQuestions.length === 0 && !loading && (
//             <p>No questions available for this subject/level.</p>
//           )}

//           {filteredQuestions.map((q) => (
//             <div
//               key={q.id}
//               className="p-3 border rounded mb-3 cursor-pointer"
//             >
//               <label>
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selected.includes(q.id)}
//                   onChange={() => toggleSelect(q.id)}
//                 />
//                 {q.text} (Level {q.level_number})
//               </label>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* AUTO MODE */}
//       {mode === "auto" && (
//         <div className="p-4 bg-blue-50 border rounded">
//           <p>
//             System will automatically pick <b>{totalQuestions}</b> questions from
//             subject: <b>{subject}</b>
//           </p>
//         </div>
//       )}

//       {/* SUBMIT BUTTON */}
//       <button
//         disabled={loading}
//         onClick={handleCreateExam}
//         className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Create Exam"}
//       </button>
//     </div>
//   );
// }




// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Receive data from previous page
//   const name = searchParams.get("name");
//   const subject = searchParams.get("subject");
//   const totalQuestions = Number(searchParams.get("totalQuestions") || 0);
//   const totalMarks = searchParams.get("totalMarks");
//   const passingMarks = searchParams.get("passingMarks");
//   const duration = searchParams.get("duration");

//   const [mode, setMode] = useState(""); // manual / auto
//   const [questions, setQuestions] = useState([]); // all questions for subject
//   const [filteredQuestions, setFilteredQuestions] = useState([]); // filtered by level in manual
//   const [selectedLevel, setSelectedLevel] = useState(""); // manual filter 1-5
//   const [selected, setSelected] = useState([]); // selected question IDs
//   const [loading, setLoading] = useState(false);
//   const [autoLevelCount, setAutoLevelCount] = useState({}); // how many picked per level

//   // Auto Mode: number of questions to pick per level
//   const [levelPick, setLevelPick] = useState({
//     1: 0,
//     2: 0,
//     3: 0,
//     4: 0,
//     5: 0,
//   });

//   // Load all questions for the subject when manual or auto mode is selected
//   useEffect(() => {
//     if ((mode === "manual" || mode === "auto") && subject) {
//       fetchQuestionsBySubject();
//     }
//   }, [mode, subject]);

//   const fetchQuestionsBySubject = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/questions"); // fetch all questions
//       const allQuestions = res.data.questions || [];
//       const filtered = allQuestions.filter((q) => q.subject === subject);

//       setQuestions(filtered);
//       setFilteredQuestions(filtered);

//       if (mode === "auto") {
//         pickAutoQuestions(filtered);
//       }
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       alert("Failed to load questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Manual selection toggle
//   const toggleSelect = (id) => {
//     if (!selected.includes(id) && selected.length >= totalQuestions) {
//       alert(`You can select only ${totalQuestions} questions.`);
//       return;
//     }

//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
//     );
//   };

//   // Auto mode pick questions based on levelPick counts
//   const pickAutoQuestions = (allQuestions) => {
//     const sumPick = Object.values(levelPick).reduce((a, b) => a + b, 0);
//     if (sumPick > totalQuestions) {
//       alert(`You can pick maximum ${totalQuestions} questions in total!`);
//       return;
//     }

//     let selectedIds = [];
//     const countByLevel = {};

//     for (let lvl = 1; lvl <= 5; lvl++) {
//       const numPick = Number(levelPick[lvl] || 0);
//       if (numPick <= 0) continue;

//       const lvlQuestions = allQuestions.filter((q) => q.level_number === lvl);
//       if (lvlQuestions.length === 0) continue;

//       // Shuffle and pick
//       const shuffled = [...lvlQuestions].sort(() => 0.5 - Math.random());
//       const picked = shuffled.slice(0, numPick);
//       picked.forEach((q) => selectedIds.push(q.id));
//       countByLevel[lvl] = picked.length;
//     }

//     setSelected(selectedIds);
//     setAutoLevelCount(countByLevel);
//   };

//   const handleCreateExam = async () => {
//     if (!mode) {
//       alert("Please select manual or automatic mode.");
//       return;
//     }

//     if (selected.length === 0) {
//       alert("No questions selected.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         name,
//         subject,
//         totalQuestions: selected.length,
//         totalMarks,
//         passingMarks,
//         duration,
//         mode,
//         selectedQuestions: selected,
//       };

//       await api.post("/exam/create", payload);
//       alert("Exam created successfully!");
//       router.push("/admin/exam");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create exam!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

//       {/* Exam Info */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p><strong>Exam Name:</strong> {name}</p>
//         <p><strong>Subject:</strong> {subject}</p>
//         <p><strong>Total Marks:</strong> {totalMarks}</p>
//         <p><strong>Duration:</strong> {duration} min</p>
//         <p><strong>Total Questions Allowed:</strong> {totalQuestions}</p>
//       </div>

//       {/* Select Mode */}
//       <div className="mb-6">
//         <label className="mr-6">
//           <input
//             type="radio"
//             name="mode"
//             value="manual"
//             className="mr-2"
//             onChange={() => {
//               setMode("manual");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           />
//           Add Manually
//         </label>

//         <label>
//           <input
//             type="radio"
//             name="mode"
//             value="auto"
//             className="mr-2"
//             onChange={() => {
//               setMode("auto");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           />
//           Add Automatically
//         </label>
//       </div>

//       {/* MANUAL MODE */}
//       {mode === "manual" && (
//         <div>
//           {/* Level Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Filter by Level</label>
//             <select
//               className="border p-2 w-full"
//               value={selectedLevel}
//               onChange={(e) => {
//                 const levelValue = e.target.value;
//                 setSelectedLevel(levelValue);

//                 if (levelValue === "") {
//                   setFilteredQuestions(questions);
//                 } else {
//                   setFilteredQuestions(
//                     questions.filter(
//                       (q) => q.level_number === Number(levelValue)
//                     )
//                   );
//                 }
//               }}
//             >
//               <option value="">All Levels</option>
//               <option value="1">Level 1</option>
//               <option value="2">Level 2</option>
//               <option value="3">Level 3</option>
//               <option value="4">Level 4</option>
//               <option value="5">Level 5</option>
//             </select>
//           </div>

//           {loading && <p>Loading questions...</p>}

//           {filteredQuestions.length === 0 && !loading && (
//             <p>No questions available for this subject/level.</p>
//           )}

//           <p className="mb-2 font-semibold">
//             Selected Questions: {selected.length} / {totalQuestions}
//           </p>

//           {filteredQuestions.map((q) => (
//             <div
//               key={q.id}
//               className="p-3 border rounded mb-3 cursor-pointer"
//             >
//               <label>
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selected.includes(q.id)}
//                   onChange={() => toggleSelect(q.id)}
//                 />
//                 {q.text} (Level {q.level_number})
//               </label>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* AUTO MODE */}
//       {mode === "auto" && (
//         <div>
//           {/* Level-wise pick inputs */}
//           <div className="mb-4 p-4 bg-blue-50 border rounded">
//             <p className="mb-2 font-semibold">Pick questions per level (max total {totalQuestions}):</p>
//             {[1, 2, 3, 4, 5].map((lvl) => (
//               <div key={lvl} className="mb-2">
//                 <label className="mr-2">Level {lvl}:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max={questions.filter((q) => q.level_number === lvl).length}
//                   value={levelPick[lvl]}
//                   onChange={(e) =>
//                     setLevelPick({
//                       ...levelPick,
//                       [lvl]: Number(e.target.value),
//                     })
//                   }
//                   className="border p-1 w-20"
//                 />
//                 <span className="ml-2 text-gray-600">
//                   / {questions.filter((q) => q.level_number === lvl).length} available
//                 </span>
//               </div>
//             ))}

//             <button
//               className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
//               onClick={(e) => {
//                 e.preventDefault();
//                 pickAutoQuestions(questions);
//               }}
//             >
//               Pick Questions
//             </button>
//           </div>

//           {selected.length > 0 && (
//             <div className="mb-4">
//               <p className="font-semibold">
//                 Total Selected: {selected.length} / {totalQuestions}
//               </p>
//               <ul className="list-disc ml-5 mb-2">
//                 {Object.entries(autoLevelCount).map(([lvl, count]) => (
//                   <li key={lvl}>
//                     Level {lvl}: {count} Question{count > 1 ? "s" : ""}
//                   </li>
//                 ))}
//               </ul>

//               {selected.map((id) => {
//                 const q = questions.find((q) => q.id === id);
//                 return (
//                   <div key={id} className="p-2 border rounded mb-2">
//                     {q?.text} (Level {q?.level_number})
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       {/* SUBMIT BUTTON */}
//       <button
//         disabled={loading}
//         onClick={handleCreateExam}
//         className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Create Exam"}
//       </button>
//     </div>
//   );
// }






// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Receive data from previous page
//   const name = searchParams.get("name");
//   const subject = searchParams.get("subject");
//   const totalQuestions = Number(searchParams.get("totalQuestions") || 0);
//   const totalMarks = searchParams.get("totalMarks");
//   const passingMarks = searchParams.get("passingMarks");
//   const duration = searchParams.get("duration");

//   const [mode, setMode] = useState(""); // manual / auto
//   const [questions, setQuestions] = useState([]); // all questions for subject
//   const [filteredQuestions, setFilteredQuestions] = useState([]); // filtered by level
//   const [selectedLevel, setSelectedLevel] = useState(""); // manual filter
//   const [selected, setSelected] = useState([]); // selected question IDs
//   const [loading, setLoading] = useState(false);
//   const [autoLevelCount, setAutoLevelCount] = useState({}); // auto pick per level

//   // Auto mode pick inputs
//   const [levelPick, setLevelPick] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

//   // Load questions once when mode changes
//   useEffect(() => {
//     if ((mode === "manual" || mode === "auto") && subject) {
//       fetchQuestionsBySubject();
//     }
//   }, [mode, subject]);

//   const fetchQuestionsBySubject = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/questions"); // fetch all questions
//       const allQuestions = res.data.questions || [];
//       const filtered = allQuestions.filter((q) => q.subject === subject);

//       setQuestions(filtered);
//       setFilteredQuestions(filtered);

//       // reset selected if switching mode
//       setSelected([]);
//       setAutoLevelCount({});
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       alert("Failed to load questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Manual selection toggle
//   const toggleSelect = (id) => {
//     if (!selected.includes(id) && selected.length >= totalQuestions) {
//       alert(`You can select only ${totalQuestions} questions.`);
//       return;
//     }

//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
//     );
//   };

//   // Auto mode: pick questions per level
//   const pickAutoQuestions = (allQuestions) => {
//     const sumPick = Object.values(levelPick).reduce((a, b) => a + b, 0);
//     if (sumPick > totalQuestions) {
//       alert(`Total questions picked exceed ${totalQuestions}`);
//       return;
//     }

//     let selectedIds = [];
//     let countByLevel = {};

//     for (let lvl = 1; lvl <= 5; lvl++) {
//       const numPick = Number(levelPick[lvl] || 0);
//       if (numPick <= 0) continue;

//       const lvlQuestions = allQuestions.filter((q) => q.level_number === lvl);
//       if (lvlQuestions.length === 0) continue;

//       const shuffled = [...lvlQuestions].sort(() => 0.5 - Math.random());
//       const picked = shuffled.slice(0, numPick);
//       picked.forEach((q) => selectedIds.push(q.id));
//       countByLevel[lvl] = picked.length;
//     }

//     setSelected(selectedIds);
//     setAutoLevelCount(countByLevel);
//   };

//   const handleCreateExam = async () => {
//     if (!mode) {
//       alert("Please select manual or automatic mode.");
//       return;
//     }

//     if (selected.length === 0) {
//       alert("No questions selected.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         name,
//         subject,
//         totalQuestions: selected.length,
//         totalMarks,
//         passingMarks,
//         duration,
//         mode,
//         selectedQuestions: selected,
//       };

//       // ✅ Use correct backend route
//       await api.post("/admin/exams/create", payload);

//       alert("Exam created successfully!");
//       router.push("/admin/exam");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create exam!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

//       {/* Exam Info */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p><strong>Exam Name:</strong> {name}</p>
//         <p><strong>Subject:</strong> {subject}</p>
//         <p><strong>Total Marks:</strong> {totalMarks}</p>
//         <p><strong>Duration:</strong> {duration} min</p>
//         <p><strong>Total Questions Allowed:</strong> {totalQuestions}</p>
//       </div>

//       {/* Mode Selection */}
//       <div className="mb-6">
//         <label className="mr-6">
//           <input
//             type="radio"
//             name="mode"
//             value="manual"
//             className="mr-2"
//             onChange={() => {
//               setMode("manual");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           />
//           Add Manually
//         </label>

//         <label>
//           <input
//             type="radio"
//             name="mode"
//             value="auto"
//             className="mr-2"
//             onChange={() => {
//               setMode("auto");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           />
//           Add Automatically
//         </label>
//       </div>

//       {/* Manual Mode */}
//       {mode === "manual" && (
//         <div>
//           {/* Level Filter */}
//           <div className="mb-4">
//             <label className="block mb-1">Filter by Level</label>
//             <select
//               className="border p-2 w-full"
//               value={selectedLevel}
//               onChange={(e) => {
//                 const lvl = e.target.value;
//                 setSelectedLevel(lvl);
//                 setFilteredQuestions(
//                   lvl === "" ? questions : questions.filter((q) => q.level_number === Number(lvl))
//                 );
//               }}
//             >
//               <option value="">All Levels</option>
//               {[1,2,3,4,5].map(l => <option key={l} value={l}>Level {l}</option>)}
//             </select>
//           </div>

//           {loading && <p>Loading questions...</p>}
//           {filteredQuestions.length === 0 && !loading && <p>No questions available.</p>}

//           <p className="mb-2 font-semibold">
//             Selected Questions: {selected.length} / {totalQuestions}
//           </p>

//           {filteredQuestions.map(q => (
//             <div key={q.id} className="p-3 border rounded mb-3 cursor-pointer">
//               <label>
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selected.includes(q.id)}
//                   onChange={() => toggleSelect(q.id)}
//                 />
//                 {q.text} (Level {q.level_number})
//               </label>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Auto Mode */}
//       {mode === "auto" && (
//         <div>
//           <div className="mb-4 p-4 bg-blue-50 border rounded">
//             <p className="mb-2 font-semibold">
//               Pick questions per level (max total {totalQuestions}):
//             </p>
//             {[1,2,3,4,5].map(lvl => (
//               <div key={lvl} className="mb-2">
//                 <label className="mr-2">Level {lvl}:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   max={questions.filter(q => q.level_number === lvl).length}
//                   value={levelPick[lvl]}
//                   onChange={(e) => setLevelPick({...levelPick, [lvl]: Number(e.target.value)})}
//                   className="border p-1 w-20"
//                 />
//                 <span className="ml-2 text-gray-600">
//                   / {questions.filter(q => q.level_number === lvl).length} available
//                 </span>
//               </div>
//             ))}

//             <button
//               className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
//               onClick={(e) => { e.preventDefault(); pickAutoQuestions(questions); }}
//             >
//               Pick Questions
//             </button>
//           </div>

//           {selected.length > 0 && (
//             <div className="mb-4">
//               <p className="font-semibold">
//                 Total Selected: {selected.length} / {totalQuestions}
//               </p>
//               <ul className="list-disc ml-5 mb-2">
//                 {Object.entries(autoLevelCount).map(([lvl, count]) => (
//                   <li key={lvl}>Level {lvl}: {count} Question{count > 1 ? "s" : ""}</li>
//                 ))}
//               </ul>

//               {selected.map(id => {
//                 const q = questions.find(q => q.id === id);
//                 return (
//                   <div key={id} className="p-2 border rounded mb-2">
//                     {q?.text} (Level {q?.level_number})
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       {/* Submit Button */}
//       <button
//         disabled={loading}
//         onClick={handleCreateExam}
//         className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Create Exam"}
//       </button>
//     </div>
//   );
// }




// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Exam info from previous page
//   const name = searchParams.get("name");
//   const subject = searchParams.get("subject");
//   const totalQuestions = Number(searchParams.get("totalQuestions") || 0);
//   const totalMarks = Number(searchParams.get("totalMarks") || 0);
//   const passingMarks = Number(searchParams.get("passingMarks") || 0);
//   const duration = Number(searchParams.get("duration") || 20);

//   const [mode, setMode] = useState(""); // manual / auto
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [levelPick, setLevelPick] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
//   const [autoLevelCount, setAutoLevelCount] = useState({});

//   // Fetch questions for the subject
//   useEffect(() => {
//     if (subject) fetchQuestions();
//   }, [subject]);

//   const fetchQuestions = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/questions");
//       const allQuestions = res.data.questions || [];
//       const filtered = allQuestions.filter((q) => q.subject === subject);
//       setQuestions(filtered);
//       setFilteredQuestions(filtered);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Manual selection toggle
//   const toggleSelect = (id) => {
//     if (!selected.includes(id) && selected.length >= totalQuestions) {
//       alert(`You can select only ${totalQuestions} questions.`);
//       return;
//     }
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
//     );
//   };

//   // Auto mode: pick questions based on levelPick
//   const pickAutoQuestions = () => {
//     const sumPick = Object.values(levelPick).reduce((a, b) => a + b, 0);
//     if (sumPick > totalQuestions) {
//       alert(`You can pick maximum ${totalQuestions} questions.`);
//       return;
//     }

//     let selectedIds = [];
//     const countByLevel = {};

//     for (let lvl = 1; lvl <= 5; lvl++) {
//       const numPick = Number(levelPick[lvl] || 0);
//       if (numPick <= 0) continue;

//       const lvlQuestions = questions.filter((q) => q.level_number === lvl);
//       if (!lvlQuestions.length) continue;

//       const shuffled = [...lvlQuestions].sort(() => 0.5 - Math.random());
//       const picked = shuffled.slice(0, numPick);
//       picked.forEach((q) => selectedIds.push(q.id));
//       countByLevel[lvl] = picked.length;
//     }

//     setSelected(selectedIds);
//     setAutoLevelCount(countByLevel);
//   };

//   const handleCreateExam = async () => {
//     if (!mode) return alert("Select manual or automatic mode.");
//     if (!selected.length) return alert("No questions selected.");

//     try {
//       setLoading(true);
//       const payload = {
//         name,
//         subject,
//         level: 1,
//         totalQuestions: selected.length,
//         totalMarks,
//         passingMarks,
//         duration,
//         mode,
//         selectedQuestions: selected,
//       };
//       await api.post("/admin/exams/create", payload);
//       alert("Exam created successfully!");
//       router.push("/admin/exam");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create exam!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

//       {/* Exam Info */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p><strong>Exam Name:</strong> {name}</p>
//         <p><strong>Subject:</strong> {subject}</p>
//         <p><strong>Total Marks:</strong> {totalMarks}</p>
//         <p><strong>Duration:</strong> {duration} min</p>
//         <p><strong>Total Questions Allowed:</strong> {totalQuestions}</p>
//       </div>

//       {/* Select Mode */}
//       <div className="mb-6">
//         <label className="mr-6">
//           <input
//             type="radio"
//             name="mode"
//             value="manual"
//             onChange={() => {
//               setMode("manual");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           /> Add Manually
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="mode"
//             value="auto"
//             onChange={() => {
//               setMode("auto");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           /> Add Automatically
//         </label>
//       </div>

//       {/* Manual Mode */}
//       {mode === "manual" && (
//         <div>
//           <div className="mb-4">
//             <label className="block mb-1">Filter by Level</label>
//             <select
//               value={selectedLevel}
//               onChange={(e) => {
//                 const lvl = e.target.value;
//                 setSelectedLevel(lvl);
//                 setFilteredQuestions(
//                   lvl === "" ? questions : questions.filter(q => q.level_number === Number(lvl))
//                 );
//               }}
//               className="border p-2 w-full"
//             >
//               <option value="">All Levels</option>
//               {[1,2,3,4,5].map(l => <option key={l} value={l}>Level {l}</option>)}
//             </select>
//           </div>

//           <p className="mb-2 font-semibold">
//             Selected Questions: {selected.length} / {totalQuestions}
//           </p>

//           {filteredQuestions.map(q => (
//             <div key={q.id} className="p-3 border rounded mb-3 cursor-pointer">
//               <label>
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selected.includes(q.id)}
//                   onChange={() => toggleSelect(q.id)}
//                 />
//                 {q.text} (Level {q.level_number})
//               </label>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Auto Mode */}
//       {mode === "auto" && (
//         <div className="mb-4 p-4 bg-blue-50 border rounded">
//           <p className="mb-2 font-semibold">Pick questions per level:</p>
//           {[1,2,3,4,5].map(lvl => (
//             <div key={lvl} className="mb-2">
//               <label className="mr-2">Level {lvl}:</label>
//               <input
//                 type="number"
//                 min="0"
//                 max={questions.filter(q => q.level_number === lvl).length}
//                 value={levelPick[lvl]}
//                 onChange={e => setLevelPick({ ...levelPick, [lvl]: Number(e.target.value) })}
//                 className="border p-1 w-20"
//               />
//               <span className="ml-2 text-gray-600">
//                 / {questions.filter(q => q.level_number === lvl).length} available
//               </span>
//             </div>
//           ))}

//           <button
//             className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
//             onClick={(e) => { e.preventDefault(); pickAutoQuestions(); }}
//           >
//             Pick Questions
//           </button>

//           {selected.length > 0 && (
//             <div className="mt-4">
//               <p className="font-semibold">
//                 Total Selected: {selected.length} / {totalQuestions}
//               </p>
//               <ul className="list-disc ml-5 mb-2">
//                 {Object.entries(autoLevelCount).map(([lvl, count]) => (
//                   <li key={lvl}>Level {lvl}: {count} question{count>1 ? "s":""}</li>
//                 ))}
//               </ul>

//               {selected.map(id => {
//                 const q = questions.find(q => q.id === id);
//                 return (
//                   <div key={id} className="p-2 border rounded mb-2">
//                     {q?.text} (Level {q?.level_number})
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       <button
//         disabled={loading}
//         onClick={handleCreateExam}
//         className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Create Exam"}
//       </button>
//     </div>
//   );
// }



// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Exam info from previous page
//   const name = searchParams.get("name");
//   const subject = searchParams.get("subject");
//   const totalQuestions = Number(searchParams.get("totalQuestions") || 0);
//   const totalMarks = Number(searchParams.get("totalMarks") || 0);
//   const passingMarks = Number(searchParams.get("passingMarks") || 0);
//   const duration = Number(searchParams.get("duration") || 20);

//   // NEW :: DateTime added
//   const startDateTime = searchParams.get("startDateTime");
//   const endDateTime = searchParams.get("endDateTime");

//   const [mode, setMode] = useState(""); // manual / auto
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [levelPick, setLevelPick] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
//   const [autoLevelCount, setAutoLevelCount] = useState({});

//   // Fetch questions for the subject
//   useEffect(() => {
//     if (subject) fetchQuestions();
//   }, [subject]);

//   const fetchQuestions = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/questions");
//       const allQuestions = res.data.questions || [];
//       const filtered = allQuestions.filter((q) => q.subject === subject);
//       setQuestions(filtered);
//       setFilteredQuestions(filtered);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Manual selection toggle
//   const toggleSelect = (id) => {
//     if (!selected.includes(id) && selected.length >= totalQuestions) {
//       alert(`You can select only ${totalQuestions} questions.`);
//       return;
//     }
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
//     );
//   };

//   // Auto mode: pick questions based on levelPick
//   const pickAutoQuestions = () => {
//     const sumPick = Object.values(levelPick).reduce((a, b) => a + b, 0);
//     if (sumPick > totalQuestions) {
//       alert(`You can pick maximum ${totalQuestions} questions.`);
//       return;
//     }

//     let selectedIds = [];
//     const countByLevel = {};

//     for (let lvl = 1; lvl <= 5; lvl++) {
//       const numPick = Number(levelPick[lvl] || 0);
//       if (numPick <= 0) continue;

//       const lvlQuestions = questions.filter((q) => q.level_number === lvl);
//       if (!lvlQuestions.length) continue;

//       const shuffled = [...lvlQuestions].sort(() => 0.5 - Math.random());
//       const picked = shuffled.slice(0, numPick);
//       picked.forEach((q) => selectedIds.push(q.id));
//       countByLevel[lvl] = picked.length;
//     }

//     setSelected(selectedIds);
//     setAutoLevelCount(countByLevel);
//   };

//   // ===============================
//   // CREATE EXAM API CALL (UPDATED)
//   // ===============================
//   // const handleCreateExam = async () => {
//   //   if (!mode) return alert("Select manual or automatic mode.");
//   //   if (!selected.length) return alert("No questions selected.");

//   //   try {
//   //     setLoading(true);

//   //     const payload = {
//   //       name,
//   //       subject,
//   //       level: 1,
//   //       totalQuestions: selected.length,
//   //       totalMarks,
//   //       passingMarks,
//   //       duration,
//   //       mode,
//   //       selectedQuestions: selected,

//   //       // NEW FIELDS
//   //       startDateTime,
//   //       endDateTime
//   //     };

//   //     await api.post("/admin/exams/create", payload);
//   //     alert("Exam created successfully!");
//   //     router.push("/admin/exam");

//   //   } catch (err) {
//   //     console.error(err);
//   //     alert("Failed to create exam!");
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleCreateExam = async () => {
//   if (!mode) return alert("Select manual or automatic mode.");
//   if (!selected.length) return alert("No questions selected.");

//   try {
//     setLoading(true);

//     const payload = {
//       name,
//       subject,
//       level: 1,
//       total_questions: selected.length,  
//       total_marks: totalMarks,
//       passing_marks: passingMarks,
//       duration,
//       mode,
//       selectedQuestions: selected,
//     };

//     await api.post("/admin/exams/create", payload);

//     alert("Exam created successfully!");
//     router.push("/admin/exam");

//   } catch (err) {
//     console.error(err);
//     alert("Failed to create exam!");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

//       {/* Exam Info */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p><strong>Exam Name:</strong> {name}</p>
//         <p><strong>Subject:</strong> {subject}</p>
//         <p><strong>Total Marks:</strong> {totalMarks}</p>
//         <p><strong>Duration:</strong> {duration} min</p>
//         <p><strong>Total Questions Allowed:</strong> {totalQuestions}</p>

//         {/* NEW */}
//         <p><strong>Start:</strong> {startDateTime}</p>
//         <p><strong>End:</strong> {endDateTime}</p>
//       </div>

//       {/* Select Mode */}
//       <div className="mb-6">
//         <label className="mr-6">
//           <input
//             type="radio"
//             name="mode"
//             value="manual"
//             onChange={() => {
//               setMode("manual");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           /> Add Manually
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="mode"
//             value="auto"
//             onChange={() => {
//               setMode("auto");
//               setSelected([]);
//               setAutoLevelCount({});
//             }}
//           /> Add Automatically
//         </label>
//       </div>

//       {/* Manual Mode */}
//       {mode === "manual" && (
//         <div>
//           <div className="mb-4">
//             <label className="block mb-1">Filter by Level</label>
//             <select
//               value={selectedLevel}
//               onChange={(e) => {
//                 const lvl = e.target.value;
//                 setSelectedLevel(lvl);
//                 setFilteredQuestions(
//                   lvl === "" ? questions : questions.filter(q => q.level_number === Number(lvl))
//                 );
//               }}
//               className="border p-2 w-full"
//             >
//               <option value="">All Levels</option>
//               {[1,2,3,4,5].map(l => <option key={l} value={l}>Level {l}</option>)}
//             </select>
//           </div>

//           <p className="mb-2 font-semibold">
//             Selected Questions: {selected.length} / {totalQuestions}
//           </p>

//           {filteredQuestions.map(q => (
//             <div key={q.id} className="p-3 border rounded mb-3 cursor-pointer">
//               <label>
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selected.includes(q.id)}
//                   onChange={() => toggleSelect(q.id)}
//                 />
//                 {q.text} (Level {q.level_number})
//               </label>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Auto Mode */}
//       {mode === "auto" && (
//         <div className="mb-4 p-4 bg-blue-50 border rounded">
//           <p className="mb-2 font-semibold">Pick questions per level:</p>
//           {[1,2,3,4,5].map(lvl => (
//             <div key={lvl} className="mb-2">
//               <label className="mr-2">Level {lvl}:</label>
//               <input
//                 type="number"
//                 min="0"
//                 max={questions.filter(q => q.level_number === lvl).length}
//                 value={levelPick[lvl]}
//                 onChange={e => setLevelPick({ ...levelPick, [lvl]: Number(e.target.value) })}
//                 className="border p-1 w-20"
//               />
//               <span className="ml-2 text-gray-600">
//                 / {questions.filter(q => q.level_number === lvl).length} available
//               </span>
//             </div>
//           ))}

//           <button
//             className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
//             onClick={(e) => { e.preventDefault(); pickAutoQuestions(); }}
//           >
//             Pick Questions
//           </button>

//           {selected.length > 0 && (
//             <div className="mt-4">
//               <p className="font-semibold">
//                 Total Selected: {selected.length} / {totalQuestions}
//               </p>

//               <ul className="list-disc ml-5 mb-2">
//                 {Object.entries(autoLevelCount).map(([lvl, count]) => (
//                   <li key={lvl}>Level {lvl}: {count} question{count>1 ? "s" : ""}</li>
//                 ))}
//               </ul>

//               {selected.map(id => {
//                 const q = questions.find(q => q.id === id);
//                 return (
//                   <div key={id} className="p-2 border rounded mb-2">
//                     {q?.text} (Level {q?.level_number})
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       <button
//         disabled={loading}
//         onClick={handleCreateExam}
//         className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Create Exam"}
//       </button>
//     </div>
//   );
// }










// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import api from "../../../../api/axios";

// export default function AddQuestionsPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // Exam info from previous page
//   const name = searchParams.get("name");
//   const subject = searchParams.get("subject");
//   const totalQuestions = Number(searchParams.get("totalQuestions") || 0);
//   const totalMarks = Number(searchParams.get("totalMarks") || 0);
//   const passingMarks = Number(searchParams.get("passingMarks") || 0);
//   const duration = Number(searchParams.get("duration") || 20);
//   const startDateTime = searchParams.get("startDateTime");
//   const endDateTime = searchParams.get("endDateTime");

//   const [mode, setMode] = useState(""); // manual / auto
//   const [questions, setQuestions] = useState([]);
//   const [filteredQuestions, setFilteredQuestions] = useState([]);
//   const [selectedLevel, setSelectedLevel] = useState("");
//   const [selected, setSelected] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [levelPick, setLevelPick] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
//   const [autoLevelCount, setAutoLevelCount] = useState({});

//   // Fetch questions for the subject
//   useEffect(() => {
//     if (subject) fetchQuestions();
//   }, [subject]);

//   const fetchQuestions = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/questions");
//       const allQuestions = res.data.questions || [];
//       const filtered = allQuestions.filter((q) => q.subject === subject);
//       setQuestions(filtered);
//       setFilteredQuestions(filtered);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to load questions!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Manual selection toggle
//   const toggleSelect = (id) => {
//     if (!selected.includes(id) && selected.length >= totalQuestions) {
//       alert(`You can select only ${totalQuestions} questions.`);
//       return;
//     }
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
//     );
//   };

//   // Auto mode: pick questions based on levelPick
//   const pickAutoQuestions = () => {
//     const sumPick = Object.values(levelPick).reduce((a, b) => a + b, 0);
//     if (sumPick > totalQuestions) {
//       alert(`You can pick maximum ${totalQuestions} questions.`);
//       return;
//     }

//     let selectedIds = [];
//     const countByLevel = {};

//     for (let lvl = 1; lvl <= 5; lvl++) {
//       const numPick = Number(levelPick[lvl] || 0);
//       if (numPick <= 0) continue;

//       const lvlQuestions = questions.filter((q) => q.level_number === lvl);
//       if (!lvlQuestions.length) continue;

//       const shuffled = [...lvlQuestions].sort(() => 0.5 - Math.random());
//       const picked = shuffled.slice(0, numPick);
//       picked.forEach((q) => selectedIds.push(q.id));
//       countByLevel[lvl] = picked.length;
//     }

//     setSelected(selectedIds);
//     setAutoLevelCount(countByLevel);
//   };

//   // ===============================
//   // CREATE EXAM API CALL (UPDATED)
//   // ===============================
//   const handleCreateExam = async () => {
//     if (!mode) return alert("Select manual or automatic mode.");
//     if (!selected.length) return alert("No questions selected.");

//     try {
//       setLoading(true);

//    const payload = {
//   name,
//   subject,
//   level: 1,
//   totalQuestions: selected.length,  // matches backend
//   totalMarks,
//   passingMarks,
//   duration,
//   mode,
//   selectedQuestions: selected,
//   startDateTime,   // maps to backend start_time
//   endDateTime      // maps to backend end_time
// };

// await api.post("/admin/exams/create", payload);



//       alert("Exam created successfully!");
//       router.push("/admin/exam");

//     } catch (err) {
//       console.error(err);
//       alert("Failed to create exam!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

//       {/* Exam Info */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p><strong>Exam Name:</strong> {name}</p>
//         <p><strong>Subject:</strong> {subject}</p>
//         <p><strong>Total Marks:</strong> {totalMarks}</p>
//         <p><strong>Duration:</strong> {duration} min</p>
//         <p><strong>Total Questions Allowed:</strong> {totalQuestions}</p>
//         <p><strong>Start:</strong> {startDateTime}</p>
//         <p><strong>End:</strong> {endDateTime}</p>
//       </div>

//       {/* Select Mode */}
//       <div className="mb-6">
//         <label className="mr-6">
//           <input
//             type="radio"
//             name="mode"
//             value="manual"
//             onChange={() => { setMode("manual"); setSelected([]); setAutoLevelCount({}); }}
//           /> Add Manually
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="mode"
//             value="auto"
//             onChange={() => { setMode("auto"); setSelected([]); setAutoLevelCount({}); }}
//           /> Add Automatically
//         </label>
//       </div>

//       {/* Manual Mode */}
//       {mode === "manual" && (
//         <div>
//           <div className="mb-4">
//             <label className="block mb-1">Filter by Level</label>
//             <select
//               value={selectedLevel}
//               onChange={(e) => {
//                 const lvl = e.target.value;
//                 setSelectedLevel(lvl);
//                 setFilteredQuestions(lvl === "" ? questions : questions.filter(q => q.level_number === Number(lvl)));
//               }}
//               className="border p-2 w-full"
//             >
//               <option value="">All Levels</option>
//               {[1,2,3,4,5].map(l => <option key={l} value={l}>Level {l}</option>)}
//             </select>
//           </div>

//           <p className="mb-2 font-semibold">
//             Selected Questions: {selected.length} / {totalQuestions}
//           </p>

//           {filteredQuestions.map(q => (
//             <div key={q.id} className="p-3 border rounded mb-3 cursor-pointer">
//               <label>
//                 <input
//                   type="checkbox"
//                   className="mr-2"
//                   checked={selected.includes(q.id)}
//                   onChange={() => toggleSelect(q.id)}
//                 />
//                 {q.text} (Level {q.level_number})
//               </label>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Auto Mode */}
//       {mode === "auto" && (
//         <div className="mb-4 p-4 bg-blue-50 border rounded">
//           <p className="mb-2 font-semibold">Pick questions per level:</p>
//           {[1,2,3,4,5].map(lvl => (
//             <div key={lvl} className="mb-2">
//               <label className="mr-2">Level {lvl}:</label>
//               <input
//                 type="number"
//                 min="0"
//                 max={questions.filter(q => q.level_number === lvl).length}
//                 value={levelPick[lvl]}
//                 onChange={e => setLevelPick({ ...levelPick, [lvl]: Number(e.target.value) })}
//                 className="border p-1 w-20"
//               />
//               <span className="ml-2 text-gray-600">
//                 / {questions.filter(q => q.level_number === lvl).length} available
//               </span>
//             </div>
//           ))}

//           <button
//             className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
//             onClick={(e) => { e.preventDefault(); pickAutoQuestions(); }}
//           >
//             Pick Questions
//           </button>

//           {selected.length > 0 && (
//             <div className="mt-4">
//               <p className="font-semibold">
//                 Total Selected: {selected.length} / {totalQuestions}
//               </p>

//               <ul className="list-disc ml-5 mb-2">
//                 {Object.entries(autoLevelCount).map(([lvl, count]) => (
//                   <li key={lvl}>Level {lvl}: {count} question{count>1 ? "s" : ""}</li>
//                 ))}
//               </ul>

//               {selected.map(id => {
//                 const q = questions.find(q => q.id === id);
//                 return (
//                   <div key={id} className="p-2 border rounded mb-2">
//                     {q?.text} (Level {q?.level_number})
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       )}

//       <button
//         disabled={loading}
//         onClick={handleCreateExam}
//         className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
//       >
//         {loading ? "Saving..." : "Create Exam"}
//       </button>
//     </div>
//   );
// }


"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../../../api/axios";

export default function AddQuestionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ==============================
  // Extract and decode exam info
  // ==============================
  const name = searchParams.get("name");
  const subject = searchParams.get("subject");
  const totalQuestions = Number(searchParams.get("totalQuestions") || 0);
  const totalMarks = Number(searchParams.get("totalMarks") || 0);
  const passingMarks = Number(searchParams.get("passingMarks") || 0);
  const duration = Number(searchParams.get("duration") || 20);

  const startParam = searchParams.get("startDateTime");
  const endParam = searchParams.get("endDateTime");

  const startDateTime = startParam ? new Date(decodeURIComponent(startParam)).toISOString() : null;
  const endDateTime = endParam ? new Date(decodeURIComponent(endParam)).toISOString() : null;

  // ==============================
  const [mode, setMode] = useState(""); // manual / auto
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [levelPick, setLevelPick] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [autoLevelCount, setAutoLevelCount] = useState({});

  // ==============================
  // Fetch questions for the subject
  // ==============================
  useEffect(() => {
    if (subject) fetchQuestions();
  }, [subject]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/questions");
      const allQuestions = res.data.questions || [];
      const filtered = allQuestions.filter((q) => q.subject === subject);
      setQuestions(filtered);
      setFilteredQuestions(filtered);
    } catch (err) {
      console.error(err);
      alert("Failed to load questions!");
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // Manual selection toggle
  // ==============================
  const toggleSelect = (id) => {
    if (!selected.includes(id) && selected.length >= totalQuestions) {
      alert(`You can select only ${totalQuestions} questions.`);
      return;
    }
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  // ==============================
  // Auto mode: pick questions based on levelPick
  // ==============================
  const pickAutoQuestions = () => {
    const sumPick = Object.values(levelPick).reduce((a, b) => a + b, 0);
    if (sumPick > totalQuestions) {
      alert(`You can pick maximum ${totalQuestions} questions.`);
      return;
    }

    let selectedIds = [];
    const countByLevel = {};

    for (let lvl = 1; lvl <= 5; lvl++) {
      const numPick = Number(levelPick[lvl] || 0);
      if (numPick <= 0) continue;

      const lvlQuestions = questions.filter((q) => q.level_number === lvl);
      if (!lvlQuestions.length) continue;

      const shuffled = [...lvlQuestions].sort(() => 0.5 - Math.random());
      const picked = shuffled.slice(0, numPick);
      picked.forEach((q) => selectedIds.push(q.id));
      countByLevel[lvl] = picked.length;
    }

    setSelected(selectedIds);
    setAutoLevelCount(countByLevel);
  };

  // ==============================
  // CREATE EXAM API CALL
  // ==============================
  const handleCreateExam = async () => {
    if (!mode) return alert("Select manual or automatic mode.");
    if (!selected.length) return alert("No questions selected.");

    try {
      setLoading(true);

      const payload = {
        name,
        subject,
        level: 1,
        totalQuestions: selected.length,
        totalMarks,
        passingMarks,
        duration,
        mode,
        selectedQuestions: selected,
        startDateTime,
        endDateTime
      };

      await api.post("/admin/exams/create", payload);

      alert("Exam created successfully!");
      router.push("/admin/exam");
    } catch (err) {
      console.error(err);
      alert("Failed to create exam!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Select Questions</h1>

      {/* Exam Info */}
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <p><strong>Exam Name:</strong> {name}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Total Marks:</strong> {totalMarks}</p>
        <p><strong>Duration:</strong> {duration} min</p>
        <p><strong>Total Questions Allowed:</strong> {totalQuestions}</p>
        <p><strong>Start:</strong> {startDateTime}</p>
        <p><strong>End:</strong> {endDateTime}</p>
      </div>

      {/* Mode Selection */}
      <div className="mb-6">
        <label className="mr-6">
          <input
            type="radio"
            name="mode"
            value="manual"
            checked={mode === "manual"}
            onChange={() => { setMode("manual"); setSelected([]); setAutoLevelCount({}); }}
          /> Add Manually
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="auto"
            checked={mode === "auto"}
            onChange={() => { setMode("auto"); setSelected([]); setAutoLevelCount({}); }}
          /> Add Automatically
        </label>
      </div>

      {/* Manual Mode */}
      {mode === "manual" && (
        <div>
          <div className="mb-4">
            <label className="block mb-1">Filter by Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => {
                const lvl = e.target.value;
                setSelectedLevel(lvl);
                setFilteredQuestions(lvl === "" ? questions : questions.filter(q => q.level_number === Number(lvl)));
              }}
              className="border p-2 w-full"
            >
              <option value="">All Levels</option>
              {[1,2,3,4,5].map(l => <option key={l} value={l}>Level {l}</option>)}
            </select>
          </div>

          <p className="mb-2 font-semibold">
            Selected Questions: {selected.length} / {totalQuestions}
          </p>

          {filteredQuestions.map(q => (
            <div key={q.id} className="p-3 border rounded mb-3 cursor-pointer">
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selected.includes(q.id)}
                  onChange={() => toggleSelect(q.id)}
                />
                {q.text} (Level {q.level_number})
              </label>
            </div>
          ))}
        </div>
      )}

      {/* Auto Mode */}
      {mode === "auto" && (
        <div className="mb-4 p-4 bg-blue-50 border rounded">
          <p className="mb-2 font-semibold">Pick questions per level:</p>
          {[1,2,3,4,5].map(lvl => (
            <div key={lvl} className="mb-2">
              <label className="mr-2">Level {lvl}:</label>
              <input
                type="number"
                min="0"
                max={questions.filter(q => q.level_number === lvl).length}
                value={levelPick[lvl]}
                onChange={e => setLevelPick({ ...levelPick, [lvl]: Number(e.target.value) })}
                className="border p-1 w-20"
              />
              <span className="ml-2 text-gray-600">
                / {questions.filter(q => q.level_number === lvl).length} available
              </span>
            </div>
          ))}

          <button
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            onClick={(e) => { e.preventDefault(); pickAutoQuestions(); }}
          >
            Pick Questions
          </button>

          {selected.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">
                Total Selected: {selected.length} / {totalQuestions}
              </p>

              <ul className="list-disc ml-5 mb-2">
                {Object.entries(autoLevelCount).map(([lvl, count]) => (
                  <li key={lvl}>Level {lvl}: {count} question{count>1 ? "s" : ""}</li>
                ))}
              </ul>

              {selected.map(id => {
                const q = questions.find(q => q.id === id);
                return (
                  <div key={id} className="p-2 border rounded mb-2">
                    {q?.text} (Level {q?.level_number})
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <button
        disabled={loading}
        onClick={handleCreateExam}
        className="mt-6 bg-green-600 text-white px-5 py-2 rounded"
      >
        {loading ? "Saving..." : "Create Exam"}
      </button>
    </div>
  );
}
