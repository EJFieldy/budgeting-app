export interface NavigationItem {
    name: string;
    href: string;
}

export interface Transaction {
    id: number;
    type: string;
    amount: number;
    categoryId: number;
    description: string;
    date: string;
    category: {
        id: number;
        name: string;
        monthlyBudget: number | null;
    };
}

export interface TransactionTotals {
    categories: Array<{
        id: number;
        name: string;
        income: number;
        expense: number;
        netTotal: number;
        transactionCount: number;
        monthlyBudget?: number | null;
        budgetRemaining?: number | null;
        budgetPercentUsed?: number | null;
        overBudget?: boolean | null;
        color?: string;
    }>;
    monthly: {
        income: number;
        expense: number;
        budgetRemaining: number | null;
    };
}

export interface HeaderData {
    balance: {
        totalIncome: number;
        totalExpense: number;
        currentBalance: number;
        transactionCount: number;
    };
    summary: TransactionTotals;
    recent: Transaction[];
}
