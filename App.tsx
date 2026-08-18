import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BottomNav from './components/BottomNav';
import PostIdeaPage from './pages/PostIdeaPage';
import IdeaDetailPage from './pages/IdeaDetailPage';
import AssetDetailsPage from './pages/AssetDetailsPage';
import SubmitAssetPage from './pages/SubmitAssetPage';
import EditAssetPage from './pages/EditAssetPage';
import ApplyPage from './pages/ApplyPage';
import NotificationArea from './components/NotificationArea';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProjectsListPage from './pages/ProjectsListPage';
import StartalksPage from './pages/StartalksPage';
import StartupStoriesPage from './pages/StartupStoriesPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';

import ProtectedRoute from './components/ProtectedRoute';

import MyProjectsPage from './pages/MyProjectsPage';
import { MyApplicationsPage } from './pages/MyApplicationsPage';
import { ConnectionsPage } from './pages/ConnectionsPage';

import PublicProfilePage from './pages/PublicProfilePage';
import SavedProjectsPage from './pages/SavedProjectsPage';
import ActivityLogPage from './pages/ActivityLogPage';
import PlaceholderContentPage from './pages/PlaceholderContentPage';

import ForgotPasswordPage from './pages/ForgotPasswordPage';
import NewPasswordPage from './pages/NewPasswordPage';

import { TeamDetailPage } from './pages/TeamDetailPage';

import OnboardingPage from './components/OnboardingModal';
import VerifyEmailPage from './pages/VerifyEmailPage';
import EditProjectPage from './pages/EditProjectPage';
import FullScreenLoader from './components/FullScreenLoader';

import ContactUsPage from './pages/ContactUsPage';
import SearchPage from './pages/SearchPage';

import { useAppContext } from './contexts/AppContext';

import FloatingActionMenu from './components/FloatingActionMenu';
import StarverseFloatingButton from './components/StarverseFloatingButton';

import { GoogleOAuthProvider } from '@react-oauth/google';

import GlobalGlobe from './pages/GlobalGlobe';

import BuildersStoriesPage from './pages/BuildersStoriesPage';
import StoryDetailsPage from './pages/StoryDetailsPage';

import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';

import LogoutConfirmModal from './components/LogoutConfirmModal';

interface PageTitleProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  title,
  description,
  className = '',
}) => (
  <div className={`mb-8 ${className}`}>
    <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight font-poppins">
      {title}
    </h1>

    {description && (
      <p className="text-[var(--text-muted)] mt-2 text-sm sm:text-base font-poppins">
        {description}
      </p>
    )}
  </div>
);

