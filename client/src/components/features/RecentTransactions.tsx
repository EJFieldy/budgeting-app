import { useState, useEffect } from "react";
import {
    ArrowUpOnSquareIcon,
    ArrowDownOnSquareIcon,
} from "@heroicons/react/24/solid";
import { formatDistanceToNow } from "date-fns";
import { formatCurrency } from "@/utils/currency";
import Card from "@/components/ui/card";
import type { Transaction } from "@/types/components";
import { API_URL } from "@/config";

const RecentTransactions = ({
    showTitle = true,
    refreshTrigger,
}: {
    showTitle: boolean;
    refreshTrigger: number;
}) => {
    const [recent, setRecent] = useState<Transaction[]>([]);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const fetchRecentTransactions = async () => {
            try {
                const recentResponse = await fetch(
                    `${API_URL}/api/transactions/recent`,
                );

                if (!recentResponse.ok) {
                    throw new Error(
                        `Failed to fetch expenses: ${recentResponse.status}`,
                    );
                }

                const recentData: Transaction[] = await recentResponse.json();
                setRecent(recentData);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setIsInitialLoad(false);
            }
        };

        fetchRecentTransactions();
    }, [refreshTrigger]);

    return (
        <>
            {isInitialLoad ? (
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
                        <div className="mb-5 border-b-1 border-slate-200 p-2 w-full">
                            <h1 className="text-xl text-center font-semibold text-slate-900">
                                Recent Transactions
                            </h1>
                        </div>
                    )}
                    {recent.map((item) => {
                        const timeAgo = formatDistanceToNow(
                            new Date(item.date),
                            { addSuffix: true },
                        );
                        return (
                            <Card key={item.id} className="py-2 px-5 w-full">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col justify-center items-start">
                                        <div className="flex flex-row justify-center items-center">
                                            {item.type === "EXPENSE" ? (
                                                <>
                                                    <ArrowUpOnSquareIcon className="size-6 text-indigo-700 mr-2 mb-1 -ml-1" />
                                                    <h5 className="text-base text-slate-900 font-medium">
                                                        {item.category.name}
                                                    </h5>
                                                </>
                                            ) : (
                                                <>
                                                    <ArrowDownOnSquareIcon className="size-6 text-indigo-700 mr-2 mb-1 -ml-1" />
                                                    <h5 className="text-base text-slate-900 font-medium">
                                                        {item.category.name}
                                                    </h5>
                                                </>
                                            )}
                                        </div>
                                        <h5 className="text-gray-500 text-xs md:text-sm">
                                            {timeAgo}
                                        </h5>
                                    </div>
                                    <div>
                                        {item.type === "EXPENSE" ? (
                                            <h2 className="text-lg text-slate-900 font-medium tracking-tight">
                                                {formatCurrency(item.amount)}
                                            </h2>
                                        ) : (
                                            <h2 className="text-lg text-green-700 font-medium tracking-tight">
                                                + {formatCurrency(item.amount)}
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
