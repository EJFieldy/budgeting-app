import RecentTransactions from "@/components/features/RecentTransactions";
import ExpensesChart from "@/components/features/ExpensesChart";
import ProgressBarList from "@/components/features/ProgressBars";

const Dashboard = ({ refreshTrigger }: { refreshTrigger: number }) => {
    return (
        <>
            <div className="max-w-4xl px-5 lg:px-0 mx-auto">
                <div className="sm:hidden flex flex-col gap-y-1">
                    <RecentTransactions
                        showTitle={true}
                        refreshTrigger={refreshTrigger}
                    />
                    <ExpensesChart refreshTrigger={refreshTrigger} />
                    <div className="flex flex-col gap-y-2 mt-10">
                        <ProgressBarList refreshTrigger={refreshTrigger} />
                    </div>
                </div>
                <div className="hidden sm:block lg:hidden">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-y-2">
                            <RecentTransactions
                                showTitle={true}
                                refreshTrigger={refreshTrigger}
                            />
                        </div>
                        <ExpensesChart refreshTrigger={refreshTrigger} />
                    </div>
                    <div className="mt-10 flex flex-col gap-y-2">
                        <ProgressBarList refreshTrigger={refreshTrigger} />
                    </div>
                </div>
                <div className="hidden lg:grid lg:grid-cols-3 gap-1">
                    <div className="flex flex-col gap-y-1">
                        <RecentTransactions
                            showTitle={true}
                            refreshTrigger={refreshTrigger}
                        />
                    </div>
                    <ExpensesChart refreshTrigger={refreshTrigger} />
                    <div className="flex flex-col gap-y-4">
                        <ProgressBarList refreshTrigger={refreshTrigger} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
