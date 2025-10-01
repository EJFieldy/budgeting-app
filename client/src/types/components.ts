export interface NavigationItem {
    name: string;
    href: string;
}

export interface Profile {
    income: number;
    monthlyBudget: number;
    balance: number;
}

export interface Expense {
    id: number;
    amount: number;
    category: string;
    description: string;
}
