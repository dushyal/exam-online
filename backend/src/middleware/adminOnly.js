// import jwt from "jsonwebtoken";

// export const adminOnly = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     if (decoded.role !== "ADMIN") {
//       return res.status(403).json({ message: "Admins only" });
//     }

//     req.admin = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };





export const adminOnly = (req, res, next) => {
  // If req.user is missing → token missing or invalid
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  // If role missing
  if (!req.user.role) {
    return res.status(401).json({ message: "Unauthorized: Role missing" });
  }

  // Check admin
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admins only" });
  }

  next();
};
