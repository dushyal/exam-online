// "use client";

// import Link from "next/link";
// import { useAuth } from "../context/AuthContext";

// export default function Header() {
//   const { user, logout } = useAuth();

//   return (
//     <header className="header">
//       <div className="container flex items-center justify-between">
//         <div className="logo">Online Exam Portal</div>
//         <nav className="flex items-center gap-4">
//           <Link href="/">Home</Link>
//           {user ? (
//             <>
//               <Link href="/dashboard">Dashboard</Link>
//               <button onClick={logout} className="btn btn-primary">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="btn btn-primary">Login</Link>
//               <Link href="/register" className="btn">Register</Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }




// "use client";

// import Link from "next/link";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";
// import { useAdminAuth } from "../context/AdminAuthContext";

// export default function Header() {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     router.replace("/login");
//   };

//   return (
//     <header className="header">
//       <div className="container flex items-center justify-between">
//         <div className="logo">Online Exam Portal</div>

//         <nav className="flex items-center gap-4">
//           <Link href="/">Home</Link>

//           {user ? (
//             <>
//               <Link href="/dashboard">Dashboard</Link>
//               <button onClick={handleLogout} className="btn btn-primary">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link href="/login" className="btn btn-primary">Login</Link>
//               <Link href="/register" className="btn">Register</Link>
//             </>
//           )}
//         </nav>
//       </div>
//     </header>
//   );
// }




// "use client";

// import Link from "next/link";
// import { useAuth } from "../context/AuthContext";
// import { useAdminAuth } from "../context/AdminAuthContext";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const { user, logout } = useAuth(); // STUDENT
//   const { admin, logoutAdmin } = useAdminAuth(); // ADMIN
//   const router = useRouter();

//   const handleStudentLogout = () => {
//     logout();
//     router.replace("/login");
//   };

//   const handleAdminLogout = () => {
//     logoutAdmin();
//     router.replace("/admin/login");
//   };

//   return (
//     <header className="header">
//       <div className="container flex items-center justify-between">
//         <div className="logo">Online Exam Portal</div>

//         <nav className="flex items-center gap-4">

//           <Link href="/">Home</Link>

//           {/* ---------------- STUDENT LOGGED IN ---------------- */}
//           {user && !admin && (
//             <>
//               <Link href="/dashboard">Student Dashboard</Link>
//               <button onClick={handleStudentLogout} className="btn btn-primary">
//                 Logout
//               </button>
//             </>
//           )}

//           {/* ---------------- ADMIN LOGGED IN ---------------- */}
//           {admin && (
//             <>
//               <Link href="/admin/dashboard">Admin Dashboard</Link>
//               <button onClick={handleAdminLogout} className="btn btn-primary">
//                 Logout
//               </button>
//             </>
//           )}

//           {/* ---------------- NOT LOGGED IN ---------------- */}
//           {!user && !admin && (
//             <>
//               <Link href="/login" className="btn btn-primary">
//                 Login
//               </Link>
//               <Link href="/register" className="btn">Register</Link>
//             </>
//           )}

//         </nav>
//       </div>
//     </header>
//   );
// }












// "use client";

// import Link from "next/link";
// import { useAuth } from "../context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const { user, logout } = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     if (user?.role === "ADMIN") {
//       router.replace("/login");
//     } else {
//       router.replace("/login");
//     }
//   };

//   return (
//     <header className="header">
//       <div className="container flex items-center justify-between">
//         <div className="logo">Online Exam Portal</div>

//         <nav className="flex items-center gap-4">
//           <Link href="/">Home</Link>

//           {/* USER LOGGED IN */}
//           {user && (
//             <>
//               {user.role === "ADMIN" ? (
//                 <Link href="/admin">Dashboard</Link>
//               ) : (
//                 <Link href="/dashboard">Dashboard</Link>
//               )}

//               <button onClick={handleLogout} className="btn btn-primary">
//                 Logout
//               </button>
//             </>
//           )}

//           {/* NOT LOGGED IN */}
//           {!user && (
//             <>
//               <Link href="/login" className="btn btn-primary">
//                 Login
//               </Link>
//               <Link href="/register" className="btn">Register</Link>
//             </>
//           )}

//         </nav>
//       </div>
//     </header>
//   );
// }






"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  LogOut,
  User,
  Home,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.replace("/login");
    setIsMenuOpen(false);
  };

  // ✨ FIX: Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // ✨ FIX: Prevent page scrolling when mobile menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-bold text-indigo-700"
        >
          Online Exam Portal
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden block"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-gray-700 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition flex items-center gap-1">
            <Home size={18} /> Home
          </Link>

          {user && (
            <>
              {user.role === "ADMIN" || "EXAMINATION" || "SUBJECT" ? (
                <Link href="/admin" className="hover:text-indigo-600 transition flex items-center gap-1">
                  <LayoutDashboard size={18} /> Admin Panel
                </Link>
              ) : (
                <Link href="/dashboard" className="hover:text-indigo-600 transition flex items-center gap-1">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
              )}

              {/* Profile Menu */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-xl hover:bg-gray-300"
                >
                  <User size={18} />
                  {user?.name || "Profile"}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border p-2 z-[999]">
                    <Link
                      href={user.role === "ADMIN" || "EXAMINATION" || "SUBJECT" ? "/admin" : "/dashboard"}
                      className="block px-3 py-2 rounded hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex gap-2 items-center text-red-600"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {!user && (
            <>
              <Link
                href="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 bg-gray-900 text-white rounded-xl shadow hover:bg-black transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/70 backdrop-blur-md shadow-md p-6 text-gray-800 z-40">

          <Link
            href="/"
            className="block mb-4 flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <Home size={18} /> Home
          </Link>

          {user ? (
            <>
              <Link
                href={user.role === "ADMIN" || "EXAMINATION" || "SUBJECT" ? "/admin" : "/dashboard"}
                className="block mb-4 flex items-center gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <LayoutDashboard size={18} /> Dashboard
              </Link>

              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left text-red-600 flex gap-2 items-center"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                href="/register"
                className="block"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
