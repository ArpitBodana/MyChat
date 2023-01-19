import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
export type RouteProps = {
  children: ReactElement;
};

function ProtectedRoute({ children }: RouteProps) {
  const { user } = useAppSelector((state) => state.user);
  return user.access_token ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
