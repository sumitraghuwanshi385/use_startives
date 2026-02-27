import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback, useMemo } from 'react';
import axios from 'axios';
import { StartupIdea, Application, AppSystemNotification, AppContextType, User, Position, UserProfileUpdate, AppNotification, NotificationCategory, Startalk } from '../types';
import { MOCK_USERS_RAW, EnvelopeOpenIcon } from '../constants';

// Set credentials for cross-origin (production)
axios.defaults.baseURL = 'https://startives.onrender.com';
axios.defaults.withCredentials = true;

// --- Initial Mock Notifications ---
const INITIAL_APP_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'appReceived1',
    category: 'applications_to_my_project' as NotificationCategory,
    icon: React.createElement(EnvelopeOpenIcon, { className: 'w-5 h-5 text-sky-500' }),
    title: 'New Application: EcoRoute Planner',
    description: 'John Smith applied for "Lead Frontend Developer". View their application.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: false,
    status: 'pending',
    relatedProjectId: 'idea-1-mock',
    relatedUserId: 'user-john-smith',
    relatedApplicationId: 'app-mock-1',
  },
];

const INITIAL_APPLICATIONS: Application[] = [];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [startupIdeas, setStartupIdeas] = useState<StartupIdea[]>([]);
  const [startalks, setStartalks] = useState<Startalk[]>([]);
  const [sentApplications, setSentApplications] = useState<Application[]>([]);
