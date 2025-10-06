import { useState, useEffect } from "react";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/solid";
import Card from "@/components/ui/card";
import type { Expense } from "@/types/components";

const RecentTransactions = () => {
    const [newExpenses, setNewExpenses] = useState<Expense[]>([]);
    const [expLoading, setExpLoading] = useState(false);

    useEffect(() => {
        const fetchNewExpenses = async () => {
            try {
                setExpLoading(true);
                const newExpenseResponse = await fetch(
                    "http://localhost:3000/api/expenses/recent?limit=5/"
                );

                if (!newExpenseResponse.ok) {
                    throw new Error(
                        `Failed to fetch expenses: ${newExpenseResponse.status}`
                    );
                }

                const newExpenseData: Expense[] =
                    await newExpenseResponse.json();
                setNewExpenses(newExpenseData);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setExpLoading(false);
            }
        };

        fetchNewExpenses();
    }, []);
};
