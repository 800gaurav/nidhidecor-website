import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthOnlyLayout() {
    const { isLoggedIn, authLoaded } = useAuth();
    
    if (!authLoaded) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                Loading...
            </div>
        );
    }
    
    if (isLoggedIn) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return <Outlet />;
}