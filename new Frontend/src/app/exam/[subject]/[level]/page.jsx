// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import api from "../../../../api/axios";

// export default function ExamPage() {
//   const { subject, level } = useParams();
//   const router = useRouter();

//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [timeLeft, setTimeLeft] = useState(0); // in seconds

//   // Fetch exam questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await api.get(`/start-exam/${subject}/${level}`, { withCredentials: true });
//         setQuestions(res.data.questions);
//         setTimeLeft(res.data.duration * 60); // duration in minutes
//       } catch (err) {
//         console.error("Error fetching exam:", err);
//         alert("Failed to fetch exam questions.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [subject, level]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // Handle exam submission
//   const handleSubmit = async () => {
//     try {
//       const res = await api.post(
//         `/start-exam/${subject}/${level}/submit`,
//         { answers },
//         { withCredentials: true }
//       );
//       alert(`Exam submitted! Score: ${res.data.score} | Status: ${res.data.pass_status}`);
//       router.push("/dashboard");
//     } catch (err) {
//       console.error("Error submitting exam:", err);
//       alert("Failed to submit exam.");
//     }
//   };

//   if (loading) return <p>Loading exam...</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{subject} — Level {level} Exam</h1>
//       <p className="mb-4">
//         Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
//       </p>

//       {questions.map((q, idx) => (
//         <div key={q.id} className="mb-4 p-4 border rounded-lg">
//           <p className="font-medium">{idx + 1}. {q.text}</p>
//           {q.options.map((opt) => (
//             <label key={opt.id} className="block mt-1">
//               <input
//                 type="radio"
//                 name={`q-${q.id}`}
//                 value={opt.id}
//                 checked={answers[q.id] === opt.id}
//                 onChange={() => setAnswers({ ...answers, [q.id]: opt.id })}
//               />{" "}
//               {opt.text}
//             </label>
//           ))}
//         </div>
//       ))}

//       <button
//         onClick={handleSubmit}
//         className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Submit Exam
//       </button>
//     </div>
//   );
// }




// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import api from "../../../../api/axios";

// export default function ExamPage() {
//   const { subject, level } = useParams();
//   const router = useRouter();

//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0); // in seconds
//   const [examId, setExamId] = useState(null);

