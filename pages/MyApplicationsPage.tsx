import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { Application, StartupIdea } from "../types";
import { ChevronLeftIcon, IdentificationIcon } from "../constants";

/* ================= SAFE ID ================= */

const getId = (val: any) => {
  if (!val) return null;
  if (typeof val === "string") return val;
  if (typeof val === "object") {
    return val._id?.toString?.() || val.id?.toString?.() || val.toString?.();
  }
  return val.toString();
};

/* ================= STATUS ================= */

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
        className="px-4 py-1.5 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-300 flex items-center gap-2 font-poppins"
      >
        <IdentificationIcon className="w-4 h-4" />
        {application.answers.length} answers
      </button>

      {open && (
        <div className="mt-4 space-y-3 bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)]">
          {application.answers.map((qa, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
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

const SentCard: React.FC<{ application: Application; idea?: StartupIdea }> = ({
  application,
  idea,
}) => {
  const { getUserById, sendConnectionRequest, currentUser } = useAppContext();

  if (!idea) return null;

  const founder =
    idea?.founderId ? getUserById(getId(idea.founderId)) : null;

  const position = idea?.positions?.find(
    (p) => getId(p) === getId(application.positionId)
  );

  const isConnected =
    founder && currentUser?.connections?.includes(founder.id);

  return (
    <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 space-y-5 font-poppins">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {idea?.imageUrl && (
            <Link to={`/idea/${getId(idea)}`}>
              <img
                src={idea.imageUrl}
                className="w-12 h-12 rounded-2xl object-cover"
              />
            </Link>
          )}

          <Link
            to={`/idea/${getId(idea)}`}
            className="text-lg font-semibold text-[var(--text-primary)]"
          >
            {idea.title}
          </Link>
        </div>

        <span
          className={`px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
            application.status
          )}`}
        >
          {application.status}
        </span>
      </div>

      {/* ROLE */}
      <p className="text-sm text-purple-500 font-semibold">
        role applied: {position?.title || "-"}
      </p>

      {/* USER APPLY MESSAGE */}
      <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)] space-y-2">
        <p className="text-xs font-semibold text-purple-500">
          Applicant Cover Letter
        </p>
        <p className="text-sm text-[var(--text-secondary)]">
          {application.coverLetter}
        </p>
      </div>

      <AnswersBox application={application} />

      {/* ACCEPTED ACTIONS */}
      {application.status === "Accepted" && founder && (
        <div className="flex gap-3">
          {isConnected ? (
            <div className="flex-1 py-2 rounded-full button-gradient text-white text-xs font-semibold text-center">
              Connected
            </div>
          ) : (
            <button
              onClick={() => sendConnectionRequest(founder.id)}
              className="flex-1 py-2 rounded-full bg-purple-600 text-white text-xs font-semibold"
            >
              Add Connection
            </button>
          )}

          <Link
            to={`/messages?chatWith=${founder.id}`}
            className="flex-1 py-2 rounded-full bg-sky-600 text-white text-xs font-semibold text-center"
          >
           Message
          </Link>
        </div>
      )}

      {/* FOOTER */}
      <div className="flex justify-between items-end pt-2">

        {founder && (
          <div className="flex items-center gap-3">
            <Link to={`/user/${founder.id}`}>
              <img
                src={founder.profilePictureUrl}
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
            <div>
              <Link
                to={`/user/${founder.id}`}
                className="text-sm font-semibold text-[var(--text-primary)]"
              >
                {founder.name}
              </Link>
              <p className="text-sm text-purple-500">
                {founder.headline}
              </p>
            </div>
          </div>
        )}

        <div className="text-xs text-[var(--text-muted)]">
          {application.createdAt
            ? new Date(application.createdAt).toLocaleDateString()
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

/* ================= RECEIVED CARD ================= */
const ReceivedCard: React.FC<{ application: Application; idea?: StartupIdea }> =
  ({ application, idea }) => {
    const {
      getUserById,
      updateApplicationStatus,
      sendConnectionRequest,
      currentUser,
    } = useAppContext();

    const applicant =
      application?.applicantId
        ? getUserById(getId(application.applicantId))
        : null;

    const position = idea?.positions?.find(
      (p) => getId(p) === getId(application.positionId)
    );

    const isConnected =
      applicant && currentUser?.connections?.includes(applicant.id);

    return (
      <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-3xl p-6 space-y-5 font-poppins">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">
            {applicant && (
              <Link to={`/user/${applicant.id}`}>
                <img
                  src={applicant.profilePictureUrl}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </Link>
            )}

            <div>
              <Link
                to={`/user/${applicant?.id}`}
                className="text-sm font-semibold text-[var(--text-primary)]"
              >
                {applicant?.name}
              </Link>
              <p className="text-sm text-purple-500">
                {applicant?.headline}
              </p>
            </div>
          </div>

          <span
            className={`px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusStyle(
              application.status
            )}`}
          >
            {application.status}
          </span>
        </div>

        {/* ROLE */}
        <p className="text-sm text-purple-500 font-semibold">
          role: {position?.title || "-"}
        </p>

        {/* USER APPLY MESSAGE */}
        <div className="bg-[var(--background-tertiary)] p-4 rounded-2xl border border-[var(--border-primary)] space-y-2">
          <p className="text-xs font-semibold text-purple-500">
            Applicant Cover Letter
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {application.coverLetter}
          </p>
        </div>

        <AnswersBox application={application} />

        {application.status === "Pending" && (
          <div className="flex gap-3">
            <button
              onClick={() =>
                updateApplicationStatus(application.id, "Rejected")
              }
              className="flex-1 py-2 rounded-full bg-red-600 text-white text-xs font-semibold"
            >
              Reject
            </button>

            <button
              onClick={() =>
                updateApplicationStatus(application.id, "Accepted")
              }
              className="flex-1 py-2 rounded-full bg-emerald-600 text-white text-xs font-semibold"
            >
              Accept
            </button>
          </div>
        )}

        {application.status === "Accepted" && applicant && (
          <div className="flex gap-3">
            {isConnected ? (
              <div className="flex-1 py-2 rounded-full button-gradient text-white text-xs font-semibold text-center">
                Connected
              </div>
            ) : (
              <button
                onClick={() => sendConnectionRequest(applicant.id)}
                className="flex-1 py-2 rounded-full bg-purple-600 text-white text-xs font-semibold"
              >
                Add Connection
              </button>
            )}

            <Link
              to={`/messages?chatWith=${applicant.id}`}
              className="flex-1 py-2 rounded-full bg-sky-600 text-white text-xs font-semibold text-center"
            >
              Message
            </Link>
          </div>
        )}

        <div className="text-xs text-right text-[var(--text-muted)]">
          {application.createdAt
            ? new Date(application.createdAt).toLocaleDateString()
            : "N/A"}
        </div>
      </div>
    );
  };

/* ================= MAIN ================= */

export const MyApplicationsPage: React.FC = () => {
  const { sentApplications, receivedApplications, startupIdeas, currentUser } =
    useAppContext();

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
        className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] bg-[var(--background-tertiary)] px-5 py-2 rounded-full border border-[var(--border-primary)]"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Dashboard
      </Link>

      <div>
        <h1 className="text-4xl font-extrabold text-[var(--text-primary)]">
          Applications
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Track your sent applications and manage incoming requests.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="inline-flex bg-[var(--background-tertiary)] p-1 rounded-full border border-[var(--border-primary)]">
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-10 py-2 rounded-full text-xs font-semibold ${
              activeTab === "sent"
                ? "button-gradient text-white"
                : "text-[var(--text-muted)]"
            }`}
          >
            Sent ({sentApplications.length})
          </button>
          <button
            onClick={() => setActiveTab("received")}
            className={`px-10 py-2 rounded-full text-xs font-semibold ${
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
              <SentCard key={getId(app)} application={app} idea={findIdea(app)} />
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