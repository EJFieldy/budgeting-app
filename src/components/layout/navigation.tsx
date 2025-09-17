import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import clsx from "clsx";

import type { NavigationItem } from "@/types";

const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/" },
    { name: "Budgets", href: "/budget" },
    { name: "Direct Debits", href: "/direct-debits" },
    { name: "Settings", href: "/settings" },
];

export default function NavBar() {
    const location = useLocation();

    const isCurrentPage = (href: string) => {
        return location.pathname === href;
    };

    return (
        <Disclosure as="nav" className="bg-white border-b-1 border-slate-200">
            {({ open }) => (
                <>
                    <div className="px-2 max-w-7xl">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center justify-center">
                                <DisclosureButton
                                    className={clsx(
                                        "sm:hidden p-2 text-slate-600 focus:ring-2 focus:ring-indigo-500 rounded-md outline-none",
                                        open && "bg-indigo-50"
                                    )}>
                                    <Bars3Icon
                                        aria-hidden="true"
                                        className={clsx(
                                            "size-6",
                                            open ? "hidden" : "block"
                                        )}
                                    />
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className={clsx(
                                            "size-6",
                                            open ? "block" : "hidden"
                                        )}
                                    />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
}
