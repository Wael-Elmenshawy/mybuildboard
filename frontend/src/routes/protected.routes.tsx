import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AppLayout from "@/components/layout/AppLayout/AppLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import SocialLinksPage from "@/features/social-links/pages/SocialLinksPage";

const protectedRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />}>
      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/projects"
        element={<ProjectsPage />}
      />

      <Route
        path="/social-links"
        element={<SocialLinksPage />}
      />
    </Route>
  </Route>
);

export default protectedRoutes;
