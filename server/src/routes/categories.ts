import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: "asc",
            },
        });

        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
});

router.get("/summary", async (req, res, next) => {
    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        );
        const categories = await prisma.category.findMany({
            include: {
                transactions: {
                    where: {
                        date: {
                            gte: startOfMonth,
                            lt: startOfNextMonth,
                        },
                    },
                },
            },
        });

        const categoriesWithTotals = categories.map((category) => {
            const income = category.transactions.filter(
                (t) => t.type === "INCOME"
            );
            const totalIncome = income.reduce(
                (sum, t) => sum + Number(t.amount),
                0
            );

            const expense = category.transactions.filter(
                (t) => t.type === "EXPENSE"
            );
            const totalExpense = expense.reduce(
                (sum, t) => sum + Number(t.amount),
                0
            );

            const budget =
                category.monthlyBudget !== null
                    ? Number(category.monthlyBudget)
                    : null;

            const remaining = budget !== null ? budget - totalExpense : null;
            const percentUsed =
                budget !== null
                    ? Math.round((totalExpense / budget) * 100)
                    : null;
            return {
                id: category.id,
                name: category.name,
                totalIncome,
                totalExpense,
                netTotal: totalIncome - totalExpense,
                transactionCount: category.transactions.length,
                monthlyBudget: budget,
                budgetRemaining: remaining,
                budgetPercentUsed: percentUsed,
                overBudget: budget !== null ? totalExpense > budget : false,
            };
        });

        res.status(200).json(categoriesWithTotals);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const name = req.body.name?.trim();
        const monthlyBudget = req.body.monthlyBudget;

        if (!name) {
            return res.status(400).json({ error: "Name of category required" });
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                ...(monthlyBudget !== undefined && {
                    monthlyBudget: parseFloat(monthlyBudget),
                }),
            },
        });

        res.status(201).json(newCategory);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res
                    .status(400)
                    .json({ error: "Unique category name already exists" });
            }
        }

        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ error: "Invalid Id parameter" });
        }

        const name = req.body.name?.trim();

        if (!name) {
            return res.status(400).json({ error: "Name of category required" });
        }

        const monthlyBudget = req.body.monthlyBudget;

        const updatedCategory = await prisma.category.update({
            where: {
                id,
            },
            data: {
                name,
                ...(monthlyBudget !== undefined && {
                    monthlyBudget: parseFloat(monthlyBudget),
                }),
            },
        });

        res.status(200).json(updatedCategory);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return res
                    .status(400)
                    .json({ error: "Unique category name already exists" });
            }

            if (error.code === "P2025") {
                return res.status(404).json({ error: "Category not found" });
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

        await prisma.category.delete({
            where: {
                id,
            },
        });

        res.sendStatus(204);
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return res.status(404).json({ error: "Category not found" });
            }

            if (error.code === "P2003") {
                return res.status(400).json({
                    error: "Cannot delete category with existing transactions",
                    suggestion:
                        "Reassign transactions to other categories before deletion",
                });
            }
        }
        next(error);
    }
});

export default router;
