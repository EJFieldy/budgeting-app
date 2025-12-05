import RecentTransactions from "@/components/features/RecentTransactions";
import ExpensesChart from "@/components/features/ExpensesChart";
import ProgressBar from "@/components/ui/CategoryProgressBar";

const Banner = () => {
    return (
        <>
            <div className="max-w-4xl px-5 lg:px-0 mx-auto">
                <div className="sm:hidden flex flex-col gap-y-1">
                    <RecentTransactions showTitle={true} />
                    <ExpensesChart />
                </div>
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-y-1">
                        <RecentTransactions showTitle={true} />
                    </div>
                    <ExpensesChart />
                    <ProgressBar />
                </div>
            </div>
        </>
    );
};

export default Banner;
