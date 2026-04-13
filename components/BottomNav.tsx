import {
  Home,
  Sparkles
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// 🔥 Custom icons from dashboard
import {
  GlobeModernIcon,
  ShoppingBagIcon,
  ChatBubbleLeftRightIcon
} from "../constants";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ HIDE NAV ON CHAT / MESSAGE PAGES
  const hideOnRoutes = ["/messages", "/chat"];
  if (hideOnRoutes.some(route => location.pathname.startsWith(route))) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard", type: "lucide" },
    { name: "Projects", icon: GlobeModernIcon, path: "/projects", type: "custom" },
    { name: "Marketplace", icon: ShoppingBagIcon, path: "/blueprint", type: "custom" },
    { name: "Startalks", icon: Sparkles, path: "/startalks", type: "lucide" },
    { name: "Messages", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999]">
      {/* 🔥 NAV BAR */}
      <div className="bg-[var(--component-background)] border-t border-[var(--border-primary)] px-3 py-3 flex justify-between items-center">

        {navItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1"
            >
              
              {/* 🔥 ICON */}
              {item.type === "lucide" ? (
                <item.icon
                  strokeWidth={1.8}
                  className={`w-6 h-6 mb-[3px]
                    ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
                />
              ) : (
                <item.icon
                  className={`w-6 h-6 mb-[3px]
                    ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
                />
              )}

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