import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AppLayout from "@/components/layout/AppLayout/AppLayout";

function DashboardPlaceholder() {
  return <h1>Dashboard</h1>;
}

const protectedRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />}>
      <Route
        path="/dashboard"
        element={<DashboardPlaceholder />}
      />
    </Route>
  </Route>
);

export default protectedRoutes;