const [receivedApplications, setReceivedApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<AppSystemNotification[]>([]);
  const [appNotifications, setAppNotifications] = useState<AppNotification[]>(INITIAL_APP_NOTIFICATIONS);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Start empty; fill from backend
  const [users, setUsers] = useState<User[]>([]);
  
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true);
  const [authLoadingState, setAuthLoadingState] = useState({ isLoading: false, messages: [] as string[] });
  
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [pendingVerificationUser, setPendingVerificationUser] = useState<{email: string; code: string} | null>(null);
  
  const [sentConnectionRequests, setSentConnectionRequests] = useState<string[]>([]);
  const [connectedUserIds, setConnectedUserIds] = useState<string[]>([]);

  // ---------------- NOTIFICATIONS ----------------
  const addNotificationCallBack = useCallback((message: string, type: AppSystemNotification['type']) => {
    const newNotification: AppSystemNotification = {
      id: new Date().toISOString() + Math.random(),
      message,
      type,
    };
    setNotifications(prev => [...prev, newNotification]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const markNotificationAsRead = (id: string) => {
    setAppNotifications(prev => prev.map(n => n.id === id ? {...n, isRead: true} : n));
  };

  const markAllNotificationsAsRead = (cat?: NotificationCategory) => {
    if (cat) setAppNotifications(prev => prev.map(n => n.category === cat ? {...n, isRead: true} : n));
    else setAppNotifications(prev => prev.map(n => ({...n, isRead: true})));
  };

  const getAuthToken = () => token || localStorage.getItem('authToken');

  // ---------------- CONNECTIONS ----------------
  const fetchConnections = useCallback(async () => {
    const t = getAuthToken();
    if (!t) return;

    try {
      const res = await axios.get('/api/connections', {
        headers: { Authorization: `Bearer ${t}` },
      });

      if (res.data?.success) {
        const backendUsers = res.data.connections || [];
        const ids = backendUsers.map((u: any) => u.id || u._id).filter(Boolean);
        setConnectedUserIds(ids);

        setUsers(prev => {
          const existing = new Set(prev.map(u => u.id));
          const mapped: User[] = backendUsers.map((u: any) => ({
            id: u.id || u._id,
            name: u.name || '',
            email: u.email || '',
            headline: u.headline,
            country: u.country,
            bio: u.bio,
            profilePictureUrl: u.profilePictureUrl || '',
            skills: u.skills || [],
            interests: u.interests || [],
            socialLinks: u.socialLinks || {},
            savedProjectIds: u.savedProjectIds || [],
            connections: u.connections || [],
            connectionRequests: u.connectionRequests || [],
            sentRequests: u.sentRequests || []
          }));
          const add = mapped.filter(u => !existing.has(u.id));
          return [...prev, ...add];
        });
      }
    } catch (err) {
      console.error('fetchConnections failed', err);
    }
  }, [token]);

  // ---------------- AUTH (FIXED) ----------------
  const login = async (credential: string, password?: string, fromSignup: boolean = false): Promise<boolean> => {
    setAuthLoadingState({ isLoading: true, messages: ["Authenticating..."]});
    try {
      const response = await axios.post('/api/auth/login', { email: credential, password });
      
      // ✅ Build Fix: Check failure first
      if (!response.data?.success) {
        addNotificationCallBack(response.data?.message || 'Login failed.', 'error');
        return false;
      }

      // Success path
      const { token: newToken } = response.data;

// Save token first
localStorage.setItem('authToken', newToken);
setToken(newToken);

// 🔥 Fetch fresh user from backend
const meRes = await axios.get('/api/auth/users/' + response.data.user.id);

if (meRes.data?.success) {
  const freshUser = meRes.data.user;

  setCurrentUser(freshUser);
  localStorage.setItem('user', JSON.stringify(freshUser));

  if (freshUser?.sentRequests) setSentConnectionRequests(freshUser.sentRequests);
  if (freshUser?.connections) setConnectedUserIds(freshUser.connections);
}

await fetchConnections();

setShowOnboardingModal(fromSignup || !response.data.user?.headline);
return true;
    } catch (error: any) {
      console.error("Login API Error:", error);
      addNotificationCallBack(error.response?.data?.message || 'Something went wrong.', 'error');
      return false;
    } finally {
      setAuthLoadingState({ isLoading: false, messages: [] });
    }
  };

  const signup = async (email: string, password?: string): Promise<boolean> => {
    setAuthLoadingState({ isLoading: true, messages: ["Creating account..."]});
    try {
      const response = await axios.post('/api/auth/signup', { email, password });
      if (response.data.success) {
        setPendingVerificationUser({ email, code: response.data.verificationCode });
        addNotificationCallBack(`Verification code sent to ${email}.`, 'info');
        return true;
      }
      addNotificationCallBack(response.data.message || 'Signup failed.', 'error');
      return false;
    } catch (error: any) {
      console.error("Signup API Error:", error);
      addNotificationCallBack(error.response?.data?.message || 'Something went wrong.', 'error');
      return false;
    } finally {
      setAuthLoadingState({ isLoading: false, messages: [] });
    }
  };
  
  const verifyAndLogin = async (code: string): Promise<boolean> => {
    setAuthLoadingState({ isLoading: true, messages: ["Verifying..."]});
    try {
        if (pendingVerificationUser && pendingVerificationUser.code === code) {
            await login(pendingVerificationUser.email, 'password123', true); 
            setPendingVerificationUser(null);
            return true;
        }
        addNotificationCallBack("Invalid verification code.", "error");
        return false;
    } finally {
        setAuthLoadingState({ isLoading: false, messages: [] });
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
    setConnectedUserIds([]);
    setSentConnectionRequests([]);
    setUsers([]);
  };
  
  const updateUser = async (updates: UserProfileUpdate): Promise<boolean> => {
    if (!currentUser) return false;
    
    const currentToken = getAuthToken();
    if (!currentToken) {
        addNotificationCallBack("You are not logged in. Please refresh.", "error");
        return false;
    }

    setAuthLoadingState({ isLoading: true, messages: ["Updating profile..."] });
    try {
        const response = await axios.put('/api/auth/profile', { id: currentUser.id, ...updates }, {
            headers: { Authorization: `Bearer ${currentToken}`, 'Content-Type': 'application/json' }
        });
        
        if (response.data.success) {
            const updatedUserData = response.data.user;
            setCurrentUser(updatedUserData);
            localStorage.setItem('user', JSON.stringify(updatedUserData));
            setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUserData : u));
            return true;
        }
        addNotificationCallBack("Failed to update profile.", "error");
        return false;
    } catch (error: any) {
        console.error("Update Profile Error:", error);
        addNotificationCallBack(error.response?.data?.message || "Something went wrong.", "error");
        return false;
    } finally {
        setAuthLoadingState({ isLoading: false, messages: [] });
    }
  };

  // ---------------- IDEAS ----------------
  const addIdea = async (ideaData: any) => {
  if (!currentUser) return false;

  const t = getAuthToken();
  if (!t) return false;

  setAuthLoadingState({ isLoading: true, messages: ["Launching project..."] });

  try {
    const response = await axios.post(
      '/api/ideas',
      ideaData,
      { headers: { Authorization: `Bearer ${t}` } }
    );

    if (response.data?.success) {
      // 🔥 Important: use backend returned idea
      setStartupIdeas(prev => [response.data.idea, ...prev]);

      addNotificationCallBack("Project launched successfully!", "success");
      return true;
    }

    return false;
  } catch (error: any) {
    console.error("Add Idea Error:", error);
    addNotificationCallBack(
      error.response?.data?.message || "Failed to launch project.",
      "error"
    );
    return false;
  } finally {
    setAuthLoadingState({ isLoading: false, messages: [] });
  }
};
  const updateIdea = () => {};
  const deleteIdea = () => {};

  // ---------------- STARTALKS ----------------
  const addStartalk = async (content: string, imageUrl?: string) => {
      if (!currentUser) return;
      const t = getAuthToken();
      try {
          const response = await axios.post('/api/startalks', { content, imageUrl }, { headers: { Authorization: `Bearer ${t}` } });
          if (response.data.success) {
              setStartalks(prev => [response.data.startalk, ...prev]);
              addNotificationCallBack("Post shared!", "success");
          }
      } catch (error) { addNotificationCallBack("Failed to post.", "error"); }
  };

  const deleteStartalk = async (talkId: string) => { 
      const t = getAuthToken();
      try {
        await axios.delete(`/api/startalks/${talkId}`, { headers: { Authorization: `Bearer ${t}` } });
        setStartalks(prev => prev.filter(talk => talk.id !== talkId));
        addNotificationCallBack("Post removed.", "info");
    } catch (error) { addNotificationCallBack("Failed to delete post.", "error"); }
  };

  const reactToStartalk = async (talkId: string, emoji: string) => {
      if (!currentUser) return;
      const t = getAuthToken();

      setStartalks(prev => prev.map(talk => {
        if (talk.id === talkId) {
          const reactions = { ...(talk.reactions || {}) };
          const userReactions = { ...(talk.userReactions || {}) };
          const oldEmoji = userReactions[currentUser.id];
          
          if (oldEmoji === emoji) {
             reactions[emoji] = Math.max(0, (reactions[emoji] || 0) - 1);
             if (reactions[emoji] === 0) delete reactions[emoji];
             delete userReactions[currentUser.id];
             return { ...talk, reactions, userReactions, currentUserReaction: undefined };
          } else {
             if (oldEmoji) {
                reactions[oldEmoji] = Math.max(0, (reactions[oldEmoji] || 0) - 1);
                if (reactions[oldEmoji] === 0) delete reactions[oldEmoji];
             }
             reactions[emoji] = (reactions[emoji] || 0) + 1;
             userReactions[currentUser.id] = emoji;
             return { ...talk, reactions, userReactions, currentUserReaction: emoji };
          }
        }
        return talk;
      }));

      try {
        const response = await axios.post(`/api/startalks/${talkId}/react`, { emoji }, { headers: { Authorization: `Bearer ${t}` } });
        if (response.data.success) {
            const updatedTalk = response.data.startalk;
            const myReaction = updatedTalk.userReactions ? updatedTalk.userReactions[currentUser.id] : undefined;
            setStartalks(prev => prev.map(t => t.id === talkId ? { ...updatedTalk, currentUserReaction: myReaction } : t));
        }
      } catch (error) { console.error("Reaction failed:", error); }
  };

  // ---------------- USER HELPERS ----------------
  const getIdeaById = (id: string) => startupIdeas.find(idea => idea.id === id);
  const getPositionById = (ideaId: string, positionId: string) => {
  const idea = getIdeaById(ideaId);
  if (!idea || !idea.positions) return undefined;

  return idea.positions.find(
    (pos: any) =>
      pos.id === positionId ||
      pos._id === positionId ||
      pos.id?.toString() === positionId ||
      pos._id?.toString() === positionId
  );
};
  const getUserById = useCallback((identifier: string, by: 'id' | 'email' = 'id') => {
    const allUsers = [...users];
    if (currentUser && !allUsers.find(u => u.id === currentUser.id)) allUsers.push(currentUser);
    return by === 'id' ? allUsers.find(u => u.id === identifier) : allUsers.find(u => u.email === identifier);
  }, [users, currentUser]);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
        const res = await axios.get(`/api/auth/users/${userId}`);
        if (res.data?.success) {
            const fetchedUser = res.data.user;
            setUsers(prev => {
                if (prev.find(u => u.id === fetchedUser.id)) return prev;
                return [...prev, fetchedUser];
            });
            return fetchedUser;
        }
    } catch (error) { console.error("Fetch User Error:", error); }
    return null;
  }, []);

  // ---------------- INTERACTIONS ----------------
  const sendConnectionRequest = async (targetUserId: string) => {
    if (!currentUser) return;
    const t = getAuthToken();
    try {
        const res = await axios.post(`/api/connections/request/${targetUserId}`, {}, { headers: { Authorization: `Bearer ${t}` } });
        if (res.data?.success) {
            setSentConnectionRequests(prev => [...prev, targetUserId]);
            addNotificationCallBack("Connection request sent!", "success");
        }
    } catch (error: any) {
        addNotificationCallBack(error.response?.data?.message || "Failed to send request.", "error");
    }
  };

  const acceptConnectionRequest = async (requesterId: string) => {
    if (!currentUser) return;
    const t = getAuthToken();
    try {
        const res = await axios.post(`/api/connections/accept/${requesterId}`, {}, { headers: { Authorization: `Bearer ${t}` } });
        if (res.data?.success) {
            addNotificationCallBack("You are now connected!", "success");
            await fetchConnections();
        }
    } catch (error) { addNotificationCallBack("Failed to accept request.", "error"); }
  };

  const declineConnectionRequest = () => {};
  const removeConnection = () => {};
  const isRequestPending = (id: string) => sentConnectionRequests.includes(id);
  const isUserConnected = (id: string) => connectedUserIds.includes(id);

  // ---------------- PLACEHOLDERS ----------------
  const removeApplication = () => {};
  // ---------------- SAVE PROJECT ----------------

