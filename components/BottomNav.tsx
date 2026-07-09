import React from "react";
import { Home, Rocket } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ChatBubbleLeftRightIcon,
  BoltIcon // Dashboard market/asset icon
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
    
    // ROCKET ICON (Projects)
    { name: "Projects", icon: Rocket, path: "/projects", type: "lucide" },

    // FIXED: Replaced Starverse with Marketplace using the Dashboard BoltIcon
    { name: "Marketplace", icon: BoltIcon, path: "/blueprint", type: "custom" },

    // STARTALKS (Using Message icon variant)
    { name: "Startalks", icon: ChatBubbleLeftRightIcon, path: "/startalks", type: "custom" },
    
    { name: "Messages", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" }
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999]">
      <div className="bg-[var(--component-background)] border-t border-[var(--border-primary)] px-3 py-3 flex justify-between items-center">

        {navItems.map((item, index) => {
          // Precise path matching logic
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
