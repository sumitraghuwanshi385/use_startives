import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Application, StartupIdea, User } from "../types";
import { ChevronLeftIcon, IdentificationIcon } from "../constants";

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

  const answers =
    application.answers ||
    (application as any).questionsAnswers ||
    [];

  if (!answers || answers.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2"
      >
        <IdentificationIcon className="w-4 h-4" />
        {answers.length} Answers
      </button>

      {open && (
        <div className="mt-4 space-y-3 bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
          {answers.map((qa: any, i: number) => (
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

  const applicant: User | undefined =
    application.applicantEmail
      ? getUserById(application.applicantEmail, "email")
      : (application as any).applicantId
      ? getUserById((application as any).applicantId)
      : undefined;

  const position = idea?.positions?.find(
    (p: any) =>
      String(p.id) === String(application.positionId) ||
      String(p._id) === String(application.positionId)
  );

  return (
    <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 space-y-5 font-poppins">

      <div className="flex items-center gap-4">
        <Link to={`/user/${applicant?.id || ""}`}>
          <img
            src={applicant?.profilePictureUrl || ""}
            className="w-14 h-14 rounded-2xl object-cover border border-[var(--border-secondary)]"
          />
        </Link>

        <div className="flex-1">
          <Link
            to={`/user/${applicant?.id || ""}`}
            className="text-lg font-bold text-[var(--text-primary)] hover:text-purple-500"
          >
            {applicant?.name || "User"}
          </Link>
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
            {applicant?.headline || ""}
          </p>
        </div>

        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusStyle(application.status)}`}>
          {application.status}
        </span>
      </div>

      <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
        <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold">
          Applied For
        </p>
        <h4 className="text-base font-bold text-[var(--text-primary)]">
          {idea?.title || "Project"}
        </h4>
        <p className="text-sm text-[var(--text-secondary)] mt-2">
          {idea?.description || idea?.tagline || "No description available"}
        </p>
        <p className="text-xs text-purple-500 font-bold mt-2">
          Role: {position?.title || ""}
        </p>
      </div>

      <AnswersBox application={application} />

      {application.status === "Pending" && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => updateApplicationStatus(application.id, "Rejected")}
            className="flex-1 py-2 rounded-full bg-red-600 text-white text-xs font-bold uppercase"
          >
            Reject
          </button>
          <button
            onClick={() => updateApplicationStatus(application.id, "Accepted")}
            className="flex-1 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase"
          >
            Accept
          </button>
        </div>
      )}

      {application.status === "Accepted" && (
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => sendConnectionRequest(applicant?.id)}
            className="flex-1 py-2 rounded-full bg-purple-600 text-white text-xs font-bold uppercase"
          >
            Send Request
          </button>
          <Link
            to={`/messages?chatWith=${applicant?.id}`}
            className="flex-1 py-2 rounded-full bg-sky-600 text-white text-xs font-bold uppercase text-center"
          >
            Message
          </Link>
        </div>
      )}

      <div className="text-xs text-right text-[var(--text-muted)] uppercase tracking-wider">
        {application.createdAt
          ? new Date(application.createdAt).toLocaleDateString()
          : application.submittedDate
          ? new Date(application.submittedDate).toLocaleDateString()
          : "N/A"}
      </div>
    </div>
  );
};

/* ================= SENT CARD ================= */

const SentCard: React.FC<{
  application: Application;
  idea?: StartupIdea;
}> = ({ application, idea }) => {
  const { getUserById } = useAppContext();

  const founder: User | undefined =
    idea?.founderEmail
      ? getUserById(idea.founderEmail, "email")
      : (idea as any)?.founderId
      ? getUserById((idea as any).founderId)
      : undefined;

  const position = idea?.positions?.find(
    (p: any) =>
      String(p.id) === String(application.positionId) ||
      String(p._id) === String(application.positionId)
  );

  return (
    <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 space-y-5 font-poppins">

      <div className="flex items-center gap-4">
        <Link to={`/idea/${idea?.id || ""}`}>
          <img
            src={idea?.imageUrl || ""}
            className="w-14 h-14 rounded-2xl object-cover border border-[var(--border-secondary)]"
          />
        </Link>

        <div className="flex-1">
          <Link
            to={`/idea/${idea?.id || ""}`}
            className="text-lg font-bold text-[var(--text-primary)] hover:text-purple-500"
          >
            {idea?.title || "Project"}
          </Link>
        </div>

        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${getStatusStyle(application.status)}`}>
          {application.status}
        </span>
      </div>

      <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)] space-y-2">
        <p className="text-sm text-[var(--text-secondary)]">
          {idea?.description || idea?.tagline || "No description available"}
        </p>
        <p className="text-xs text-purple-500 font-bold">
          Role Applied: {position?.title || ""}
        </p>
      </div>

      <AnswersBox application={application} />

      <div className="flex justify-between items-center text-xs text-[var(--text-muted)] uppercase tracking-wider">
        <Link to={`/user/${founder?.id || ""}`} className="hover:text-purple-500">
          {founder?.name || ""}
        </Link>
        <span>
          {application.createdAt
            ? new Date(application.createdAt).toLocaleDateString()
            : application.submittedDate
            ? new Date(application.submittedDate).toLocaleDateString()
            : "N/A"}
        </span>
      </div>
    </div>
  );
};

/* ================= MAIN PAGE ================= */

export const MyApplicationsPage: React.FC = () => {
  const {
    sentApplications = [],
    receivedApplications = [],
    startupIdeas = [],
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
                key={app.id}
                application={app}
                idea={startupIdeas.find(
                  (i: any) =>
                    String(i.id) === String(app.ideaId) ||
                    String(i._id) === String(app.ideaId)
                )}
              />
            ))
          : receivedApplications.map((app) => (
              <ReceivedCard
                key={app.id}
                application={app}
                idea={startupIdeas.find(
                  (i: any) =>
                    String(i.id) === String(app.ideaId) ||
                    String(i._id) === String(app.ideaId)
                )}
              />
            ))}
      </div>
    </div>
  );
};