//   // Fetch exam questions and info
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await api.get(`/start-exam/${subject}/${level}`, {
//           withCredentials: true,
//         });

//         setQuestions(res.data.questions || []);
//         if (res.data.duration) setTimeLeft(res.data.duration * 60);
//         if (res.data.exam_id) setExamId(res.data.exam_id);
//       } catch (err) {
//         console.error("Error fetching exam:", err);
//         setError("Failed to load exam questions");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [subject, level]);

//   // Timer countdown
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // Handle selecting an answer
//   const handleAnswerChange = (questionId, optionId) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   // Submit exam
//   const handleSubmit = async () => {
//     if (!examId) {
//       alert("Exam ID not found. Cannot submit.");
//       return;
//     }

//     try {
//       const res = await api.post(
//         `/start-exam/${subject}/${level}/submit`,
//         {
//           answers,
//         },
//         { withCredentials: true }
//       );

//       alert(
//         `Exam submitted!\nScore: ${res.data.score} / ${res.data.totalMarks}\nStatus: ${res.data.pass_status}`
//       );
//       router.push("/dashboard");
//     } catch (err) {
//       console.error("Error submitting exam:", err);
//       alert("Failed to submit exam. Please try again.");
//     }
//   };

//   if (loading) return <p className="p-6">Loading exam...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">{subject} — Level {level} Exam</h1>

//       {timeLeft > 0 && (
//         <p className="mb-4">
//           Time Left: {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
//           {(timeLeft % 60).toString().padStart(2, "0")}
//         </p>
//       )}

//       {questions.map((q, idx) => (
//         <div key={q.id} className="mb-4 p-4 border rounded-lg">
//           <p className="mb-2">
//             {idx + 1}. {q.text}
//           </p>

//           {q.options.map((opt) => (
//             <label key={opt.id} className="block mb-1 cursor-pointer">
//               <input
//                 type="radio"
//                 name={`q-${q.id}`}
//                 value={opt.id}
//                 checked={answers[q.id] === opt.id}
//                 onChange={() => handleAnswerChange(q.id, opt.id)}
//                 className="mr-2"
//               />
//               {opt.text}
//             </label>
//           ))}
//         </div>
//       ))}

//       <button
//         onClick={handleSubmit}
//         className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Submit Exam
//       </button>
//     </div>
//   );
// }


"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../../api/axios";

export default function ExamPage() {
  const { subject, level } = useParams();
  const decodedSubject = decodeURIComponent(subject);
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
const [ans,setAns]= useState([])
  // Fetch exam questions
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await api.get(`/start-exam/${decodedSubject}/${level}`, { withCredentials: true });
//         setQuestions(res.data.questions || []);
//         setTimeLeft(res.data.duration * 60 || 600); // default 10 minutes
//         setAns(res.data)
//       } catch (err) {
//         console.error("Error fetching exam:", err);
//         setError("Failed to load exam questions");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchQuestions();
//     console.log("Subject", subject);
// console.log("res", ans )
//   }, [subject, level]);


useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const encodedSubject = encodeURIComponent(decodedSubject);

      const res = await api.get(
        `/start-exam/${encodedSubject}/${level}`,
        { withCredentials: true }
      );

      console.log("RAW RESPONSE:", res.data);

      setQuestions(res.data.questions || []);
      setTimeLeft(res.data.duration * 60 || 600);
      setAns(res.data);

    } catch (err) {
      console.error("FETCH ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchQuestions();
}, [decodedSubject, level]);

useEffect(() => {
  console.log("ans updated:", ans?.questions);
}, [ans]);



  
  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle selecting an answer
  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Submit exam
//   const handleSubmit = async () => {
//   if (Object.keys(answers).length === 0) {
//     alert("Please select at least one answer.");
//     return;
//   }

//   try {
//     const res = await api.post(`/start-exam/${decodedSubject}/${level}/submit`, {
//       answers,
//       subject,
//       level
//     }, { withCredentials: true });

//     alert(`Score: ${res.data.score}\nStatus: ${res.data.pass_status}`);
//     router.push("/dashboard");
//   } catch (err) {
//     console.error(err);
//     alert("Failed to submit exam.");
//   }
// };



const handleSubmit = async () => {
  if (Object.keys(answers).length === 0) {
    alert("Please select at least one answer.");
    return;
  }

  try {
    const encodedSubject = encodeURIComponent(decodedSubject);

    const res = await api.post(
      `/start-exam/${encodedSubject}/${level}/submit`,
      {
        answers,
        subject: decodedSubject, // send decoded value to backend
        level
      },
      { withCredentials: true }
    );

    alert(`Score: ${res.data.score}\nStatus: ${res.data.pass_status}`);
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    alert("Failed to submit exam.");
  }
};


  if (loading) return <p className="p-6">Loading exam...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{decodedSubject} — Level {level} Exam</h1>

      {timeLeft > 0 && (
        <p className="mb-4">
          Time Left: {Math.floor(timeLeft / 60).toString().padStart(2, "0")}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
      )}

      {questions.map((q, idx) => (
        <div key={q.id} className="mb-4 p-4 border rounded-lg">
          <p className="mb-2">{idx + 1}. {q.text}</p>

          {q.options.map((opt) => (
            <label key={opt.id} className="block mb-1 cursor-pointer">
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt.id}
                checked={answers[q.id] === opt.id}
                onChange={() => handleAnswerChange(q.id, opt.id)}
                className="mr-2"
              />
              {opt.text}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit Exam
      </button>
    </div>
  );
}
