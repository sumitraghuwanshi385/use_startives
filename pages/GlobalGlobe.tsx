// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw, X, Info, Locate } from "lucide-react";

const GlobalGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const globeInstance = useRef<any>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  // 🔥 THEME OBSERVER
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

  // 🔥 FETCH USERS + REMOVE DUPLICATES
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://use-startives.onrender.com/api/location/all-locations"
        );
        const data = await res.json();

        const uniqueMap = new Map();

        data.forEach((u: any) => {
          if (!u.lat || !u.lng) return;

          uniqueMap.set(u.id, {
            ...u,
            lat: Number(u.lat),
            lng: Number(u.lng),
            locationText:
              u.city && u.country
                ? `${u.city}, ${u.country}`
                : u.state && u.country
                ? `${u.state}, ${u.country}`
                : u.country || ""
          });
        });

        setUsers(Array.from(uniqueMap.values()));
      } catch (err) {
        console.log("Fetch fail:", err);
      }
    };

    fetchUsers();
  }, []);

  // 🔥 INIT GLOBE (ONCE ONLY)
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
    setIsReady(true);
  }, []);

  // 🔥 UPDATE USERS (NO RECREATE)
  useEffect(() => {
    if (!globeInstance.current || !isReady) return;

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

          globeInstance.current.pointOfView(
            { lat: d.lat, lng: d.lng, altitude: 1.3 },
            800
          );
        };

        return el;
      });
  }, [users, isReady]);

  // 🔥 THEME SWITCH
  useEffect(() => {
    if (!globeInstance.current) return;

    globeInstance.current.globeImageUrl(
      isDark
        ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        : "//unpkg.com/three-globe/example/img/earth-day.jpg"
    );
  }, [isDark]);

  // 🔥 AUTO ROTATE
  useEffect(() => {
    if (globeInstance.current) {
      globeInstance.current.controls().autoRotate = autoRotate;
    }
  }, [autoRotate]);

  // 🔥 FIND ME (USER FOCUS)
  const handleFindMe = async () => {
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();

      const res = await fetch(
        `https://use-startives.onrender.com/api/location/all-locations`
      );
      const data = await res.json();

      const me = data.find((u: any) => u.id);

      if (me && globeInstance.current) {
        setAutoRotate(false);

        globeInstance.current.pointOfView(
          { lat: me.lat, lng: me.lng, altitude: 1.2 },
          1000
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: isDark ? "#000" : "#fff" }}
    >

      {/* DOT BG */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
            : "radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px)",
          backgroundSize: "16px 16px"
        }}
      />

      {/* GLOBE */}
      <div ref={globeRef} className="w-full h-full relative z-10" />

      {/* 🔥 HEADER FIX */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-auto">
        <div className="flex items-center gap-2 justify-center">

          <div
            className="px-6 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border"
            style={{
              background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
              color: isDark ? "#fff" : "#000"
            }}
          >
            STARVERSE • {users.length}+ Builders
          </div>

          {/* INFO ICON */}
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="w-7 h-7 flex items-center justify-center rounded-full border"
          >
            <Info size={14} />
          </button>
        </div>

        <p
          className="text-[11px] mt-2"
          style={{ color: isDark ? "#ccc" : "#555" }}
        >
          Real builders across the world 🌍
        </p>

        {/* INFO BOX */}
        {showInfo && (
          <div className="mt-2 text-[10px] px-3 py-2 rounded-lg bg-black/80 text-white max-w-[250px] mx-auto">
            We do not track your exact location. Locations are approximate based
            on IP (city/state level).
          </div>
        )}
      </div>

      {/* POPUP */}
      {selectedUser && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div className="relative p-5 rounded-2xl w-64 backdrop-blur-xl border bg-black/80">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2"
            >
              <X size={16} />
            </button>

            <div className="text-center">
              <img
                src={selectedUser.profilePictureUrl || "https://i.pravatar.cc/100"}
                className="w-16 h-16 rounded-full mx-auto"
              />
              <h2 className="text-sm font-semibold mt-2 text-white">
                {selectedUser.name}
              </h2>

              {selectedUser.locationText && (
                <p className="text-[10px] text-gray-400">
                  {selectedUser.locationText}
                </p>
              )}
            </div>

            <button
              onClick={() => navigate(`/user/${selectedUser.id}`)}
              className="mt-4 w-full py-2 rounded-full text-xs text-white bg-gradient-to-r from-red-500 to-blue-500"
            >
              View Profile
            </button>
          </div>
        </div>
      )}

      {/* RIGHT CONTROLS */}
      <div className="fixed right-3 bottom-24 z-[9999] flex flex-col gap-2">
        <button onClick={() => setAutoRotate(true)} className="btn"> <Play size={12}/> Auto </button>
        <button onClick={() => setAutoRotate(false)} className="btn"> <Pause size={12}/> Stop </button>
        <button onClick={() => globeInstance.current?.pointOfView({ lat: 20, lng: 0, altitude: 2 })} className="btn"> <RotateCcw size={12}/> Reset </button>
      </div>

      {/* LEFT FIND ME */}
      <div className="fixed left-3 bottom-24 z-[9999]">
        <button
          onClick={handleFindMe}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-blue-500 flex items-center justify-center text-white shadow-lg"
        >
          <Locate size={16} />
        </button>
      </div>
    </div>
  );
};

export default GlobalGlobe;