const saveProject = async (projectId: string) => {
  if (!currentUser) return;

  // 🔥 Optimistic UI update first
  const updatedUser = {
    ...currentUser,
    savedProjectIds: [
      ...(currentUser.savedProjectIds || []),
      projectId
    ]
  };

  setCurrentUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));

  try {
    const t = getAuthToken();
    await axios.post(
      "/api/users/save-project",
      { projectId },
      { headers: { Authorization: `Bearer ${t}` } }
    );
  } catch (err) {
    console.error("Save failed", err);
  }
};

const unsaveProject = async (projectId: string) => {
  if (!currentUser) return;

  // 🔥 Optimistic update
  const updatedUser = {
    ...currentUser,
    savedProjectIds: (currentUser.savedProjectIds || []).filter(
      id => id !== projectId
    )
  };

  setCurrentUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));

  try {
    const t = getAuthToken();
    await axios.post(
      "/api/users/unsave-project",
      { projectId },
      { headers: { Authorization: `Bearer ${t}` } }
    );
  } catch (err) {
    console.error("Unsave failed", err);
  }
};

const isProjectSaved = (projectId: string) => {
  return !!currentUser?.savedProjectIds?.includes(projectId);
};

const addApplication = async (applicationData: any) => {
  if (!currentUser) return false;

  const t = localStorage.getItem("authToken");
  if (!t) return false;

  try {
    const res = await axios.post(
      "/api/applications",
      applicationData,
      { headers: { Authorization: `Bearer ${t}` } }
    );

    if (res.data?.success) {
      const newApp = {
        ...res.data.application,
        id: res.data.application._id || res.data.application.id
      };

      // 👇 Immediately update state
      setSentApplications(prev => [newApp, ...prev]);

      return true;
    }

    return false;
  } catch (err) {
    console.error("Application submit failed", err);
    return false;
  }
};

