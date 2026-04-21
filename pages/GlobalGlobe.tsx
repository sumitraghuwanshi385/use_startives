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
  const [autoRotate, setAutoRotate] = useState(true);

  // 🌍 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/location/all-locations`
        );
        const data = await res.json();

        const valid = data.filter((u: any) => u.lat && u.lng);
        setUsers(valid);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  // 🌍 INIT GLOBE (FIXED)
  useEffect(() => {
    if (!globeRef.current) return;

    const globe: any = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .backgroundColor("rgba(0,0,0,0)")
      .pointsData(users) // ✅ FIXED
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#ff3b3b")
      .pointAltitude(0.02)
      .pointRadius(0.35)
      .onPointClick((d: any) => {
        setSelectedUser(d);
        globe.pointOfView(
          { lat: d.lat, lng: d.lng, altitude: 1.5 },
          1000
        );
      });

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;

    globeInstance.current = globe;
  }, [users]);

  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div className="relative w-full h-screen overflow-hidden font-[Poppins] bg-[var(--background-secondary)]">

      {/* 🔥 DOT BG */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: document.documentElement.classList.contains("dark")
            ? 0.4
            : 1
        }}
      />

      {/* 🌍 GLOBE */}
      <div ref={globeRef} className="w-full h-full relative z-10" />

      {/* 🔥 TOP PILL */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40">
        <div className="
          px-6 py-2 rounded-full text-xs font-semibold tracking-wide
          bg-white/30 backdrop-blur-xl
          border border-white/40
          text-[var(--text-primary)]
          shadow-xl
        ">
          STARVERSE • {users.length}+ Builders
        </div>

        {/* 🌟 DESCRIPTION */}
        <p className="text-[10px] text-center mt-2 text-[var(--text-muted)]">
          Discover builders around the world in real-time 🌍
        </p>
      </div>

      {/* 🔥 USER POPUP */}
      {selectedUser && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[var(--component-background)] p-4 rounded-2xl shadow-xl w-64 border border-[var(--border-primary)]">
            
            <div className="flex items-center gap-3">
              <img
                src={selectedUser.profilePictureUrl || "https://i.pravatar.cc/100"}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                  {selectedUser.name}
                </h2>
                <p className="text-[10px] text-[var(--text-muted)]">
                  {selectedUser.lat.toFixed(2)}, {selectedUser.lng.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/user/${selectedUser.id}`)}
              className="mt-3 w-full py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500"
            >
              View Profile
            </button>
          </div>
        </div>
      )}

      {/* 🔥 CONTROLS (RIGHT BOTTOM FIXED) */}
      <div
        className="fixed right-3 z-[9999] flex flex-col gap-2"
        style={{
          bottom: "calc(90px + env(safe-area-inset-bottom))"
        }}
      >

        <button
          onClick={() => setAutoRotate(true)}
          className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500 shadow"
        >
          ▶ Auto
        </button>

        <button
          onClick={() => setAutoRotate(false)}
          className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500 shadow"
        >
          ⏸ Stop
        </button>

        <button
          onClick={() =>
            globeInstance.current?.pointOfView({ lat: 20, lng: 0, altitude: 2 })
          }
          className="px-3 py-1.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500 shadow"
        >
          🔄 Reset
        </button>

      </div>
    </div>
  );
};

export default GlobalGlobe;