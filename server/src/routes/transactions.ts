import { Router } from "express";
import prisma from "../prisma";
import { TransactionType } from "@prisma/client";

const router = Router();

router.get("/", async (req, res) => {
    const transactions = await prisma.transaction.findMany({
        orderBy: {
            date: "asc",
        },
        include: {
            category: true,
        },
    });

    res.json(transactions);
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

        res.status(200).json(recentTransactions);
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
                id: Number(req.params.id),
            },
            data: updatedData,
        });
        res.status(200).json(updatedExpense);
    } catch (error) {
        next(error);
    }
});

// TODO: amend catch block to use specific prisma error codes
router.delete("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const deletedData = await prisma.transaction.delete({
            where: { id },
        });
        res.sendStatus(204);
    } catch (error: any) {
        if (error.code === "P2025") {
            return res.status(404).json({ error: "Transaction not found" });
        }
        next(error);
    }
});

export default router;
