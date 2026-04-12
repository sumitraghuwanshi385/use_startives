import { Home, Sparkles } from "lucide-react";

import {
  GlobeModernIcon, // ✅ Projects (Discover Ideas)
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon
} from "../constants";

import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard", type: "lucide" },
    { name: "Projects", icon: GlobeModernIcon, path: "/projects", type: "custom" }, // ✅ FIXED
    { name: "Asset", icon: ShoppingBagIcon, path: "/blueprint", type: "custom" },
    { name: "Startalks", icon: Sparkles, path: "/startalks", type: "lucide" },
    { name: "Messenger", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">

      {/* 🔥 NAV BAR */}
      <div className="bg-[var(--component-background)] border-t border-[var(--border-primary)] px-3 py-3.5 flex justify-between items-center">

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1"
            >
              
              {/* 🔥 ICON (NO ANIMATION / NO BG / NO SCALE) */}
              <Icon
                strokeWidth={1.8}
                className={`w-6 h-6 mb-[3px]
                  ${
                    isActive
                      ? "text-[var(--text-primary)] border border-black/10 dark:border-white/10 rounded-md p-[2px]"
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