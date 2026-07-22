import { Route } from "react-router-dom";

import PublicOnlyRoute from "./PublicOnlyRoute";

import LandingPage from "@/features/landing/pages/LandingPage";

function LoginPlaceholder() {
  return <h1>Login</h1>;
}

const publicRoutes = (
  <>
    <Route
      path="/"
      element={<LandingPage />}
    />

    <Route element={<PublicOnlyRoute />}>
      <Route
        path="/login"
        element={<LoginPlaceholder />}
      />
    </Route>
  </>
);

export default publicRoutes;
