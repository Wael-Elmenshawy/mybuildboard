import { Bell, Search } from "lucide-react";

function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Welcome back, Wael.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden items-center rounded-xl border bg-muted/30 px-3 md:flex">
          <Search
            size={18}
            className="text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Search..."
            className="h-10 w-56 bg-transparent px-3 outline-none"
          />
        </div>

        <button className="rounded-full p-2 transition hover:bg-muted">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-bold text-white">
            W
          </div>

          <div className="hidden sm:block">
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
  );
}

export default Topbar;
