import { Navigate, Route } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import PortfolioPage from "@/pages/PortfolioPage";

const publicRoutes = (
  <>
    <Route
      path="/"
      element={<Navigate to="/login" replace />}
    />

    <Route
      path="/login"
      element={<LoginPage />}
    />

    <Route
      path="/portfolio"
      element={<PortfolioPage />}
    />

    <Route
      path="*"
      element={<NotFoundPage />}
    />
  </>
);

export default publicRoutes;
