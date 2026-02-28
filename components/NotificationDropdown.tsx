import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

/* ---------------- TIME AGO FORMAT ---------------- */
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

  const prevUnread = useRef(0);

  /* ---------------- SMART POLLING ---------------- */
  useEffect(() => {
    fetchNotifications?.();

    const interval = setInterval(() => {
      fetchNotifications?.();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- SOUND + SHAKE + SYNC ---------------- */
  useEffect(() => {
    const unread = appNotifications.filter((n: any) => !n.isRead).length;

    if (unread > prevUnread.current) {
      const audio = new Audio("/notification.mp3");
      audio.play().catch(() => {});

      window.dispatchEvent(new Event("new-notification")); // shake bell

      localStorage.setItem("notif-sync", Date.now().toString());
    }

    prevUnread.current = unread;
  }, [appNotifications]);

  /* ---------------- CROSS TAB SYNC ---------------- */
  useEffect(() => {
    const sync = () => fetchNotifications?.();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  /* ---------------- GROUPING ---------------- */
  const grouped = appNotifications.reduce((acc: any, n: any) => {
    const key = n.groupKey || n.id;
    if (!acc[key]) acc[key] = [];
    acc[key].push(n);
    return acc;
  }, {});

  const applications = Object.values(grouped).filter(
    (group: any) => group[0]?.category === "applications_to_my_project"
  );

  const connections = Object.values(grouped).filter(
    (group: any) => group[0]?.category === "connections"
  );

  return (
    <div className="absolute right-0 mt-3 w-96 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-2xl shadow-2xl z-50 transition-all duration-300">

      {/* HEADER */}
      <div className="px-6 py-4 border-b border-[var(--border-primary)]">
        <h3 className="text-lg font-bold">Notifications</h3>
      </div>

      {/* PILL SWITCH */}
      <div className="flex px-4 pt-4 gap-2">
        {["applications", "connections"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded-full transition ${
              activeTab === tab
                ? "button-gradient text-white shadow-md"
                : "bg-[var(--background-tertiary)] text-[var(--text-secondary)]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-h-96 overflow-y-auto px-4 py-4 space-y-3">

        {activeTab === "applications" &&
          (applications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new applications.
            </p>
          ) : (
            applications.map((group: any, index: number) => {
              const first = group[0];
              return (
                <div
                  key={index}
                  onClick={() => markNotificationAsRead?.(first.id)}
                  className="bg-[var(--background-tertiary)] p-3 rounded-xl hover:bg-[var(--component-background-hover)] cursor-pointer transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold">
                        {group.length > 1
                          ? `${group.length} New Applications`
                          : first.title}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)]">
                        {first.description}
                      </p>
                    </div>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {timeAgo(first.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          ))}

        {activeTab === "connections" &&
          (connections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new connections.
            </p>
          ) : (
            connections.map((group: any, index: number) => {
              const first = group[0];
              return (
                <div
                  key={index}
                  className="bg-[var(--background-tertiary)] p-3 rounded-xl space-y-2"
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold">{first.title}</p>
                    <span className="text-[10px] text-[var(--text-muted)]">
                      {timeAgo(first.createdAt)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        acceptConnectionRequest?.(first.relatedUserId)
                      }
                      className="bg-green-500 text-white text-xs px-3 py-1 rounded-full uppercase"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() =>
                        declineConnectionRequest?.(first.relatedUserId)
                      }
                      className="bg-red-500 text-white text-xs px-3 py-1 rounded-full uppercase"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })
          ))}

        <Link
          to={activeTab === "applications" ? "/applications" : "/connections"}
          className="block text-center text-xs font-bold uppercase text-purple-600 hover:underline mt-3"
        >
          View All →
        </Link>

      </div>
    </div>
  );
};