import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: "🏠" },
  { label: "Profile", href: "/profile", icon: "👤" },
  { label: "Projects", href: "/projects", icon: "📁" },
  { label: "Skills", href: "/skills", icon: "🛠" },
  { label: "Certificates", href: "/certificates", icon: "🎓" },
  { label: "Experience", href: "/experience", icon: "💼" },
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r bg-white">
      <div className="border-b px-8 py-7">
        <h1 className="text-3xl font-black">
          <span className="text-primary">My</span>BuildBoard
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Developer Workspace
        </p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {navigation.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t p-5">
        <div className="rounded-2xl bg-primary p-5 text-primary-foreground">
          <h3 className="font-bold">Complete Your Profile</h3>

          <p className="mt-2 text-sm opacity-90">
            You're 95% done. Finish your profile to unlock your public developer
            board.
          </p>

          <button className="mt-4 w-full rounded-lg bg-white py-2 font-semibold text-primary transition hover:opacity-90">
            Continue
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
