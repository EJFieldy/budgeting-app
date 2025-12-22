import { useState, useEffect, Fragment } from "react";
import type { Transaction } from "@/types/index.ts";
import { groupTransactionsByDate } from "@/utils/groupTransactions";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { formatCurrency } from "@/utils/currency";
import Card from "@/components/ui/card";
import clsx from "clsx";

const TransactionOverview = ({
    refreshTrigger,
}: {
    refreshTrigger: number;
}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3000/api/transactions"
                );

                if (!response.ok) {
                    throw new Error(
                        `Error fetching transactions: ${response.status}`
                    );
                }

                const data: Transaction[] = await response.json();

                setTransactions(data);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [refreshTrigger]);

    const groupedTransactions = groupTransactionsByDate(transactions);

    const dateHeader = (dateString: string): string => {
        const date = parseISO(dateString);

        if (isToday(date)) {
            return "Today";
        } else if (isYesterday(date)) {
            return "Yesterday";
        } else {
            return format(date, "EEEE, d MMMM");
        }
    };

    return (
        <>
            <div className="max-w-2xl mx-auto px-5 sm:px-0 py-4">
                <div className="flex flex-col justify-center items-center space-y-5">
                    {Object.entries(groupedTransactions).map(
                        ([date, transactionArray]) => (
                            <Fragment key={date}>
                                <div className="border-b-1 border-slate-200 p-2 w-full">
                                    <h3 className="font-semibold text-lg sm:text-xl text-slate-900">
                                        {dateHeader(date)}
                                    </h3>
                                </div>
                                <Card className="w-full shadow-none">
                                    {transactionArray.map(
                                        (transaction, index) => (
                                            <div
                                                key={transaction.id}
                                                className={clsx(
                                                    "flex justify-between items-center p-2 w-full",
                                                    index !==
                                                        +transactionArray.length -
                                                            1 &&
                                                        "border-b-1 border-slate-200"
                                                )}>
                                                <div>
                                                    <h5
                                                        className={clsx(
                                                            "font-semibold sm:text-lg",
                                                            transaction.type ===
                                                                "INCOME"
                                                                ? "text-green-700"
                                                                : "text-slate-700"
                                                        )}>
                                                        {
                                                            transaction.category
                                                                .name
                                                        }
                                                    </h5>
                                                    {transaction.description && (
                                                        <p className="text-xs sm:text-sm text-gray-500">
                                                            {
                                                                transaction.description
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                <div>
                                                    {transaction.type ===
                                                    "INCOME" ? (
                                                        <h5 className="font-semibold sm:text-lg text-green-700">
                                                            +
                                                            {formatCurrency(
                                                                transaction.amount
                                                            )}
                                                        </h5>
                                                    ) : (
                                                        <h5 className="font-semibold sm:text-lg text-slate-700">
                                                            {formatCurrency(
                                                                transaction.amount
                                                            )}
                                                        </h5>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </Card>
                            </Fragment>
                        )
                    )}
                </div>
            </div>
        </>
    );
};

export default TransactionOverview;
