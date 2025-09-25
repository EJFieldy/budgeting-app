import type { SimpleCardProps } from "@/types";
import clsx from "clsx";

const Card = ({ className, children }: SimpleCardProps) => {
    return (
        <div
            className={clsx(
                "rounded-lg shadow-lg bg-white border-slate-200 border-1",
                className ? `${className}` : ""
            )}>
            {children}
        </div>
    );
};

export default Card;
