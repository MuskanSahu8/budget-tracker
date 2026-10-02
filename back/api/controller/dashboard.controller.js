import { Budget } from "../modal/budget.schema.js";
import { Purchase } from "../modal/purchase.schema.js";

export const getDashboardData = async (req, res, next) => {
  try {
    // 1. Get all budgets of current user
    const budgets = await Budget.find({
      user: req.user._id,
    })
      .populate("category")
      .sort({ createdAt: -1 });

    // 2. Get all purchases of current user
    const purchases = await Purchase.find({
      user: req.user._id,
    })
      .populate("category")
      .populate("budget")
      .sort({ date: -1, createdAt: -1 });

    // 3. Calculate total budget
    const totalBudget = budgets.reduce(
      (acc, item) => acc + (Number(item.amount) || 0),
      0
    );

    // 4. Calculate total spent
    const totalSpent = purchases.reduce(
      (acc, item) => acc + (Number(item.amount) || 0),
      0
    );

    // 5. Calculate overall remaining
    const remaining = totalBudget - totalSpent;

    // 6. Calculate spent amount for each budget
    const budgetSpentMap = {};

    purchases.forEach((p) => {
      const bId =
        p.budget?._id?.toString() ||
        p.budget?.toString();

      if (bId) {
        budgetSpentMap[bId] =
          (budgetSpentMap[bId] || 0) +
          (Number(p.amount) || 0);
      }
    });

    // 7. Add spent, remaining and percentage to each budget
    const enrichedBudgets = budgets.map((b) => {
      const bId = b._id.toString();

      const spent = budgetSpentMap[bId] || 0;

      const amount = Number(b.amount) || 0;

      const rem = amount - spent;

      const percentageSpent =
        amount > 0
          ? Math.min(
              100,
              Math.round((spent / amount) * 100)
            )
          : 0;

      return {
        ...b.toObject(),
        spent,
        remaining: rem,
        percentageSpent,
      };
    });

    // 8. Calculate category spending
    const categoryMap = {};

    purchases.forEach((p) => {
      const catName =
        p.category?.category ||
        p.category?.name ||
        "General";

      categoryMap[catName] =
        (categoryMap[catName] || 0) +
        (Number(p.amount) || 0);
    });

    // 9. Create category breakdown
    const categoryBreakdown = Object.entries(categoryMap)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage:
          totalSpent > 0
            ? Math.round((amount / totalSpent) * 100)
            : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    // 10. Calculate burn rate
    const burnRate =
      totalBudget > 0
        ? Math.round((totalSpent / totalBudget) * 100)
        : 0;

    // 11. Count active budgets
    const activeBudgetsCount = budgets.filter(
      (b) => !b.isDone
    ).length;

    // 12. Send response
    return res.status(200).json({
      totalBudget,
      totalSpent,
      remaining,
      totalBudgets: budgets.length,
      totalPurchases: purchases.length,
      burnRate,
      activeBudgetsCount,
      budgets: enrichedBudgets,
      recentPurchases: purchases.slice(0, 8),
      categoryBreakdown,
    });
  } catch (error) {
    console.log("DASHBOARD ERROR:", error);

    return res.status(500).json({
      message: error.message,
      error: error.stack,
    });
  }
};