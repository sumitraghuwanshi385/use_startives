import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Application, StartupIdea, User } from "../types";
import { ChevronLeftIcon, IdentificationIcon } from "../constants";

/* ---------------- STATUS CONFIG ---------------- */

const statusConfig = {
  Pending: {
    bg: "bg-yellow-100 dark:bg-yellow-500/10",
    text: "text-yellow-600 dark:text-yellow-300",
    label: "Pending",
  },
  Accepted: {
    bg: "bg-emerald-100 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-300",
    label: "Accepted",
  },
  Rejected: {
    bg: "bg-red-100 dark:bg-red-500/10",
    text: "text-red-600 dark:text-red-300",
    label: "Rejected",
  },
  Reviewed: {
    bg: "bg-sky-100 dark:bg-sky-500/10",
    text: "text-sky-600 dark:text-sky-300",
    label: "Reviewed",
  },
};

/* ---------------- RECEIVED CARD ---------------- */

const ReceivedCard: React.FC<{
  application: Application;
  idea?: StartupIdea;
}> = ({ application, idea }) => {
  const { updateApplicationStatus, getUserById } = useAppContext();

  const applicant =
    application.applicantEmail &&
    getUserById(application.applicantEmail, "email");

  const position = idea?.positions?.find(
    (p) =>
      p.id === application.positionId ||
      p._id === application.positionId
  );

  const status = statusConfig[application.status] || statusConfig.Pending;

  return (
    <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 hover:border-purple-500/30 transition-all shadow-none font-poppins space-y-5">

      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={applicant?.profilePictureUrl}
          className="w-14 h-14 rounded-2xl object-cover border border-[var(--border-secondary)]"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            {applicant?.name || "Applicant"}
          </h3>
          <p className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
            {applicant?.headline}
          </p>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      {/* Project Info */}
      <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1">
          Applied For
        </p>
        <h4 className="text-base font-bold text-[var(--text-primary)]">
          {position?.title}
        </h4>
        <p className="text-xs text-purple-500 font-bold uppercase tracking-wider mt-1">
          {idea?.title}
        </p>
      </div>

      {/* Meta */}
      <div className="flex justify-between items-center text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
        <span>
          {application.createdAt
            ? new Date(application.createdAt).toLocaleDateString()
            : "N/A"}
        </span>

        {application.answers?.length > 0 && (
          <span className="flex items-center gap-1 text-purple-500 font-bold">
            <IdentificationIcon className="w-4 h-4" />
            {application.answers.length} Answers
          </span>
        )}
      </div>

      {/* Actions */}
      {application.status === "Pending" && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() =>
              updateApplicationStatus(application.id, "Rejected")
            }
            className="flex-1 py-2 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition"
          >
            Reject
          </button>

          <button
            onClick={() =>
              updateApplicationStatus(application.id, "Accepted")
            }
            className="flex-1 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition"
          >
            Accept
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------- SENT CARD ---------------- */

const SentCard: React.FC<{
  application: Application;
  idea?: StartupIdea;
}> = ({ application, idea }) => {
  const { getUserById } = useAppContext();

  const founder =
    idea?.founderEmail &&
    getUserById(idea.founderEmail, "email");

  const position = idea?.positions?.find(
    (p) =>
      p.id === application.positionId ||
      p._id === application.positionId
  );

  const status = statusConfig[application.status] || statusConfig.Pending;

  return (
    <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 hover:border-purple-500/30 transition-all shadow-none font-poppins space-y-5">

      <div className="flex items-center gap-4">
        <img
          src={founder?.profilePictureUrl}
          className="w-14 h-14 rounded-2xl object-cover border border-[var(--border-secondary)]"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
            {idea?.title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
            Founder: {founder?.name}
          </p>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold mb-1">
          Role
        </p>
        <h4 className="text-base font-bold text-[var(--text-primary)]">
          {position?.title}
        </h4>
      </div>

      <div className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
        {application.createdAt
          ? new Date(application.createdAt).toLocaleDateString()
          : "N/A"}
      </div>
    </div>
  );
};

/* ---------------- MAIN PAGE ---------------- */

export const MyApplicationsPage: React.FC = () => {
  const {
    sentApplications,
    receivedApplications,
    startupIdeas,
    currentUser,
  } = useAppContext();

  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"sent" | "received">("sent");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab === "sent" || tab === "received") {
      setActiveTab(tab);
    }
  }, [location.search]);

  if (!currentUser) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-poppins">

      {/* Back */}
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--background-tertiary)] px-5 py-2 rounded-full border border-[var(--border-primary)]"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Dashboard
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-4xl font-extrabold tracking-tighter text-[var(--text-primary)]">
          Applications
        </h1>
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">
          Manage sent & received applications
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex bg-[var(--background-tertiary)] p-1 rounded-full border border-[var(--border-primary)]">
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-10 py-2 rounded-full text-xs font-black uppercase tracking-widest transition ${
              activeTab === "sent"
                ? "button-gradient text-white"
                : "text-[var(--text-muted)]"
            }`}
          >
            Sent ({sentApplications.length})
          </button>

          <button
            onClick={() => setActiveTab("received")}
            className={`px-10 py-2 rounded-full text-xs font-black uppercase tracking-widest transition ${
              activeTab === "received"
                ? "button-gradient text-white"
                : "text-[var(--text-muted)]"
            }`}
          >
            Received ({receivedApplications.length})
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {activeTab === "sent"
          ? sentApplications.map((app) => (
              <SentCard
                key={app.id}
                application={app}
                idea={startupIdeas.find(
                  (i) =>
                    i.id === app.ideaId ||
                    i._id === app.ideaId
                )}
              />
            ))
          : receivedApplications.map((app) => (
              <ReceivedCard
                key={app.id}
                application={app}
                idea={startupIdeas.find(
                  (i) =>
                    i.id === app.ideaId ||
                    i._id === app.ideaId
                )}
              />
            ))}
      </div>
    </div>
  );
};