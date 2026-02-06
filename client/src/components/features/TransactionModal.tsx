import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import type { TransactionType, Transaction } from "@/types/index.ts";
import { API_URL } from "@/config";

const TransactionModal = ({
    onTransactionAdded,
    isOpen,
    onClose,
    editTransaction = null,
}: {
    onTransactionAdded: () => void;
    isOpen: boolean;
    onClose: () => void;
    editTransaction?: Transaction | null;
}) => {
    const [waiting, setWaiting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [categories, setCategories] = useState<Record<string, number>[]>([]);

    const [amount, setAmount] = useState("");
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setSubmitted(false);
            setWaiting(false);
            setIsEditMode(!!editTransaction);

            fetchCategories();

            if (editTransaction) {
                setAmount(editTransaction.amount.toString());
                setType(editTransaction.type);
                setCategoryId(editTransaction.categoryId.toString());
                setDescription(editTransaction.description || "");
            } else {
                setAmount("");
                setType("EXPENSE");
                setCategoryId("");
                setDescription("");
            }
        }
    }, [isOpen, editTransaction]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/api/categories/`);
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error(`Failed to fetch categories: ${error}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setWaiting(true);

        try {
            const transactionData = {
                amount: parseFloat(amount),
                type,
                categoryId: Number(categoryId),
                description: description,
            };

            const url = editTransaction
                ? `${API_URL}/api/transactions/${editTransaction.id}`
                : `${API_URL}/api/transactions/`;

            const method = editTransaction ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transactionData),
            });

            if (!response.ok) throw new Error("Failed to save transaction");

            if (editTransaction) {
                onClose();
            } else {
                setSubmitted(true);
            }
            onTransactionAdded();
        } catch (error) {
            console.error(error);
        } finally {
            setWaiting(false);
        }
    };

    const title = isEditMode ? "Edit Transaction" : "Add Transaction";
    const submitText = isEditMode ? "Update" : "Add Transaction";

    const handleAddAnother = () => {
        setSubmitted(false);
        setAmount("");
        setType("EXPENSE");
        setCategoryId("");
        setDescription("");
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/30 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
                />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="max-w-lg space-y-4 rounded-lg outline -outline-offset-1 outline-indigo-700 shadow-xl bg-white px-10 pt-6 pb-8 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                        {!submitted ? (
                            <>
                                <div className="mb-5">
                                    <DialogTitle className="font-bold text-2xl text-indigo-600">
                                        {title}
                                    </DialogTitle>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <label
                                        htmlFor="amount"
                                        className="block font-semibold text-slate-700 text-md mb-1 sm:mb-2">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        step="0.01"
                                        min="0.01"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(e.target.value)
                                        }
                                        className="block py-0.5 px-2 w-full bg-slate-50 rounded-lg border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        required
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-5 mt-3 sm:mt-5">
                                        <div>
                                            <label
                                                htmlFor="type"
                                                className="block font-semibold text-slate-700 text-md mb-1 sm:mb-2">
                                                Type
                                            </label>
                                            <select
                                                id="type"
                                                value={type}
                                                onChange={(e) =>
                                                    setType(
                                                        e.target
                                                            .value as TransactionType,
                                                    )
                                                }
                                                className="block w-full py-0.5 px-2 bg-slate-50 rounded-lg border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                                required>
                                                <option value="EXPENSE">
                                                    Expense
                                                </option>
                                                <option value="INCOME">
                                                    Income
                                                </option>
                                            </select>
                                        </div>
                                        <div>
                                            <label
                                                htmlFor="category"
                                                className="block font-semibold text-slate-700 text-md mb-1 sm:mb-2">
                                                Category
                                            </label>
                                            <select
                                                id="category"
                                                value={categoryId}
                                                onChange={(e) =>
                                                    setCategoryId(
                                                        e.target.value,
                                                    )
                                                }
                                                className="block w-full py-0.5 px-2 bg-slate-50 rounded-lg border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                                required>
                                                <option value="">
                                                    Select a Category
                                                </option>
                                                {categories.map((c) => (
                                                    <option
                                                        key={c.id}
                                                        value={c.id}>
                                                        {c.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <label
                                        htmlFor="description"
                                        className="block font-semibold text-md text-slate-700 mb-1 sm:mb-2 mt-3 sm:mt-5">
                                        Description{" "}
                                        <span className="text-slate-500 text-sm">
                                            (optional)
                                        </span>
                                    </label>
                                    <textarea
                                        id="description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className="block w-full py-0.5 px-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                                        placeholder="Add a note..."
                                        rows={3}></textarea>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-3 sm:gap-x-4 mt-5">
                                        <button
                                            type="submit"
                                            disabled={waiting}
                                            className="px-2 py-2 w-full bg-indigo-600 text-white text-md font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            {submitText}
                                        </button>
                                        <button
                                            onClick={onClose}
                                            type="button"
                                            disabled={waiting}
                                            className="px-4 py-2 w-full bg-white border border-slate-300 text-slate-700 text-md font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="mb-5 rounded-full bg-green-100 flex items-center justify-center size-12">
                                        <CheckIcon className="text-green-600 size-6" />
                                    </div>
                                    <div className="mb-5">
                                        <DialogTitle className="font-bold text-2xl text-indigo-600">
                                            Success!
                                        </DialogTitle>
                                    </div>
                                    {submitted && !editTransaction && (
                                        <div className="mb-5">
                                            <Description className="text-sm text-slate-700 text-center">
                                                Your transaction has been
                                                successfully added. You may add
                                                another transaction or return to
                                                the dashboard.
                                            </Description>
                                        </div>
                                    )}
                                </div>
                                {!editTransaction && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-3 sm:gap-x-5">
                                        <button
                                            onClick={handleAddAnother}
                                            className="px-2 py-2 w-full bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            Add Another
                                        </button>
                                        <button
                                            onClick={onClose}
                                            className="px-4 py-2 w-full bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                            Home
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default TransactionModal;
