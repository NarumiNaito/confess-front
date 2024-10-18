import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export default function PrivateLayout() {
  const { loggedIn } = useAuthContext();
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
