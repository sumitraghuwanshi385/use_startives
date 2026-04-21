// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw } from "lucide-react";

const GlobalGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const globeInstance = useRef<any>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // 🌍 FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/location/all-locations`
        );
        const data = await res.json();

        // ✅ FILTER VALID USERS ONLY
        const validUsers = data.filter(
          (u: any) => u.lat && u.lng
        );

        setUsers(validUsers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, []);

  // 🌍 INIT GLOBE
  useEffect(() => {
    if (!globeRef.current) return;

    const globe: any = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .backgroundColor("rgba(0,0,0,0)")
      .pointsData(users)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#ff3b3b")
      .pointAltitude(0.02)
      .pointRadius(0.35)
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
  }, [users]);

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* 🔥 BACKGROUND DOT PATTERN */}
      <div className="absolute inset-0 dot-pattern-bg opacity-20 pointer-events-none"></div>

      {/* 🌍 GLOBE */}
      <div ref={globeRef} className="w-full h-full" />

      {/* 🔥 TOP PILL */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
        <div className="px-4 py-1.5 rounded-full backdrop-blur-md border text-xs font-bold tracking-wide shadow
        bg-white/10 border-white/20 text-[var(--text-primary)]">
          STARVERSE • {users.length}+ Builders
        </div>
      </div>

      {/* 🔥 USER POPUP */}
      {selectedUser && (
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30">
          <div className="bg-[var(--component-background)] p-4 rounded-2xl shadow-xl w-64 border border-[var(--border-primary)]">
            
            <h2 className="font-bold text-sm text-[var(--text-primary)]">
              {selectedUser.name}
            </h2>

            <p className="text-[10px] text-[var(--text-muted)] mt-1">
              {selectedUser.lat.toFixed(2)}, {selectedUser.lng.toFixed(2)}
            </p>

            <button
              onClick={() => navigate(`/user/${selectedUser.id}`)}
              className="mt-3 w-full py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-blue-500"
            >
              View Profile
            </button>
          </div>
        </div>
      )}

      {/* 🔥 BOTTOM CONTROLS (NAV KE UPAR) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">

        <button
          onClick={() => (globeInstance.current.controls().autoRotate = true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-blue-500"
        >
          <Play size={14} />
          Auto
        </button>

        <button
          onClick={() => (globeInstance.current.controls().autoRotate = false)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-blue-500"
        >
          <Pause size={14} />
          Stop
        </button>

        <button
          onClick={() =>
            globeInstance.current.pointOfView({ lat: 20, lng: 0, altitude: 2 })
          }
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-blue-500"
        >
          <RotateCcw size={14} />
          Reset
        </button>

      </div>
    </div>
  );
};

export default GlobalGlobe;