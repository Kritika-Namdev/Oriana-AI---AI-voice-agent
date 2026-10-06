import express from "express"
import dotenv from "dotenv"
import connectDB from "./Configs/ConnectDB.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser"

dotenv.config()
import cors from "cors"
import userRouter from "./Routes/user.route.js";
import assistantRouter from "./Routes/assistant.route.js";
import billingRouter from "./Routes/billing.route.js";


const app = express();
const privateCors = cors({
    origin: ["http://localhost:5173"],
    credentials: true,
});

const publicCors = cors({
    origin: "*",
});

app.use(express.json())  // json ka data access hoga
app.use(cookieParser())  // cookie will parse correctly

app.get('/',(req,res)=>{
    console.log("hello there");
    res.send("Server is running");
})

app.use("/api/auth",privateCors, authRouter)
app.use("/api/user",privateCors, userRouter)
app.use("/api/billing",privateCors, billingRouter)

app.use("/api/assistant" ,publicCors, assistantRouter)


const PORT = process.env.PORT || 8000

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, ()=>{
            console.log(`listening to port ${PORT}`)
        })
    } catch (error) {
        console.error("Unable to start server. Check MONGODB_URL and try again.")
        process.exit(1)
    }
}

startServer()
