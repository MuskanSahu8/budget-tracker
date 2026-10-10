import React, { useEffect, useState } from "react";
import apiClient from "../ApiClient/interceptor";
import { useNavigate, useParams } from "react-router-dom";

const MONTHS = [
  { value: 1, name: "January" },
  { value: 2, name: "February" },
  { value: 3, name: "March" },
  { value: 4, name: "April" },
  { value: 5, name: "May" },
  { value: 6, name: "June" },
  { value: 7, name: "July" },
  { value: 8, name: "August" },
  { value: 9, name: "September" },
  { value: 10, name: "October" },
  { value: 11, name: "November" },
  { value: 12, name: "December" },
];

const CreateBudget = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // present only on /editbudget/:id
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [categoryLoader, setCategoryLoader] = useState(true);
  const [createCategory, setCreateCategory] = useState(false);
  const [createCategoryData, setCreateCategoryData] = useState({
    category: "",
  });

  const [budgetData, setBudgetData] = useState({
    category: "",
    amount: "",
    month: "",
    year: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const getCategories = async () => {
    try {
      const response = await apiClient.get("/category/get");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setCategoryLoader(false);
    }
  };

  // when editing, load the budget and prefill the form
  const getBudgetForEdit = async () => {
    try {
      const response = await apiClient.get(`/budget/get/${id}`);
      const b = response.data.data;

      setBudgetData({
        category: b.category?._id || b.category || "",
        amount: b.amount ?? "",
        month: b.month ?? "",
        year: b.year ?? "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to load budget");
      navigate("/");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (isEdit) getBudgetForEdit();
  }, [id]);

  const handleCategoryChange = (e) => {
    setCreateCategoryData({
      ...createCategoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/category/create", createCategoryData);
      getCategories();
      setCreateCategoryData({ category: "" });
      setCreateCategory(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setBudgetData({
      ...budgetData,
      [e.target.name]: e.target.value,
    });
  };

  const submitBudget = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      if (isEdit) {
        await apiClient.put(`/budget/${id}`, budgetData);
        navigate("/");
      } else {
        await apiClient.post("/budget/create", budgetData);
        navigate("/budget");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <main>
        <h1>{isEdit ? "Edit your budget" : "Create your budget here"}</h1>

        <form onSubmit={submitBudget}>
          <div className="category">
            <label>Category</label>

            {categoryLoader ? (
              <select disabled>
                <option>Loading...</option>
              </select>
            ) : categories.length === 0 ? (
              <select disabled>
                <option>No categories available</option>
              </select>
            ) : (
              <select
                name="category"
                value={budgetData.category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select category
                </option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.category}
                  </option>
                ))}
              </select>
            )}

            <div className="create-category">
              {createCategory ? (
                <>
                  <input
                    type="text"
                    placeholder="Enter new category"
                    onChange={handleCategoryChange}
                    name="category"
                    value={createCategoryData.category}
                  />{" "}
                  <button type="button" onClick={handleCategorySubmit}>
                    save
                  </button>
                  <button
                    type="button"
                    className="btn-cancel"
                    onClick={() => setCreateCategory(false)}
                  >
                    cancel
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setCreateCategory(true)}>
                  create category
                </button>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              min="0"
              placeholder="Enter your budget"
              value={budgetData.amount}
              name="amount"
              onChange={handleChange}
            />
          </div>

          <div className="month">
            <label>Month</label>

            <select
              name="month"
              value={budgetData.month}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select month
              </option>

              {MONTHS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="year">
            <label>Year</label>
            <input
              type="number"
              placeholder="Enter year"
              min="2026"
              max="2040"
              onChange={handleChange}
              name="year"
              value={budgetData.year}
            />
          </div>

          <button type="submit" disabled={submitting}>
            {submitting
              ? "Saving..."
              : isEdit
              ? "Update Budget"
              : "Create Budget"}
          </button>
        </form>
      </main>
    </>
  );
};

export default CreateBudget;