import React from "react";
import { useAuth } from "../context/AuthContext";

const Loader = () => {
  const { loading } = useAuth();
  if (!loading) return null;

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-[9999] pointer-events-none"
      style={{ backgroundColor: "transparent" }} // ✅ Force full transparency
    >
      <div className="loader pointer-events-auto" />
    </div>
  );
};

export default Loader;
