import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogBackdrop,
} from "@headlessui/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import type { Category, TransactionType } from "@/types/index.ts";

const AddExpenseModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const [amount, setAmount] = useState("");
    const [type, setType] = useState<TransactionType>("EXPENSE");
    const [categoryId, setCategoryId] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/categories/"
            );
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
            const expenseData = {
                amount: parseFloat(amount),
                type,
                categoryId: Number(categoryId),
                description: description || undefined,
            };

            const response = await fetch(
                "http://localhost:3000/api/transactions/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(expenseData),
                }
            );

            if (!response.ok) throw new Error("Failed to add transaction");

            setSubmitted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setWaiting(false);
        }
    };

    const handleAddAnother = () => {
        setSubmitted(false);
        setAmount("");
        setType("EXPENSE");
        setCategoryId("");
        setDescription("");
    };

    const handleClose = () => {
        setSubmitted(false);
        setAmount("");
        setType("EXPENSE");
        setCategoryId("");
        setDescription("");
        setIsOpen(false);
    };

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                <PlusCircleIcon className="bg-indigo-700 size-6" />
            </button>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
                        {!submitted ? (
                            <>
                                <DialogTitle className="font-bold">
                                    Add Transaction
                                </DialogTitle>
                                <form onSubmit={handleSubmit}>
                                    <label>
                                        Amount
                                        <input
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            value={amount}
                                            onChange={(e) =>
                                                setAmount(e.target.value)
                                            }
                                            required
                                        />
                                    </label>
                                    <label>
                                        Type
                                        <select
                                            value={type}
                                            onChange={(e) =>
                                                setType(
                                                    e.target
                                                        .value as TransactionType
                                                )
                                            }
                                            required>
                                            <option value="EXPENSE">
                                                Expense
                                            </option>
                                            <option value="INCOME">
                                                Income
                                            </option>
                                        </select>
                                    </label>
                                    <label>
                                        Category
                                        <select
                                            value={categoryId}
                                            onChange={(e) =>
                                                setCategoryId(e.target.value)
                                            }
                                            required>
                                            <option value="">
                                                Select a Category
                                            </option>
                                            {categories.map((c) => (
                                                <option key={c.id} value={c.id}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>
                                    <label>
                                        Description (optional)
                                        <textarea
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            placeholder="Add a note..."></textarea>
                                    </label>

                                    <button type="submit" disabled={waiting}>
                                        {waiting
                                            ? "Submitting..."
                                            : "Add Transaction"}
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <DialogTitle>Success!</DialogTitle>
                                <Description>
                                    Your transaction has been successfully added
                                </Description>
                                <div className="flex gap-4 mt-4">
                                    <button onClick={handleAddAnother}>
                                        Add Another
                                    </button>
                                    <button onClick={handleClose}>Done</button>
                                </div>
                            </>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default AddExpenseModal;
