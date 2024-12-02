import { Outlet, Navigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

export default function PublicLayout() {
  const { loggedIn } = useAuthContext();
  if (loggedIn) {
    return <Navigate to="/myPage" />;
  }
  return <Outlet />;
}
