import Card from "@/components/ui/card";
import type { CardStyle, CardType, CardData } from "@/types";
import {
    ArrowDownOnSquareIcon,
    ArrowUpOnSquareIcon,
    CurrencyPoundIcon,
} from "@heroicons/react/24/solid";

const Header = () => {
    return (
        <div className="bg-white border-b-1 border-slate-200">
            <div className="max-w-7xl mx-auto py-5">
                <div className="flex flex-col items-center-justify-center">
                    <h5 className="text-[10px] text-slate-500">
                        Available Balance
                    </h5>
                    <h2 className="text-4xl text-slate-900 pt-2 pb-5 tracking-tight">
                        £1250.72
                    </h2>
                </div>
            </div>
        </div>
    );
};

export default Header;