const WithPageContainer: React.FC<{
  children: React.ReactNode;
  pageClassName?: string;
}> = ({
  children,
  pageClassName = 'w-full px-6 lg:px-16 py-8',
}) => (
  <div className={pageClassName}>
    {children}
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isChatOpen, setIsChatOpen] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const {
    currentUser,
    showOnboardingModal,
    authLoadingState,
    logout,
  } = useAppContext();

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  /*
   * =========================================================
   * BACKEND WARM-UP
   * =========================================================
   */
  useEffect(() => {
    const warmServer = async () => {
      try {
        fetch(
          'https://use-startives.onrender.com/test123'
        ).catch(() => {});

        fetch(
          'https://use-startives.onrender.com/api/ideas'
        ).catch(() => {});

        fetch(
          'https://use-startives.onrender.com/api/assets'
        ).catch(() => {});

        fetch(
          'https://use-startives.onrender.com/api/startalks'
        ).catch(() => {});
      } catch (err) {
        // Ignore warm-up errors.
      }
    };

    warmServer();
  }, []);

  /*
   * =========================================================
   * CHAT OPEN STATE
   * =========================================================
   */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const hasClass =
        document.body.classList.contains('chat-open');

      setIsChatOpen(hasClass);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  /*
   * =========================================================
   * PROTECTED BACK NAVIGATION
   * =========================================================
   */
  useEffect(() => {
    if (!currentUser) return;

    const protectedBackRoutes = [
      '/dashboard',
      '/projects',
      '/startalks',
      '/messages',
      '/globe',
    ];

    const shouldIntercept =
      protectedBackRoutes.includes(location.pathname);

    if (!shouldIntercept) return;

    window.history.pushState(
      null,
      '',
      window.location.href
    );

    const handleBack = () => {
      if (showLogoutModal) return;

      setShowLogoutModal(true);

      window.history.pushState(
        null,
        '',
        window.location.href
      );
    };

    window.addEventListener(
      'popstate',
      handleBack
    );

    return () => {
      window.removeEventListener(
        'popstate',
        handleBack
      );
    };
  }, [
    currentUser,
    location.pathname,
    showLogoutModal,
  ]);

  /*
   * =========================================================
   * HEADER
   * =========================================================
   */
  const noHeaderRoutes = [
    '/login',
    '/signup',
    '/verify-email',
    '/forgot-password',
    '/new-password',
  ];

  const staticPages = [
    '/about',
    '/privacy-policy',
    '/contact-us',
    '/sponsorship',
  ];

  const showHeader =
    !noHeaderRoutes.includes(location.pathname);

  /*
   * =========================================================
   * FAB
   * =========================================================
   */
  const hideFABRoutes = [
    '/post-idea',
    '/submit-asset',
    '/profile/edit',
    '/profile',
    '/startalks',
    '/messages',
    ...noHeaderRoutes,
    ...staticPages,
  ];

  const hideStarverseButton =
    location.pathname === '/globe' ||
    location.pathname === '/starverse' ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  const isEditing =
    (location.pathname.includes('/edit') &&
      location.pathname.includes('/project/')) ||
    (location.pathname.includes('/edit') &&
      location.pathname.includes('/asset/'));

  const showFAB =
    Boolean(currentUser) &&
    !hideFABRoutes.includes(location.pathname) &&
    !location.pathname.startsWith('/team/') &&
    !isEditing &&
    !location.pathname.includes('/apply') &&
    !location.pathname.startsWith('/idea/') &&
    !location.pathname.startsWith('/asset/') &&
    !location.pathname.startsWith('/user/');

  /*
   * =========================================================
   * FOOTER
   * =========================================================
   */
  const showFooter =
    location.pathname === '/' &&
    !currentUser;

  /*
   * =========================================================
   * FULL HEIGHT PAGES
   * =========================================================
   */
  const isFullHeightPage =
    location.pathname.startsWith('/messages') ||
    location.pathname.startsWith('/team/') ||
    location.pathname === '/blueprint' ||
    location.pathname.startsWith('/asset/');

  /*
   * =========================================================
   * BOTTOM NAV
   * =========================================================
   */
  const needsBottomNavPadding =
    Boolean(currentUser) &&
    !isFullHeightPage &&
    !isChatOpen;

  /*
   * IMPORTANT:
   *
   * Homepage gets its own class.
   *
   * We KEEP the scroll container because Header.tsx
   * depends on main.scrollTop.
   *
   * But homepage gets min-height + shrink-0 so it cannot
   * collapse underneath the footer.
   */
  const isHomePage =
    location.pathname === '/' && !currentUser;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>

      <div
        className="
          flex
          h-screen
          min-h-screen
          w-full
          flex-col
          overflow-hidden
          bg-[var(--background-secondary)]
        "
      >

        {/* =================================================
            AUTH LOADER
        ================================================= */}
        {authLoadingState.isLoading &&
          location.pathname === '/login' && (
            <FullScreenLoader
              messages={authLoadingState.messages}
            />
          )}

        {/* =================================================
            ONBOARDING
        ================================================= */}
        {currentUser &&
          showOnboardingModal && (
            <OnboardingPage />
          )}

        {/* =================================================
            HEADER
        ================================================= */}
        {showHeader && <Header />}

        {/* =================================================
            NOTIFICATION AREA
        ================================================= */}
        <NotificationArea />

        {/* =================================================
            MAIN SCROLL CONTAINER
        ================================================= */}
        <main
          className={`
            flex-1
            min-h-0
            min-w-0
            w-full
            overflow-y-auto
            overflow-x-hidden
            overscroll-contain

            ${
              isHomePage
                ? 'shrink-0 min-h-[calc(100vh-61px)]'
                : ''
            }

            ${
              needsBottomNavPadding
                ? 'pb-16'
                : ''
            }

            ${
              isFullHeightPage
                ? 'flex flex-col'
                : ''
            }
          `}
        >

          <Routes>

            {/* =================================================
                HOME PAGE

                IMPORTANT:
                Keep HomePage directly inside main.
                Do NOT wrap it in WithPageContainer.
            ================================================= */}
            <Route
              path="/"
              element={
                currentUser ? (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                ) : (
                  <div className="w-full min-h-full">
                    <HomePage />
                  </div>
                )
              }
            />

            {/* =================================================
                AUTH
            ================================================= */}
            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/signup"
              element={<SignupPage />}
            />

            <Route
              path="/verify-email"
              element={<VerifyEmailPage />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            />

            <Route
              path="/new-password"
              element={<NewPasswordPage />}
            />

            {/* =================================================
                PUBLIC PROFILE
            ================================================= */}
            <Route
              path="/user/:userId"
              element={
                <WithPageContainer>
                  <PublicProfilePage />
                </WithPageContainer>
              }
            />

            {/* =================================================
                STATIC
            ================================================= */}
            <Route
              path="/about"
              element={
                <WithPageContainer>
                  <PlaceholderContentPage
                    title="About us"
                  />
                </WithPageContainer>
              }
            />

            <Route
              path="/privacy-policy"
              element={
                <WithPageContainer>
                  <PlaceholderContentPage
                    title="Privacy policy"
                  />
                </WithPageContainer>
              }
            />

            <Route
              path="/sponsorship"
              element={
                <WithPageContainer>
                  <PlaceholderContentPage
                    title="Sponsorship"
                  />
                </WithPageContainer>
              }
            />

            <Route
              path="/contact-us"
              element={
                <WithPageContainer>
                  <ContactUsPage />
                </WithPageContainer>
              }
            />

            <Route
              path="/search"
              element={
                <WithPageContainer>
                  <SearchPage />
                </WithPageContainer>
              }
            />

            {/* =================================================
                BUILDERS
            ================================================= */}
            <Route
              path="/builders"
              element={
                <ProtectedRoute>
                  <BuildersStoriesPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/builders/:id"
              element={
                <ProtectedRoute>
                  <StoryDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                BLOG
            ================================================= */}
            <Route
              path="/blog"
              element={
                <WithPageContainer>
                  <BlogPage />
                </WithPageContainer>
              }
            />

            <Route
              path="/blog/:slug"
              element={<BlogDetailPage />}
            />

            {/* =================================================
                DASHBOARD
            ================================================= */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROJECTS
            ================================================= */}
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <ProjectsListPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                STARTALKS
            ================================================= */}
            <Route
              path="/startalks"
              element={
                <ProtectedRoute>
                  <StartalksPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                MARKETPLACE
            ================================================= */}
            <Route
              path="/blueprint"
              element={
                <ProtectedRoute>
                  <StartupStoriesPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                ASSETS
            ================================================= */}
            <Route
              path="/asset/:assetId"
              element={
                <ProtectedRoute>
                  <AssetDetailsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/asset/:assetId/edit"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <EditAssetPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/submit-asset"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <SubmitAssetPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            {/* =================================================
                IDEAS
            ================================================= */}
            <Route
              path="/post-idea"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <PostIdeaPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/idea/:ideaId"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <IdeaDetailPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/idea/:ideaId/position/:positionId/apply"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <ApplyPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            {/* =================================================
                MESSAGES
            ================================================= */}
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                TEAM
            ================================================= */}
            <Route
              path="/team/:teamId"
              element={
                <ProtectedRoute>
                  <TeamDetailPage />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                PROFILE
            ================================================= */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <ProfilePage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <EditProfilePage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            {/* =================================================
                EDIT PROJECT
            ================================================= */}
            <Route
              path="/project/:ideaId/edit"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <EditProjectPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            {/* =================================================
                USER DATA
            ================================================= */}
            <Route
              path="/my-projects"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <MyProjectsPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-applications"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <MyApplicationsPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/connections"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <ConnectionsPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-projects"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <SavedProjectsPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path="/activity-log"
              element={
                <ProtectedRoute>
                  <WithPageContainer>
                    <ActivityLogPage />
                  </WithPageContainer>
                </ProtectedRoute>
              }
            />

            {/* =================================================
                STARVERSE
            ================================================= */}
            <Route
              path="/globe"
              element={
                <ProtectedRoute>
                  <GlobalGlobe />
                </ProtectedRoute>
              }
            />

            {/* =================================================
                FALLBACK
            ================================================= */}
            <Route
              path="*"
              element={
                currentUser ? (
                  <Navigate
                    to="/dashboard"
                    replace
                  />
                ) : (
                  <Navigate
                    to="/"
                    replace
                  />
                )
              }
            />

          </Routes>

        </main>

        {/* =================================================
            FOOTER

            Still outside main.
            Homepage content appears above it.
        ================================================= */}
        {showFooter && <Footer />}

        {/* =================================================
            BOTTOM NAV
        ================================================= */}
        {currentUser &&
          !isChatOpen &&
          !['/', '/login', '/signup'].includes(
            location.pathname
          ) && (
            <BottomNav />
          )}

        {/* =================================================
            FAB
        ================================================= */}
        {showFAB && <FloatingActionMenu />}

        {/* =================================================
            STARVERSE FLOATING BUTTON
        ================================================= */}
        {currentUser &&
          !hideStarverseButton && (
            <StarverseFloatingButton />
          )}

        {/* =================================================
            LOGOUT MODAL
        ================================================= */}
        <LogoutConfirmModal
          open={showLogoutModal}
          onClose={() =>
            setShowLogoutModal(false)
          }
          onLogout={async () => {
            setShowLogoutModal(false);

            await logout();

            navigate('/', {
              replace: true,
            });
          }}
        />

      </div>
    </GoogleOAuthProvider>
  );
};

export default App;