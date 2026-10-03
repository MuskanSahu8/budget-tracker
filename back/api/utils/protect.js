import jwt from "jsonwebtoken";
import { Auth } from "../modal/auth.schema.js";

export const protect = async (req, res, next) => {
  try {
    console.log("========== PROTECT ==========");
    console.log("COOKIES:", req.cookies);

    const token = req.cookies?.token;

    console.log("TOKEN:", token);

    if (!token) {
      console.log("❌ TOKEN NOT FOUND");

      return res.status(401).json({
        message: "unauthorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );

    console.log("DECODED:", decoded);

    const user = await Auth.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "user not found",
      });
    }

    req.user = user;
    next();

  } catch (err) {
    console.log("AUTH ERROR:", err);

    return res.status(401).json({
      message: "invalid token",
    });
  }
};