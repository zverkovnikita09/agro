import { Role, UserSelectors } from "@entities/User"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import { RouterPaths } from "../router";
import { PropsWithChildren } from "react";

interface ProtectedRouteProps {
  targetRole?: Role
  redirectRoute?: RouterPaths
}

export const ProtectedRoute = ({ targetRole = Role.LOGIST, redirectRoute = RouterPaths.MAIN, children }: PropsWithChildren<ProtectedRouteProps>) => {
  const userRole = useSelector(UserSelectors.selectUserRole);

  if (userRole !== targetRole) return <Navigate to={redirectRoute} replace={true} />

  return children;
}