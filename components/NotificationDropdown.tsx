import React, { useState, useEffect, useRef } from "react";
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

export const NotificationDropdown: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    appNotifications = [],
    fetchNotifications,
    markNotificationAsRead,
    removeAppNotification,
    acceptConnectionRequest,
    declineConnectionRequest,
  } = useAppContext();

  const [activeTab, setActiveTab] =
    useState<"applications" | "connections">("applications");

  /* 🔥 Fetch + mark unread as read when opened */
  useEffect(() => {
    fetchNotifications?.();

    appNotifications.forEach((n: any) => {
      if (!n.isRead) {
        markNotificationAsRead?.(n._id || n.id);
      }
    });
  }, []);

  const safeId = (n: any) => n._id || n.id;

  const sorted = [...appNotifications].sort(
    (a: any, b: any) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  /* 🔥 Hide deleted project notifications */
  const applications = sorted.filter(
    (n: any) =>
      n.type === "APPLICATION" &&
      !n.isRead &&
      (n.ideaId || n.ideaTitle)
  );

  const connections = sorted.filter(
    (n: any) => n.type === "CONNECTION" && !n.isRead
  );

  const handleNavigate = (path: string, id?: string) => {
    if (id) markNotificationAsRead?.(id);
    navigate(path);
    onClose?.();
  };

  return (
    <div
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
      className="fixed left-1/2 -translate-x-1/2 top-20 w-[92vw] max-w-[420px] sm:max-w-[440px] bg-[var(--component-background)] border border-[var(--border-primary)] rounded-2xl shadow-2xl z-50 animate-dropdownFade"
    >

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
      <div className="max-h-[420px] overflow-y-auto px-4 py-5 space-y-4">

        {/* APPLICATIONS */}
        {activeTab === "applications" &&
          (applications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new applications
            </p>
          ) : (
            applications.map((n: any) => {
              const project =
                n.ideaTitle ||
                n.idea?.title ||
                "Project";

              const role =
                n.positionTitle ||
                n.position?.title ||
                "Role";

              const user =
                n.sender?.name ||
                "Someone";

              const status = n.status;

              return (
                <div
                  key={safeId(n)}
                  onClick={() =>
                    handleNavigate("/my-applications", safeId(n))
                  }
                  className="relative p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 hover:border-purple-500/60 transition cursor-pointer"
                >
                  <button
                   onClick={(e) => {
  e.stopPropagation();
  removeAppNotification?.(safeId(n));
}}                    
                   className="absolute top-3 right-3 text-xs text-[var(--text-muted)] hover:text-red-500"
                  >
                    ✕
                  </button>

                  {!status && (
                    <>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-purple-500">
                        New application received
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {project}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {user} has applied for the role of {role}.
                      </p>
                    </>
                  )}

                  {status === "ACCEPTED" && (
                    <>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-purple-500">
                        Application accepted
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {project}
                      </p>
                      <p className="text-xs text-green-500 mt-1">
                        You have been selected for the role of {role}.
                      </p>
                    </>
                  )}

                  {status === "REJECTED" && (
                    <>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-purple-500">
                        Application update
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                        {project}
                      </p>
                      <p className="text-xs text-red-400 mt-1">
                        Your application for the role of {role} was not selected.
                      </p>
                    </>
                  )}

                  <span className="absolute bottom-3 right-4 text-[10px] text-[var(--text-muted)]">
                    {timeAgo(n.createdAt)}
                  </span>
                </div>
              );
            })
          ))}

        {/* CONNECTIONS (UNCHANGED UI) */}
        {activeTab === "connections" &&
          (connections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new connections
            </p>
          ) : (
            connections.map((n: any) => {
              const user =
                n.sender?.name ||
                "User";

              return (
                <div
                  key={safeId(n)}
                  className="relative p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30"
                >
                  <button
                    onClick={(e) => {
  e.stopPropagation();
  removeAppNotification?.(safeId(n));
}}
                    
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
                    Wants to collaborate with you
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
            handleNavigate(
              activeTab === "applications"
                ? "/my-applications"
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