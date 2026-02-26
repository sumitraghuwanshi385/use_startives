import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { User } from '../types';

const ConnectionRequestToast: React.FC<{ requesterId: string }> = ({ requesterId }) => {
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
    <div className="pointer-events-auto bg-white dark:bg-neutral-900 px-5 py-3 rounded-full shadow-xl border border-purple-500/20 flex items-center gap-4 w-[360px] animate-in slide-in-from-right-full duration-300">  
        
        <img   
            src={requester.profilePictureUrl || "https://www.gravatar.com/avatar/?d=mp"}   
            alt={requester.name}   
            className="w-10 h-10 rounded-full object-cover border border-purple-100"   
        />  

        <div className="flex-grow overflow-hidden">  
            <p className="text-xs font-black uppercase tracking-widest text-purple-600 mb-0.5">New Request</p>  
            <p className="text-sm font-bold text-[var(--text-primary)] leading-none truncate">{requester.name}</p>  
            <p className="text-[10px] text-[var(--text-secondary)] truncate">{requester.headline || "Innovator"}</p>  
        </div>  

        <button  
            onClick={handleAccept}  
            className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full transition-colors shadow-md"  
        >  
            Accept  
        </button>  

        <button  
            onClick={() => setIsAccepted(true)}   
            className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 transition"  
        >  
            ✕  
        </button>  

    </div>  
);

};

// ================= MAIN NOTIFICATION AREA =================

const NotificationArea: React.FC = () => {
const { notifications, removeNotification, currentUser } = useAppContext();

const pendingRequests = currentUser?.connectionRequests || [];

if (notifications.length === 0 && pendingRequests.length === 0) {
return null;
}

return (
<div className="fixed top-20 right-6 space-y-3 z-[2000] flex flex-col items-end pointer-events-none">

  {/* Connection Requests */}  
  {pendingRequests.map((requestId: string) => (  
      <ConnectionRequestToast key={requestId} requesterId={requestId} />  
  ))}  

  {/* System Notifications */}  
  {notifications.map((notification) => (  
    <div  
      key={notification.id}  
      role="alert"  
      aria-live="assertive"  
      className={`pointer-events-auto flex items-center justify-between gap-4 px-6 py-3 rounded-full shadow-lg border backdrop-blur-md animate-in slide-in-from-right-full duration-300 min-w-[280px] max-w-[400px]
        ${notification.type === 'error' ? 'bg-red-500/90 border-red-400 text-white' :   
          notification.type === 'success' ? 'button-gradient border-white/20 text-white' :   
          'bg-white/90 dark:bg-neutral-800/90 border-gray-200 dark:border-gray-700 text-black dark:text-white'}`}  
    >  

      {/* LEFT ICON REMOVED HERE */}

      <p className="text-[10px] font-black uppercase tracking-widest truncate flex-grow">{notification.message}</p>  
        
      <button  
        onClick={() => removeNotification(notification.id)}  
        className="w-6 h-6 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors"  
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