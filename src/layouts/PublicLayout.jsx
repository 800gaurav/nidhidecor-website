import { Outlet } from "react-router-dom";
import CustomerSupport from "../components/CustomerSupport";

export default function PublicLayout() {
    return (
        <>
            <Outlet />
            <CustomerSupport />
        </>
    );
}