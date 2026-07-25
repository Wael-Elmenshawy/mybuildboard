import { lazy, Suspense } from "react";
import { Navigate, Route } from "react-router-dom";

const LoginPage = lazy(
  () => import("@/pages/LoginPage"),
);

const PortfolioPage = lazy(
  () => import("@/pages/PortfolioPage"),
);

const NotFoundPage = lazy(
  () => import("@/pages/NotFoundPage"),
);

const loading = (
  <div className="flex h-screen items-center justify-center">
    Loading...
  </div>
);

const publicRoutes = (
  <>
    <Route
      path="/"
      element={<Navigate to="/login" replace />}
    />

    <Route
      path="/login"
      element={
        <Suspense fallback={loading}>
          <LoginPage />
        </Suspense>
      }
    />

    <Route
      path="/portfolio"
      element={
        <Suspense fallback={loading}>
          <PortfolioPage />
        </Suspense>
      }
    />

    <Route
      path="*"
      element={
        <Suspense fallback={loading}>
          <NotFoundPage />
        </Suspense>
      }
    />
  </>
);

export default publicRoutes;
