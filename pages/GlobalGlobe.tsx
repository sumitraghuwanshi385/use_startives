// @ts-ignore
import Globe from "globe.gl";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const users = [
  { id: "1", name: "India User", lat: 28.6139, lng: 77.2090 },
  { id: "2", name: "USA User", lat: 37.7749, lng: -122.4194 },
  { id: "3", name: "UK User", lat: 51.5074, lng: -0.1278 },
  { id: "4", name: "Dubai User", lat: 25.2048, lng: 55.2708 },
];

const GlobalGlobe: React.FC = () => {
  const globeRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!globeRef.current || typeof window === "undefined") return;

    const globe: any = Globe()(globeRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-dark.jpg")
      .backgroundColor("#000")
      .pointsData(users)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(() => "#ff4d4f")
      .pointAltitude(0.02)
      .pointRadius(0.35)
      .pointLabel((d: any) => d.name)
      .onPointClick((d: any) => {
        globe.pointOfView(
          { lat: d.lat, lng: d.lng, altitude: 1.5 },
          1000
        );

        setTimeout(() => {
          navigate(`/user/${d.id}`);
        }, 1000);
      });

    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.6;

  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-black">
      <div ref={globeRef} className="w-full h-full" />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm shadow-lg">
          Startives Global Network • {users.length}+ Builders
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold shadow-lg">
          Live Users Around The World
        </div>
      </div>
    </div>
  );
};

export default GlobalGlobe;