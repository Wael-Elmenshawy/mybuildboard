import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AppLayout from "@/components/layout/AppLayout/AppLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";

const protectedRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />}>
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />
    </Route>
  </Route>
);

export default protectedRoutes;
