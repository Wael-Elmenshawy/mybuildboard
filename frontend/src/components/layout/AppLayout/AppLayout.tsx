import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar";

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-8">
          <div>
            <h1 className="text-xl font-bold">
              MyBuildBoard
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-xl">
              🔔
            </button>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
                W
              </div>

              <div>
                <p className="font-semibold">
                  Wael
                </p>

                <p className="text-sm text-muted-foreground">
                  Cloud Engineer
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
