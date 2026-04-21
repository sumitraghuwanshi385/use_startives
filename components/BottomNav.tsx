import { Home, Globe, Rocket, Radio } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ChatBubbleLeftRightIcon,
} from "../constants";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isChatOpen = document.body.classList.contains("chat-open");

  const hideRoutes = [
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
    "/new-password"
  ];

  if (hideRoutes.includes(location.pathname) || isChatOpen) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard", type: "lucide" },

    // 🔥 UPDATED → ROCKET ICON
    { name: "Projects", icon: Rocket, path: "/projects", type: "lucide" },

    // 🔥 NEW → STARVERSE
    { name: "Starverse", icon: Globe, path: "/globe", type: "lucide" },

    { name: "Startalks", icon: Radio, path: "/startalks", type: "custom" },
    { name: "Messages", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999]">
      <div className="bg-[var(--component-background)] border-t border-[var(--border-primary)] px-3 py-3 flex justify-between items-center">

        {navItems.map((item, index) => {
          const isActive = location.pathname.startsWith(item.path);

          const IconComponent = item.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1"
            >
              <IconComponent
                className={`w-6 h-6 mb-[3px] transition-all duration-200 ${
                  isActive
                    ? "text-[var(--text-primary)] scale-110"
                    : "text-[var(--text-muted)]"
                }`}
              />

              <span
                className={`text-[10px] font-semibold leading-none ${
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