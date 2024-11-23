import { Navigate, Outlet } from "react-router-dom";

import useProfile from "../user/useProfile";

export default function Auth() {
  const session = useProfile();

  if (!session) return <Navigate to="/login" replace />;

  return <Outlet />;
}
