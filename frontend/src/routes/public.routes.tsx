import { Navigate, Route } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";
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
  </>
);

export default publicRoutes;
