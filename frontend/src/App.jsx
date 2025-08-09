import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ChatPage from './pages/ChatPage.jsx'
import NotificationPage from './pages/NotificationPage.jsx'
import CallPage from './pages/CallPage.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'
import Layout from './components/Layout.jsx'

import { Toaster } from 'react-hot-toast'

const App = () => {

  const { isLoading, authUser } = useAuthUser();

  if (isLoading) return <PageLoader />;

  return (
    <div className='h-screen'>
      <Routes>
        {/* <Route path="/" element={authUser ? <Layout> <HomePage /> </Layout> : <Navigate to="/login" />} /> */}
        <Route path="/" element={<Layout showSidebar> <HomePage /> </Layout>} />
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" />} />
        <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/friends" element={<Layout showSidebar> <div className='p-4'>Friends Page</div> </Layout>} />
        <Route path="/notifications" element={authUser ? <Layout showSidebar> <NotificationPage /> </Layout> : <Navigate to="/login" />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Routes>

      <Toaster />
    </div>

  )
}

export default App