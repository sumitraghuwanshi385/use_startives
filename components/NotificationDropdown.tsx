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

  /* -------- Fetch Notifications -------- */
  useEffect(() => {
    fetchNotifications?.();
  }, []);

  /* -------- Filter Real Data Only -------- */
  const applications = appNotifications.filter(
    (n: any) =>
      n.category === "applications_to_my_project"
  );

  const connections = appNotifications.filter(
    (n: any) =>
      n.category === "connections"
  );

  return (
    <div className="absolute right-0 mt-3 w-96 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-2xl shadow-2xl z-50">

      {/* HEADER */}
      <div className="px-6 py-4 border-b border-[var(--border-primary)]">
        <h3 className="text-lg font-bold uppercase">Notifications</h3>
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
            Applications
          </button>

          <button
            onClick={() => setActiveTab("connections")}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition ${
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

        {/* APPLICATION TAB */}
        {activeTab === "applications" && (
          applications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new applications.
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
                    <p className="text-xs text-[var(--text-secondary)]">
                      {n.description}
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

        {/* CONNECTION TAB */}
        {activeTab === "connections" && (
          connections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new connections.
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

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      acceptConnectionRequest?.(n.relatedUserId)
                    }
                    className="flex-1 bg-green-500 text-white text-xs font-bold uppercase py-1.5 rounded-full"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      declineConnectionRequest?.(n.relatedUserId)
                    }
                    className="flex-1 bg-red-500 text-white text-xs font-bold uppercase py-1.5 rounded-full"
                  >
                    Cancel
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
          className="block text-center text-xs font-bold uppercase text-purple-600 hover:underline mt-3"
        >
          View All →
        </Link>

      </div>
    </div>
  );
};