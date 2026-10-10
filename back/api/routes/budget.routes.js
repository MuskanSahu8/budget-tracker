import express from "express";
import { createBudget, deleteBudget, getBudget, getBudgetById, updateBudget } from "../controller/budget.controller.js";
import { protect } from "../utils/protect.js";
const router = express.Router();
router.post("/create", protect , createBudget);
router.get("/get", protect , getBudget);
router.get("/get/:id",protect,getBudgetById);
router.delete("/delete/:id",protect,deleteBudget);
router.put("/:id",protect,updateBudget)
export default router;