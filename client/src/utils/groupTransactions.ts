import type { Transaction } from "@/types/index.ts";
import { format, parseISO, compareDesc } from "date-fns";

export const groupTransactionsByDate = (transactions: Transaction[]) => {
    const sorted = [...transactions].sort((a, b) =>
        compareDesc(parseISO(a.date), parseISO(b.date))
    );

    const grouped = sorted.reduce((acc, transaction) => {
        const dateKey = format(parseISO(transaction.date), "yyyy-MM-dd");

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }

        acc[dateKey].push(transaction);
        return acc;
    }, {} as Record<string, Transaction[]>);

    return grouped;
};
