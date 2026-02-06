import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    type PieLabelRenderProps,
    ResponsiveContainer,
    Tooltip,
    type TooltipContentProps,
    Cell,
    Legend,
} from "recharts";
import type {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import type { TransactionTotals } from "@/types/index.ts";
import { CATEGORY_COLORS } from "@/constants/categories";
import { formatCurrency } from "@/utils/currency.ts";
import { API_URL } from "@/config";

const CustomTooltip = ({
    payload,
    active,
}: TooltipContentProps<ValueType, NameType>) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
                <p className="font-semibold">{data.name}</p>
                <p className="text-sm">Spent: {formatCurrency(data.expense)}</p>
            </div>
        );
    }
    return null;
};

const CustomLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    value,
    fill,
}: PieLabelRenderProps) => {
    const RADIAN = Math.PI / 180;
    const x1 = cx + outerRadius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const x2 = cx + (outerRadius + 15) * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y1 = cy + outerRadius * Math.sin(-(midAngle ?? 0) * RADIAN);
    const y2 = cy + (outerRadius + 15) * Math.sin(-(midAngle ?? 0) * RADIAN);
    const textX = cx + (outerRadius + 20) * Math.cos(-(midAngle ?? 0) * RADIAN);
    const textY = cy + (outerRadius + 20) * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <g>
            <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={fill}
                strokeWidth={2}
            />
            <text
                x={textX}
                y={textY}
                textAnchor={textX > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={12}>
                {formatCurrency(value)}
            </text>
        </g>
    );
};

const ExpensesChart = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [categoryData, setCategoryData] = useState<
        TransactionTotals["categories"]
    >([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `${API_URL}/api/categories/summary/all-time`,
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch category expense data: ${response.status}`,
                    );
                }

                const apiData: TransactionTotals = await response.json();
                const chartData = apiData.categories
                    .filter((item) => item.expense > 0)
                    .map((item) => ({
                        ...item,
                        color: CATEGORY_COLORS[item.name],
                    }));

                setCategoryData(chartData);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [refreshTrigger]);

    if (loading) {
        return (
            <div className="flex flex-col gap-2 items-center">
                <div className="h-7 w-48 bg-gray-200 rounded animate-pulse" />
                <div className="w-full h-[300px] -mt-5 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full bg-gray-200 animate-pulse" />
                </div>
                <div className="flex flex-col gap-2 -mt-5 items-center">
                    <div className="flex gap-3 justify-center">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="flex gap-3 justify-center">
                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="flex flex-col gap-2 items-center mt-10 sm:mt-0">
                <h3 className="text-xl text-center -mb-4 sm:mb-0 font-semibold text-gray-900 border-b-1 border-slate-200 p-2 w-full">
                    Expenses by Category
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={400} height={400}>
                        <Pie
                            dataKey="expense"
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            fill="#82ca9d"
                            label={CustomLabel}
                            labelLine={false}>
                            {categoryData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={CustomTooltip} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                            formatter={(value) => (
                                <span className="text-sm">{value}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default ExpensesChart;
