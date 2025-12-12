import "./App.css";
import { useState } from "react";
import NavBar from "@/components/layout/navigation";
import Header from "@/components/layout/header";
import Banner from "@/components/layout/banner";

function App() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleTransactionAdded = () => {
        setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <>
            <NavBar onTransactionAdded={handleTransactionAdded} />
            <Header refreshTrigger={refreshTrigger} />
            <Banner refreshTrigger={refreshTrigger} />
        </>
    );
}

export default App;
