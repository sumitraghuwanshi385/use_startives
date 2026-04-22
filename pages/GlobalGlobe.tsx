// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw, X } from "lucide-react";

const GlobalGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const globeInstance = useRef<any>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // 🔥 THEME OBSERVER (NO LAG)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 🔥 FETCH USERS (SAFE)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://use-startives.onrender.com/api/location/all-locations"
        );
        const data = await res.json();
        const valid = data.filter((u: any) => u.lat && u.lng);
        setUsers(valid);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    fetchUsers();
  }, []);

  // 🔥 INIT GLOBE ONLY ONCE (CRITICAL FIX)
  useEffect(() => {
    if (!globeRef.current || globeInstance.current) return;

    const globe = Globe()(globeRef.current)
      .globeImageUrl(
        isDark
          ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          : "//unpkg.com/three-globe/example/img/earth-day.jpg"
      )
      .backgroundColor("rgba(0,0,0,0)");

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;

    globeInstance.current = globe;
  }, []);

  // 🔥 UPDATE USERS (NO RECREATE)
  useEffect(() => {
    if (!globeInstance.current) return;

    globeInstance.current
      .htmlElementsData(users)
      .htmlLat("lat")
      .htmlLng("lng")
      .htmlElement((d: any) => {
        const el = document.createElement("div");

        el.style.pointerEvents = "auto";

        el.innerHTML = `
          <div style="
            width:34px;
            height:34px;
            border-radius:50%;
            padding:2px;
            background:linear-gradient(135deg,#ff3b3b,#3b82f6);
            display:flex;
            align-items:center;
            justify-content:center;
            cursor:pointer;
          ">
            <img src="${d.profilePictureUrl || 'https://i.pravatar.cc/100'}"
              style="
                width:100%;
                height:100%;
                border-radius:50%;
                object-fit:cover;
                border:2px solid white;
              "
            />
          </div>
        `;

        el.onclick = (e: any) => {
          e.stopPropagation();
          setSelectedUser(d);

          globeInstance.current?.pointOfView(
            { lat: d.lat, lng: d.lng, altitude: 1.3 },
            800
          );
        };

        return el;
      });
  }, [users]);

  // 🔥 THEME SWITCH WITHOUT DESTROY
  useEffect(() => {
    if (!globeInstance.current) return;

    globeInstance.current.globeImageUrl(
      isDark
        ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        : "//unpkg.com/three-globe/example/img/earth-day.jpg"
    );
  }, [isDark]);

  // 🔥 AUTO ROTATE CONTROL
  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = autoRotate;
    }
  }, [autoRotate]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: isDark ? "#000" : "#fff"
      }}
    >
      {/* 🔥 DOT BG */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
            : "radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: isDark ? 0.6 : 1
        }}
      />

      {/* 🌍 GLOBE */}
      <div ref={globeRef} className="w-full h-full relative z-10" />

      {/* 🔥 TOP */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40">
        <div
          className="px-6 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border"
          style={{
            background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
            color: isDark ? "#fff" : "#000",
            borderColor: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.1)"
          }}
        >
          STARVERSE • {users.length}+ Builders
        </div>

        <p
          className="text-[11px] text-center mt-2"
          style={{
            color: isDark ? "#ccc" : "#555"
          }}
        >
          Real builders across the world 🌍
        </p>
      </div>

      {/* 🔥 POPUP */}
      {selectedUser && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div
            className="relative p-5 rounded-2xl shadow-xl w-64 backdrop-blur-xl border"
            style={{
              background: isDark ? "rgba(0,0,0,0.85)" : "rgba(255,255,255,0.95)",
              borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"
            }}
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col items-center gap-2 text-center">
              <img
                src={selectedUser.profilePictureUrl || "https://i.pravatar.cc/100"}
                className="w-16 h-16 rounded-full"
              />
              <h2
                className="text-sm font-semibold"
                style={{ color: isDark ? "#fff" : "#000" }}
              >
                {selectedUser.name}
              </h2>
            </div>

            <button
              onClick={() => navigate(`/user/${selectedUser.id}`)}
              className="mt-4 w-full py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500"
            >
              View Profile
            </button>
          </div>
        </div>
      )}

      {/* 🔥 CONTROLS */}
      <div className="fixed right-3 bottom-24 z-[9999] flex flex-col gap-2">
        <button
          onClick={() => setAutoRotate(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white bg-gradient-to-r from-red-500 to-blue-500"
        >
          <Play size={12} /> Auto
        </button>

        <button
          onClick={() => setAutoRotate(false)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white bg-gradient-to-r from-red-500 to-blue-500"
        >
          <Pause size={12} /> Stop
        </button>

        <button
          onClick={() =>
            globeInstance.current?.pointOfView({ lat: 20, lng: 0, altitude: 2 })
          }
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white bg-gradient-to-r from-red-500 to-blue-500"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>
    </div>
  );
};

export default GlobalGlobe;