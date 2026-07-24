import type { ReactNode } from "react";

type WorkspaceLayoutProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
};

export default function WorkspaceLayout({
  sidebar,
  header,
  children,
}: WorkspaceLayoutProps) {
  return (
    <div className="flex min-h-screen">
      <aside
        className="
          hidden
          w-72
          border-r
          border-slate-200
          bg-white/70
          backdrop-blur-xl
          dark:border-slate-800
          dark:bg-slate-950/60
          lg:block
        "
      >
        {sidebar}
      </aside>

      <div className="flex flex-1 flex-col">
        <header
          className="
            sticky
            top-0
            z-40
            border-b
            border-slate-200
            bg-white/70
            backdrop-blur-xl
            dark:border-slate-800
            dark:bg-slate-950/60
          "
        >
          {header}
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
