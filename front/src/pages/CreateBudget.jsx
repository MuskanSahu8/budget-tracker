import React, { use, useEffect, useState } from 'react'
import apiClient from '../ApiClient/interceptor'

const CreateBudget = () => {

  const [categories, setCategories] = useState([])
  const [categoryLoader, setCategoryLoader] = useState(true)
  const [createCategory, setCreateCategory] = useState(false)
  const [createCategoryData, setCreateCategoryData] = useState({
    category: " "
  })
  // create budget
  const [budgetData, setBudgetData] = useState({
    category: "",
    amount: "",
    month: "",
    year: ""

  })
  //get buget
  const [savedBudget, setSavedBudget] = useState([])

  const getCategories = async () => {
    try {
      const response = await apiClient.get("/category/get")
      setCategories(response.data.data);
    } catch (error) {
      console.log(error.message)
    } finally {
      setCategoryLoader(false)
    }
  }
  //to get the data permanently from backend
  useEffect(() => {
    getCategories()
    getBudget()
  }, [])
  const handleCategoryChange = (e) => {
    setCreateCategoryData({
      ...createCategoryData,
      [e.target.name]: e.target.value
    })
  }

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/category/create", createCategoryData)
      getCategories();
      setCreateCategoryData({
        category: " "
      })
      setCreateCategory(false);
    } catch (error) {
      console.log(error.message)
    }
  }

  const month = [
    {
      value: 1,
      name: "January"
    },
    {
      value: 2,
      name: "February"
    },
    {
      value: 3,
      name: "March"
    },
    {
      value: 4,
      name: "April"
    },
    {
      value: 5,
      name: "May"
    },
    {
      value: 6,
      name: "June"
    },
    {
      value: 7,
      name: "July"
    },
    {
      value: 8,
      name: "August"
    }, {
      value: 9,
      name: "September"
    },
    {
      value: 10,
      name: "October"
    },
    {
      value: 11,
      name: "November"
    },
    {
      value: 12,
      name: "December"
    }
  ]
  const handleChange = (e) => {
    setBudgetData({
      ...budgetData,
      [e.target.name]: e.target.value
    })
  }

  const submitBudget = async (e) => {
    e.preventDefault();
    console.log("Sending budget:", budgetData);
    try {
      const response = await apiClient.post(
        "/budget/create",
        budgetData);
      console.log(response.data);

      setBudgetData({
        category: "",
        amount: "",
        month: "",
        year: "",
      })
      getBudget();
    } catch (error) {
      console.log(error.message);
    }

  }
  const getBudget = async () => {
    try {
      const response = await apiClient.get("/budget/get")
      setSavedBudget(response.data.data)
    } catch (error) {
      console.log(error.message)
    }

  }
  return (
    <>
      <main>
        <h1>create your budget here</h1>
        <form onSubmit={submitBudget}>
          <div className="category">
            <label>category</label>
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
              {
                createCategory ? (
                  <>
                    <input type='text' placeholder="Enter new category" onChange={handleCategoryChange} name='category' value={createCategoryData.category} />{" "}
                    <button onClick={handleCategorySubmit}>save</button>
                    <button type="button" className="btn-cancel" onClick={() => setCreateCategory(!createCategory)}>
                      cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => setCreateCategory(!createCategory)}>
                    create category
                  </button>
                )
              }
            </div>
          </div>
          <div className="form-group">
            <label>amount</label>
            <input type="string" placeholder='enter your budget' value={budgetData.amount} name="amount" onChange={handleChange} />
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

    {month.map((item) => (
      <option key={item.value} value={item.value}>
        {item.name}
      </option>
    ))}
  </select>
</div>
          <div className="year">
            <label>year</label>
            <input type="number" placeholder='enter year' min="2026" max="2040" onChange={handleChange} name='year' value={budgetData.year} />
          </div>
          <button type='submit'>create Budget</button>
        </form>
      </main>

    </>
  )
}


export default CreateBudget
