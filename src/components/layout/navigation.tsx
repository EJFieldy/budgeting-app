import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import clsx from "clsx";

import type { NavigationItem } from "@/types";

const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Budgets", href: "/budget" },
    { name: "Direct Debits", href: "/direct-debits" },
    { name: "Settings", href: "/settings" },
];
