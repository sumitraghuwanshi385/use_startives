import React, { useEffect, useRef } from "react";
import Globe from "globe.gl";
import { useNavigate } from "react-router-dom";

interface UserLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const users: UserLocation[] = [
  { id: "1", name: "India User", lat: 28.6139, lng: 77.2090 },
  { id: "2", name: "USA User", lat: 37.7749, lng: -122.4194 },
  { id: "3", name: "UK User", lat: 51.5074, lng: -0.1278 },
  { id: "4", name: "Dubai User", lat: 25.2048, lng: 55.2708 },
];

const GlobalGlobe: React.FC = () => {
  const globeRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const globe = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
      .backgroundColor("#000")

      // 🌍 USERS DATA
      .pointsData(users)
      .pointLat("lat")
      .pointLng("lng")

      // 🔴 STYLE
      .pointColor(() => "#ff4d4f")
      .pointAltitude(0.02)
      .pointRadius(0.4)

      // 🧠 HOVER TEXT
      .pointLabel((d: any) => d.name)

      // 👇 CLICK EVENT
      .onPointClick((d: any) => {
        // 🎯 zoom to user
        globe.pointOfView(
          { lat: d.lat, lng: d.lng, altitude: 1.5 },
          1000
        );

        // 🚀 navigate after zoom
        setTimeout(() => {
          navigate(`/user/${d.id}`);
        }, 1000);
      });

    // 🔄 AUTO ROTATE
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;

  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-black">

      {/* 🌍 GLOBE */}
      <div ref={globeRef} style={{ width: "100%", height: "100%" }} />

      {/* 🔥 TOP UI */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2">
        <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm shadow-lg">
          🌍 Startives Global Network • {users.length}+ Builders
        </div>
      </div>

      {/* 🔥 BOTTOM */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold shadow-lg">
          🚀 Live Users Around The World
        </div>
      </div>

    </div>
  );
};

export default GlobalGlobe;