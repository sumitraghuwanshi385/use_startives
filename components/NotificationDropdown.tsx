
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

export const NotificationDropdown: React.FC = () => {
  const {
    appNotifications = [],
    markNotificationAsRead,
    acceptConnectionRequest,
    declineConnectionRequest,
  } = useAppContext();

  const [activeTab, setActiveTab] =
    useState<"applications" | "connections">("applications");

  const recentApplications = appNotifications
    .filter((n: any) => n?.category === "applications_to_my_project")
    .slice(0, 3);

  const recentConnections = appNotifications
    .filter((n: any) => n?.category === "connections")
    .slice(0, 3);

  return (
    <div className="absolute right-0 mt-3 w-96 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-2xl shadow-2xl z-50">
      
      <div className="px-6 py-4 border-b border-[var(--border-primary)]">
        <h3 className="text-lg font-bold">Notifications</h3>
      </div>

      <div className="flex px-4 pt-4 gap-2">
        <button
          onClick={() => setActiveTab("applications")}
          className={`flex-1 py-2 text-xs font-bold rounded-full ${
            activeTab === "applications"
              ? "button-gradient text-white"
              : "bg-[var(--background-tertiary)] text-[var(--text-secondary)]"
          }`}
        >
          Applications
        </button>

        <button
          onClick={() => setActiveTab("connections")}
          className={`flex-1 py-2 text-xs font-bold rounded-full ${
            activeTab === "connections"
              ? "button-gradient text-white"
              : "bg-[var(--background-tertiary)] text-[var(--text-secondary)]"
          }`}
        >
          Connections
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto px-4 py-4 space-y-3">

        {activeTab === "applications" &&
          (recentApplications.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new applications.
            </p>
          ) : (
            recentApplications.map((n: any) => (
              <div
                key={n.id}
                onClick={() => markNotificationAsRead?.(n.id)}
                className="flex justify-between items-start bg-[var(--background-tertiary)] p-3 rounded-xl hover:bg-[var(--component-background-hover)] cursor-pointer"
              >
                <div>
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-xs text-[var(--text-secondary)]">
                    {n.description}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead?.(n.id);
                  }}
                  className="text-red-400 hover:text-red-600"
                >
                  ✕
                </button>
              </div>
            ))
          ))}

        {activeTab === "connections" &&
          (recentConnections.length === 0 ? (
            <p className="text-sm text-center text-[var(--text-muted)]">
              No new connections.
            </p>
          ) : (
            recentConnections.map((n: any) => (
              <div key={n.id} className="bg-[var(--background-tertiary)] p-3 rounded-xl space-y-2">
                <p className="text-sm font-semibold">{n.title}</p>

                <div className="flex gap-2">
                  <button
                    onClick={() => acceptConnectionRequest?.(n.relatedUserId)}
                    className="bg-green-500 text-white text-xs px-3 py-1 rounded-full"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => declineConnectionRequest?.(n.relatedUserId)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          ))}

        <Link
          to={activeTab === "applications" ? "/applications" : "/connections"}
          className="block text-center text-xs font-bold text-purple-600 hover:underline mt-3"
        >
          View All →
        </Link>

      </div>
    </div>
  );
};