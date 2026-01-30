import ProgressBarList from "@/components/features/ProgressBars";

const BudgetDisplay = ({ refreshTrigger }: { refreshTrigger: number }) => {
    return (
        <div className="max-w-2xl mx-auto pt-5 pb-10 px-5 sm:px-0">
            <div className="flex flex-col items-center justify-center gap-y-5 w-full">
                <ProgressBarList
                    refreshTrigger={refreshTrigger}
                    titleClassName="text-xl md:text-2xl"
                />
            </div>
        </div>
    );
};

export default BudgetDisplay;
