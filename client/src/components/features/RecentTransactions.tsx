import { useState, useEffect } from "react";
import {
    ArrowUpOnSquareIcon,
    ArrowDownOnSquareIcon,
} from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import Card from "@/components/ui/card";
import type { Transaction } from "@/types/components";

const RecentTransactions = ({ showTitle = true }) => {
    const [recent, setRecent] = useState<Transaction[]>([]);
    const [expLoading, setExpLoading] = useState(false);

    useEffect(() => {
        const fetchRecentTransactions = async () => {
            try {
                setExpLoading(true);
                const recentResponse = await fetch(
                    "http://localhost:3000/api/transactions/recent"
                );

                if (!recentResponse.ok) {
                    throw new Error(
                        `Failed to fetch expenses: ${recentResponse.status}`
                    );
                }

                const recentData: Transaction[] = await recentResponse.json();
                setRecent(recentData);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setExpLoading(false);
            }
        };

        fetchRecentTransactions();
    }, []);

    return (
        <>
            {expLoading ? (
                <>
                    {showTitle && (
                        <div className="mb-1">
                            <div className="h-7 w-40 opacity-0"></div>
                        </div>
                    )}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="py-2 px-5 bg-white w-full rounded-lg border border-gray-200 shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col justify-center items-start gap-2">
                                    <div className="flex flex-row items-center">
                                        <div className="size-5 bg-slate-200 rounded mr-2 mb-1 -ml-1 animate-pulse" />
                                        <div className="h-4 w-24 bg-slate-200 rounded animate-pulse" />
                                    </div>
                                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                                </div>
                                <div>
                                    <div className="h-5 w-12 bg-slate-200 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {showTitle && (
                        <div className="mb-1">
                            <h1 className="text-lg text-center font-semibold text-slate-900 tracking-tight">
                                Recent Transactions
                            </h1>
                        </div>
                    )}
                    {recent.map((item) => {
                        const timeAgo = formatDistanceToNow(
                            new Date(item.date),
                            { addSuffix: true }
                        );
                        return (
                            <Card
                                key={item.id}
                                className={`py-2 px-5 w-full ${
                                    item.type === "EXPENSE"
                                        ? "!bg-red-50"
                                        : "!bg-green-50"
                                }`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col justify-center items-start">
                                        <div className="flex flex-row justify-center items-center">
                                            {item.type === "EXPENSE" ? (
                                                <>
                                                    <ArrowUpOnSquareIcon className="size-5 text-red-700 mr-2 mb-1 -ml-1" />
                                                    <h5 className="text-sm text-red-700 font-semibold">
                                                        {item.category.name}
                                                    </h5>
                                                </>
                                            ) : (
                                                <>
                                                    <ArrowDownOnSquareIcon className="size-5 text-green-700 mr-2 mb-1 -ml-1" />
                                                    <h5 className="text-sm text-green-700 font-semibold">
                                                        {item.category.name}
                                                    </h5>
                                                </>
                                            )}
                                        </div>
                                        <h5 className="text-gray-500 text-xs">
                                            {timeAgo}
                                        </h5>
                                    </div>
                                    <div>
                                        {item.type === "EXPENSE" ? (
                                            <h2 className="text-md text-red-700 font-semibold tracking-tight">
                                                -£{item.amount}
                                            </h2>
                                        ) : (
                                            <h2 className="text-md text-green-700 font-semibold tracking-tight">
                                                +£{item.amount}
                                            </h2>
                                        )}
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </>
            )}
        </>
    );
};

export default RecentTransactions;
