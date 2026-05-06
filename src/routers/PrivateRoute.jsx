import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute() {
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
  
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" replace />;
}
