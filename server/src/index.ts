import express from "express";
import cors from "cors";
import transactionRoutes from "../src/routes/transactions";
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
