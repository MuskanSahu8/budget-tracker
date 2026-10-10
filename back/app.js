import express from "express";
import dotenv from "dotenv";
import authRouter from "./api/routes/auth.routes.js";
import categoryRouter from "./api/routes/category.routes.js";
import CookieParser from "cookie-parser";
import budgetRouter from "./api/routes/budget.routes.js";
import purchaseRouter from "./api/routes/purchase.route.js";
import dashboardRouter from "./api/routes/dashboard.routes.js";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors({ 
  origin: "http://localhost:5173",
  //  origin: "https://budget-tracker-sepia-five.vercel.app",
  credentials: true,
})); 

app.use(express.json());
app.use(CookieParser());

app.get("/", (req, res) => {
  res.send("Budget Tracker Backend is running");
});

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/purchase", purchaseRouter);
app.use("/api/dashboard", dashboardRouter);

export default app;