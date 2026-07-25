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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-cyan-50">
      <aside className="hidden w-80 shrink-0 border-r border-slate-200 bg-white/85 backdrop-blur-xl lg:block">
        {sidebar}
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
          {header}
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-[1650px] rounded-[32px] border border-white/60 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,.08)] backdrop-blur-xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


