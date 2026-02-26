import { calculateBalance } from "./calculateBalance";
import type { TransactionData } from "../types/transactionTypes";

describe("calculateBalance function", () => {
    test("Calculates correct balance object", () => {
        const mockBalanceData: TransactionData[] = [
            {
                amount: 100,
                type: "INCOME",
            },
            {
                amount: 200,
                type: "INCOME",
            },
            {
                amount: 50,
                type: "EXPENSE",
            },
        ];

        expect(calculateBalance(mockBalanceData)).toEqual({
            totalIncome: 300,
            totalExpense: 50,
            currentBalance: 250,
            transactionCount: 3,
        });
    });

    test("Calculates with only income values", () => {
        const mockIncomeOnly: TransactionData[] = [
            {
                amount: 100,
                type: "INCOME",
            },
            {
                amount: 200,
                type: "INCOME",
            },
        ];

        expect(calculateBalance(mockIncomeOnly)).toEqual({
            totalIncome: 300,
            totalExpense: 0,
            currentBalance: 300,
            transactionCount: 2,
        });
    });

    test("Calculates with only expense values", () => {
        const mockExpenseOnly: TransactionData[] = [
            {
                amount: 50,
                type: "EXPENSE",
            },
            {
                amount: 100,
                type: "EXPENSE",
            },
        ];

        expect(calculateBalance(mockExpenseOnly)).toEqual({
            totalIncome: 0,
            totalExpense: 150,
            currentBalance: -150,
            transactionCount: 2,
        });
    });

    test("Returns object when given empty array", () => {
        const mockEmptyArray: TransactionData[] = [];

        expect(calculateBalance(mockEmptyArray)).toEqual({
            totalIncome: 0,
            totalExpense: 0,
            currentBalance: 0,
            transactionCount: 0,
        });
    });
});
