import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

/* ---------------- TIME AGO ---------------- */
const timeAgo = (date: string) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );

  const intervals: any = {
    y: 31536000,
    mo: 2592000,
    d: 86400,
    h: 3600,
    m: 60,
  };

  for (const key in intervals) {
    const interval = Math.floor(seconds / intervals[key]);
    if (interval >= 1) return `${interval}${key}`;
  }

  return "now";
};

export const NotificationDropdown: React.FC = () => {
  const navigate = useNavigate();

  const {
    appNotifications = [],
    fetchNotifications,
    markNotificationAsRead,
    acceptConnectionRequest,
    declineConnectionRequest,
  } = useAppContext();

  const [activeTab, setActiveTab] =
    useState<"applications" | "connections">("applications");

  useEffect(() => {
    fetchNotifications?.();
  }, []);

  const applications = appNotifications.filter(
    (n: any) => n.type === "APPLICATION" && !n.isRead
  );

  const connections = appNotifications.filter(
    (n: any) => n.type === "CONNECTION" && !n.isRead
  );

  const handleNavigate = (path: string, id: string) => {
    markNotificationAsRead?.(id);
    navigate(path, { state: { scrollTo: id } });
  };

  return (
    <div className="absolute right-0 mt-3 w-[420px] bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl shadow-2xl z-50">

      {/* HEADER */}
      <div className="px-6 py-5 border-b border-[var(--border-primary)]">
        <h3 className="text-lg font-semibold font-poppins">
          Notifications
        </h3>
        <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mt-1">
          Stay updated with your activity
        </p>
      </div>

      {/* TAB SWITCH */}
      <div className="px-5 pt-4">
        <div className="flex bg-[var(--background-tertiary)] p-1 rounded-full">
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex-1 py-2 text-xs font-extrabold rounded-full transition ${
              activeTab === "applications"
                ? "button-gradient text-white"
                : "text-[var(--text-secondary)]"
            }`}
          >
            Applications
          </button>

          <button
            onClick={() => setActiveTab("connections")}
            className={`flex-1 py-2 text-xs font-extrabold rounded-full transition ${
              activeTab === "connections"
                ? "button-gradient text-white"
                : "text-[var(--text-secondary)]"
            }`}
          >
            Connections
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-h-[420px] overflow-y-auto px-5 py-5 space-y-4">

        {/* APPLICATIONS */}
        {activeTab === "applications" &&
          (applications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)] font-poppins">
              No new applications
            </p>
          ) : (
            applications.map((n: any) => (
              <div
                key={n._id}
                className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-purple-500/20 hover:shadow-lg transition cursor-pointer"
                onClick={() => handleNavigate("/applications", n._id)}
              >
                {/* Close button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead?.(n._id);
                  }}
                  className="absolute top-3 right-3 text-xs text-[var(--text-muted)] hover:text-red-500"
                >
                  ✕
                </button>

                <p className="text-xs font-bold tracking-wide uppercase text-purple-500 mb-1">
                  Application
                </p>

                <p className="text-sm font-semibold font-poppins">
                  {n.title}
                </p>

                <p className="text-xs text-[var(--text-secondary)] font-poppins mt-1">
                  {n.message}
                </p>

                <span className="absolute bottom-3 right-4 text-[10px] text-[var(--text-muted)]">
                  {timeAgo(n.createdAt)}
                </span>
              </div>
            ))
          ))}

        {/* CONNECTIONS */}
        {activeTab === "connections" &&
          (connections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)] font-poppins">
              No new connections
            </p>
          ) : (
            connections.map((n: any) => (
              <div
                key={n._id}
                className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500/5 to-blue-500/5 border border-green-500/20 hover:shadow-lg transition"
              >
                <button
                  onClick={() => markNotificationAsRead?.(n._id)}
                  className="absolute top-3 right-3 text-xs text-[var(--text-muted)] hover:text-red-500"
                >
                  ✕
                </button>

                <p className="text-xs font-bold tracking-wide uppercase text-green-500 mb-1">
                  Connection
                </p>

                <p className="text-sm font-semibold font-poppins">
                  {n.title}
                </p>

                <p className="text-xs text-[var(--text-secondary)] font-poppins mt-1">
                  {n.message}
                </p>

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() =>
                      acceptConnectionRequest?.(n.sender?._id || n.sender)
                    }
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-1.5 rounded-full transition"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      declineConnectionRequest?.(n.sender?._id || n.sender)
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-1.5 rounded-full transition"
                  >
                    Cancel
                  </button>
                </div>

                <span className="absolute bottom-3 right-4 text-[10px] text-[var(--text-muted)]">
                  {timeAgo(n.createdAt)}
                </span>
              </div>
            ))
          ))}

      </div>
    </div>
  );
};