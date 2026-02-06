import ProgressBarList from "@/components/features/ProgressBars";

const BudgetDisplay = ({
    refreshTrigger,
    onEdit,
}: {
    refreshTrigger: number;
    onEdit?: () => void;
}) => {
    return (
        <div className="max-w-2xl mx-auto pt-5 pb-10 sm:pb-20 px-5 sm:px-0">
            <div className="flex flex-col items-center justify-center gap-y-5">
                <ProgressBarList
                    refreshTrigger={refreshTrigger}
                    titleClassName="text-xl md:text-2xl"
                    onEdit={onEdit}
                    showEdit={true}
                />
            </div>
        </div>
    );
};

export default BudgetDisplay;
