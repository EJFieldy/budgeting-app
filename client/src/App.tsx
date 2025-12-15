import "./App.css";
import { useState } from "react";
import NavBar from "@/components/layout/navigation";
import Header from "@/components/layout/header";
import Banner from "@/components/layout/banner";
import AddExpenseModal from "@/components/features/AddExpenseModal";

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTransactionAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <>
            <NavBar onAddClick={() => setIsModalOpen(true)} />
            <Header refreshTrigger={refreshTrigger} />
            <Banner refreshTrigger={refreshTrigger} />

            <div className="fixed bottom-0 left-0 right-0 w-[75%] mx-auto sm:hidden">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-indigo-500 text-white py-2 rounded-t-xl font-semibold">
                    + Add Transaction
                </button>
            </div>

            <AddExpenseModal
                onTransactionAdded={handleTransactionAdded}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}></AddExpenseModal>
        </>
    );
}

export default App;
