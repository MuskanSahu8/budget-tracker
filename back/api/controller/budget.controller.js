import { Budget } from "../modal/budget.schema.js";
import { Purchase } from "../modal/purchase.schema.js";

export const createBudget = async (req, res, next) => {
  try {
    const { category, amount, month, year } = req.body;
    if (!category || !amount || !month || !year) {
      return res.status(400).json({
        message: "all fields are required"
      });
    }

    const isexistingBudget = await Budget.findOne({
      user: req.user._id,
      category: category,
      month: month,
      year: year,
    });
    if (isexistingBudget) {
      return res.status(400).json({
        message: "Budget already exists for this category and month"
      });
    }
    const budgetData = await Budget.create({
      user: req.user._id,
      category,
      amount,
      month,
      year,
    });
    return res.status(201).json({
      message: "Budget created successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

export const getBudgetById=async(req,res,next)=>{
  try{

    const {id} =req.params;
    console.log("ID REC",req.params._id)
     console.log("ID REC",typeof(req.params._id))

    const budgetData = await Budget.findOne({
      _id: id,
      user:req.user._id,
  }).populate([
    {
      path:"user",
      select:"-password",
    },{
       path:"category"
    }
  ])
  if(!budgetData){
    return res.status(404).json({
      message:"budget not found"
    })
  }
        console.log("FOUND BUD",budgetData);
     return res.status(200).json({
      message: "Budget get successfully",
      data: budgetData
    });
  }catch(error){
     return res.status(500).json({
      message: error.message
    });
  }
}
export const getBudget = async (req, res, next) => {
  try {
    const budgetData = await Budget.find({user:req.user._id}).populate([
      {
      path:"user",
      select:"-password",
    },
    {
      path:"category",
    },
  ]);
    if (budgetData.length === 0) {
      return res.status(404).json({
        message: "No budget found for this user"
      });
    }
    return res.status(200).json({
      message: "Budget get successfully",
      data: budgetData
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}
 export const  deleteBudget =async(req,res,next)=>{
  try{
     const budgetData= await Budget.findOneAndDelete({
       user:req.user._id,
      _id:req.params.id});

      if (!budgetData) {
  return res.status(404).json({
    message: "budget not found"
  });
}
//remove purchase belong to that budget
      await Purchase.deleteMany({ user: req.user._id, budget: budgetData._id });

      return res.status(200).json({
        message:"budget deleted successfully"
      })

  }catch(error){
    return res.status(500).json({
      message: error.message
    });
  }
}
export const updateBudget = async (req, res, next) => {
  try {
    const { category, amount, month, year } = req.body;

    if (!category || !amount || !month || !year) {
      return res.status(400).json({ message: "all fields are required" });
    }

    // block duplicates, ignoring this budget itself
    const duplicate = await Budget.findOne({
      user: req.user._id,
      category,
      month,
      year,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Budget already exists for this category and month",
      });
    }

    const updated = await Budget.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { category, amount, month, year },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "budget not found" });
    }

    return res.status(200).json({
      message: "Budget updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};