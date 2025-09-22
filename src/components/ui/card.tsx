import type { SimpleCardProps } from "@/types";
import clsx from "clsx";

const Card = ({ title, className, children }: SimpleCardProps) => {
    return (
        <div
            className={clsx(
                "rounded-lg shadow-lg bg-white border-slate-200 border-1",
                className ? `${className}` : ""
            )}>
            <div className="flex flex-col items-start justify-center">
                <h2 className="text-slate-900 text-lg">{title}</h2>
                <div className="mt-2">{children}</div>
            </div>
        </div>
    );
};

export default Card;
