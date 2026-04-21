import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"; // 🔥 apna token daal

interface UserLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const mockUsers: UserLocation[] = [
  { id: "1", name: "India User", lat: 28.6139, lng: 77.2090 },
  { id: "2", name: "USA User", lat: 37.7749, lng: -122.4194 },
  { id: "3", name: "UK User", lat: 51.5074, lng: -0.1278 },
  { id: "4", name: "Dubai User", lat: 25.2048, lng: 55.2708 },
];

const GlobalUsersMap: React.FC = () => {
  const mapRef = useRef<any>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1.5);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [0, 20],
      zoom: 1.5,
      projection: "globe", // 🔥 globe effect
    });

    // 🌍 atmosphere effect
    mapRef.current.on("style.load", () => {
      mapRef.current.setFog({
        color: "rgb(10,10,20)",
        "high-color": "rgb(36,92,223)",
        "horizon-blend": 0.02,
      });
    });

    // 🔥 smooth rotation
    let rotation = 0;
    const rotate = () => {
      rotation += 0.02;
      mapRef.current.rotateTo(rotation, { duration: 0 });
      requestAnimationFrame(rotate);
    };
    rotate();

    // 🔥 add markers
    mockUsers.forEach((user) => {
      const el = document.createElement("div");
      el.className = "user-marker";

      new mapboxgl.Marker(el)
        .setLngLat([user.lng, user.lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<div style="font-weight:600">${user.name}</div>`
          )
        )
        .addTo(mapRef.current);
    });

    return () => mapRef.current.remove();
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">

      {/* 🌍 MAP */}
      <div ref={mapContainer} className="w-full h-full" />

      {/* 🔥 TOP UI */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <div className="px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-sm shadow-lg">
          🌍 Global Startives Network • 12,482 Users
        </div>
      </div>

      {/* 🔥 RIGHT PANEL */}
      <div className="absolute right-6 top-20 z-10 space-y-3">

        <button className="glass-btn">Zoom In</button>
        <button className="glass-btn">Zoom Out</button>
        <button className="glass-btn">Reset</button>

      </div>

      {/* 🔥 BOTTOM STATS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold shadow-lg">
          🚀 120+ Countries • Growing Fast
        </div>
      </div>

      {/* 🎨 STYLE */}
      <style>{`
        .user-marker {
          width: 12px;
          height: 12px;
          background: linear-gradient(45deg, red, blue);
          border-radius: 50%;
          box-shadow: 0 0 12px rgba(255,255,255,0.8);
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0.6; }
          100% { transform: scale(1); opacity: 1; }
        }

        .glass-btn {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          color: white;
          font-size: 12px;
          font-weight: 700;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: 0.2s;
        }

        .glass-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default GlobalUsersMap;