import { useState, useEffect } from "react";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Card from "@/components/ui/card";
import type { Expense } from "@/types/components";

const RecentTransactions = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [expLoading, setExpLoading] = useState(false);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                setExpLoading(true);
                const expenseResponse = await fetch(
                    "http://localhost:3000/api/expenses/"
                );

                if (!expenseResponse.ok) {
                    throw new Error(
                        `Failed to fetch expenses: ${expenseResponse.status}`
                    );
                }

                const expenseData: Expense[] = await expenseResponse.json();
                setExpenses(expenseData);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setExpLoading(false);
            }
        };

        fetchExpenses();
    }, []);
};
