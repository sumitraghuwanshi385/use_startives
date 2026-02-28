import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

/* -------- TIME AGO -------- */
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

  const safeId = (n: any) => n._id || n.id;

  /* ---- SORT + LIMIT 3 ---- */
  const sorted = [...appNotifications].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  const applications = sorted
    .filter((n: any) => n.type === "APPLICATION" && !n.isRead)
    .slice(0, 3);

  const connections = sorted
    .filter((n: any) => n.type === "CONNECTION" && !n.isRead)
    .slice(0, 3);

  const handleNavigate = (path: string, id: string) => {
    markNotificationAsRead?.(id);
    navigate(path);
  };

  return (
    <div className="absolute right-2 top-14 w-[280px] sm:w-[300px] max-w-[90vw] bg-[var(--component-background)] border border-[var(--border-primary)] rounded-2xl shadow-2xl z-50">

      {/* HEADER */}
      <div className="px-5 py-4 border-b border-[var(--border-primary)]">
        <h3 className="text-base font-semibold">Notifications</h3>
        <p className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] mt-1">
          STAY UPDATED
        </p>
      </div>

      {/* TAB SWITCH */}
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

      {/* CONTENT */}
      <div className="max-h-[360px] overflow-y-auto px-4 py-5 space-y-4">

        {/* APPLICATIONS */}
        {activeTab === "applications" &&
          (applications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new applications
            </p>
          ) : (
            applications.map((n: any) => {
              const project =
                n.idea?.title ||
                n.ideaTitle ||
                n.meta?.ideaTitle ||
                "Your Project";

              const role =
                n.position?.title ||
                n.positionTitle ||
                n.meta?.positionTitle ||
                "Open Role";

              const user =
                n.sender?.name ||
                n.senderName ||
                "Someone";

              return (
                <div
                  key={safeId(n)}
                  onClick={() =>
                    handleNavigate("/applications", safeId(n))
                  }
                  className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 hover:border-purple-500/60 transition cursor-pointer"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markNotificationAsRead?.(safeId(n));
                    }}
                    className="absolute top-3 right-3 text-xs text-[var(--text-muted)] hover:text-red-500"
                  >
                    ✕
                  </button>

                  <p className="text-[11px] font-bold uppercase tracking-wide text-purple-500">
                    {project}
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                    {user}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Applied for{" "}
                    <span className="font-semibold text-[var(--text-primary)]">
                      {role}
                    </span>
                  </p>

                  <span className="absolute bottom-3 right-4 text-[10px] text-[var(--text-muted)]">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>
              );
            })
          ))}

        {/* CONNECTIONS */}
        {activeTab === "connections" &&
          (connections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new connections
            </p>
          ) : (
            connections.map((n: any) => {
              const user =
                n.sender?.name ||
                n.senderName ||
                "User";

              return (
                <div
                  key={safeId(n)}
                  className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30"
                >
                  <button
                    onClick={() =>
                      markNotificationAsRead?.(safeId(n))
                    }
                    className="absolute top-3 right-3 text-xs text-[var(--text-muted)] hover:text-red-500"
                  >
                    ✕
                  </button>

                  <p className="text-[11px] font-bold uppercase tracking-wide text-green-500">
                    CONNECTION REQUEST
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {user}
                  </p>

                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Wants to connect with you
                  </p>

                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() =>
                        acceptConnectionRequest?.(
                          n.sender?._id || n.sender
                        )
                      }
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs font-bold uppercase py-1.5 rounded-full transition"
                    >
                      ACCEPT
                    </button>

                    <button
                      onClick={() =>
                        declineConnectionRequest?.(
                          n.sender?._id || n.sender
                        )
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs font-bold uppercase py-1.5 rounded-full transition"
                    >
                      CANCEL
                    </button>
                  </div>

                  <span className="absolute bottom-3 right-4 text-[10px] text-[var(--text-muted)]">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>
              );
            })
          ))}
      </div>

      {/* VIEW ALL */}
      <div className="border-t border-[var(--border-primary)] px-4 py-3">
        <button
          onClick={() =>
            navigate(
              activeTab === "applications"
                ? "/applications"
                : "/connections"
            )
          }
          className="w-full text-center text-xs font-bold uppercase text-purple-600 hover:underline"
        >
          VIEW ALL →
        </button>
      </div>
    </div>
  );
};