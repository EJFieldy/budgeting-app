import React from "react";
import { useEffect, useState } from "react";
import { PieChart, Pie, ResponsiveContainer, Tooltip } from "recharts";
import type { CategoryData } from "@/types/index.ts";

const ExpensesChart = () => {
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "http://localhost:3000/api/expenses/by-category"
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch category expense data: ${response.status}`
                    );
                }

                const data: CategoryData[] = await response.json();

                setCategoryData(data);
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart width={400} height={400}>
                    <Pie
                        dataKey="value"
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        fill="#82ca9d"
                        label
                    />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
};

export default ExpensesChart;
