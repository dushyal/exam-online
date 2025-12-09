import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export default async function authMiddleware(req, res, next) {
  try {
    let token = req.headers.authorization;

    // Expecting header: Authorization: Bearer <token>
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ error: "DD No token provided" });
    }

    token = token.split(" ")[1]; // extract token

    // Verify JWT
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);


    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Load user from database
    const user = await User.findByPk(decoded.id, {
      attributes: ["id", "name", "email", "role"]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (err) {
    console.error("AUTH MIDDLEWARE ERROR:", err);
    return res.status(401).json({ error: "Unauthorized" });
  }
}
