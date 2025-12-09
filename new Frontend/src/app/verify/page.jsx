// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useState } from "react";
// import api from "../../api/axios";

// export default function VerifyOtp() {
//   const params = useSearchParams();
//   const router = useRouter();

//   const email =
//     params.get("email") ||
//     (typeof window !== "undefined" ? localStorage.getItem("reg_email") : null);

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/register-complete", { email, otp });

//       if (res.data?.token) {
//         localStorage.removeItem("reg_email");
//         localStorage.setItem("token", res.data.token);
//         router.push("/dashboard");
//       } else {
//         alert("Invalid response from server");
//       }
//     } catch (err) {
//       alert(err.response?.data?.error || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await api.post("/otp/resend", { email });
//       alert("New OTP sent to your email!");
//     } catch (err) {
//       alert("Failed to resend OTP");
//     }
//   };

//   return (
//     <section className="card max-w-md mx-auto mt-10 p-6">
//       <h2 className="text-xl font-semibold mb-2">Verify your Email</h2>

//       <p className="mb-4 text-gray-600">OTP sent to: {email}</p>

//       <form onSubmit={handleVerify} className="space-y-3">
//         <input
//           type="text"
//           maxLength={6}
//           placeholder="Enter 6-digit OTP"
//           className="form-input text-center tracking-widest"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           required
//         />

//         <button className="btn btn-primary w-full" disabled={loading}>
//           {loading ? "Verifying..." : "Verify OTP"}
//         </button>
//       </form>

//       <button onClick={handleResend} className="btn w-full mt-2">
//         Resend OTP
//       </button>
//     </section>
//   );
// }




// "use client";

// import { useState } from "react";
// import api from "../../api/axios";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function VerifyOTP() {
//   const router = useRouter();
//   const params = useSearchParams();

//   const email =
//     params.get("email") ||
//     (typeof window !== "undefined" ? localStorage.getItem("reg_email") : null);

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     setLoading(true);

//     try {
//       await api.post("/auth/register-complete", { email, otp });

//       alert("Registration successful!");
//       localStorage.removeItem("reg_email");

//       router.push("/login");
//     } catch (err) {
//       alert(err?.response?.data?.error || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleResend = async () => {
//   //   try {
//   //     // ✅ correct backend route
//   //     await api.post("/auth/resend-otp", { email });
//   //     alert("OTP resent successfully!");
//   //   } catch (err) {
//   //     alert("Failed to resend OTP");
//   //   }
//   // };


// const handleResend = async () => {
//   try {
//     await api.post("/auth/resend", { email });
//     alert("OTP resent successfully!");
//   } catch (err) {
//     console.error(err);
//     alert(err?.response?.data?.error || "Failed to resend OTP");
//   }
// };



//   return (
//     <section className="card max-w-md mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>

//       <p className="text-gray-600 mb-3">OTP sent to: {email}</p>

//       <input
//         className="form-input"
//         placeholder="Enter 6-digit OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//       />

//       <button
//         className="btn btn-primary w-full mt-3"
//         onClick={handleVerify}
//         disabled={loading}
//       >
//         {loading ? "Verifying..." : "Submit OTP"}
//       </button>

//       <button className="btn w-full mt-2" onClick={handleResend}>
//         Resend OTP
//       </button>
//     </section>
//   );
// }




// "use client";

// import { useState } from "react";
// import api from "../../api/axios";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function VerifyOTP() {
//   const router = useRouter();
//   const params = useSearchParams();

//   const email =
//     params.get("email") ||
//     (typeof window !== "undefined" ? localStorage.getItem("reg_email") : null);

//   const password =
//     typeof window !== "undefined"
//       ? localStorage.getItem("reg_password")
//       : null;

//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerify = async () => {
//     setLoading(true);

//     try {
//       await api.post("/auth/register-complete", {
//         email,
//         otp,
//         password, // 🔥 REQUIRED
//       });

//       alert("Registration successful!");

//       // cleanup
//       localStorage.removeItem("reg_email");
//       localStorage.removeItem("reg_password");

//       router.push("/login");
//     } catch (err) {
//       alert(err?.response?.data?.error || "OTP verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await api.post("/auth/resend", {
//         email,
//         password,
//       });
//       alert("OTP resent successfully!");
//     } catch (err) {
//       alert(err?.response?.data?.error || "Failed to resend OTP");
//     }
//   };

//   return (
//     <section className="card max-w-md mx-auto p-4">
//       <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>

//       <p className="text-gray-600 mb-3">OTP sent to: {email}</p>

//       <input
//         className="form-input"
//         placeholder="Enter 6-digit OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//       />

//       <button
//         className="btn btn-primary w-full mt-3"
//         onClick={handleVerify}
//         disabled={loading}
//       >
//         {loading ? "Verifying..." : "Submit OTP"}
//       </button>

//       <button className="btn w-full mt-2" onClick={handleResend}>
//         Resend OTP
//       </button>
//     </section>
//   );
// }



"use client";

import { useState } from "react";
import api from "../../api/axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTP() {
  const router = useRouter();
  const params = useSearchParams();

  const email =
    params.get("email") ||
    (typeof window !== "undefined" ? localStorage.getItem("reg_email") : null);

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);

    try {
      await api.post("/auth/register-complete", { email, otp });

      alert("Registration successful!");
      localStorage.removeItem("reg_email");

      router.push("/login");
    } catch (err) {
      alert(err?.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/auth/resend", { email });
      alert("OTP resent successfully!");
    } catch (err) {
      alert(err?.response?.data?.error || "Failed to resend OTP");
    }
  };

  return (
    <section className="card max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>

      <p className="text-gray-600 mb-3">OTP sent to: {email}</p>

      <input
        className="form-input"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button
        className="btn btn-primary w-full mt-3"
        onClick={handleVerify}
        disabled={loading}
      >
        {loading ? "Verifying..." : "Submit OTP"}
      </button>

      <button className="btn w-full mt-2" onClick={handleResend}>
        Resend OTP
      </button>
    </section>
  );
}
