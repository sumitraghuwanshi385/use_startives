import {
  Home,
  Rocket,
  LayoutDashboard,
  Sparkles,
  MessageSquareMore
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Projects", icon: Rocket, path: "/projects" },

    // 🔥 BETTER ICONS
    { name: "Asset", icon: Home, path: "/blueprint" }, // cleaner than briefcase
    { name: "Startalks", icon: Sparkles, path: "/startalks" }, // premium ✨
    { name: "Messages", icon: MessageSquareMore, path: "/messages" }, // modern 💬
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">

      {/* 🔥 NAV BAR (HEIGHT INCREASED SLIGHTLY) */}
      <div className="bg-[var(--component-background)] border-t border-[var(--border-primary)] px-3 py-3 flex justify-between items-center">

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1"
            >
              
              {/* 🔥 ICON (PROPER ACTIVE STYLE) */}
              <Icon
                strokeWidth={isActive ? 2.5 : 1.8}
                className={`w-6 h-6 mb-[3px] transition-all duration-200
                  ${
                    isActive
                      ? "text-[var(--text-primary)] scale-110"
                      : "text-[var(--text-muted)]"
                  }`}
              />

              {/* 🔥 TEXT */}
              <span
                className={`text-[10px] font-semibold leading-none
                  ${
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
    </div>
  );
};

export default BottomNav;