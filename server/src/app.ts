import express from "express";
import cors from "cors";
import "dotenv/config";
import transactionRoutes from "../src/routes/transactions";
import categoryRoutes from "../src/routes/categories";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

export default app;

