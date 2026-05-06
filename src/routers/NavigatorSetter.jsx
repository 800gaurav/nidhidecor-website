import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavigatorSetter = () => {
  const navigate = useNavigate();
  const { setNavigateRef } = useAuth();

  useEffect(() => {
    setNavigateRef(navigate);
  }, [navigate]);

  return null;
};

export default NavigatorSetter;
