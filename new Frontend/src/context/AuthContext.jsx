// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on refresh
//   useEffect(() => {
//     const savedUser = localStorage.getItem("authUser");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   // Login handler
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("authUser", JSON.stringify(userData));
//   };

//   // Logout handler
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("authUser");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("authUser");

//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }

//     setLoading(false); // auth is ready
//   }, []);

//   // LOGIN
//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("authUser", JSON.stringify(userData));
//   };

//   // LOGOUT
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("authUser");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);



// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("authUser");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("authUser", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("authUser");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);






// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("authUser");
//     const token = localStorage.getItem("token");

//     if (savedUser && token) {
//       setUser(JSON.parse(savedUser));
//     }

//     setLoading(false);
//   }, []);

//   // LOGIN FUNCTION — SAVE TOKEN + USER
//   const login = ({ token, user }) => {
//     localStorage.setItem("token", token);              // SAVE TOKEN
//     localStorage.setItem("authUser", JSON.stringify(user)); // SAVE USER

//     setUser(user);
//   };

//   // LOGOUT
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("authUser");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);




"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  // LOGIN FUNCTION — SAVE TOKEN + USER
  const login = ({ token, user }) => {
    localStorage.setItem("token", token);              // SAVE TOKEN
    localStorage.setItem("authUser", JSON.stringify(user)); // SAVE USER

    setUser(user);
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
