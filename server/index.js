const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let expenses = [];
let nextId = 1;

app.get("/api/expenses", (req, res) => {
    res.json(expenses);
});

app.post("/api/expenses", (req, res) => {
    const newExpense = {
        id: nextId++,
        ...req.body,
    };

    expenses.push(newExpense);
    res.status(201).json(newExpense);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
