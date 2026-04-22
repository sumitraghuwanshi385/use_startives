// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, RotateCcw, X, Info, Shield, MapPin, Globe2 } from "lucide-react";

// ─── Country label data (major countries with coords) ───────────────────────
const COUNTRY_LABELS = [
  { label: "India", lat: 20.5937, lng: 78.9629 },
  { label: "USA", lat: 37.0902, lng: -95.7129 },
  { label: "Pakistan", lat: 30.3753, lng: 69.3451 },
  { label: "UK", lat: 55.3781, lng: -3.436 },
  { label: "Canada", lat: 56.1304, lng: -106.3468 },
  { label: "Australia", lat: -25.2744, lng: 133.7751 },
  { label: "Germany", lat: 51.1657, lng: 10.4515 },
  { label: "France", lat: 46.2276, lng: 2.2137 },
  { label: "Brazil", lat: -14.235, lng: -51.9253 },
  { label: "Nigeria", lat: 9.082, lng: 8.6753 },
  { label: "South Africa", lat: -30.5595, lng: 22.9375 },
  { label: "UAE", lat: 23.4241, lng: 53.8478 },
  { label: "Saudi Arabia", lat: 23.8859, lng: 45.0792 },
  { label: "Russia", lat: 61.524, lng: 105.3188 },
  { label: "China", lat: 35.8617, lng: 104.1954 },
  { label: "Japan", lat: 36.2048, lng: 138.2529 },
  { label: "Indonesia", lat: -0.7893, lng: 113.9213 },
  { label: "Bangladesh", lat: 23.685, lng: 90.3563 },
  { label: "Egypt", lat: 26.8206, lng: 30.8025 },
  { label: "Kenya", lat: -0.0236, lng: 37.9062 },
  { label: "Mexico", lat: 23.6345, lng: -102.5528 },
  { label: "Argentina", lat: -38.4161, lng: -63.6167 },
  { label: "Turkey", lat: 38.9637, lng: 35.2433 },
  { label: "Iran", lat: 32.4279, lng: 53.688 },
  { label: "Spain", lat: 40.4637, lng: -3.7492 },
  { label: "Italy", lat: 41.8719, lng: 12.5674 },
  { label: "Netherlands", lat: 52.1326, lng: 5.2913 },
  { label: "Sweden", lat: 60.1282, lng: 18.6435 },
  { label: "Ghana", lat: 7.9465, lng: -1.0232 },
  { label: "Ethiopia", lat: 9.145, lng: 40.4897 },
  { label: "Philippines", lat: 12.8797, lng: 121.774 },
  { label: "Malaysia", lat: 4.2105, lng: 101.9758 },
  { label: "Singapore", lat: 1.3521, lng: 103.8198 },
  { label: "New Zealand", lat: -40.9006, lng: 174.886 },
  { label: "Portugal", lat: 39.3999, lng: -8.2245 },
  { label: "Poland", lat: 51.9194, lng: 19.1451 },
  { label: "Ukraine", lat: 48.3794, lng: 31.1656 },
  { label: "Colombia", lat: 4.5709, lng: -74.2973 },
  { label: "Chile", lat: -35.6751, lng: -71.543 },
  { label: "Peru", lat: -9.19, lng: -75.0152 },
];

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
  const [locationEnabled, setLocationEnabled] = useState(false);

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
          // Use profile-selected country first, fallback chain — never show "Unknown"
          locationText:
            u.profileCountry
              ? u.profileCountry
              : u.city && u.country
              ? `${u.city}, ${u.country}`
              : u.country
              ? u.country
              : u.city
              ? u.city
              : null,
        }));

        // Only include users with real coords AND a real profile picture
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

      // 🌍 Country labels rendered on globe surface
      globe
        .labelsData(COUNTRY_LABELS)
        .labelLat("lat")
        .labelLng("lng")
        .labelText("label")
        .labelSize(0.45)
        .labelDotRadius(0.25)
        .labelColor(() => "rgba(255,255,255,0.65)")
        .labelResolution(2);

      globeInstance.current = globe;
      setIsReady(true);

      // 🔥 Restore last saved location from localStorage — persists across logout/login
      try {
        const saved = localStorage.getItem("starverse_last_location");
        if (saved) {
          const { lat, lng } = JSON.parse(saved);
          if (lat && lng) {
            setTimeout(() => {
              globe.pointOfView({ lat, lng, altitude: 1.4 }, 1000);
            }, 600);
          }
        }
      } catch (_) {}
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

  // 🔥 FIND ME TOGGLE — saves location to localStorage, persists across logout/login
  const handleLocationToggle = () => {
    if (locationEnabled) {
      setLocationEnabled(false);
      return;
    }

    if (!globeInstance.current) return;
    setFindMeLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        // ✅ Save to localStorage — survives logout/login/session changes
        try {
          localStorage.setItem(
            "starverse_last_location",
            JSON.stringify({ lat: latitude, lng: longitude })
          );
        } catch (_) {}

        setAutoRotate(false);
        globeInstance.current.controls().autoRotate = false;
        globeInstance.current.pointOfView(
          { lat: latitude, lng: longitude, altitude: 1.2 },
          1200
        );
        setFindMeLoading(false);
        setLocationEnabled(true);
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
      style={{ backgroundColor: isDark ? "#000" : "#fff" }}
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
        <div
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            pointerEvents: "auto",
          }}
        >
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
              background: isDark
                ? "rgba(255,255,255,0.18)"
                : "rgba(0,0,0,0.10)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.3)"
                : "1px solid rgba(0,0,0,0.15)",
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
          style={{ color: isDark ? "#ccc" : "#555", pointerEvents: "none" }}
        >
          Real builders across the world 🌍
        </p>
      </div>

      {/* INFO POPUP — Lucide icons, English, Startives-branded */}
      {showInfoPopup && (
        <div
          className="absolute z-[9999]"
          style={{ top: "78px", right: "16px" }}
        >
          <div
            className="rounded-2xl p-4 backdrop-blur-2xl border"
            style={{
              width: "230px",
              background: isDark
                ? "rgba(10,10,20,0.82)"
                : "rgba(255,255,255,0.88)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.12)"
                : "1px solid rgba(0,0,0,0.09)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
            }}
          >
            <button
              onClick={() => setShowInfoPopup(false)}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            >
              <X size={13} color={isDark ? "#aaa" : "#666"} />
            </button>

            {/* Row 1 — Privacy */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <Shield
                size={14}
                color="#3b82f6"
                style={{ flexShrink: 0, marginTop: "1px" }}
              />
              <div>
                <p
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: isDark ? "#fff" : "#111",
                    marginBottom: "2px",
                  }}
                >
                  Your privacy is protected
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    lineHeight: "1.55",
                    color: isDark ? "#aaa" : "#555",
                  }}
                >
                  Startives never tracks your IP or device location. The globe
                  shows only the country you chose in your profile — nothing is
                  collected automatically.
                </p>
              </div>
            </div>

            {/* Row 2 — Community */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                marginBottom: "10px",
              }}
            >
              <Globe2
                size={14}
                color="#22c55e"
                style={{ flexShrink: 0, marginTop: "1px" }}
              />
              <div>
                <p
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: isDark ? "#fff" : "#111",
                    marginBottom: "2px",
                  }}
                >
                  Community-powered map
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    lineHeight: "1.55",
                    color: isDark ? "#aaa" : "#555",
                  }}
                >
                  Every pin is a real builder who joined Startives. Connect,
                  collaborate, and grow with founders worldwide.
                </p>
              </div>
            </div>

            {/* Row 3 — Find Me */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
              }}
            >
              <MapPin
                size={14}
                color="#f97316"
                style={{ flexShrink: 0, marginTop: "1px" }}
              />
              <div>
                <p
                  style={{
                    fontSize: "10.5px",
                    fontWeight: 700,
                    color: isDark ? "#fff" : "#111",
                    marginBottom: "2px",
                  }}
                >
                  Find Me is optional
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    lineHeight: "1.55",
                    color: isDark ? "#aaa" : "#555",
                  }}
                >
                  Tapping "Find Me" only flies the globe to your position — it
                  is never shared with others or stored on our servers.
                </p>
              </div>
            </div>
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
              <h2 className="text-sm font-semibold mt-2">
                {selectedUser.name}
              </h2>

              {/* LOCATION TEXT — only show if available, never show "Unknown" */}
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

      {/* CONTROLS — right bottom (same as before, no changes) */}
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
            globeInstance.current?.pointOfView({
              lat: 20,
              lng: 0,
              altitude: 2,
            })
          }
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white bg-gradient-to-r from-red-500 to-blue-500"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      {/* FIND ME — iOS glassmorphic card, left bottom, opposite of controls */}
      <div
        className="fixed left-3 bottom-24 z-[9999]"
        style={{ maxWidth: "160px" }}
      >
        <div
          style={{
            borderRadius: "18px",
            padding: "10px 12px",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: isDark
              ? "rgba(255,255,255,0.10)"
              : "rgba(0,0,0,0.07)",
            border: isDark
              ? "1px solid rgba(255,255,255,0.16)"
              : "1px solid rgba(0,0,0,0.10)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
          }}
        >
          {/* Title + toggle row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <MapPin
                size={13}
                color={locationEnabled ? "#3b82f6" : isDark ? "#aaa" : "#666"}
              />
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: isDark ? "#fff" : "#111",
                }}
              >
                Find Me
              </span>
            </div>

            {/* iOS-style toggle switch */}
            <button
              onClick={handleLocationToggle}
              style={{
                width: "34px",
                height: "20px",
                borderRadius: "10px",
                background: locationEnabled
                  ? "linear-gradient(135deg,#ff3b3b,#3b82f6)"
                  : isDark
                  ? "rgba(255,255,255,0.2)"
                  : "rgba(0,0,0,0.18)",
                border: "none",
                cursor: "pointer",
                position: "relative",
                transition: "background 0.25s ease",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  left: locationEnabled ? "16px" : "2px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 0.22s ease",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {findMeLoading && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      border: "1.5px solid rgba(0,0,0,0.15)",
                      borderTop: "1.5px solid #3b82f6",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                )}
              </div>
            </button>
          </div>

          {/* Short description */}
          <p
            style={{
              fontSize: "9.5px",
              lineHeight: "1.5",
              color: isDark ? "#888" : "#777",
              margin: 0,
            }}
          >
            {locationEnabled
              ? "Globe has flown to your spot."
              : "Turn on to fly globe to your location."}
          </p>
        </div>
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