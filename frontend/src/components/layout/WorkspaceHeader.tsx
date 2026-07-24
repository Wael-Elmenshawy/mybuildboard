import { FaBell, FaMoon, FaSearch } from "react-icons/fa";

export default function WorkspaceHeader() {
  return (
    <div className="flex h-20 items-center justify-between px-6 lg:px-8">
      <div className="relative w-full max-w-md">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          placeholder="Search projects, skills..."
          className="
            w-full
            rounded-xl
            border
            border-slate-200
            bg-white
            py-3
            pl-11
            pr-4
            outline-none
            transition
            focus:border-cyan-500
            dark:border-slate-700
            dark:bg-slate-900
          "
        />
      </div>

      <div className="ml-6 flex items-center gap-3">
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            transition
            hover:bg-slate-100
            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          <FaMoon />
        </button>

        <button
          className="
            relative
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            transition
            hover:bg-slate-100
            dark:border-slate-700
            dark:hover:bg-slate-800
          "
        >
          <FaBell />

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>

        <div className="flex items-center gap-3 pl-2">
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-cyan-500
              font-bold
              text-white
            "
          >
            W
          </div>

          <div className="hidden md:block">
            <p className="font-semibold">
              Wael
            </p>

            <p className="text-sm text-slate-500 dark:text-slate-400">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
