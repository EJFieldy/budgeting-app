import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";
import { useState, useEffect } from "react";
import type { Category } from "@/types/index.ts";

const AddExpenseModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const [amount, setAmount] = useState("");
    const [type, setType] = useState<"expense" | "income">("expense");
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
};

export default AddExpenseModal;
