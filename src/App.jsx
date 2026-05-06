import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import CursorWaterDrop from "./component/ClickRipple";



function App() {
  const { isLoggedIn, authLoaded } = useAuth();
  // If user is logged in, redirect to dashboard
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <CursorWaterDrop />
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* <BasicLayout></BasicLayout> */}
        <Outlet />
      </div>
    </>
  );
}

export default App;