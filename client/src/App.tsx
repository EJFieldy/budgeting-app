import "./App.css";
import NavBar from "@/components/layout/navigation";
import Header from "@/components/layout/header";
import RecentTransactions from "@/components/features/RecentTransactions";

function App() {
    return (
        <>
            <NavBar />
            <Header />
            <RecentTransactions />
        </>
    );
}

export default App;
