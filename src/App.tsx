import "./App.css";
import NavBar from "@/components/layout/navigation";
import Card from "@/components/ui/card";
import clsx from "clsx";
import type { CardStyle, CardType, CardData } from "./types";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    CurrencyPoundIcon,
} from "@heroicons/react/24/solid";

function App() {
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
        <>
            <NavBar />

            {/* Testing card layout */}
            <div className="relative bg-white border-b-1 border-slate-200 h-32">
                <div className="max-w-7xl mx-auto py-5">
                    <div className="text-center">
                        <h5 className="text-[10px] text-slate-500">
                            Available Balance
                        </h5>
                        <h2 className="pt-2 pb-5 text-4xl text-slate-900 tracking-tight">
                            {cardTest.find((item) => item.title === "Balance")
                                ?.amount || "£0"}
                        </h2>
                    </div>
                    <Card className="mx-5">
                        <div className="grid grid-cols-3 py-3 px-2 justify-items-center">
                            {cardTest
                                .filter((item) => item.title !== "Balance")
                                .map((item) => {
                                    const style = getCardStyles(item.type);
                                    return (
                                        <>
                                            <div className="flex flex-col items-center justify-between gap-2">
                                                <div
                                                    className={`size-5 text-indigo-700`}>
                                                    {style.icon}
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-center text-slate-500">
                                                        {item.title}
                                                    </p>
                                                    <h5
                                                        className={`text-xs font-semibold tracking-tight`}>
                                                        {item.amount}
                                                    </h5>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })}
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default App;
