import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import AssignmentsPage from "./pages/AssignmentsPage.jsx";
import FlashcardsPage from "./pages/FlashcardsPage.jsx";
import DetailFlashcardsPage from "./pages/DetailFlashcardsPage.jsx";
import AssistantPage from "./pages/AssistantPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import OtpVerifyPage from "./pages/OtpVerifyPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import NewMeeting from "./components/workplace/NewMeeting.jsx";
import Join from "./components/workplace/Join.jsx";
import Calendar from "./components/workplace/Calendar.jsx";

import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const { theme } = useThemeStore();

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        {/* <Route path="/" element={authUser ? <Layout> <HomePage /> </Layout> : <Navigate to="/login" />} /> */}
        <Route
          path="/"
          element={
            <Layout showSidebar>
              {" "}
              <HomePage />{" "}
            </Layout>
          }
        />

        <Route
          path="/workplace/new-meeting"
          element={
            <Layout showSidebar>
              {" "}
              <NewMeeting />{" "}
            </Layout>
          }
        />

        <Route
          path="/workplace/join"
          element={
            <Layout showSidebar>
              {" "}
              <Join />{" "}
            </Layout>
          }
        />

        <Route
          path="/workplace/calendar"
          element={
            <Layout showSidebar>
              {" "}
              <Calendar />{" "}
            </Layout>
          }
        />

        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/verify-otp"
          element={!authUser ? <OtpVerifyPage /> : <Navigate to="/" />}
        />
        <Route
          path="/chat"
          element={
            <Layout showSidebar>
              {" "}
              <ChatPage />{" "}
            </Layout>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <Layout showSidebar>
              {" "}
              <ChatPage />{" "}
            </Layout>
          }
        />
        {/* <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} /> */}
        <Route
          path="/call"
          element={authUser ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/friends"
          element={
            <Layout showSidebar>
              {" "}
              <div className="p-4">Friends Page</div>{" "}
            </Layout>
          }
        />
        <Route
          path="/notifications"
          element={
            <Layout showSidebar>
              {" "}
              <NotificationPage />{" "}
            </Layout>
          }
        />
        <Route path="/onboarding" element={<OnboardingPage />} />
        {/* <Route path="/assignments" element={<Layout showSidebar> <AssignmentsPage /> </Layout>} /> */}
        <Route
          path="/upload"
          element={
            <Layout showSidebar>
              {" "}
              <UploadPage />{" "}
            </Layout>
          }
        />
        <Route
          path="/flashcards"
          element={
            <Layout showSidebar>
              {" "}
              <FlashcardsPage />{" "}
            </Layout>
          }
        />
        {/* <Route path="/detailflashcards/:id" element={<Layout showSidebar> <DetailFlashcardPage /> </Layout>} /> */}
        <Route
          path="/detailflashcards/"
          element={
            <Layout showSidebar>
              {" "}
              <DetailFlashcardsPage />{" "}
            </Layout>
          }
        />
        <Route
          path="/assistant"
          element={
            <Layout showSidebar>
              {" "}
              <AssistantPage />{" "}
            </Layout>
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
