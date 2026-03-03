import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { User } from '../types';

const ConnectionRequestToast: React.FC<{
  requesterId: string;
  onDismiss: (id: string) => void;
}> = ({ requesterId, onDismiss }) => {

const { users, acceptConnectionRequest, fetchUserProfile } = useAppContext();
const [requester, setRequester] = useState<User | undefined>(users.find(u => u.id === requesterId));
const [isAccepted, setIsAccepted] = useState(false);

useEffect(() => {  
    if (!requester) {  
        fetchUserProfile(requesterId).then((u) => {  
            if (u) setRequester(u);  
        });  
    }  
}, [requesterId, requester, fetchUserProfile]);  

const handleAccept = async () => {  
    await acceptConnectionRequest(requesterId);  
    setIsAccepted(true);  
};  

if (!requester || isAccepted) return null;  

return (  
    <div className="pointer-events-auto bg-white dark:bg-neutral-900 px-3 py-2 rounded-full shadow-md border border-purple-500/20 flex items-center gap-3 w-fit max-w-[320px] animate-in slide-in-from-right-full duration-300">
        
        <img   
            src={requester.profilePictureUrl || "https://www.gravatar.com/avatar/?d=mp"}   
            alt={requester.name}   
            className="w-8 h-8 rounded-full object-cover border border-purple-100"   
        />  

        <div className="overflow-hidden">  
            <p className="text-[8px] font-black uppercase tracking-widest text-purple-600 leading-none">New Request</p>  
            <p className="text-xs font-bold text-[var(--text-primary)] truncate leading-none">{requester.name}</p>  
        </div>  

        <button  
            onClick={handleAccept}  
            className="bg-purple-600 hover:bg-purple-700 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-colors"  
        >  
            Accept  
        </button>  

        <button  
  onClick={() => onDismiss(requesterId)}  
  className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-black/10 transition text-[10px]"  
>  
  ✕  
</button>
    </div>  
);

};


// ================= MAIN NOTIFICATION AREA =================

const NotificationArea: React.FC = () => {
const { notifications, removeNotification, currentUser, fetchCurrentUser } = useAppContext();

useEffect(() => {
  if (!currentUser) return;

  const interval = setInterval(() => {
    fetchCurrentUser();
  }, 5000); // every 5 sec

  return () => clearInterval(interval);
}, [currentUser]);

const storageKey = currentUser?.id
  ? `dismissedConnectionToasts_${currentUser.id}`
  : null;

const [dismissedRequests, setDismissedRequests] = useState<string[]>([]);

useEffect(() => {
  if (!storageKey) return;

  try {
    const stored = localStorage.getItem(storageKey);
    setDismissedRequests(stored ? JSON.parse(stored) : []);
  } catch {
    setDismissedRequests([]);
  }
}, [storageKey]);

useEffect(() => {
  console.log("Updated connectionRequests:", currentUser?.connectionRequests);
}, [currentUser?.connectionRequests]);

const connectionIds = currentUser?.connectionRequests 
  ? [...currentUser.connectionRequests] 
  : [];

const pendingRequests = connectionIds.filter(
  id => !dismissedRequests.includes(id)
);

if (pendingRequests.length === 0 && notifications.length === 0) {
  return null;
}

return (
<div className="fixed top-20 right-6 space-y-2 z-[2000] flex flex-col items-end">

  {pendingRequests.map((requestId: string) => (  
  <ConnectionRequestToast
    key={requestId}
    requesterId={requestId}
    onDismiss={(id) => {
      const updated = [...dismissedRequests, id];
      setDismissedRequests(updated);

      if (storageKey) {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      }
    }}
  />
))}

  {notifications.map((notification) => (  
    <div  
      key={notification.id}  
      role="alert"  
      aria-live="assertive"  
      className={`pointer-events-auto flex items-center gap-2 px-5 py-2 rounded-full shadow-lg animate-in slide-in-from-right-full duration-300
        ${notification.type === 'error' 
          ? 'bg-red-500 text-white' 
          : notification.type === 'success' 
          ? 'button-gradient text-white'
          : 'bg-white dark:bg-neutral-900 text-[var(--text-primary)] border border-gray-200 dark:border-neutral-700'
        }`}  
    >  

      <p className="text-[10px] font-black uppercase tracking-widest">
        {notification.message}
      </p>  
        
      <button  
        onClick={() => removeNotification(notification.id)}  
        className="ml-1 w-4 h-4 flex items-center justify-center rounded-full hover:bg-black/20 transition text-[11px]"  
        aria-label="Close notification"  
      >  
        ✕  
      </button>  

    </div>  
  ))}  

</div>
);
};

export default NotificationArea;