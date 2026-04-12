import { Home, Rocket, Briefcase, MessageSquare, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Projects", icon: Rocket, path: "/discover" },
    { name: "Asset", icon: Briefcase, path: "/assets" },
    { name: "Startalks", icon: MessageSquare, path: "/startalks" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[var(--component-background)] border-t border-[var(--border-primary)] flex justify-around items-center py-2 z-50">
      
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center text-xs font-bold"
          >
            <Icon
              className={`w-5 h-5 mb-1 ${
                isActive
                  ? "text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text"
                  : "text-[var(--text-muted)]"
              }`}
            />

            <span
              className={`${
                isActive
                  ? "bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {item.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;