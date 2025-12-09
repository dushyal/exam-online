// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   // withCredentials: true,
//   headers: {
//     "Content-Type": "application/json"
//   }
// });

// // Attach token if present
// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// }, (error) => Promise.reject(error));

// export default api;




// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: { "Content-Type": "application/json" }
// });

// // Attach token to every request
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   console.log("Axios sending token API:", token);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// export default api;









// import axios from "axios";

// // Create Axios instance
// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: { "Content-Type": "application/json" },
// });

// // Request interceptor: attach token automatically
// api.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") { // make sure we're in the browser
//       const token = localStorage.getItem("token");
//       console.log("Axios sending token API:", token);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor: handle token errors globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.message;

//     // If token is missing or expired
//     if (message === "Token missing" || message === "Invalid token" || error.response?.status === 401) {
//       console.warn("Token missing or invalid. Redirecting to login.");
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;












// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   headers: { "Content-Type": "application/json" },
// });

// // Attach token automatically
// api.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       const token = localStorage.getItem("token");
//       if (token) config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle expired/missing tokens
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;
//     const message = error.response?.data?.message;

//     if (!error.response) {
//       console.error("Server unreachable");
//       return Promise.reject({ message: "Server unreachable" });
//     }

//     if (message === "Token missing" || message === "Invalid token" || status === 401) {
//       if (typeof window !== "undefined") {
//         localStorage.removeItem("token");

//         if (window.location.pathname !== "/login") {
//           window.location.href = "/login";
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;






// new code


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;
