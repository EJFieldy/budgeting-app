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

export type TransactionPostData = {
    amount: number;
    type: "INCOME" | "EXPENSE";
    categoryId: number;
};

export type PostValidationResponse =
    | { pass: true }
    | { pass: false; error: string };
