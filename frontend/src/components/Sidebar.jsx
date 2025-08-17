import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import useAuthUser from "../hooks/useAuthUser";
import { MessageSquare, ClipboardList, Layers, Upload, Bot, Bell, Home, GraduationCapIcon, Users, Menu, X } from "lucide-react";
import ChatSidebar from "./ChatSidebar";

const Sidebar = () => {
  // const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmallScreen = window.innerWidth < 768;
      setIsMobile(isSmallScreen);
      if (!isSmallScreen) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button - chỉ hiển thị trên mobile và khi sidebar đóng */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed top-4 left-4 z-50 btn btn-ghost btn-sm"
          aria-label="Toggle sidebar"
        >
          <Menu className="size-6" />
        </button>
      )}

      {/* Overlay - chỉ hiển thị khi sidebar mở trên mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-base-200 border-r border-base-300 flex flex-col h-screen transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:flex`}
      >
        {/* Header với nút đóng trên mobile */}
        <div className="p-5 border-base-300 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GraduationCapIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Learnify
            </span>
          </Link>
          
          {/* Nút đóng sidebar trên mobile */}
          <button
            onClick={closeSidebar}
            className="lg:hidden btn btn-ghost btn-sm"
            aria-label="Close sidebar"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {/* HOME */}
          <Link
            to="/"
            onClick={closeSidebar}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/" ? "btn-active" : ""
            }`}
          >
            <Home className="size-5 text-base-content opacity-70" />
            <span>Home</span>
          </Link>

          {/* CHAT */}
          <Link 
            to="/chat"
            onClick={closeSidebar}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/chat" ? "btn-active" : ""
            }`}
          >
            <MessageSquare className="size-5 text-base-content opacity-70" />
            <span>Chat</span>
          </Link>

          {/* ASSIGNMENTS */}
          {/* <Link 
            to="/assignments"
            onClick={closeSidebar}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/assignments" ? "btn-active" : ""
            }`}
          >
            <ClipboardList className="size-5 text-base-content opacity-70" />
            <span>Assignments</span>
          </Link> */}

          {/* FLASHCARDS */}
          <Link 
            to="/flashcards"
            onClick={closeSidebar}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/flashcards" ? "btn-active" : ""
            }`}
          >
            <Layers className="size-5 text-base-content opacity-70" />
            <span>Flashcards</span>
          </Link>

          {/* UPLOAD & MATERIALS */}
          <Link 
            to="/upload"
            onClick={closeSidebar}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/upload" ? "btn-active" : ""
            }`}
          >
            <Upload className="size-5 text-base-content opacity-70" />
            <span>Upload & Materials</span>
          </Link>

          {/* AI ASSISTANT */}
          <Link 
            to="/assistant"
            onClick={closeSidebar}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/assistant" ? "btn-active" : ""
            }`}
          >
            <Bot className="size-5 text-base-content opacity-70" />
            <span>AI Assistant</span>
          </Link>

          {/* NOTIFICATIONS */}
          <Link
            to="/notifications"
            onClick={closeSidebar}
            className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
              currentPath === "/notifications" ? "btn-active" : ""
            }`}
          >
            <Bell className="size-5 text-base-content opacity-70" />
            <span>Notifications</span>
          </Link>
        </nav>

        {/* USER PROFILE SECTION */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                {/* <img src={authUser?.profilePic} alt="User Avatar" /> */}
              </div>
            </div>
            {/* <div className="flex-1">
              <p className="font-semibold text-sm">{authUser?.fullName}</p>
              <p className="text-xs text-success flex items-center gap-1">
                <span className="size-2 rounded-full bg-success inline-block" />
                Online
              </p>
            </div> */}
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;