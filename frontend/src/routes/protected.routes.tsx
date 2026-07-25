import { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AppLayout from "@/components/layout/AppLayout/AppLayout";

const DashboardPage = lazy(
  () => import("@/features/dashboard/pages/DashboardPage"),
);

const ProfilePage = lazy(
  () => import("@/features/profile/pages/ProfilePage"),
);

const ProjectsPage = lazy(
  () => import("@/features/projects/pages/ProjectsPage"),
);

const SkillsPage = lazy(
  () => import("@/features/skills/pages/SkillsPage"),
);

const ExperiencesPage = lazy(
  () => import("@/features/experiences/pages/ExperiencesPage"),
);

const EducationPage = lazy(
  () => import("@/features/education/pages/EducationPage"),
);

const CertificatesPage = lazy(
  () => import("@/features/certificates/pages/CertificatesPage"),
);

const SocialLinksPage = lazy(
  () => import("@/features/social-links/pages/SocialLinksPage"),
);

const GitHubPage = lazy(
  () => import("@/features/github/pages/GitHubPage"),
);

const GitHubCallbackPage = lazy(
  () => import("@/features/github/pages/GitHubCallbackPage"),
);

const loading = (
  <div className="flex h-full items-center justify-center p-8">
    Loading...
  </div>
);

const protectedRoutes = (
  <Route element={<ProtectedRoute />}>
    <Route element={<AppLayout />}>
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={loading}>
            <DashboardPage />
          </Suspense>
        }
      />

      <Route
        path="/profile"
        element={
          <Suspense fallback={loading}>
            <ProfilePage />
          </Suspense>
        }
      />

      <Route
        path="/projects"
        element={
          <Suspense fallback={loading}>
            <ProjectsPage />
          </Suspense>
        }
      />

      <Route
        path="/skills"
        element={
          <Suspense fallback={loading}>
            <SkillsPage />
          </Suspense>
        }
      />

      <Route
        path="/experiences"
        element={
          <Suspense fallback={loading}>
            <ExperiencesPage />
          </Suspense>
        }
      />

      <Route
        path="/education"
        element={
          <Suspense fallback={loading}>
            <EducationPage />
          </Suspense>
        }
      />

      <Route
        path="/certificates"
        element={
          <Suspense fallback={loading}>
            <CertificatesPage />
          </Suspense>
        }
      />

      <Route
        path="/social-links"
        element={
          <Suspense fallback={loading}>
            <SocialLinksPage />
          </Suspense>
        }
      />

      <Route
        path="/github"
        element={
          <Suspense fallback={loading}>
            <GitHubPage />
          </Suspense>
        }
      />

      <Route
        path="/github/callback"
        element={
          <Suspense fallback={loading}>
            <GitHubCallbackPage />
          </Suspense>
        }
      />
    </Route>
  </Route>
);

export default protectedRoutes;
