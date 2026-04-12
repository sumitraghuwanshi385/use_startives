import {
  Home,
  Rocket,
  Briefcase,
  Star,
  MessageCircle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Projects", icon: Rocket, path: "/projects" },
    { name: "Asset", icon: Briefcase, path: "/blueprint" }, // ✅ FIXED
    { name: "Startalks", icon: Star, path: "/startalks" },
    { name: "Messages", icon: MessageCircle, path: "/messages" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">

      {/* 🔥 NAV BAR */}
      <div className="bg-[var(--component-background)] border-t border-[var(--border-primary)] px-3 py-2 flex justify-between items-center">

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1"
            >
              
              {/* 🔥 ICON */}
              <Icon
                className={`w-6 h-6 mb-[2px]
                  ${
                    isActive
                      ? "fill-current text-[var(--text-primary)]"
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