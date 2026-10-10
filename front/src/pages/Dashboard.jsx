import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor";
import { Link, useNavigate } from "react-router-dom";
import "./dashboard.css";
import CategoryPieChart from "./CategoryPieChart";

const Dashboard = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [month, setMonth] = useState(""); // "" = all time, otherwise "2026-10"

  const getDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/dashboard/get", {
        params: month ? { month } : {},
      });

      setDashboard(response.data);
    } catch (err) {
      console.log("Dashboard error:", err);
      console.log("Backend response:", err.response?.data);

      setError(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, [month]);

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // don't trigger the card click

    const ok = window.confirm(
      "Delete this budget? Its purchases will also be removed. This can't be undone."
    );
    if (!ok) return;

    try {
      await apiClient.delete(`/budget/delete/${id}`);
      getDashboardData(); // refresh the numbers
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete budget");
    }
  };

  // Loading (first load only)
  if (loading && !dashboard) {
    return (
      <div className="dashboard-message">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  // Error (first load only)
  if (error && !dashboard) {
    return (
      <div className="dashboard-message">
        <h2>{error}</h2>
        <button onClick={getDashboardData}>Try Again</button>
      </div>
    );
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className={`dashboard ${loading ? "is-loading" : ""}`}>
      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <div>
          <h1>Budget Dashboard</h1>
          <p>Track your budget, spending and expenses</p>
        </div>

        <div className="header-actions">
          <div className="month-filter">
            <div className={`month-input-wrap ${month ? "has-value" : ""}`}>
              <input
                type="month"
                value={month}
                max={new Date().toISOString().slice(0, 7)}
                onChange={(e) => setMonth(e.target.value)}
              />
              {!month && (
                <span className="month-placeholder">Select month</span>
              )}
            </div>

            {month && (
              <button type="button" onClick={() => setMonth("")}>
                All time
              </button>
            )}
          </div>

          <Link to="/createbudget" className="add-budget-btn">
            + Add Budget
          </Link>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="card-icon">💰</div>
          <div>
            <p>Total Budget</p>
            <h2>₹{dashboard.totalBudget}</h2>
            <span>{dashboard.totalBudgets} budgets</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">💸</div>
          <div>
            <p>Total Spent</p>
            <h2>₹{dashboard.totalSpent}</h2>
            <span>{dashboard.totalPurchases} purchases</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">💵</div>
          <div>
            <p>Remaining</p>
            <h2>₹{dashboard.remaining}</h2>
            <span>Available budget</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-icon">📊</div>
          <div>
            <p>Burn Rate</p>
            <h2>{dashboard.burnRate}%</h2>
            <span>{dashboard.activeBudgetsCount} active budgets</span>
          </div>
        </div>
      </div>

      {/* ================= BUDGETS ================= */}
      <section className="dashboard-section">
        <div className="section-header">
          <div>
            <h2>My Budgets</h2>
            <p>Track spending for each budget</p>
          </div>

          <Link to="/budget">View All</Link>
        </div>

        <div className="budget-list">
          {dashboard.budgets.length === 0 ? (
            <div className="empty-box">
              <p>{month ? "No budgets for this month." : "No budgets found."}</p>
              <Link to="/createbudget">Create a budget</Link>
            </div>
          ) : (
            dashboard.budgets.map((budget) => (
              <div
                className="budget-card"
                key={budget._id}
                onClick={() => {
                  navigate(`/budget/${budget._id}`);
                }}
              >
                <div className="budget-top">
                  <div>
                    <h3>
                      {budget.category?.category ||
                        budget.category?.name ||
                        "General"}
                    </h3>
                    <p>Budget: ₹{budget.amount}</p>
                  </div>

                  <div className="budget-right">
                    <div className="budget-remaining">
                      <strong>₹{budget.remaining}</strong>
                      <span>remaining</span>
                    </div>

                    <div className="budget-actions">
                      <button
                        type="button"
                        className="edit-budget-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/editbudget/${budget._id}`);
                        }}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        type="button"
                        className="delete-budget-btn"
                        onClick={(e) => handleDelete(e, budget._id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>

                <div className="budget-bottom">
                  <span>Spent: ₹{budget.spent}</span>
                  <span>{budget.percentageSpent}% used</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* ================= BOTTOM SECTION ================= */}
      <div className="dashboard-columns">
        {/* ================= RECENT PURCHASES ================= */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Recent Purchases</h2>
              <p>Your latest expenses</p>
            </div>
          </div>

          <div className="purchase-list">
            {dashboard.recentPurchases.length === 0 ? (
              <div className="empty-box">
                <p>{month ? "No purchases this month." : "No purchases yet."}</p>
              </div>
            ) : (
              dashboard.recentPurchases.map((purchase) => (
                <div className="purchase-item" key={purchase._id}>
                  <div className="purchase-info">
                    <div className="purchase-icon">💳</div>

                    <div>
                      <h4>{purchase.title || "Purchase"}</h4>
                      <p>
                        {purchase.category?.category ||
                          purchase.category?.name ||
                          "General"}
                      </p>
                    </div>
                  </div>

                  <strong>- ₹{purchase.amount}</strong>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ================= CATEGORY BREAKDOWN ================= */}
        <section className="dashboard-section">
          <div className="section-header">
            <div>
              <h2>Category Spending</h2>
              <p>Where your money is going</p>
            </div>
          </div>

          {dashboard.categoryBreakdown.length > 0 && (
            <div className="pie-wrapper">
              <CategoryPieChart data={dashboard.categoryBreakdown} />
            </div>
          )}

          <div className="category-list">
            {dashboard.categoryBreakdown.length === 0 ? (
              <div className="empty-box">
                <p>No category data available.</p>
              </div>
            ) : (
              dashboard.categoryBreakdown.map((item) => (
                <div className="category-item" key={item.category}>
                  <div className="category-info">
                    <span>{item.category}</span>
                    <strong>₹{item.amount}</strong>
                  </div>

                  <div className="category-progress">
                    <div
                      className="category-progress-bar"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>

                  <div className="category-percentage">
                    <span>{item.percentage}% of spending</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;