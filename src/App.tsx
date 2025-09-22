import "./App.css";
import NavBar from "@/components/layout/navigation";
import Card from "@/components/ui/card";

function App() {
    const cardTest = [
        { title: "Current Balance", amount: "£1200" },
        { title: "Total Budget", amount: "£1500" },
        { title: "Monthly Income", amount: "£2500" },
        { title: "Monthly Expenditure", amount: "£1250" },
    ];
    return (
        <>
            <NavBar />

            {/* Testing card layout */}
            <div className="bg-white border-y-1 border-slate-200 mt-5">
                <div className="max-w-7xl mx-auto py-5">
                    <div className="grid grid-cols-4 gap-4">
                        {cardTest.map((item) => (
                            <Card key={item.title} title={item.title}>
                                <p className="text-slate-700 text-lg">
                                    {item.amount}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
