import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AppLayout from "@/components/layout/AppLayout/AppLayout";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import EducationPage from "@/features/education/pages/EducationPage";
import ExperiencesPage from "@/features/experiences/pages/ExperiencesPage";
import CertificatesPage from "@/features/certificates/pages/CertificatesPage";
import ProjectsPage from "@/features/projects/pages/ProjectsPage";
import SkillsPage from "@/features/skills/pages/SkillsPage";
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
        path="/skills"
        element={<SkillsPage />}
      />

      <Route
        path="/experiences"
        element={<ExperiencesPage />}
      />

      <Route
        path="/education"
        element={<EducationPage />}
      />

      <Route
        path="/certificates"
        element={<CertificatesPage />}
      />

      <Route
        path="/social-links"
        element={<SocialLinksPage />}
      />
    </Route>
  </Route>
);

export default protectedRoutes;
