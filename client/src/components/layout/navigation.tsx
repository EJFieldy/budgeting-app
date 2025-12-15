import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import clsx from "clsx";
import placeholderPicture from "@/assets/profile_pic.jpg";
import placeholderLogo from "@/assets/placeholder_logo.svg";

import type { NavigationItem } from "@/types";

const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/" },
    { name: "Budgets", href: "/budget" },
    { name: "Direct Debits", href: "/direct-debits" },
];

const profile: NavigationItem[] = [
    { name: "Profile", href: "/profile" },
    { name: "Settings", href: "/settings" },
];

export default function NavBar({ onAddClick }: { onAddClick: () => void }) {
    const location = useLocation();

    const isCurrentPage = (href: string) => {
        return location.pathname === href;
    };

    return (
        <Disclosure
            as="nav"
            className="relative bg-white border-b-1 border-slate-200">
            {({ open }) => (
                <>
                    <div className="px-2 md:px-5 max-w-7xl mx-auto">
                        <div className="flex h-16 items-center justify-between">
                            {/* Mobile Dropdown Button */}
                            <div className="flex items-center justify-center">
                                <div className="hidden sm:block">
                                    <img
                                        src={placeholderLogo}
                                        alt="Company Logo"
                                        className="size-8"
                                    />
                                </div>
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
                                {/* Tablet / Desktop Menu */}
                                <div className="hidden sm:flex flex-row items-center justify-between px-5 space-x-2">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            aria-current={
                                                isCurrentPage(item.href)
                                                    ? "page"
                                                    : undefined
                                            }
                                            className={clsx(
                                                "text-sm rounded-md px-3 py-2 tracking-tight font-sans focus:ring-1 focus:ring-indigo-500/80",
                                                isCurrentPage(item.href)
                                                    ? "bg-indigo-50 text-indigo-700"
                                                    : "bg-white text-slate-600"
                                            )}>
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            {/* Page Title */}
                            <div className="flex items-center sm:hidden">
                                <h1 className="font-sans text-xl font-bold text-indigo-600 tracking-tight">
                                    {navigation.find((item) =>
                                        isCurrentPage(item.href)
                                    )?.name || "Page not found"}
                                </h1>
                            </div>
                            {/* Profile Dropdown Menu */}
                            <div className="flex justify-center items-center">
                                <button
                                    onClick={onAddClick}
                                    className="hidden sm:flex sm:flex-row bg-indigo-50 text-indigo-700 rounded-lg text-sm py-2 px-4 mr-2 hover:bg-indigo-100 focus:ring-1 focus:ring-indigo-500">
                                    <PlusIcon className="text-indigo-700 size-5" />
                                    Add Transaction
                                </button>
                                <Menu
                                    as="div"
                                    className="p-2 relative flex items-center justify-center">
                                    <MenuButton className="rounded-full focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 cursor-pointer">
                                        <img
                                            src={placeholderPicture}
                                            alt="Profile Picture"
                                            className="size-9 rounded-full object-cover outline -outline-offset-1 outline-slate-200/50"
                                        />
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute origin-top-right top-full right-2 z-50 rounded-md w-48 outline -outline-offset-1 outline-slate-200 shadow-lg transition duration-200 ease-out data-closed:opacity-0 data-closed:scale-95 ">
                                        {profile.map((item) => (
                                            <MenuItem
                                                key={item.name}
                                                as={Link}
                                                to={item.href}
                                                className="block rounded-md px-3 py-3 text-sm text-slate-600 bg-white data-focus:text-indigo-700 data-focus:bg-indigo-50">
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    {/* Mobile Dropdown Menu Items */}
                    <DisclosurePanel
                        transition
                        className="sm:hidden absolute top-full left-0 right-0 border-slate-200 border-l border-r border-b shadow-lg origin-top transition duration-200 ease-out data-closed:opacity-0 data-closed:-translate-y-4 z-50">
                        <div className="text-start space-y-1 px-3 py-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as={Link}
                                    to={item.href}
                                    aria-current={
                                        isCurrentPage(item.href)
                                            ? "page"
                                            : undefined
                                    }
                                    className={clsx(
                                        "block px-4 py-2 rounded-md text-sm",
                                        isCurrentPage(item.href)
                                            ? "bg-indigo-50 text-indigo-700"
                                            : "text-slate-600 bg-white"
                                    )}>
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
