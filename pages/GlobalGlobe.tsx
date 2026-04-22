// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw, X, MapPin, Info } from "lucide-react";

const GlobalGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const globeInstance = useRef<any>(null);
  const navigate = useNavigate();

  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [findMeLoading, setFindMeLoading] = useState(false);

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

  // 🔥 FETCH USERS SAFE — deduplicate by id, use profile country
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "https://use-startives.onrender.com/api/location/all-locations"
        );
        const data = await res.json();

        // Deduplicate by user id
        const seen = new Set<string>();
        const unique = data.filter((u: any) => {
          if (!u.id || seen.has(String(u.id))) return false;
          seen.add(String(u.id));
          return true;
        });

        const valid = unique.map((u: any) => ({
          ...u,
          lat: Number(u.lat),
          lng: Number(u.lng),
          // Use profile-selected country first, fallback to city+country or country
          locationText:
            u.profileCountry
              ? u.profileCountry
              : u.city && u.country
              ? `${u.city}, ${u.country}`
              : u.country || "Unknown",
        }));

        // Only include users with real coords AND a real profile picture (not default/pravatar/null)
        const filtered = valid.filter(
          (u: any) =>
            u.lat &&
            u.lng &&
            u.profilePictureUrl &&
            !u.profilePictureUrl.includes("pravatar") &&
            !u.profilePictureUrl.includes("default") &&
            !u.profilePictureUrl.includes("placeholder")
        );

        setUsers(filtered);
      } catch (err) {
        console.log("Fetch fail:", err);
      }
    };

    fetchUsers();
  }, []);

  // 🔥 INIT GLOBE ONCE (ULTRA SAFE)
  useEffect(() => {
    if (!globeRef.current || globeInstance.current) return;

    setTimeout(() => {
      if (!globeRef.current) return;

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
    }, 200);
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
            <img src="${d.profilePictureUrl}"
              style="
                width:100%;
                height:100%;
                border-radius:50%;
                object-fit:cover;
                border:2px solid white;
              "
              onerror="this.parentElement.parentElement.style.display='none'"
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

  // 🔥 THEME SWITCH SAFE
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

  // 🔥 FIND ME — uses browser geolocation, flies to user position
  const handleFindMe = () => {
    if (!globeInstance.current) return;
    setFindMeLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setAutoRotate(false);
        globeInstance.current.controls().autoRotate = false;
        globeInstance.current.pointOfView(
          { lat: latitude, lng: longitude, altitude: 1.2 },
          1200
        );
        setFindMeLoading(false);
      },
      () => {
        setFindMeLoading(false);
      },
      { timeout: 8000 }
    );
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundColor: isDark ? "#000" : "#fff",
      }}
    >
      {/* DOT BG */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
            : "radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* GLOBE */}
      <div ref={globeRef} className="w-full h-full relative z-10" />

      {/* HEADER FIXED — stable, no bounce */}
      <div
        className="absolute top-5 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
        style={{ transform: "none" }}
      >
        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "6px", pointerEvents: "auto" }}>
          <div
            className="px-6 py-2 rounded-full text-xs font-semibold backdrop-blur-xl border"
            style={{
              background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)",
              color: isDark ? "#fff" : "#000",
            }}
          >
            STARVERSE • {users.length}+ Builders
          </div>

          {/* INFO ICON — right edge of header pill */}
          <button
            onClick={() => setShowInfoPopup((v) => !v)}
            style={{
              width: "24px",
              height: "24px",
              borderRadius: "50%",
              background: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.10)",
              border: isDark ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(0,0,0,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <Info size={13} color={isDark ? "#fff" : "#333"} />
          </button>
        </div>

        <p
          className="text-[11px] mt-2"
          style={{
            color: isDark ? "#ccc" : "#555",
            pointerEvents: "none",
          }}
        >
          Real builders across the world 🌍
        </p>
      </div>

      {/* INFO POPUP */}
      {showInfoPopup && (
        <div
          className="absolute z-[9999]"
          style={{
            top: "78px",
            right: "16px",
          }}
        >
          <div
            className="rounded-2xl p-4 backdrop-blur-xl border text-xs"
            style={{
              width: "220px",
              background: isDark ? "rgba(0,0,0,0.88)" : "rgba(255,255,255,0.96)",
              color: isDark ? "#ddd" : "#333",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            }}
          >
            <button
              onClick={() => setShowInfoPopup(false)}
              style={{ position: "absolute", top: "8px", right: "10px" }}
            >
              <X size={13} color={isDark ? "#aaa" : "#666"} />
            </button>
            <p style={{ fontWeight: 700, marginBottom: "6px", fontSize: "11px" }}>
              🔒 Privacy Notice
            </p>
            <p style={{ lineHeight: "1.6", color: isDark ? "#bbb" : "#555" }}>
              Hum aapka location track <strong>nahi</strong> karte. Globe pe jo location dikh rahi hai, wo aapne khud apne profile mein select ki hui country/city hai — koi IP tracking ya automatic location detection nahi hai.
            </p>
          </div>
        </div>
      )}

      {/* USER POPUP */}
      {selectedUser && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <div
            className="relative p-5 rounded-2xl w-64 backdrop-blur-xl border"
            style={{
              background: isDark ? "rgba(0,0,0,0.85)" : "#fff",
            }}
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-2 right-2"
            >
              <X size={16} />
            </button>

            <div className="text-center">
              <img
                src={selectedUser.profilePictureUrl}
                className="w-16 h-16 rounded-full mx-auto"
                style={{ objectFit: "cover" }}
              />
              <h2 className="text-sm font-semibold mt-2">{selectedUser.name}</h2>

              {/* LOCATION TEXT — from profile country */}
              <p className="text-[10px] text-gray-400">{selectedUser.locationText}</p>
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

      {/* CONTROLS — right bottom (same as before) */}
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

      {/* FIND ME — left bottom, opposite side of controls */}
      <div className="fixed left-3 bottom-24 z-[9999]">
        <button
          onClick={handleFindMe}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff3b3b, #3b82f6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: "none",
            boxShadow: "0 4px 16px rgba(59,130,246,0.35)",
            transition: "transform 0.15s ease",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title="Find Me"
        >
          {findMeLoading ? (
            <div
              style={{
                width: "18px",
                height: "18px",
                border: "2px solid rgba(255,255,255,0.4)",
                borderTop: "2px solid white",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
          ) : (
            <MapPin size={20} color="white" strokeWidth={2.2} />
          )}
        </button>
      </div>

      {/* SPIN KEYFRAME */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GlobalGlobe;