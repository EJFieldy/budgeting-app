import { useState, useEffect } from "react";
import type { CategoryProgressBarsProps } from "@/types/index.ts";
import { formatCurrency } from "@/utils/currency";

const ProgressBar = ({ category }: CategoryProgressBarsProps) => {
    const [width, setWidth] = useState(0);
    const { name, expense, monthlyBudget, budgetPercentUsed } = category;

    useEffect(() => {
        requestAnimationFrame(() => {
            setWidth(budgetPercentUsed ?? 0);
        });
    }, [budgetPercentUsed]);

    const getBudgetColour = (percentUsed: number | null | undefined) => {
        const percent = percentUsed ?? 0;

        if (percent >= 90) return "bg-red-500";
        if (percent >= 70) return "bg-orange-500";
        if (percent >= 30) return "bg-yellow-500";

        return "bg-green-500";
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-3 items-center p-1">
                <span className="text-xs font-semibold">{name}</span>
                <span className="text-xs font-semibold text-center">
                    {budgetPercentUsed}%
                </span>
                <span className="text-xs font-semibold text-right">{`${formatCurrency(
                    monthlyBudget
                )}`}</span>
            </div>
            <div className="w-full rounded-full h-3 bg-gray-800/20">
                <div
                    style={{ width: `${width}%` }}
                    className={`rounded-full ${getBudgetColour(
                        budgetPercentUsed
                    )} h-3 transition-all duration-1500 ease-in-out`}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
