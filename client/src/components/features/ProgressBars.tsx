import { useState, useEffect } from "react";
import type { CategoryData } from "@/types/index.ts";
import ProgressBar from "@/components/ui/CategoryProgressBar";
import { API_URL } from "@/config";

const ProgressBarList = ({
    refreshTrigger,
    nBars,
    titleClassName = "text-xl",
    onEdit,
    showEdit,
}: {
    refreshTrigger: number;
    nBars?: number;
    titleClassName?: string;
    onEdit?: () => void;
    showEdit?: boolean;
}) => {
    const [barData, setBarData] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const barCount = Array.from({ length: nBars || 5 }, (_, i) => i + 1);
    const filteredData = barData.filter(
        (data) =>
            data.monthlyBudget !== null && data.monthlyBudget !== undefined,
    );

    const barsToShow = nBars ? filteredData.slice(0, nBars) : filteredData;

    useEffect(() => {
        const fetchBarData = async () => {
            try {
                if (isInitialLoad) {
                    setLoading(true);
                }
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
                setIsInitialLoad(false);
                setLoading(false);
            }
        };

        fetchBarData();
    }, [refreshTrigger, isInitialLoad]);

    if (loading && isInitialLoad) {
        return (
            <>
                {barCount.map((i) => (
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
            <div className="mb-2 border-b-1 border-slate-200 p-2 w-full">
                <h1
                    className={`text-center font-semibold text-slate-900 ${titleClassName}`}>
                    Budget Progress
                </h1>
            </div>
            {barsToShow.map((data) => {
                return (
                    <ProgressBar
                        key={data.id}
                        category={data}
                        onEdit={onEdit}
                        showEdit={showEdit}
                    />
                );
            })}
        </>
    );
};

export default ProgressBarList;
