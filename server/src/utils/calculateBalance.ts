import type {
    TransactionData,
    BalanceSummary,
} from "../types/transactionTypes.ts";

export function calculateBalance(
    transactions: TransactionData[],
): BalanceSummary {
    const income = transactions
        .filter((t) => t.type === "INCOME")
        .reduce((sum, t) => sum + Number(t.amount), 0);
    const expense = transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce((sum, t) => sum + Number(t.amount), 0);
    const balance = income - expense;
    const transactionCount = transactions.length;

    const balanceData = {
        totalIncome: Math.round(income * 100) / 100,
        totalExpense: Math.round(expense * 100) / 100,
        currentBalance: Math.round(balance * 100) / 100,
        transactionCount,
    };

    return balanceData;
}
