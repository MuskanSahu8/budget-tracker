import Router from "express";
import { getDashboardData } from "../controller/dashboard.controller.js";
import { protect } from "../utils/protect.js";
const router=Router();
router.get("/",protect,getDashboardData);
router.get("/get",protect,getDashboardData);
export default router;
