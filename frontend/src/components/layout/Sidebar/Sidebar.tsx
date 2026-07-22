import { navigationItems } from "@/constants/navigation";

function Sidebar() {
  return (
    <aside>
      <nav>
        {navigationItems.map((item) => (
          <div key={item.id}>
            {item.label}
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