// ---------------- APPLICATIONS ----------------

// Fetch SENT applications
const fetchSentApplications = async () => {
  const t = getAuthToken();
  if (!t) return;

  try {
    const res = await axios.get('/api/applications/sent', {
      headers: { Authorization: `Bearer ${t}` }
    });
if (res.data?.success && Array.isArray(res.data.applications)) {
  const normalized = res.data.applications.map((app: any) => ({
    ...app,
    id: app._id || app.id
  }));

  setSentApplications(normalized);
} else {
  setSentApplications([]);
}
    
  } catch (err) {
    console.error("Fetch sent failed", err);
  }
};

// Fetch RECEIVED applications
const fetchReceivedApplications = async () => {
  const t = getAuthToken();
  if (!t) return;

  try {
    const res = await axios.get('/api/applications/received', {
      headers: { Authorization: `Bearer ${t}` }
    });
if (res.data?.success && Array.isArray(res.data.applications)) {
  const normalized = res.data.applications.map((app: any) => ({
    ...app,
    id: app._id || app.id
  }));

  setReceivedApplications(normalized);
} else {
  setReceivedApplications([]);
}

  } catch (err) {
    console.error("Fetch received failed", err);
  }
};

const fetchApplications = async () => {
  await fetchSentApplications();
  await fetchReceivedApplications();
};

