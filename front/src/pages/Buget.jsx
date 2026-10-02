import React, { useState,useEffect } from 'react'
import apiClient from '../ApiClient/interceptor';
import { useNavigate } from 'react-router-dom';

const Buget = () => {
  const navigate =useNavigate();
  const [budget,setBudget]=useState([]);
  const getBudget=async()=>{
    try{
      const response= await apiClient.get("/budget/get");
      console.log(response.data.data)
      setBudget(response.data.data);
    }catch(error){
      console.log("ERROR",error.message);
    }
  }
  useEffect(()=>{
    getBudget();
  }
,[])

const handleClick= (budgetId)=>{
  console.log("CLICKED ",budgetId);
  navigate(`/budget/${budgetId}`);
}



  return (
    <div className='budget-page'>
    <h1>Budget listing</h1>
    { budget.map((bud)=>(
      <div 
      className="budget-card" key ={bud._id} 
      onClick={()=> 
      {  console.log("FULL BUDGET:", bud);
      console.log("BUDGET ID:", bud._id);
      console.log("ID TYPE:", typeof bud._id);

        handleClick(bud._id)}}>

        {""}
         <h2>Category: {bud.category.category}</h2>
        <p>Amount: ₹{bud.amount}</p>
        <p>Month: {bud.month}</p>
        <p>CreatedAt: {bud.category.createdAt}</p>
       
      </div>
    )
  )}
    </div>
  )
}

export default Buget
