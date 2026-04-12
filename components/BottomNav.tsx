import { Home, Rocket, Briefcase, Star, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAppContext(); // ✅ for DP

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Projects", icon: Rocket, path: "/projects" }, // ✅ FIXED
    { name: "Asset", icon: Briefcase, path: "/submit-asset" }, // ✅ FIXED (no /assets route)
    { name: "Startalks", icon: Star, path: "/startalks" }, // ⭐ premium icon
    { name: "Messages", icon: MessageCircle, path: "/messages" },
    { name: "Profile", icon: null, path: "/profile" }, // custom render
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-50">
      
      {/* 🔥 NAV CONTAINER (CONNECTED TO BOTTOM) */}
      <div className="bg-[var(--component-background)] border-t border-[var(--border-primary)] px-2 py-2 flex justify-between items-center">

        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center flex-1 relative"
            >
              
              {/* 🔥 ICON / DP */}
              <div
                className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300
                  ${
                    isActive
                      ? "backdrop-blur-md bg-white/10 border border-white/20 scale-110"
                      : "bg-transparent"
                  }`}
              >
                {item.name === "Profile" ? (
                  currentUser?.avatar || currentUser?.profilePictureUrl ? (
                    <img
                      src={currentUser.avatar || currentUser.profilePictureUrl}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {currentUser?.name?.charAt(0) || "U"}
                    </div>
                  )
                ) : (
                  Icon && (
                    <Icon
                      className={`w-5 h-5 transition-all duration-300
                        ${
                          isActive
                            ? "text-[var(--text-primary)]"
                            : "text-[var(--text-muted)]"
                        }`}
                    />
                  )
                )}
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