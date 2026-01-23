import { useState, useEffect } from "react";
import type { TransactionTotals } from "@/types/index.ts";
import ProgressBar from "@/components/ui/CategoryProgressBar";
import { API_URL } from "@/config";

type CategoryData = TransactionTotals["categories"][number];

const ProgressBarList = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [barData, setBarData] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBarData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${API_URL}/api/categories/summary/demo-bars`,
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch progress bar data: ${response.status}`,
                    );
                }

                const data = await response.json();
                setBarData(data.categories);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchBarData();
    }, [refreshTrigger]);

    if (loading) {
        return (
            <>
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-full py-2 animate-pulse">
                        <div className="flex flex-row items-center justify-between p-1">
                            <span className="h-3 w-20 bg-gray-300 rounded"></span>
                            <span className="h-3 w-24 bg-gray-300 rounded"></span>
                            <span className="h-3 w-8 bg-gray-300 rounded"></span>
                        </div>
                        <div className="w-full rounded-full h-3 bg-gray-800/20">
                            <div className="rounded-full w-1/2 bg-gray-300 h-3"></div>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    return (
        <>
            <div className="mb-1">
                <h1 className="text-lg text-center font-semibold text-slate-900">
                    Budget Progress
                </h1>
            </div>
            {barData.map((data) => {
                if (data.expense) {
                    return <ProgressBar key={data.id} category={data} />;
                }
            })}
        </>
    );
};

export default ProgressBarList;
