import express from "express";
import cors from "cors";
import transactionRoutes from "../src/routes/transactions";
import categoryRoutes from "../src/routes/categories";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
