import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./utils/dbconnect";
import authRoutes from "./routes/auth";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
