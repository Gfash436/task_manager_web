import { Navigate, Outlet } from "react-router-dom";

import useProfile from "../user/useProfile";

export default function UnAuth() {
  const session = useProfile();

  if (session) return <Navigate to="/" replace />;

  return <Outlet />;
}
