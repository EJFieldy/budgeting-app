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

export interface CategoryData {
    name: string;
    value: number;
    count: number;
    color?: string;
    [key: string]: any;
}

export interface HeaderData {
    balance: {
        totalIncome: number;
        totalExpense: number;
        currentBalance: number;
        transactionCount: number;
    };
    summary: {
        categories: Array<{
            id: number;
            name: string;
            totalIncome: number;
            totalExpense: number;
            netTotal: number;
            transactionCount: number;
            monthlyBudget: number | null;
            budgetRemaining: number | null;
            budgetPercentUsed: number | null;
            overBudget: boolean;
        }>;
        monthly: {
            income: number;
            expense: number;
            budgetRemaining: number | null;
        };
    };
    recent: Transaction[];
}
