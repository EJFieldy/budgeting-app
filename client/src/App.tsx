import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "@/components/layout/navigation";
import Header from "@/components/layout/header";
import Dashboard from "@/pages/Dashboard";
import TransactionModal from "@/components/features/TransactionModal";
import TransactionOverview from "./pages/TransactionsOverview";

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTransactionAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <BrowserRouter>
            <NavBar onAddClick={() => setIsModalOpen(true)} />
            <Header refreshTrigger={refreshTrigger} />
            <Routes>
                <Route
                    path="/"
                    element={<Dashboard refreshTrigger={refreshTrigger} />}
                />
                <Route
                    path="/transactions"
                    element={
                        <TransactionOverview
                            refreshTrigger={refreshTrigger}
                            onTransactionEdit={handleTransactionAdded}
                        />
                    }
                />
            </Routes>

            <div className="fixed bottom-0 left-0 right-0 w-[75%] mx-auto sm:hidden">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-indigo-500 text-white py-2 rounded-t-xl font-semibold">
                    + Add Transaction
                </button>
            </div>

            <TransactionModal
                onTransactionAdded={handleTransactionAdded}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </BrowserRouter>
    );
}

export default App;
