export type TransactionUpdateData = {
    amount?: number;
    type?: "EXPENSE" | "INCOME";
    categoryId?: number;
    description?: string;
};
