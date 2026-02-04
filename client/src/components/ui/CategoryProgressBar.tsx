import { useState, useEffect } from "react";
import type { CategoryData } from "@/types/index.ts";
import { formatCurrency } from "@/utils/currency";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import BudgetModal from "@/components/features/BudgetModal";

const ProgressBar = ({
    category,
    onEdit,
    showEdit,
}: {
    category: CategoryData;
    onEdit?: () => void;
    showEdit?: boolean;
}) => {
    const [width, setWidth] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const { name, monthlyBudget, budgetPercentUsed } = category;

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
        <>
            <div className="w-full flex flex-row items-center justify-center">
                <div className="w-full">
                    <div className="grid grid-cols-3 items-center p-1">
                        <span className="text-sm md:text-base font-medium">
                            {name}
                        </span>
                        <span className="text-sm md:text-base font-medium text-center">
                            {budgetPercentUsed}%
                        </span>
                        <span className="text-sm md:text-base font-medium text-right">{`${formatCurrency(
                            monthlyBudget,
                        )}`}</span>
                    </div>
                    <div className="w-full rounded-full h-3 bg-gray-800/20">
                        <div
                            style={{ width: `${width}%` }}
                            className={`rounded-full ${getBudgetColour(
                                budgetPercentUsed,
                            )} h-3 transition-all duration-1500 ease-in-out max-w-full`}></div>
                    </div>
                </div>
                {showEdit === true && (
                    <Menu as="div">
                        <MenuButton className="text-slate-700 hover:text-slate-900 hover:bg-slate-200/80 rounded-full ms-2">
                            <EllipsisVerticalIcon className="w-5 h-10" />
                        </MenuButton>
                        <MenuItems
                            anchor="bottom end"
                            transition
                            className="[--anchor-gap:3px] w-48 bg-white rounded-md outline -outline-offset-1 outline-slate-200 shadow-lg transition duration-200 ease-out data-closed:opacity-0 data-closed:scale-95">
                            <MenuItem
                                as="button"
                                onClick={() => setIsOpen(true)}
                                className="block w-full text-start rounded-md p-3 text-sm text-slate-600 data-focus:bg-indigo-50 data-focus:text-indigo-700">
                                Edit
                            </MenuItem>
                            <MenuItem
                                as="button"
                                className="block w-full text-start rounded-md p-3 text-sm text-slate-600 data-focus:bg-indigo-50 data-focus:text-indigo-700">
                                Delete
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                )}
            </div>

            <BudgetModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                category={category}
                onEdit={onEdit}
            />
        </>
    );
};

export default ProgressBar;
