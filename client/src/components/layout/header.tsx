import Card from "@/components/ui/card";
import type { CardStyle, CardType, CardData, Profile, Expense } from "@/types";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    CurrencyPoundIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const Header = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const profileResponse = await fetch(
                    "http://localhost:3000/api/profile/"
                );
                const profileData: Profile = await profileResponse.json();

                setProfile(profileData);

                const expensesResponse = await fetch(
                    "http://localhost:3000/api/expenses/"
                );
                const expensesData: Expense[] = await expensesResponse.json();

                setExpenses(expensesData);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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

    const getCardData = (): CardData[] => {
        if (!profile) {
            return [];
        }

        return [
            {
                title: "Income",
                amount: `${profile.income}`,
                type: "income",
            },
            {
                title: "Budget",
                amount: `${profile.remainingBudget}`,
                type: "budget",
            },
            {
                title: "Expenses",
                amount: `${profile.totalExpenses}`,
                type: "expense",
            },
        ];
    };

    const cardData = getCardData();

    return (
        <div className="relative bg-white border-b-1 border-slate-200 h-40 sm:h-50">
            <div className="max-w-7xl mx-auto py-5">
                <div className="flex flex-col items-center justify-center">
                    <h5 className="text-[10px] sm:text-xs text-slate-500">
                        Available Balance
                    </h5>
                    <h2 className="text-4xl font-semibold text-slate-900 pt-2 pb-5 tracking-tight">
                        £{profile?.balance}
                    </h2>
                </div>
                <div className="sm:hidden absolute bottom-0 left-5 right-5 translate-y-1/2">
                    <Card>
                        <div className="grid grid-cols-3 gap-x-2 py-3 px-2 items-center">
                            {cardData.map((item) => {
                                const style = getCardStyles(item.type);
                                return (
                                    <div
                                        key={item.title}
                                        className="flex flex-col items-center justify-between gap-2 text-center">
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
                <div className="hidden absolute bottom-0 translate-y-1/2 right-5 left-5 mx-auto sm:grid sm:grid-cols-3 gap-x-2 max-w-4xl justify-center">
                    {cardData.map((item) => {
                        const style = getCardStyles(item.type);
                        return (
                            <Card key={item.title} className="p-5">
                                <div className="flex flex-col items-start">
                                    <div className="size-8 text-indigo-700 mb-2">
                                        {style.icon}
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs">
                                            {item.title}
                                        </p>
                                        <h5 className="text-xl text-slate-900 font-semibold tracking-tight">
                                            {item.amount}
                                        </h5>
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Header;
