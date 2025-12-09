// export default function Home() {
//   return (
//     <section className="card">
//       <h1 className="text-2xl font-semibold mb-2">Welcome to the Online Examination Portal</h1>
//       <p className="mb-4">This starter includes auth, Tailwind, axios and example pages. Use the register and login pages to connect to your backend.</p>
//       <ul className="list-disc pl-5">
//         <li>API base: <code>http://localhost:5000/api</code></li>
//         <li>App Router (Next.js)</li>
//         <li>Tailwind CSS ready</li>
//       </ul>
//     </section>
//   );
// }

// "use client";

// export default function Home() {
//   return (
//     <section className="card min-h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 to-indigo-200 dark:from-gray-900 dark:to-gray-800 transition duration-500 px-4 sm:px-8 lg:px-20 py-10 overflow-x-hidden"> 

//       {/* Hero Section */}
//       <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto mt-10 sm:mt-20 lg:mt-32 animate-fadeIn px-2">
//         <h1 className="text-4xl sm:text-6xl font-extrabold text-indigo-700 dark:text-white drop-shadow mb-6 leading-snug">
//           Online Examination Portal
//         </h1>
//         <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8 max-w-2xl">
//           Smart, secure, and fully automated exam system designed for students, teachers, and administrators.
//         </p>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <a href="/register" className="px-10 py-3 rounded-xl bg-indigo-700 text-white text-lg font-semibold hover:bg-indigo-800 transition shadow-lg w-full sm:w-auto text-center">
//             Get Started
//           </a>
//           <a href="/login" className="px-10 py-3 rounded-xl border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold w-full sm:w-auto text-center">
//             Login
//           </a>
//         </div>
//       </div>

//       {/* Hero Illustration */}
//       <div className="flex justify-center mt-12 sm:mt-16 px-4">
//         <div className="w-full max-w-5xl h-56 sm:h-72 lg:h-96 bg-gradient-to-r from-indigo-300 to-blue-300 dark:from-gray-700 dark:to-gray-600 rounded-3xl shadow-xl animate-slideUp"></div>
//       </div>

//       {/* Features */}
//       <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto px-2">
//         <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700 hover:scale-105 transition text-center">
//           <h3 className="text-xl font-semibold dark:text-white mb-2">Secure Platform</h3>
//           <p className="text-gray-600 dark:text-gray-300">Advanced protected API system ensures exam security.</p>
//         </div>

//         <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700 hover:scale-105 transition text-center">
//           <h3 className="text-xl font-semibold dark:text-white mb-2">Instant Results</h3>
//           <p className="text-gray-600 dark:text-gray-300">Real-time scoring immediately after exam submission.</p>
//         </div>

//         <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border dark:border-gray-700 hover:scale-105 transition text-center">
//           <h3 className="text-xl font-semibold dark:text-white mb-2">Full Admin Control</h3>
//           <p className="text-gray-600 dark:text-gray-300">Manage exams, users, subjects, and performance analytics.</p>
//         </div>
//       </div>

//       {/* Dashboard Preview */}
//       <div className="mt-20 w-full max-w-6xl mx-auto px-4">
//         <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 dark:text-white mb-10">
//           Dashboard Preview
//         </h2>
//         <div className="w-full h-64 sm:h-80 lg:h-96 bg-white dark:bg-gray-900 rounded-3xl border dark:border-gray-700 shadow-2xl animate-fadeIn"></div>
//       </div>

//       {/* Animated Background */}
//       <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-60 h-60 sm:w-72 sm:h-72 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-80 h-80 sm:w-96 sm:h-96 bg-blue-400/30 rounded-full blur-3xl animate-bounce"></div>
//       </div>

//     </section>
//   );
// }


"use client";

export default function Home() {
  return (
    <section
      className="relative w-full min-h-screen overscroll-none 
      snap-y snap-mandatory scrollbar-hide 
      bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 text-white"
    >

      {/* ===== PAGE INDICATORS ===== */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        <a href="#sec1" className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-all"></a>
        <a href="#sec2" className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-all"></a>
        <a href="#sec3" className="w-3 h-3 rounded-full bg-white/40 hover:bg-white transition-all"></a>
      </div>

      {/* ===== FULLSCREEN BACKGROUND SHAPES ===== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div
        id="sec1"
        className="w-full h-screen flex flex-col items-center justify-center text-center px-6 sm:px-12 
        snap-start relative z-10"
      >
        <h1 className="text-5xl sm:text-7xl font-extrabold drop-shadow-xl leading-tight">
          Online Examination Portal
        </h1>

        <p className="mt-6 text-xl max-w-3xl opacity-90">
          A powerful, secure, and fully automated online test system for students & administrators.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <a
            href="/register"
            className="px-10 py-3 bg-white text-indigo-700 rounded-xl font-semibold shadow-2xl 
            hover:scale-105 hover:bg-gray-100 transition-all duration-300"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="px-10 py-3 border border-white/60 text-white rounded-xl font-semibold 
            backdrop-blur-xl hover:bg-white/10 transition-all duration-300"
          >
            Login
          </a>
        </div>
      </div>

      {/* ===== FEATURES SECTION ===== */}
      <div
        id="sec2"
        className="w-full h-screen flex flex-col items-center justify-center px-10 py-24 gap-10 
        snap-start relative z-10"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Features</h2>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {["Secure Platform", "Instant Results", "Full Admin Control"].map((title, i) => (
            <div
              key={i}
              className="p-10 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl 
              hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-3xl font-semibold">{title}</h3>
              <p className="mt-3 text-white/80 text-lg">
                {i === 0 && "Advanced protected API ensures safe and secure exam flow."}
                {i === 1 && "Students get results instantly with auto-evaluation system."}
                {i === 2 && "Admins can manage users, exams, analytics & more."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DASHBOARD PREVIEW SECTION ===== */}
      <div
        id="sec3"
        className="w-full h-screen flex flex-col items-center justify-center px-10 snap-start relative z-10"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Dashboard Preview</h2>

        <div
          className="w-full max-w-5xl h-96 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl 
          shadow-[0_0_80px_rgba(255,255,255,0.2)] animate-slideUp"
        ></div>
      </div>

    </section>
  );
}
