import Card from "@/components/ui/card";
import type { CardStyle, CardType, CardData, Profile } from "@/types";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    CurrencyPoundIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";

const Header = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
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
        <div className="relative bg-white border-b-1 border-slate-200 h-40 sm:h-50 mb-16 sm:mb-20">
            <div className="max-w-7xl mx-auto py-5">
                <div className="flex flex-col items-center justify-center">
                    <h5 className="text-[10px] sm:text-xs text-slate-500">
                        Available Balance
                    </h5>
                    {loading ? (
                        <div className="pt-2 pb-5">
                            <ArrowPathIcon className="size-10 text-slate-400 animate-spin" />
                        </div>
                    ) : (
                        <h2 className="text-4xl font-semibold text-slate-900 pt-2 pb-5 tracking-tight">
                            £{profile?.balance}
                        </h2>
                    )}
                </div>
                <div className="sm:hidden absolute bottom-0 left-5 right-5 translate-y-1/2">
                    <Card>
                        {loading ? (
                            <div className="grid grid-cols-3 gap-x-2 py-3 px-2 items-center animate-pulse">
                                {[1, 2, 3].map((i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center justify-between gap-2 text-center">
                                        <div className="size-5 bg-slate-200 rounded"></div>
                                        <div className="w-full">
                                            <div className="h-2 bg-slate-200 rounded mb-1 mx-auto w-12"></div>
                                            <div className="h-3 bg-slate-200 rounded mx-auto w-10"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
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
                        )}
                    </Card>
                </div>
                <div className="hidden absolute bottom-0 translate-y-1/2 right-5 left-5 mx-auto sm:grid sm:grid-cols-3 gap-x-2 max-w-4xl justify-center">
                    {loading ? (
                        <>
                            {[1, 2, 3].map((i) => (
                                <Card key={i} className="p-5">
                                    <div className="flex flex-col items-start animate-pulse">
                                        <div className="size-8 bg-slate-200 rounded mb-2"></div>
                                        <div className="w-full">
                                            <div className="h-3 bg-slate-200 rounded mb-2 w-16"></div>
                                            <div className="h-6 bg-slate-200 rounded w-20"></div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </>
                    ) : (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
