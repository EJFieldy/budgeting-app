export type TransactionUpdateData = {
    amount?: number;
    type?: "EXPENSE" | "INCOME";
    categoryId?: number;
    description?: string;
};

export type TransactionData = {
    amount: number;
    type: "INCOME" | "EXPENSE";
};

export type BalanceSummary = {
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
    transactionCount: number;
};
