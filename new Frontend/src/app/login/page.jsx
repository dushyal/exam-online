// only student login

// "use client";

// import { useAuth } from "../../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import api from "../../api/axios";

// export default function Login() {
//   const router = useRouter();
//   const { user, login, loading } = useAuth();

//   // If already logged in → redirect
//   useEffect(() => {
//     if (!loading && user) {
//       router.push("/dashboard");
//     }
//   }, [loading, user]);

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [btnLoading, setBtnLoading] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setBtnLoading(true);

//     try {
//       const res = await api.post("/auth/login", form);

//       console.log('login' + res)
//       login({
//         token: res.data.token,
//         user: res.data.user,
//       });

//       router.push("/dashboard");
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     } finally {
//       setBtnLoading(false);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <section className="card max-w-md mx-auto">
//       <h2 className="text-xl font-semibold mb-4">Login to your account</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <div>
//           <label className="block text-sm">Email</label>
//           <input
//             name="email"
//             type="email"
//             value={form.email.toLocaleLowerCase()}
//             onChange={handleChange}
//             className="form-input"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm">Password</label>
//           <input
//             name="password"
//             type="password"
//             value={form.password}
//             onChange={handleChange}
//             className="form-input"
//             required
//           />
//         </div>

//         <button className="btn btn-primary" disabled={btnLoading}>
//           {btnLoading ? "Logging.." : "Login"}
//         </button>
//       </form>
//     </section>
//   );
// }

// login => student + aadmin

"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Login() {
  const router = useRouter();
  const { user, login, loading } = useAuth();

  // If already logged in → redirect based on role
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [loading, user]);

  const [form, setForm] = useState({ email: "", password: "" });
  const [btnLoading, setBtnLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      // Save auth in global context
      login({
        token: res.data.token,
        user: res.data.user,
      });

      // Redirect based on role
      if (res.data.user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {

       let message = err.response?.data.error || err || "Login failed";

      console.error(err);

      alert(message);
    } finally {
      setBtnLoading(false);
    }
  };


  if (loading) return <p>Loading...</p>;

  return (
    <section className="card max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login to your account</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={form.email.toLowerCase()}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div>
          <label className="block text-sm">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <button className="btn btn-primary" disabled={btnLoading}>
          {btnLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
}
