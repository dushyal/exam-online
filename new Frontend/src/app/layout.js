// import '../styles/globals.css';
// import { AuthProvider } from "../context/AuthContext";
// import Header from "../components/Header";

// export const metadata = {
//   title: 'Online Exam',
//   description: 'Online Examination System - Next.js Starter',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           <Header />
//           <main className="container py-8">
//             {children}
//           </main>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }







import '../styles/globals.css';
import { AuthProvider } from "../context/AuthContext";
import { AdminAuthProvider } from "../context/AdminAuthContext";
import Header from "../components/Header";

export const metadata = {
  title: 'Online Exam',
  description: 'Online Examination System - Next.js Starter',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AdminAuthProvider>   {/* ADMIN CONTEXT ADDED */}
          <AuthProvider>      {/* STUDENT CONTEXT */}

            <Header />

            <main>
              {children}
            </main>

          </AuthProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
