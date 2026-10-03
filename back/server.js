// bhWGrvfyCT2q27nS
// muskansahu2608_db_user
import cors from "cors"
import app from "./app.js"
import { db } from "./config/db.js";
//db call
db();
app.listen(process.env.PORT,()=>{
    console.log(`local host running at port ${process.env.PORT}`)
    
    
})
