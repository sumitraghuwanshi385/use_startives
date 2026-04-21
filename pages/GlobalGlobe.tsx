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

  // 🌍 INIT GLOBE
  useEffect(() => {
    if (!globeRef.current) return;

    const globe: any = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .backgroundColor("rgba(0,0,0,0)")
      .htmlElementsData(users)
      .htmlLat("lat")
      .htmlLng("lng")
      .htmlElement((d: any) => {
        const el = document.createElement("div");

        el.innerHTML = `
          <div style="
            width:30px;
            height:30px;
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

        el.onclick = () => {
          setSelectedUser(d);
          globe.pointOfView(
            { lat: d.lat, lng: d.lng, altitude: 1.4 },
            1000
          );
        };

        return el;
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
            "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          opacity: document.documentElement.classList.contains("dark")
            ? 0.5
            : 0.9
        }}
      />

      {/* 🌍 GLOBE */}
      <div ref={globeRef} className="w-full h-full relative z-10" />

      {/* 🔥 TOP PILL */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40">
        <div className="
          px-4 py-1.5 rounded-full text-xs font-semibold
          bg-white/10 backdrop-blur-md border border-white/20
          text-[var(--text-primary)]
          shadow-md
        ">
          STARVERSE • {users.length}+ Builders
        </div>
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

      {/* 🔥 RIGHT SIDE CONTROLS */}
      <div className="absolute bottom-24 right-4 z-[999] flex flex-col gap-2">

        <button
          onClick={() => setAutoRotate(true)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500 shadow"
        >
          <Play size={12} />
        </button>

        <button
          onClick={() => setAutoRotate(false)}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500 shadow"
        >
          <Pause size={12} />
        </button>

        <button
          onClick={() =>
            globeInstance.current?.pointOfView({ lat: 20, lng: 0, altitude: 2 })
          }
          className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-semibold text-white bg-gradient-to-r from-red-500 to-blue-500 shadow"
        >
          <RotateCcw size={12} />
        </button>

      </div>
    </div>
  );
};

export default GlobalGlobe;