// Update status
const updateApplicationStatus = async (id: string, status: string) => {
  const t = getAuthToken();
  if (!t) return;

  try {
    const res = await axios.put(
      `/api/applications/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${t}` } }
    );

    if (res.data.success) {
      setSentApplications(prev =>
  prev.map(app =>
    app.id === id ? { ...app, status } : app
  )
);

setReceivedApplications(prev =>
  prev.map(app =>
    app.id === id ? { ...app, status } : app
  )
);
    }
  } catch (err) {
    console.error("Status update failed", err);
  }
};

  // ---------------- INITIAL LOAD ----------------
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      try {
          const res = await axios.get('/api/ideas');
          if (res.data.success) setStartupIdeas(res.data.ideas);
      } catch (error) { console.error("Failed to fetch ideas", error); }

      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      if (storedToken) {
  setToken(storedToken);

  try {
    const res = await axios.get('/api/auth/users/me', {
      headers: { Authorization: `Bearer ${storedToken}` }
    });

    if (res.data?.success) {
      setCurrentUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    }
  } catch (err) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}
      setIsLoading(false);
    };
    loadInitialData();
  }, [fetchConnections]);

// 🔥 Fetch startalks after user + token ready
useEffect(() => {
  const fetchStartalks = async () => {
    if (!token || !currentUser) return;

    try {
      const res = await axios.get('/api/startalks', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setStartalks(res.data.startalks);
      }
    } catch (err) {
      console.error("Startalk fetch error:", err);
    }
  };

  fetchStartalks();
}, [token, currentUser]);

useEffect(() => {
  if (!token || !currentUser) return;
  fetchApplications();
}, [token, currentUser]);

  const contextValue = useMemo(() => ({
    startupIdeas, startalks, sentApplications,
  receivedApplications, notifications, currentUser, users, token, appNotifications, isLoading, authLoadingState, showOnboardingModal,
    addIdea, addStartalk, deleteStartalk, reactToStartalk, updateIdea, deleteIdea, addApplication, addNotification: addNotificationCallBack, removeNotification, getIdeaById, getPositionById,
    login, signup, verifyAndLogin, logout, updateUser, updateApplicationStatus,
    removeApplication,
    saveProject, unsaveProject, isProjectSaved, getUserById, 
    fetchUserProfile,
    markNotificationAsRead, markAllNotificationsAsRead,
    sentConnectionRequests, connectedUserIds, sendConnectionRequest,
    acceptConnectionRequest, declineConnectionRequest, removeConnection,
    isRequestPending, isUserConnected,
    setShowOnboardingModal,
  }), [
    startupIdeas, startalks, sentApplications,
receivedApplications, notifications, currentUser, users, token, appNotifications, isLoading, authLoadingState, showOnboardingModal,
    addNotificationCallBack, getUserById, fetchUserProfile, sentConnectionRequests, connectedUserIds
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};