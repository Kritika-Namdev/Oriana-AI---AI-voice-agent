import express from "express";
import dotenv from "dotenv";
import connectDB from "./Configs/ConnectDB.js";
import authRouter from "./Routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./Routes/user.route.js";
import assistantRouter from "./Routes/assistant.route.js";
import billingRouter from "./Routes/billing.route.js";

dotenv.config();

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://oriana-ai.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/billing", billingRouter);
app.use("/api/assistant", assistantRouter);

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`listening to port ${PORT}`);
        });
    } catch (error) {
        console.error("Unable to start server.");
        process.exit(1);
    }
};

startServer();
