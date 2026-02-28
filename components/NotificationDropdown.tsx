import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
  const {
    appNotifications = [],
    fetchNotifications,
    markNotificationAsRead,
    acceptConnectionRequest,
    declineConnectionRequest,
  } = useAppContext();

  const [activeTab, setActiveTab] =
    useState<"applications" | "connections">("applications");

  /* -------- Fetch Notifications -------- */
  useEffect(() => {
    fetchNotifications?.();
  }, []);

  /* -------- FILTER USING BACKEND TYPE -------- */
  const applications = appNotifications.filter(
    (n: any) => n.type === "APPLICATION"
  );

  const connections = appNotifications.filter(
    (n: any) => n.type === "CONNECTION"
  );

  return (
    <div className="absolute right-0 mt-3 w-96 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-2xl shadow-2xl z-50">

      {/* HEADER */}
      <div className="px-6 py-4 border-b border-[var(--border-primary)]">
        <h3 className="text-lg font-semibold">notifications</h3>
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
          real time updates
        </p>
      </div>

      {/* -------- PILL SWITCH -------- */}
      <div className="px-4 pt-4">
        <div className="flex bg-[var(--background-tertiary)] p-1 rounded-full">
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex-1 py-2 text-xs rounded-full transition font-semibold ${
              activeTab === "applications"
                ? "button-gradient text-white"
                : "text-[var(--text-secondary)]"
            }`}
          >
            Applications
          </button>

          <button
            onClick={() => setActiveTab("connections")}
            className={`flex-1 py-2 text-xs rounded-full transition font-semibold ${
              activeTab === "connections"
                ? "button-gradient text-white"
                : "text-[var(--text-secondary)]"
            }`}
          >
            Connections
          </button>
        </div>
      </div>

      {/* -------- CONTENT -------- */}
      <div className="max-h-96 overflow-y-auto px-4 py-4 space-y-3">

        {/* APPLICATIONS TAB */}
        {activeTab === "applications" && (
          applications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              no new applications
            </p>
          ) : (
            applications.map((n: any) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead?.(n.id)}
                className="bg-[var(--background-tertiary)] p-3 rounded-xl hover:bg-[var(--component-background-hover)] cursor-pointer transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold">
                      {n.title}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                      {n.message}
                    </p>
                  </div>

                  <span className="text-[10px] text-[var(--text-muted)]">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>
              </div>
            ))
          )
        )}

        {/* CONNECTIONS TAB */}
        {activeTab === "connections" && (
          connections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              no new connections
            </p>
          ) : (
            connections.map((n: any) => (
              <div
                key={n.id}
                className="bg-[var(--background-tertiary)] p-3 rounded-xl space-y-3"
              >
                <div className="flex justify-between">
                  <p className="text-sm font-semibold">
                    {n.title}
                  </p>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>

                <p className="text-xs text-[var(--text-secondary)]">
                  {n.message}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      acceptConnectionRequest?.(n.sender)
                    }
                    className="flex-1 bg-green-500 text-white text-xs font-semibold py-1.5 rounded-full"
                  >
                    accept
                  </button>

                  <button
                    onClick={() =>
                      declineConnectionRequest?.(n.sender)
                    }
                    className="flex-1 bg-red-500 text-white text-xs font-semibold py-1.5 rounded-full"
                  >
                    cancel
                  </button>
                </div>
              </div>
            ))
          )
        )}

        {/* VIEW ALL */}
        <Link
          to={
            activeTab === "applications"
              ? "/applications"
              : "/connections"
          }
          className="block text-center text-xs font-semibold text-purple-600 hover:underline mt-3"
        >
          view all
        </Link>

      </div>
    </div>
  );
};