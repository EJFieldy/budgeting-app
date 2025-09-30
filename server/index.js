const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let expenses = [];
let nextId = 1;

app.get("/api/expenses", (req, res) => {
    res.json(expenses);
});

app.post("/api/expenses", (req, res, next) => {
    try {
        const { amount, category, description } = req.body;

        if (!amount || amount <= 0) {
            const error = new Error("Amount must be positive");
            error.status = 400;
            throw error;
        }

        if (!category) {
            const error = new Error("Category is required");
            error.status = 400;
            throw error;
        }

        const newExpense = {
            id: nextId++,
            amount: parseFloat(amount),
            category,
            description: description || "",
        };

        expenses.push(newExpense);
        res.status(201).json(newExpense);
    } catch (error) {
        next(error);
    }
});

app.delete("/api/expenses/:id/", (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const index = expenses.findIndex((item) => item.id === id);

        if (index === -1) {
            const error = new Error("Expense not found");
            error.status = 404;
            throw error;
        }

        expenses.splice(index, 1);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    const status = err.status || 500;
    const message = err.message;

    res.status(status).json({ error: message });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
