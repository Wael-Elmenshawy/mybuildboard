import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

function AppLayout() {
  return (
    <>
      <Header />

      <main>
        <Sidebar />

        <section>
          <Outlet />
        </section>
      </main>
    </>
  );
}

export default AppLayout;
