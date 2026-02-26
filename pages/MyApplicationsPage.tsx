import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Application, StartupIdea } from "../types";
import { ChevronLeftIcon, IdentificationIcon } from "../constants";

/* ================= SAFE ID MATCHER ================= */

const getId = (val: any) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    return val._id?.toString?.() || val.id?.toString?.() || val.toString?.();
  }
  return val.toString();
};

/* ================= STATUS STYLE ================= */

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Accepted":
      return "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300";
    case "Rejected":
      return "bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-300";
    case "Reviewed":
      return "bg-sky-100 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300";
    default:
      return "bg-yellow-100 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-300";
  }
};

/* ================= ANSWERS ================= */

const AnswersBox: React.FC<{ application: Application }> = ({ application }) => {
  const [open, setOpen] = useState(false);

  if (!application.answers || application.answers.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2"
      >
        <IdentificationIcon className="w-4 h-4" />
        {application.answers.length} Answers
      </button>

      {open && (
        <div className="mt-4 space-y-3 bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
          {application.answers.map((qa, i) => (
            <div key={i}>
              <p className="text-xs font-bold text-[var(--text-primary)]">
                {qa.question}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
                {qa.answer}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ================= SENT CARD ================= */

const SentCard: React.FC<{
  application: Application;
  idea?: StartupIdea;
}> = ({ application, idea }) => {
  const { getUserById } = useAppContext();

  const founderId = getId(idea?.founderId);
  const founder = founderId ? getUserById(founderId) : null;

  const position = idea?.positions?.find(
    (p) => getId(p) === getId(application.positionId)
  );

  return (
    <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 space-y-5 font-poppins">

      {/* HEADER */}
      <div className="flex items-center gap-4">

        {/* PROJECT ICON */}
        <Link to={`/idea/${getId(idea)}`}>
          <img
            src={idea?.imageUrl || ""}
            className="w-14 h-14 rounded-2xl object-cover border border-[var(--border-secondary)] hover:scale-105 transition"
          />
        </Link>

        {/* PROJECT NAME */}
        <div className="flex-1">
          <Link
            to={`/idea/${getId(idea)}`}
            className="text-lg font-bold text-[var(--text-primary)] hover:text-purple-500 transition"
          >
            {idea?.title || "Project"}
          </Link>
        </div>

        {/* STATUS */}
        <span
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusStyle(
            application.status
          )}`}
        >
          {application.status}
        </span>
      </div>

      {/* DESCRIPTION + ROLE */}
      <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
        <p className="text-sm text-[var(--text-secondary)]">
          {idea?.description || "No description available"}
        </p>

        <p className="text-sm text-purple-500 font-bold mt-3">
          Role Applied: {position?.title || "-"}
        </p>
      </div>

      <AnswersBox application={application} />

      {/* FOOTER */}
      <div className="flex justify-between items-center text-xs text-[var(--text-muted)] uppercase tracking-wider">

        {/* FOUNDER INFO */}
        {founder && (
          <div className="flex items-center gap-2">
            <Link to={`/user/${founder.id}`}>
              <img
                src={founder.profilePictureUrl}
                className="w-7 h-7 rounded-full object-cover border border-[var(--border-secondary)]"
              />
            </Link>

            <Link
              to={`/user/${founder.id}`}
              className="hover:text-purple-500 transition"
            >
              {founder.name}
            </Link>
          </div>
        )}

        {/* DATE */}
        <span>
          {application.createdAt
            ? new Date(application.createdAt).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

/* ================= RECEIVED CARD ================= */

const ReceivedCard: React.FC<{
  application: Application;
  idea?: StartupIdea;
}> = ({ application, idea }) => {
  const {
    getUserById,
    updateApplicationStatus,
    sendConnectionRequest,
  } = useAppContext();

  const applicantId = getId(application.applicantId);
  const applicant = applicantId ? getUserById(applicantId) : null;

  const position = idea?.positions?.find(
    (p) => getId(p) === getId(application.positionId)
  );

  return (
    <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 space-y-5 font-poppins">

      {/* HEADER */}
      <div className="flex items-center gap-4">

        {applicant && (
          <Link to={`/user/${applicant.id}`}>
            <img
              src={applicant.profilePictureUrl}
              className="w-14 h-14 rounded-2xl object-cover border border-[var(--border-secondary)]"
            />
          </Link>
        )}

        <div className="flex-1">
          <Link
            to={`/user/${applicant?.id}`}
            className="text-lg font-bold text-[var(--text-primary)] hover:text-purple-500 transition"
          >
            {applicant?.name || "User"}
          </Link>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            {applicant?.headline}
          </p>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusStyle(
            application.status
          )}`}
        >
          {application.status}
        </span>
      </div>

      {/* PROJECT INFO */}
      <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
        <Link
          to={`/idea/${getId(idea)}`}
          className="text-base font-bold text-[var(--text-primary)] hover:text-purple-500 transition"
        >
          {idea?.title || "Project"}
        </Link>

        <p className="text-sm text-purple-500 font-bold mt-1">
          Role: {position?.title || "-"}
        </p>

        <p className="text-sm text-[var(--text-secondary)] mt-2">
          {idea?.description || "No description available"}
        </p>
      </div>

      <AnswersBox application={application} />

      <div className="text-xs text-right text-[var(--text-muted)] uppercase tracking-wider">
        {application.createdAt
          ? new Date(application.createdAt).toLocaleDateString()
          : "N/A"}
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */

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
    if (tab === "sent" || tab === "received") setActiveTab(tab);
  }, [location.search]);

  if (!currentUser) return null;

  const findIdea = (app: Application) =>
    startupIdeas.find((i) => getId(i) === getId(app.ideaId));

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-poppins">

      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--background-tertiary)] px-5 py-2 rounded-full border border-[var(--border-primary)]"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Dashboard
      </Link>

      <h1 className="text-4xl font-extrabold text-[var(--text-primary)] tracking-tighter">
        Applications
      </h1>

      <div className="flex justify-center">
        <div className="inline-flex bg-[var(--background-tertiary)] p-1 rounded-full border border-[var(--border-primary)]">
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-10 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
              activeTab === "sent"
                ? "button-gradient text-white"
                : "text-[var(--text-muted)]"
            }`}
          >
            Sent ({sentApplications.length})
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-10 py-2 rounded-full text-xs font-black uppercase tracking-widest ${
              activeTab === "received"
                ? "button-gradient text-white"
                : "text-[var(--text-muted)]"
            }`}
          >
            Received ({receivedApplications.length})
          </button>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {activeTab === "sent"
          ? sentApplications.map((app) => (
              <SentCard
                key={getId(app)}
                application={app}
                idea={findIdea(app)}
              />
            ))
          : receivedApplications.map((app) => (
              <ReceivedCard
                key={getId(app)}
                application={app}
                idea={findIdea(app)}
              />
            ))}
      </div>
    </div>
  );
};