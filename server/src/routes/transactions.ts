import { Router } from "express";
import prisma from "../prisma";
import { Prisma, TransactionType } from "@prisma/client";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const transactions = await prisma.transaction.findMany({
            orderBy: {
                date: "desc",
            },
            include: {
                category: true,
            },
        });

        res.status(200).json(transactions);
    } catch (error) {
        next(error);
    }
});

router.get("/recent", async (req, res, next) => {
    try {
        const recentTransactions = await prisma.transaction.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            },
            include: {
                category: true,
            },
        });

        const preciseRecentTransactions = recentTransactions.map((t) => {
            return {
                ...t,
                amount: t.amount.toFixed(2),
            };
        });

        res.status(200).json(preciseRecentTransactions);
    } catch (error) {
        next(error);
    }
});

router.get("/balance", async (req, res, next) => {
    try {
        const transactions = await prisma.transaction.findMany({
            select: {
                amount: true,
                type: true,
            },
        });

        const income = transactions
            .filter((t) => t.type === "INCOME")
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const expense = transactions
            .filter((t) => t.type === "EXPENSE")
            .reduce((sum, t) => sum + Number(t.amount), 0);
        const balance = income - expense;

        const balanceData = {
            totalIncome: Math.round(income * 100) / 100,
            totalExpense: Math.round(expense * 100) / 100,
            currentBalance: Math.round(balance * 100) / 100,
            transactionCount: transactions.length,
        };

        res.status(200).json(balanceData);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { amount, type, categoryId, description } = req.body;
        if (!amount || amount <= 0) {
            return res.status(400).json({ error: "Amount must be positive" });
        }

        if (!type) {
            return res.status(400).json({ error: "Type is required" });
        }

        if (!categoryId) {
            return res.status(400).json({ error: "Category is required" });
        }

        const newTransaction = await prisma.transaction.create({
            data: {
                amount: parseFloat(amount),
                type,
                categoryId: Number(categoryId),
                description: description || "",
            },
        });

        res.status(201).json(newTransaction);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid Id parameter" });
        }
        const { amount, type, categoryId, description } = req.body;
        const updatedData: any = {};

        if (amount !== undefined) {
            if (amount <= 0) {
                return res
                    .status(400)
                    .json({ error: "Amount must be positive" });
            }
            updatedData.amount = parseFloat(amount);
        }
        if (type !== undefined) {
            if (!Object.values(TransactionType).includes(type)) {
                return res.status(400).json({
                    error: `Type must be one of ${Object.values(
                        TransactionType
                    ).join(", ")}`,
                });
            }
            updatedData.type = type;
        }
        if (categoryId !== undefined) {
            updatedData.categoryId = Number(categoryId);
        }
        if (description !== undefined) {
            updatedData.description = description;
        }

        if (Object.keys(updatedData).length === 0) {
            return res
                .status(400)
                .json({ error: "No information provided for update" });
        }

        const updatedExpense = await prisma.transaction.update({
            where: {
                id,
            },
            data: updatedData,
        });
        res.status(200).json(updatedExpense);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return res.status(404).json({ error: "Transaction not found" });
            }
            if (error.code === "P2003") {
                return res.status(400).json({ error: "Invalid category ID" });
            }
        }
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid Id parameter" });
        }

        await prisma.transaction.delete({
            where: { id },
        });

        res.sendStatus(204);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return res.status(404).json({ error: "Transaction not found" });
            }
        }
        next(error);
    }
});

export default router;
