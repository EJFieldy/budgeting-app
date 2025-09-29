import Card from "@/components/ui/card";
import type { CardStyle, CardType, CardData } from "@/types";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    CurrencyPoundIcon,
} from "@heroicons/react/24/solid";

const Header = () => {
    const cardTest: CardData[] = [
        { title: "Balance", amount: "£1200.00", type: "balance" },
        { title: "Budget", amount: "£1500.00", type: "budget" },
        { title: "Income", amount: "£2500.00", type: "income" },
        { title: "Expenses", amount: "£1250.00", type: "expense" },
    ];

    const cardStyleMap = {
        balance: {
            bg: "bg-slate-50",
            text: "text-slate-700",
            icon: <CurrencyPoundIcon />,
        },
        budget: {
            bg: "bg-blue-50",
            text: "text-blue-700",
            icon: <CurrencyPoundIcon />,
        },
        income: {
            bg: "bg-emerald-50",
            text: "text-emerald-700",
            icon: <ArrowDownOnSquareIcon />,
        },
        expense: {
            bg: "bg-red-50",
            text: "text-red-700",
            icon: <ArrowUpOnSquareIcon />,
        },
    };

    const getCardStyles = (type: CardType): CardStyle => {
        return cardStyleMap[type];
    };

    return (
        <div className="bg-white border-b-1 border-slate-200">
            <div className="max-w-7xl mx-auto py-5">
                <div className="flex flex-col items-center justify-center">
                    <h5 className="text-[10px] text-slate-500">
                        Available Balance
                    </h5>
                    <h2 className="text-4xl text-slate-900 pt-2 pb-5 tracking-tight">
                        £1250.72
                    </h2>
                </div>
                <div className="sm:hidden mx-5 translate-y-1/4">
                    <Card>
                        <div className="grid grid-cols-3 gap-x-2 py-3 px-2 items-center">
                            {cardTest
                                .filter((item) => item.title !== "Balance")
                                .map((item) => {
                                    const style = getCardStyles(item.type);
                                    return (
                                        <div
                                            key={item.title}
                                            className="flex flex-col items-center justify-between gap-2">
                                            <div
                                                className={`size-5 text-indigo-700`}>
                                                {style.icon}
                                            </div>
                                            <div>
                                                <p className="text-[10px] text-center text-slate-500">
                                                    {item.title}
                                                </p>
                                                <h5
                                                    className={`text-xs font-semibold text-slate-900 tracking-tight`}>
                                                    {item.amount}
                                                </h5>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Header;
