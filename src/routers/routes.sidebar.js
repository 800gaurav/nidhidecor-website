// Navigation items

import {
    Menu,
    X,
    User,
    Copy,
    Check,
    Home,
    LogOut,
    Key,
    Award,
    Crown,
    Gift,
    ChevronLeft,
    ChevronRight,
    User2,
    BookX,
    ShoppingCart,
    BookCopy,
    UserPen,
    ShoppingBasket,
    Book,
    Wallet,
    CircleUserRound,
    Smartphone
} from "lucide-react";
import { FaProductHunt } from "react-icons/fa";


export const navItems = [
    {
        path: "/dashboard",
        label: "Home",
        icon: Home,
        end: true,
    },
    {
        path: "/dashboard/profile",
        label: "Profile",
        icon: User2,
        children: [
            { path: "/dashboard/profile", label: "My Profile" },

            { path: "/dashboard/view-kyc", label: "View KYC" },
        ],
    },

    // {
    //     path: "/dashboard/products",
    //     label: "Products",
    //     icon: ShoppingBasket,
    // },
    {
        path: "/dashboard/statement",
        label: "Statements",
        icon: Book,
    },
    {
        path: "/dashboard/purchase-history",
        label: "Purchase History",
        icon: ShoppingBasket,
    },

    {
        path: "/dashboard/genealogy",
        label: "Genealogy",
        icon: User2,
        children: [
            { path: "/dashboard/sales-team", label: "Sales Team" },
            { path: "/dashboard/direct-team", label: "Direct Team" },
            // { path: "/dashboard/depth-downline", label: "Depth-Downline" },

        ],
    },



    // {
    //     path: "/dashboard/order",
    //     label: "Order Form",
    //     icon: ShoppingCart,
    //     children: [
    //         { path: "/dashboard/new-order", label: "New Order" },
    //         { path: "/dashboard/pending-order", label: "Pending Order" },
    //         { path: "/dashboard/my-approved-orders", label: "Approved Orders" },
    //         { path: "/dashboard/rejected-orders", label: "Rejected Orders" },
    //     ],
    // },
    // {
    //     path: "/dashboard/plans",
    //     label: "Plans",
    //     icon: BookCopy ,
    //     children: [
    //         { path: "/dashboard/plan", label: "plan" },
    //         { path: "/dashboard/investment", label: "Investment" },
    //         { path: "/dashboard/investment/:planId", label: "investment" },
    //     ],
    // },
    {
        path: "/dashboard/withdraw",
        label: "Withdraw",
        icon: Wallet,
        children: [
            { path: "/dashboard/funds/withdraw", label: "withdraw" },
            { path: "/dashboard/funds/withdraw-history", label: "Withdraw-report" },
            // { path: "/dashboard/investment/:planId", label: "investment" },
        ],
    },


    // {
    //     path: "/dashboard/password/change-password",
    //     label: "Change Password",
    //     icon: Key,
    // },

    {
        path: "/dashboard/users-update",
        label: "Users Update",
        icon: UserPen,
        children: [
            // { path: "/dashboard/profile/update-profile", label: "Update Profile" },
            { path: "/dashboard/password/change-password", label: "Change Password" },
            // { path: "/dashboard/password/change-txn-password", label: "Change Txn Password" },
        ],
    },



 



];
