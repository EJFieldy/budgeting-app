import { Router } from "express";
import prisma from "../prisma.js";

const router = Router();

router.get("/", async (req, res) => {
    const transactions = await prisma.transaction.findMany();

    res.json(transactions);
});

router.post("/", async (req, res, next) => {
    try {
        const { amount, type, category, description } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Amount must be positive" });
        }

        if (!type) {
            return res.status(400).json({ error: "Type is required" });
        }

        if (!category) {
            return res.status(400).json({ error: "Category is required" });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                type,
                category,
                description: description || "",
            },
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
});

export default router;
