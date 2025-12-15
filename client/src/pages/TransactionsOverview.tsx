import { useState, useEffect } from "react";
import type { HeaderData } from "@/types/index.ts";

const TransactionOverview = ({
    refreshTrigger,
}: {
    refreshTrigger: number;
}) => {
    const [transactions, setTransactions] = useState<HeaderData | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [balance, summary, recent] = await Promise.all([
                    fetch(
                        "http://localhost:3000/api/transactions/balance"
                    ).then((r) => r.json()),
                    fetch("http://localhost:3000/api/categories/summary").then(
                        (r) => r.json()
                    ),
                    fetch("http://localhost:3000/api/transactions/recent").then(
                        (r) => r.json()
                    ),
                ]);

                setTransactions({ balance, summary, recent });
            } catch (error) {
                console.error(`Error fetching data: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [refreshTrigger]);
};

export default TransactionOverview;
