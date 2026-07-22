import { BrowserRouter, Routes } from "react-router-dom";

import publicRoutes from "./public.routes";
import protectedRoutes from "./protected.routes";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes}
        {protectedRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
