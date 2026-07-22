import { Route } from "react-router-dom";

import PublicOnlyRoute from "./PublicOnlyRoute";

import LandingPage from "@/features/landing/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";

const publicRoutes = (
  <>
    <Route
      path="/"
      element={<LandingPage />}
    />

    <Route element={<PublicOnlyRoute />}>
      <Route
        path="/login"
        element={<LoginPage />}
      />
    </Route>
  </>
);

export default publicRoutes;
