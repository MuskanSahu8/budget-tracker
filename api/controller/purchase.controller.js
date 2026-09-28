import { Budget } from "../modal/budget.schema.js";
import { Purchase } from "../modal/purchase.schema.js";

const createPurchase = async (req, res, next) => {
    try {
        //fetch
        const { amount, budgetId, note, date, title } = req.body;
        //validate
        if (!amount || !title || !budgetId) {
            return res.status(400).json({
                message: "all fields are req"
            })
        }
        //check if existing buget belogs to user
        const budget = await Budget.findOne({
            user: req.user._id,
            _id: budgetId
        })
        if (!budget) {
            res.status(404).json({
                message: "budgetId not found"
            })
        }
        const purchase = await Purchase.create({
            user: req.user._id,
            budget: budget._id,
            category: budget.category,
            title: title.trim(),
            amount: Number(amount),
            note: note ? note.trim() : "",
            date: date ? new Date(date) : new Date(),
            month: budget.month,
            year: budget.year,
        });
        return res.status(200).json({
            message: "purchase created successfully",
            purchase
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        })
    }
}
const getPurchaseByBudget = async (req, res, next) => {
    try {
        const { budgetId } = req.params;

        const purchase = await Purchase.find({
            budget: budgetId,
            user: req.user._id,
        }).sort({ date: -1, createdAt: -1 });

        const totalSpent = purchase.reduce(
            (acc, item) => acc + (Number(item.amount) || 0),
            0
        )
        return res.status(200).json({
            purchase,
            totalSpent,
            count: purchase.length,
        })
    } catch (error) {
        return res.status(500).json({
            message: err.message,
        });
    }
}

const deletePurchase = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleted = await Purchase.findOneAndDelete({
            _id: id,
            user: req.user._id
        })

        if (!deleted) {
            return res.status(404).json({
                message: "purchase not found"
            })
        }
        return res.status(200).json({
            message: "Purchase deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: err.message,
        });
    }
}
export { createPurchase, getPurchaseByBudget,deletePurchase }