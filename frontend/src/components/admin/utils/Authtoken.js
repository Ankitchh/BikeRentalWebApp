import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const getAuthToken = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) {
      navigate("/adminlogin");
    }
    return;
  }, []);
};

