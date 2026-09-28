import Router from "express"
import { protect } from "../utils/protect.js";
import { createPurchase, deletePurchase, getPurchaseByBudget } from "../controller/purchase.controller.js";
const router =Router();
router.post("/create",protect,createPurchase);
router.get("/get/:budgetId",protect,getPurchaseByBudget);
router.delete("/delete/:id",protect,deletePurchase)
export default router;