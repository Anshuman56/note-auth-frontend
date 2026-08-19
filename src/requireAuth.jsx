import { useNavigate } from "react-router-dom";
import { getToken } from "./auth";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const navigate = useNavigate();
  const token = getToken();
  useEffect(() => {
    if (!token) navigate("/login");
  });
  if (!token) {
    return null;
  }
  return children;
}
