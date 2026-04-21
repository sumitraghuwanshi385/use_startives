// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const globeInstance = useRef<any>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // 🌍 FETCH USERS FROM BACKEND
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/location/all-locations`
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  // 🌍 INIT GLOBE
  useEffect(() => {
    if (!globeRef.current || typeof window === "undefined") return;

    const globe: any = Globe()(globeRef.current)
      .globeImageUrl(
        theme === "dark"
          ? "//unpkg.com/three-globe/example/img/earth-dark.jpg"
          : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .backgroundColor(theme === "dark" ? "#000" : "#f8fafc")
      .pointsData(users)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#ff3b3b")
      .pointAltitude(0.02)
      .pointRadius(0.35)
      .pointLabel((d: any) => `${d.name}`)
      .onPointClick((d: any) => {
        globe.pointOfView(
          { lat: d.lat, lng: d.lng, altitude: 1.5 },
          1000
        );
        setSelectedUser(d);
      });

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

    globeInstance.current = globe;
  }, [users, theme]);

  return (
    <div
      className={`relative w-full h-screen transition-all duration-500 ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      {/* 🌍 GLOBE */}
      <div ref={globeRef} className="w-full h-full" />

      {/* 🔥 TOP PILL */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
        <div className="px-6 py-2 rounded-full backdrop-blur-md border text-xs font-bold tracking-wide shadow-lg
        bg-white/10 border-white/20 text-white dark:text-white
        light:bg-black/10 light:text-black">
          🌌 STARVERSE • {users.length}+ Builders
        </div>
      </div>

      {/* 🔥 THEME TOGGLE */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* 🔥 FILTER PILL */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white text-xs font-bold shadow-xl">
          🌍 Live Global Users
        </div>
      </div>

      {/* 🔥 USER POPUP */}
      {selectedUser && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
          <div className="bg-white dark:bg-neutral-900 text-black dark:text-white p-4 rounded-2xl shadow-2xl w-64 border border-neutral-200 dark:border-neutral-700">
            
            <h2 className="font-bold text-lg">{selectedUser.name}</h2>
            <p className="text-xs opacity-70 mt-1">
              🌍 {selectedUser.lat.toFixed(2)}, {selectedUser.lng.toFixed(2)}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => navigate(`/user/${selectedUser.id}`)}
                className="flex-1 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-red-500 to-blue-500 text-white"
              >
                View Profile
              </button>

              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 py-2 rounded-full text-xs font-bold bg-gray-200 dark:bg-neutral-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 SIDE TOOL PANEL */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        
        <button
          onClick={() => globeInstance.current.controls().autoRotate = true}
          className="px-3 py-2 text-xs rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
        >
          ▶ Auto Rotate
        </button>

        <button
          onClick={() => globeInstance.current.controls().autoRotate = false}
          className="px-3 py-2 text-xs rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
        >
          ⏸ Stop
        </button>

        <button
          onClick={() =>
            globeInstance.current.pointOfView({ lat: 20, lng: 0, altitude: 2 })
          }
          className="px-3 py-2 text-xs rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white"
        >
          🌍 Reset View
        </button>
      </div>
    </div>
  );
};

export default GlobalGlobe;