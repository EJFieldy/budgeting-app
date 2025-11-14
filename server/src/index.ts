import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

app.get("/api/test-db", async (req, res) => {
    try {
        await prisma.$connect();
        res.json({ message: "Database connected successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
