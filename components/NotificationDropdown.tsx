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
    if (interval >= 1) return `${interval}${key} ago`;
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

  /* -------- FETCH REAL NOTIFICATIONS -------- */
  useEffect(() => {
    fetchNotifications?.();
  }, []);

  /* -------- CORRECT FILTER (BACKEND TYPE) -------- */
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
        <h3 className="text-lg font-bold tracking-wide uppercase">
          NOTIFICATIONS
        </h3>
      </div>

      {/* -------- PILL SWITCH -------- */}
      <div className="px-4 pt-4">
        <div className="flex bg-[var(--background-tertiary)] p-1 rounded-full">
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition ${
              activeTab === "applications"
                ? "button-gradient text-white"
                : "text-[var(--text-secondary)]"
            }`}
          >
            APPLICATIONS
          </button>

          <button
            onClick={() => setActiveTab("connections")}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition ${
              activeTab === "connections"
                ? "button-gradient text-white"
                : "text-[var(--text-secondary)]"
            }`}
          >
            CONNECTIONS
          </button>
        </div>
      </div>

      {/* -------- CONTENT -------- */}
      <div className="max-h-96 overflow-y-auto px-4 py-4 space-y-3">

        {/* ================= APPLICATIONS ================= */}
        {activeTab === "applications" &&
          (applications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)] font-poppins">
              No new applications.
            </p>
          ) : (
            applications.map((n: any) => (
              <div
                key={n._id}
                onClick={() => markNotificationAsRead?.(n._id)}
                className={`p-3 rounded-xl cursor-pointer transition border ${
                  n.isRead
                    ? "bg-[var(--background-tertiary)] border-transparent"
                    : "bg-[var(--background-tertiary)] border-purple-500/40"
                } hover:bg-[var(--component-background-hover)]`}
              >
                <div className="flex justify-between items-start gap-2">
                  <div>
                    {/* Headline */}
                    <p className="text-xs font-bold uppercase tracking-wide text-purple-500 mb-1">
                      APPLICATION
                    </p>

                    {/* Title */}
                    <p className="text-sm font-semibold">
                      {n.title}
                    </p>

                    {/* Message */}
                    <p className="text-xs text-[var(--text-secondary)] font-poppins">
                      {n.message}
                    </p>
                  </div>

                  <span className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>
              </div>
            ))
          ))}

        {/* ================= CONNECTIONS ================= */}
        {activeTab === "connections" &&
          (connections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)] font-poppins">
              No new connections.
            </p>
          ) : (
            connections.map((n: any) => (
              <div
                key={n._id}
                className="p-3 rounded-xl bg-[var(--background-tertiary)] space-y-2 border border-[var(--border-primary)]"
              >
                <div className="flex justify-between items-start">
                  <div>
                    {/* Headline */}
                    <p className="text-xs font-bold uppercase tracking-wide text-purple-500 mb-1">
                      CONNECTION
                    </p>

                    {/* Title */}
                    <p className="text-sm font-semibold">
                      {n.title}
                    </p>

                    {/* Message */}
                    <p className="text-xs text-[var(--text-secondary)] font-poppins">
                      {n.message}
                    </p>
                  </div>

                  <span className="text-[10px] text-[var(--text-muted)]">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>

                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() =>
                      acceptConnectionRequest?.(n.sender?._id || n.sender)
                    }
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase py-1.5 rounded-full transition"
                  >
                    ACCEPT
                  </button>

                  <button
                    onClick={() =>
                      declineConnectionRequest?.(n.sender?._id || n.sender)
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase py-1.5 rounded-full transition"
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            ))
          ))}

        {/* VIEW ALL */}
        <Link
          to={
            activeTab === "applications"
              ? "/applications"
              : "/connections"
          }
          className="block text-center text-xs font-bold uppercase text-purple-600 hover:underline mt-3"
        >
          VIEW ALL →
        </Link>

      </div>
    </div>
  );
};