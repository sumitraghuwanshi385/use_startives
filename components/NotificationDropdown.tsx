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

  /* ---- STRICT UNREAD FILTER ---- */
  const applications = appNotifications.filter(
    (n: any) =>
      n.type === "APPLICATION" &&
      n.isRead !== true
  );

  const connections = appNotifications.filter(
    (n: any) =>
      n.type === "CONNECTION" &&
      n.isRead !== true
  );

  const safeId = (n: any) => n._id || n.id;

  const handleNavigate = (path: string, id: string) => {
    markNotificationAsRead?.(id);
    navigate(path, { state: { highlightId: id } });
  };

  return (
    <div className="absolute right-1 top-14 w-[300px] sm:w-[320px] max-w-[92vw] bg-[var(--component-background)] border border-[var(--border-primary)] rounded-xl shadow-xl z-50">

      {/* HEADER */}
      <div className="px-4 py-3 border-b border-[var(--border-primary)]">
        <h3 className="text-sm font-semibold">
          Notifications
        </h3>
        <p className="text-[9px] tracking-widest uppercase text-[var(--text-muted)] mt-1">
          STAY UPDATED
        </p>
      </div>

      {/* TAB SWITCH */}
      <div className="px-3 pt-3">
        <div className="flex bg-[var(--background-tertiary)] p-1 rounded-full">
          <button
            onClick={() => setActiveTab("applications")}
            className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-full transition ${
              activeTab === "applications"
                ? "button-gradient text-white"
                : "text-[var(--text-secondary)]"
            }`}
          >
            APPLICATIONS
          </button>

          <button
            onClick={() => setActiveTab("connections")}
            className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded-full transition ${
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
      <div className="max-h-[380px] overflow-y-auto px-3 py-3 space-y-3">

        {/* APPLICATIONS */}
        {activeTab === "applications" &&
          (applications.length === 0 ? (
            <p className="text-xs text-center text-[var(--text-muted)] font-poppins">
              No new applications
            </p>
          ) : (
            applications.map((n: any) => (
              <div
                key={safeId(n)}
                onClick={() =>
                  handleNavigate("/applications", safeId(n))
                }
                className="relative p-3 rounded-lg bg-[var(--background-tertiary)] border border-purple-500/30 hover:shadow-sm transition cursor-pointer"
              >
                {/* CLOSE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead?.(safeId(n));
                  }}
                  className="absolute top-1.5 right-1.5 text-[10px] text-[var(--text-muted)] hover:text-red-500"
                >
                  ✕
                </button>

                {/* PROJECT NAME */}
                <p className="text-[9px] font-bold uppercase tracking-wide text-purple-500 mb-1">
                  {n.ideaTitle || n.projectName || "Untitled Project"}
                </p>

                {/* ROLE */}
                <p className="text-sm font-semibold">
                  {n.sender?.name || "User"} applied for{" "}
                  <span className="font-bold">
                    {n.positionTitle || "Role"}
                  </span>
                </p>

                <span className="absolute bottom-1.5 right-2 text-[9px] text-[var(--text-muted)]">
                  {timeAgo(n.createdAt)}
                </span>
              </div>
            ))
          ))}

        {/* CONNECTIONS */}
        {activeTab === "connections" &&
          (connections.length === 0 ? (
            <p className="text-xs text-center text-[var(--text-muted)] font-poppins">
              No new connections
            </p>
          ) : (
            connections.map((n: any) => (
              <div
                key={safeId(n)}
                className="relative p-3 rounded-lg bg-[var(--background-tertiary)] border border-green-500/30"
              >
                <button
                  onClick={() =>
                    markNotificationAsRead?.(safeId(n))
                  }
                  className="absolute top-1.5 right-1.5 text-[10px] text-[var(--text-muted)] hover:text-red-500"
                >
                  ✕
                </button>

                <p className="text-[9px] font-bold uppercase tracking-wide text-green-500 mb-1">
                  CONNECTION REQUEST
                </p>

                <p className="text-sm font-semibold">
                  {n.sender?.name || "User"} wants to connect
                </p>

                <div className="flex gap-1.5 mt-2">
                  <button
                    onClick={() =>
                      acceptConnectionRequest?.(
                        n.sender?._id || n.sender
                      )
                    }
                    className="flex-1 bg-green-500 text-white text-[10px] font-bold uppercase py-1 rounded-full"
                  >
                    ACCEPT
                  </button>

                  <button
                    onClick={() =>
                      declineConnectionRequest?.(
                        n.sender?._id || n.sender
                      )
                    }
                    className="flex-1 bg-red-500 text-white text-[10px] font-bold uppercase py-1 rounded-full"
                  >
                    CANCEL
                  </button>
                </div>

                <span className="absolute bottom-1.5 right-2 text-[9px] text-[var(--text-muted)]">
                  {timeAgo(n.createdAt)}
                </span>
              </div>
            ))
          ))}

      </div>

      {/* VIEW ALL */}
      <div className="border-t border-[var(--border-primary)] px-3 py-2">
        <button
          onClick={() =>
            navigate(
              activeTab === "applications"
                ? "/applications"
                : "/connections"
            )
          }
          className="w-full text-center text-[10px] font-bold uppercase text-purple-600 hover:underline"
        >
          VIEW ALL →
        </button>
      </div>

    </div>
  );
};