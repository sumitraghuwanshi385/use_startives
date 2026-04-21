import { Home, Globe, Rocket, Radio } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ChatBubbleLeftRightIcon,
} from "../constants";


export const FlameIcon = ({ className = "w-6 h-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3c2.5 3 4 5 4 7a4 4 0 1 1-8 0c0-2 1.5-4 4-7z" />
      <path d="M12 10c1.5 2 2.5 3 2.5 4.5A2.5 2.5 0 0 1 12 17a2.5 2.5 0 0 1-2.5-2.5c0-1.5 1-2.5 2.5-4.5z" />
    </svg>
  );
};

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

    { name: "Startalks", icon: FlameIcon, path: "/startalks", type: "custom" },
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