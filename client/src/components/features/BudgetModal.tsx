import { useState, useEffect } from "react";
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { API_URL } from "@/config";
import type { CategoryData } from "@/types";

const BudgetModal = ({
    isOpen,
    onClose,
    category,
    onEdit,
}: {
    isOpen: boolean;
    onClose: () => void;
    category: CategoryData;
    onEdit?: () => void;
}) => {
    const [amount, setAmount] = useState("");
    const [waiting, setWaiting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAmount(category.monthlyBudget?.toString() || "");
        }
    }, [isOpen, category.monthlyBudget]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setWaiting(true);

        try {
            const id = category.id;
            const monthlyBudget = parseFloat(amount);

            const updateData = {
                monthlyBudget,
            };

            if (isNaN(monthlyBudget) || monthlyBudget <= 0) {
                return new Error("Amount is required");
            }

            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateData),
            };

            const response = await fetch(
                `${API_URL}/api/categories/budgets/${id}`,
                requestOptions,
            );

            if (!response.ok) {
                throw new Error(
                    `Error submitting request! Status: ${response.status}`,
                );
            }

            onClose();

            if (onEdit) {
                onEdit();
            }
        } catch (error) {
            console.error(error, "Cannot submit update request");
        } finally {
            setWaiting(false);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 w-screen flex items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 bg-white rounded-lg shadow-xl outline -outline-offset-1 outline-indigo-700 p-12">
                        <DialogTitle className="font-bold text-2xl text-indigo-600">
                            Edit {category.name} Budget
                        </DialogTitle>
                        <form onSubmit={handleSubmit}>
                            <label
                                htmlFor="amount"
                                className="block font-semibold text-slate-700 text-md mb-1">
                                Amount
                            </label>
                            <input
                                id="amount"
                                type="number"
                                step="0.01"
                                min="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="block py-0.5 px-2 w-full bg-slate-50 rounded-lg border border-slate-200 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                required
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-items-center gap-3 sm:gap-x-4 mt-5">
                                <button
                                    type="submit"
                                    disabled={waiting}
                                    className="px-2 py-2 w-full bg-indigo-600 text-white text-md font-medium rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                    {waiting ? "Editing..." : "Edit"}
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={waiting}
                                    className="px-4 py-2 w-full bg-white border border-slate-300 text-slate-700 text-md font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default BudgetModal;
