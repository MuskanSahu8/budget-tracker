import React, { useEffect, useState } from 'react'
import apiClient from '../ApiClient/interceptor';
import { useParams } from 'react-router-dom';

const BudgetDetails = () => {
  //use params 
  const { budgetId } = useParams();
  const {id} =useParams();
  //budgetStatus
  const [budget, setBudget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //purchase 
  const [purchase, setPurchase] = useState([]);
  const [purchaseLoading, setPurchaseLoading] = useState(true);
  const [showAddPurchase, setShowAddPurchase] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [purchaseForm, setPurchaseForm] = useState({
    title: "",
    amount: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const budDetails = async () => {
    try {
      setLoading(true);
      setError("");
      console.log("ID FROM URL:", budgetId);
      const response = await apiClient.get(`/budget/get/${budgetId}`);
      console.log(response.data.data);
      setBudget(response.data.data);

    } catch (err) {
      console.log(err.message);
      setError(
        err.response?.data?.message || "failed to load data"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    setPurchaseForm({
      ...purchaseForm,
      [e.target.name]: e.target.value
    })
  }
  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      setPurchaseLoading(true);
      const response = await apiClient.post("/purchase/create", {
        ...purchaseForm,
        budgetId: budgetId
      });
      console.log(response.data);
      setPurchaseForm({
        title: "",
        amount: "",
        note: ""
      });
      await showPurchase();
      alert("purchase created")
    } catch (error) {
      console.log(error.message);
      setError(
        error.response?.data?.message || "failed to create purchase"
      )
    } finally {
      setPurchaseLoading(false);
    }
  }


  const showPurchase = async (e) => {
    try {
      setPurchaseLoading(true);
      const response = await apiClient.get(`/purchase/get/${budgetId}`);
      console.log(response.data);
      setPurchase(response.data.purchase);
       setTotalSpent(response.data.totalSpent);
    } catch (error) {
      console.log(error.message);
      setError(
        error.response?.data?.message || "failed to load purchase data"
      )
    } finally {
      setPurchaseLoading(false);
    }
  }

  useEffect(() => {
    if (budgetId) {
      budDetails();
      showPurchase();
    }
  }, [budgetId])
  if (loading) {
    return <h2>Loading...</h2>;
  }

  const deletePurchase = async(id)=>{
    
   try {
    console.log("PURCHASE ID:", id)
     await apiClient.delete(`/purchase/delete/${id}`);
      await showPurchase();

    alert("Purchase deleted successfully");

   } catch (error) {
    console.log(error.message);
      setError(
        error.response?.data?.message || "failed to delete purchase data"
      )
   }
  }
  const  budgetAmount=Number(budget ?.amount || 0);
  const progress = budgetAmount > 0 ?  Math.min ((totalSpent /budgetAmount) *100 ,
  100):0;

  const remaining =budgetAmount -totalSpent;
   
  let progressColor = "#22c55e";

  if (progress >= 70 && progress < 100) {
    progressColor = "#f59e0b";
  }

  if (progress >= 100) {
    progressColor = "#ef4444";
  }  

  return (
    <div className='container'>

      <div className='budget-container'>
        <h2>budget Data</h2>

        {budget ? (
          <div className='budget-details-card'>
            <p className="budget-amount">Category: {budget.category?.category}</p>
            <p>
              Amount: ₹{budget.amount}
            </p>
            <p>Spent: ₹{totalSpent}</p>
            <p>remaining: ₹{remaining}</p>
            <p>Month: {budget.month}</p>
            <p>Year: {budget.year}</p>
            <p>created By: {budget.user.userName}</p>
             <div className="progress-container">

              <div className="progress-header">

                <span>
                  Budget Used
                </span>

                <span>
                  {Math.round(progress)}%
                </span>

              </div>

              <div className="progress-bar">

                <div
                  className="progress-fill"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: progressColor,
                  }}
                ></div>

              </div>

            </div>
          </div>
        ) : (
          <p className='budget-not-found'>budget not found</p>
        )}
       
      </div>
      <div className='purchase'>
        <button onClick={showPurchase}> show purchase</button>
        <h3>total spend :{totalSpent}</h3>
        {
          purchaseLoading ? (
            <p>loading purchse</p>) : (
            purchase.length === 0 ? (<p>no purchases ,create purchase</p>)
              : (
                purchase.map((p) => (<div key={p._id} className='purchase-list'>
                  <p>Title:{p.title}</p>
                  <p>Total Spent: ₹{p.amount}</p>
                  <p>Note:{p.note}</p>
                  <button onClick={()=>deletePurchase(p._id)}>Delete Purchase</button>
                </div>))
              )
          )
        }
        <div className='purchaseForm'>
        <h2>create your purchase </h2>
        <form onSubmit={handlePurchase}>
          <label htmlFor='title'>Title</label>
          <input type="text" name="title" placeholder='enter title' value={purchaseForm.title} onChange={handleChange} />
          <label htmlFor="number">Amount</label>
          <input type="number" name="amount" placeholder='enter amount' value={purchaseForm.amount} onChange={handleChange} />
          <label htmlFor='note'>Note</label>
          <input type="text" name="note" placeholder='enter a note' value={purchaseForm.note} onChange={handleChange} />
          <button type='Submit'>Create</button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default BudgetDetails
