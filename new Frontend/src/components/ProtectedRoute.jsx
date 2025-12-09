// "use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function ProtectedRoute({ children }) {
//   const router = useRouter();

//   useEffect(() => {
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
//     if (!token) {
//       router.push("/login");
//     }
//   }, [router]);

//   return <>{children}</>;
// }





// "use client";

// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function ProtectedRoute({ children }) {
//   const { user } = useAuth();
//   const router = useRouter();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const authUser = localStorage.getItem("authUser");

//     // If NOT logged in → redirect
//     if (!authUser) {
//       router.replace("/login");
//       return;
//     }

//     setLoading(false);
//   }, []);

//   if (loading) {
//     return <p className="text-center p-5">Checking authentication...</p>;
//   }

//   return <>{children}</>;
// }




// "use client";

// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function ProtectedRoute({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.replace("/login");
//     }
//   }, [loading, user, router]);

//   if (loading) {
//     return (
//       <p className="text-center p-6 text-lg">Checking authentication...</p>
//     );
//   }

//   if (!user) return null; // prevent flash

//   return <>{children}</>;
// }





"use client";

import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p className="text-center p-5">Checking authentication...</p>;
  }

  if (!user) return null;   // Prevent showing dashboard

  return <>{children}</>;
}
