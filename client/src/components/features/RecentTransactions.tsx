import { useState, useEffect } from "react";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/solid";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
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

    return (
        <>
            <div className="max-w-4xl px-5 lg:px-0 mx-auto">
                <div className="sm:hidden flex flex-col items-center justify-center gap-y-1">
                    <div className="mb-1">
                        <h1 className="text-lg font-semibold text-slate-900 tracking-tight">
                            Recent Transactions
                        </h1>
                    </div>
                    {newExpenses.map((item) => {
                        const timeAgo = formatDistanceToNow(
                            new Date(item.date),
                            { addSuffix: true }
                        );
                        return (
                            <Card
                                key={item.id}
                                className="py-2 px-5 !bg-red-50 w-full">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col justify-center items-start">
                                        <div className="flex flex-row justify-center items-center">
                                            <ArrowUpOnSquareIcon className="size-5 text-red-700 mr-2 mb-1 -ml-1" />
                                            <h5 className="text-sm text-red-700 font-semibold">
                                                {item.description}
                                            </h5>
                                        </div>
                                        <h5 className="text-gray-500 text-xs">
                                            {timeAgo}
                                        </h5>
                                    </div>
                                    <div>
                                        <h2 className="text-md text-red-700 font-semibold tracking-tight">
                                            -£{item.amount}
                                        </h2>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default RecentTransactions;
