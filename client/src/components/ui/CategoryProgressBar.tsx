import type { CategoryProgressBarsProps } from "@/types/index.ts";
import { formatCurrency } from "@/utils/currency";

const ProgressBar = ({ category }: CategoryProgressBarsProps) => {
    const { name, expense, budgetRemaining, budgetPercentUsed } = category;

    const getBudgetColour = (percentUsed: number | null | undefined) => {
        const percent = percentUsed ?? 0;

        if (percent >= 90) return "bg-red-500";
        if (percent >= 70) return "bg-orange-500";
        if (percent >= 30) return "bg-yellow-500";

        return "bg-green-500";
    };

    return (
        <div className="w-full">
            <div className="flex flex-row items-center justify-between p-1">
                <span className="text-xs font-semibold">{name}</span>
                <span className="text-xs font-semibold">{`${formatCurrency(
                    expense
                )}/${budgetRemaining}`}</span>
                <span className="text-xs font-semibold">
                    {budgetPercentUsed}%
                </span>
            </div>
            <div className="w-full rounded-full h-3 bg-gray-800/20">
                <div
                    className={`rounded-full w-[${budgetPercentUsed}%] ${getBudgetColour(
                        budgetPercentUsed
                    )} h-3`}></div>
            </div>
        </div>
    );
};

export default ProgressBar;
