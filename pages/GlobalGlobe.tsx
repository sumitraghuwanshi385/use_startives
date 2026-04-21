// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw, Filter } from "lucide-react";

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

        const validUsers = data.filter((u: any) => u.lat && u.lng);
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
      .pointAltitude(0.025)
      .pointRadius(0.4)
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

  // 🔥 AUTO ROTATE CONTROL
  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--background-secondary)]">

      {/* 🔥 STRONG DOT PATTERN (FIXED) */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "18px 18px"
        }}
      />

      {/* 🌍 GLOBE */}
      <div ref={globeRef} className="w-full h-full z-10 relative" />

      {/* 🔥 TOP PILL */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30">
        <div className="px-4 py-1.5 rounded-full backdrop-blur-md border text-xs font-bold shadow
        bg-[var(--component-background)] border-[var(--border-primary)] text-[var(--text-primary)]">
          STARVERSE • {users.length}+ Builders
        </div>
      </div>

      {/* 🔥 FILTER PILL (NEW) */}
      <div className="absolute top-5 left-4 z-30">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white
        bg-gradient-to-r from-red-500 to-blue-500 shadow">
          <Filter size={14} />
          Global
        </div>
      </div>

      {/* 🔥 USER POPUP */}
      {selectedUser && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-[var(--component-background)] p-4 rounded-2xl shadow-xl w-64 border border-[var(--border-primary)]">
            
            <h2 className="font-bold text-sm text-[var(--text-primary)]">
              {selectedUser.name}
            </h2>

            <p className="text-[10px] text-[var(--text-muted)] mt-1">
              {selectedUser.lat.toFixed(2)}, {selectedUser.lng.toFixed(2)}
            </p>

            <div className="flex gap-2 mt-3">
              <button
                onClick={() => navigate(`/user/${selectedUser.id}`)}
                className="flex-1 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-red-500 to-blue-500"
              >
                Profile
              </button>

              <button
                onClick={() => setSelectedUser(null)}
                className="flex-1 py-2 rounded-full text-xs font-bold bg-gray-200 dark:bg-neutral-700 text-[var(--text-primary)]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 BOTTOM TOOLBAR (FIXED + VISIBLE) */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50 flex gap-3">

        <button
          onClick={() => setAutoRotate(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white
          bg-gradient-to-r from-red-500 to-blue-500 shadow-lg"
        >
          <Play size={14} />
          Auto
        </button>

        <button
          onClick={() => setAutoRotate(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white
          bg-gradient-to-r from-red-500 to-blue-500 shadow-lg"
        >
          <Pause size={14} />
          Stop
        </button>

        <button
          onClick={() =>
            globeInstance.current?.pointOfView({ lat: 20, lng: 0, altitude: 2 })
          }
          className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white
          bg-gradient-to-r from-red-500 to-blue-500 shadow-lg"
        >
          <RotateCcw size={14} />
          Reset
        </button>

      </div>

      {/* 🔥 EXTRA FEATURE: LIVE LABEL */}
      <div className="absolute bottom-28 right-4 z-30">
        <div className="px-3 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-red-500 to-blue-500 shadow">
          LIVE USERS
        </div>
      </div>

    </div>
  );
};

export default GlobalGlobe;