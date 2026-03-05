import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { ChatConversation, User, DetailedMessage } from "../types";
import { ChevronLeftIcon } from "../constants";

//////////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////////

const getInitials = (name?: string): string => {
if (!name) return "U";
const parts = name.match(/\b\w/g) || [];
return parts.join("").substring(0, 2).toUpperCase();
};

//////////////////////////////////////////////////////////
// TEAM PAGE
//////////////////////////////////////////////////////////

export const TeamDetailPage: React.FC = () => {
const { teamId } = useParams<{ teamId: string }>();
const navigate = useNavigate();
const location = useLocation();

const { currentUser, getUserById, addNotification, users } = useAppContext();

const [teamDetails, setTeamDetails] =
useState<(ChatConversation & { members: User[] }) | null>(
location.state?.team || null
);

const [activeTab, setActiveTab] = useState<"media" | "links">("media");

//////////////////////////////////////////////////////////
// FETCH TEAM
//////////////////////////////////////////////////////////

useEffect(() => {
if (!teamId) return;

if (location.state?.team) {
  const raw = location.state.team;

  const members =
    raw.memberIds?.map((id: string) => getUserById(id)).filter(Boolean) ||
    [];

  const adminId =
    raw.adminId ||
    raw.createdBy ||
    members[0]?.id ||
    currentUser?.id ||
    "";

  setTeamDetails({
    ...raw,
    adminId,
    members,
  });
}

}, [teamId, location.state, getUserById, currentUser]);

//////////////////////////////////////////////////////////
// ADMIN CHECK
//////////////////////////////////////////////////////////

const isAdmin =
teamDetails &&
currentUser &&
String(teamDetails.adminId) === String(currentUser.id);

//////////////////////////////////////////////////////////
// MEDIA
//////////////////////////////////////////////////////////

const media = useMemo(() => {
if (!teamDetails) return [];

return (teamDetails.messages || []).filter(
  (m) => m.type === "image" || m.type === "document"
);

}, [teamDetails]);

//////////////////////////////////////////////////////////
// LINKS
//////////////////////////////////////////////////////////

const links = useMemo(() => {
if (!teamDetails) return [];

const urlRegex = /(https?:\/\/[^\s]+)/g;

const all: any[] = [];

(teamDetails.messages || []).forEach((m) => {
  if (m.type === "text" && m.text) {
    const found = m.text.match(urlRegex);
    if (found) {
      found.forEach((url) =>
        all.push({
          url,
          senderId: m.senderId,
          timestamp: m.timestamp,
        })
      );
    }
  }
});

return all;

}, [teamDetails]);

//////////////////////////////////////////////////////////
// LOADING
//////////////////////////////////////////////////////////

if (!teamDetails) {
return (
<div className="flex items-center justify-center h-full">
Loading team...
</div>
);
}

//////////////////////////////////////////////////////////
// PAGE
//////////////////////////////////////////////////////////

return (
<div className="flex flex-col h-full bg-[var(--background-secondary)]">
{/* HEADER */}

  <header className="flex items-center justify-between p-4 border-b border-[var(--border-primary)]">
    <button
      onClick={() => navigate("/messages")}
      className="flex items-center space-x-1 text-sm"
    >
      <ChevronLeftIcon className="w-4 h-4" />
      <span>Back</span>
    </button>

    {isAdmin && (
      <button
        className="text-xs font-bold text-white px-3 py-2 rounded-full button-gradient"
        onClick={() => addNotification("Edit coming soon", "info")}
      >
        Edit Team
      </button>
    )}
  </header>

  {/* MAIN */}

  <main className="p-6 overflow-y-auto flex-grow">
    {/* TEAM INFO */}

    <div className="bg-[var(--component-background)] p-6 rounded-xl border border-[var(--border-primary)] flex items-center gap-6 mb-6">
      <div className="w-20 h-20 rounded-full icon-bg-gradient flex items-center justify-center text-white text-2xl font-bold">
        {getInitials(teamDetails.contact?.name)}
      </div>

      <div>
        <h2 className="text-xl font-bold">
          {teamDetails.contact?.name || "Team"}
        </h2>

        <p className="text-sm text-[var(--text-muted)]">
          {teamDetails.members?.length || 0} Members • Created by{" "}
          {getUserById(teamDetails.adminId)?.name || "Unknown"}
        </p>
      </div>
    </div>

    {/* MEMBERS */}

    <div className="bg-[var(--component-background)] rounded-xl border border-[var(--border-primary)] p-4 mb-6">
      <h3 className="text-xs font-bold uppercase mb-3">
        Members ({teamDetails.members?.length || 0})
      </h3>

      <div className="space-y-2">
        {teamDetails.members?.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--background-tertiary)]"
          >
            <Link
              to={`/user/${member.id}`}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-full icon-bg-gradient flex items-center justify-center text-white text-sm">
                {getInitials(member.name)}
              </div>

              <div>
                <p className="text-sm font-bold">{member.name}</p>

                <p className="text-[10px] text-[var(--text-muted)] uppercase">
                  {member.id === teamDetails.adminId
                    ? "Admin"
                    : "Member"}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>

    {/* MEDIA / LINKS */}

    <div className="bg-[var(--component-background)] rounded-xl border border-[var(--border-primary)]">
      <div className="flex p-2 border-b border-[var(--border-primary)]">
        <button
          className={`flex-1 py-2 text-xs font-bold ${
            activeTab === "media" && "button-gradient text-white rounded-full"
          }`}
          onClick={() => setActiveTab("media")}
        >
          Media ({media.length})
        </button>

        <button
          className={`flex-1 py-2 text-xs font-bold ${
            activeTab === "links" && "button-gradient text-white rounded-full"
          }`}
          onClick={() => setActiveTab("links")}
        >
          Links ({links.length})
        </button>
      </div>

      <div className="p-4">
        {activeTab === "media" && (
          <div className="grid grid-cols-3 gap-3">
            {media.map((m) => (
              <a key={m.id} href={m.file?.url} target="_blank">
                <img
                  src={m.file?.url}
                  className="rounded-lg object-cover"
                />
              </a>
            ))}
          </div>
        )}

        {activeTab === "links" && (
          <div className="space-y-3">
            {links.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                className="block text-sm text-sky-500 hover:underline"
              >
                {l.url}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  </main>
</div>

);
};