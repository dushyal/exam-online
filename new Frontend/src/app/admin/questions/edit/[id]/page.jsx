
// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import api from "../../../../../api/axios";

// export default function EditQuestionPage() {
//   const { id } = useParams();
//   const router = useRouter();

//   const [form, setForm] = useState({
//     subject: "",
//     level_number: "",
//     text: "",
//     option_a: "",
//     option_b: "",
//     option_c: "",
//     option_d: "",
//     correct_answer: "",
//   });

//   const [loading, setLoading] = useState(true);

//   // =============================
//   // Load existing question
//   // =============================
//   const fetchQuestion = async () => {
//     try {
//       const res = await api.get(`/admin/questions/${id}`);
//       setForm(res.data.question);
//     } catch (error) {
//       console.error("Failed to load question:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchQuestion();
//   }, [id]);

//   // =============================
//   // Update question
//   // =============================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await api.put(`/admin/questions/${id}`, form);
//       alert("Question updated successfully!");
//       router.push("/admin/questions");
//     } catch (error) {
//       console.error("Update error:", error);
//       alert("Failed to update question.");
//     }
//   };

//   if (loading) return <p className="p-6 text-xl">Loading...</p>;

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">Edit Question</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input
//           type="text"
//           value={form.subject}
//           onChange={(e) => setForm({ ...form, subject: e.target.value })}
//           placeholder="Subject"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="number"
//           value={form.level_number}
//           onChange={(e) => setForm({ ...form, level_number: e.target.value })}
//           placeholder="Level Number"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <textarea
//           value={form.text}
//           onChange={(e) => setForm({ ...form, text: e.target.value })}
//           placeholder="Question Text"
//           className="w-full border p-2 rounded h-24"
//           required
//         />

//         <input
//           type="text"
//           value={form.option_a}
//           onChange={(e) => setForm({ ...form, option_a: e.target.value })}
//           placeholder="Option A"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           value={form.option_b}
//           onChange={(e) => setForm({ ...form, option_b: e.target.value })}
//           placeholder="Option B"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           value={form.option_c}
//           onChange={(e) => setForm({ ...form, option_c: e.target.value })}
//           placeholder="Option C"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           type="text"
//           value={form.option_d}
//           onChange={(e) => setForm({ ...form, option_d: e.target.value })}
//           placeholder="Option D"
//           className="w-full border p-2 rounded"
//           required
//         />

//         <select
//           value={form.correct_answer}
//           onChange={(e) => setForm({ ...form, correct_answer: e.target.value })}
//           className="w-full border p-2 rounded"
//           required
//         >
//           <option value="">Select Correct Answer</option>
//           <option value="A">A</option>
//           <option value="B">B</option>
//           <option value="C">C</option>
//           <option value="D">D</option>
//         </select>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//         >
//           Update Question
//         </button>
//       </form>
//     </div>
//   );
// }




"use client";

import { useEffect, useState } from "react";
import api from "../../../../../api/axios";
import { useRouter, useParams } from "next/navigation";

export default function EditQuestionPage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    subject: "",
    level_number: "",
    text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: ""
  });

  // -------------------------
  // Load question
  // -------------------------
  const fetchQuestion = async () => {
    try {
      const res = await api.get(`/admin/questions/${id}`);
      const q = res.data.question;

      // Ensure option letters exist
      q.options = q.options.map((o, i) => ({
        ...o,
        letter: ["A", "B", "C", "D"][i]
      }));

      setForm({
        subject: q.subject,
        level_number: q.level_number,
        text: q.text,
        option_a: q.options[0]?.text || "",
        option_b: q.options[1]?.text || "",
        option_c: q.options[2]?.text || "",
        option_d: q.options[3]?.text || "",
        correct_answer: q.options.find(o => o.is_correct)?.letter || ""
      });

    } catch (error) {
      console.error("Failed to load question:", error);
      alert("Error loading question");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // -------------------------
  // Input change handler
  // -------------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // -------------------------
  // Submit update
  // -------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      subject: form.subject,
      level_number: form.level_number,
      question: form.text,
      optionA: form.option_a,
      optionB: form.option_b,
      optionC: form.option_c,
      optionD: form.option_d,
      correctAnswer: form.correct_answer
    };

    try {
      await api.put(`/admin/questions/${id}`, payload);
      alert("Question updated successfully!");
      router.push("/admin/questions");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update question.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Edit Question</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Subject */}
        <div>
          <label className="block mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block mb-1">Level Number</label>
          <input
            type="number"
            name="level_number"
            value={form.level_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Question Text */}
        <div>
          <label className="block mb-1">Question</label>
          <textarea
            name="text"
            value={form.text}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Options */}
        <div>
          <label className="block mb-1">Option A</label>
          <input
            name="option_a"
            value={form.option_a}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Option B</label>
          <input
            name="option_b"
            value={form.option_b}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Option C</label>
          <input
            name="option_c"
            value={form.option_c}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Option D</label>
          <input
            name="option_d"
            value={form.option_d}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Correct Answer */}
        <div>
          <label className="block mb-1">Correct Answer</label>
          <select
            name="correct_answer"
            value={form.correct_answer}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Question
        </button>

      </form>
    </div>
  );
}
