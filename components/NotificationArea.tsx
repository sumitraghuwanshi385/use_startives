import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { User } from '../types';


// ================= CONNECTION REQUEST TOAST =================

const ConnectionRequestToast: React.FC<{ requesterId: string }> = ({ requesterId }) => {
    const { users, acceptConnectionRequest, fetchUserProfile } = useAppContext();
    const [requester, setRequester] = useState<User | undefined>(users.find(u => u.id === requesterId));
    const [isClosed, setIsClosed] = useState(false);

    useEffect(() => {
        if (!requester) {
            fetchUserProfile(requesterId).then((u) => {
                if (u) setRequester(u);
            });
        }
    }, [requesterId, requester, fetchUserProfile]);

    const handleAccept = async () => {
        await acceptConnectionRequest(requesterId);
        setIsClosed(true);
    };

    if (!requester || isClosed) return null;

    return (
        <div className="pointer-events-auto bg-white dark:bg-neutral-900 
        px-4 py-3 rounded-full shadow-xl border border-purple-500/20 
        flex items-center gap-4 w-[340px] animate-in slide-in-from-right-full duration-300">

            <img 
                src={requester.profilePictureUrl || "https://www.gravatar.com/avatar/?d=mp"} 
                alt={requester.name} 
                className="w-10 h-10 rounded-full object-cover" 
            />

            <div className="flex-grow overflow-hidden">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">
                    {requester.name}
                </p>
                <p className="text-[10px] text-[var(--text-secondary)] truncate">
                    Sent you a connection request
                </p>
            </div>

            <button
                onClick={handleAccept}
                className="bg-purple-600 hover:bg-purple-700 
                text-white text-[10px] font-bold px-4 py-1.5 
                rounded-full transition-all"
            >
                Accept
            </button>

            <button
                onClick={() => setIsClosed(true)}
                className="w-6 h-6 flex items-center justify-center 
                rounded-full hover:bg-black/10 transition"
            >
                ✕
            </button>
        </div>
    );
};


// ================= SYSTEM NOTIFICATIONS =================

const NotificationArea: React.FC = () => {
  const { notifications, removeNotification, currentUser } = useAppContext();

  const pendingRequests = currentUser?.connectionRequests || [];

  if (notifications.length === 0 && pendingRequests.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-20 right-6 space-y-3 z-[2000] 
    flex flex-col items-end pointer-events-none">

      {/* Connection Requests */}
      {pendingRequests.map((requestId: string) => (
          <ConnectionRequestToast key={requestId} requesterId={requestId} />
      ))}

      {/* System Notifications */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          role="alert"
          className={`pointer-events-auto flex items-center 
          justify-between gap-4 px-5 py-3 
          rounded-full shadow-xl border 
          animate-in slide-in-from-right-full duration-300
          min-w-[280px] max-w-[380px]
          
          ${notification.type === 'error'
            ? 'bg-red-500 text-white border-red-400'
            : notification.type === 'success'
            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-white/20'
            : 'bg-white dark:bg-neutral-900 text-[var(--text-primary)] border-gray-200 dark:border-neutral-700'
          }`}
        >

          <p className="text-[11px] font-semibold truncate flex-grow">
            {notification.message}
          </p>

          <button
            onClick={() => removeNotification(notification.id)}
            className="w-6 h-6 flex items-center justify-center 
            rounded-full hover:bg-black/20 transition"
          >
            ✕
          </button>
        </div>
      ))}

    </div>
  );
};

export default NotificationArea;