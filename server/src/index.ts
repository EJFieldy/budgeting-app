import express from "express";
import cors from "cors";
import "dotenv/config";
import transactionRoutes from "../src/routes/transactions";
import categoryRoutes from "../src/routes/categories";
const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
