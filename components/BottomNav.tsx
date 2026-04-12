import { Home, Rocket, Briefcase, MessageSquare, User, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Projects", icon: Rocket, path: "/discover" },
    { name: "Asset", icon: Briefcase, path: "/assets" },
    { name: "Startalks", icon: MessageSquare, path: "/startalks" },
    { name: "Messages", icon: MessageCircle, path: "/messages" }, // ✅ added
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">

      {/* 🔥 NAV CONTAINER */}
      <div className="mx-3 mb-3 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-2xl shadow-lg px-2 py-2 flex justify-between items-center">

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 relative"
            >
              
              {/* 🔥 ICON BOX (WHATSAPP STYLE) */}
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-black/5 dark:bg-white/10 shadow-md scale-110"
                      : "bg-transparent"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300
                    ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]"
                    }`}
                />
              </div>

              {/* 🔥 TEXT */}
              <span
                className={`text-[10px] mt-1 font-bold transition-all duration-300
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