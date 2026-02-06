import { useState, useEffect, Fragment } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import type { Transaction } from "@/types/index.ts";
import { groupTransactionsByDate } from "@/utils/groupTransactions";
import { format, parseISO, isToday, isYesterday } from "date-fns";
import { formatCurrency } from "@/utils/currency";
import Card from "@/components/ui/card";
import clsx from "clsx";
import TransactionModal from "@/components/features/TransactionModal";
import { API_URL } from "@/config";

const TransactionSkeleton = () => {
    return (
        <div className="max-w-2xl mx-auto px-5 sm:px-0 py-4">
            <div className="flex flex-col justify-center items-center space-y-5">
                <div className="border-b-1 border-slate-200 p-2 w-full">
                    <div className="h-7 sm:h-8 bg-slate-200 rounded w-24 animate-pulse" />
                </div>
                <Card className="w-full shadow-none">
                    {[1, 2, 3].map((item, index) => (
                        <div
                            key={item}
                            className={clsx(
                                "flex justify-between items-center p-2 w-full",
                                index !== 2 && "border-b-1 border-slate-200",
                            )}>
                            <div className="space-y-2">
                                <div className="h-5 sm:h-6 bg-slate-200 rounded w-32 animate-pulse" />
                                <div className="h-3 sm:h-4 bg-slate-200 rounded w-48 animate-pulse" />
                            </div>
                            <div className="h-5 sm:h-6 bg-slate-200 rounded w-20 animate-pulse" />
                        </div>
                    ))}
                </Card>

                <div className="border-b-1 border-slate-200 p-2 w-full">
                    <div className="h-7 sm:h-8 bg-slate-200 rounded w-32 animate-pulse" />
                </div>
                <Card className="w-full shadow-none">
                    {[1, 2].map((item, index) => (
                        <div
                            key={item}
                            className={clsx(
                                "flex justify-between items-center p-2 w-full",
                                index !== 1 && "border-b-1 border-slate-200",
                            )}>
                            <div className="space-y-2">
                                <div className="h-5 sm:h-6 bg-slate-200 rounded w-28 animate-pulse" />
                                <div className="h-3 sm:h-4 bg-slate-200 rounded w-40 animate-pulse" />
                            </div>
                            <div className="h-5 sm:h-6 bg-slate-200 rounded w-20 animate-pulse" />
                        </div>
                    ))}
                </Card>
            </div>
        </div>
    );
};

const TransactionOverview = ({
    refreshTrigger,
    onTransactionEdit,
}: {
    refreshTrigger: number;
    onTransactionEdit: () => void;
}) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] =
        useState<Transaction | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${API_URL}/api/transactions`);

                if (!response.ok) {
                    throw new Error(
                        `Error fetching transactions: ${response.status}`,
                    );
                }

                const data: Transaction[] = await response.json();

                setTransactions(data);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setIsInitialLoad(false);
            }
        };

        fetchTransactions();
    }, [refreshTrigger]);

    if (isInitialLoad) {
        return <TransactionSkeleton />;
    }

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

    const openEditModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (transaction: Transaction) => {
        try {
            const response = await fetch(
                `${API_URL}/api/transactions/${transaction.id}`,
                {
                    method: "DELETE",
                },
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to delete transaction: ${response.status}`,
                );
            }

            onTransactionEdit();
        } catch (error) {
            console.error(`Error deleting transaction: ${error}`);
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
                                                        "border-b-1 border-slate-200",
                                                )}>
                                                <div>
                                                    <h5
                                                        className={clsx(
                                                            "font-semibold sm:text-lg",
                                                            transaction.type ===
                                                                "INCOME"
                                                                ? "text-green-700"
                                                                : "text-slate-700",
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
                                                <div className="flex justify-center items-center">
                                                    {transaction.type ===
                                                    "INCOME" ? (
                                                        <h5 className="font-semibold sm:text-lg text-green-700">
                                                            +
                                                            {formatCurrency(
                                                                transaction.amount,
                                                            )}
                                                        </h5>
                                                    ) : (
                                                        <h5 className="font-semibold sm:text-lg text-slate-700">
                                                            {formatCurrency(
                                                                transaction.amount,
                                                            )}
                                                        </h5>
                                                    )}
                                                    <Menu
                                                        as="div"
                                                        className="relative ">
                                                        <MenuButton className="text-slate-700 hover:text-slate-900 p-1">
                                                            <EllipsisVerticalIcon className="size-5" />
                                                        </MenuButton>
                                                        <MenuItems
                                                            transition
                                                            className="absolute origin-top-right top-full right-2 z-50 rounded-md w-48 outline -outline-offset-1 outline-slate-200 shadow-lg transition duration-200 ease-out data-closed:opacity-0 data-closed:scale-95">
                                                            <MenuItem
                                                                as="button"
                                                                onClick={() =>
                                                                    openEditModal(
                                                                        transaction,
                                                                    )
                                                                }
                                                                className="block w-full text-start rounded-md p-3 text-sm text-slate-600 bg-white data-focus:text-indigo-700 data-focus:bg-indigo-50">
                                                                Edit
                                                            </MenuItem>
                                                            <MenuItem
                                                                as="button"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        transaction,
                                                                    )
                                                                }
                                                                className="block w-full text-start rounded-md p-3 text-sm text-slate-600 bg-white data-focus:text-indigo-700 data-focus:bg-indigo-50">
                                                                Delete
                                                            </MenuItem>
                                                        </MenuItems>
                                                    </Menu>
                                                </div>
                                            </div>
                                        ),
                                    )}
                                </Card>
                            </Fragment>
                        ),
                    )}
                </div>
            </div>

            <TransactionModal
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false);
                    setSelectedTransaction(null);
                }}
                onTransactionAdded={onTransactionEdit}
                editTransaction={selectedTransaction}
            />
        </>
    );
};

export default TransactionOverview;
