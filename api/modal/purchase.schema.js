import mongoose from "mongoose";
const purchaseSchema=mongoose.Schema({
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Auth",
       required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    title:{
        type:String,
        trim:true,
    },
    budget:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Budget",
        required:true,
    },
    amount:{
        type:Number,
        min:0,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    note:{
        type:String,
        default:"",
        trim:true,
    },
    month:{
        type:Number,
        min:1,
        max:12,
    },
    year:{
        type:Number
    }
    
},
    {timeStamps:true});
const Purchase=mongoose.model("Purchase",purchaseSchema);
export {Purchase};