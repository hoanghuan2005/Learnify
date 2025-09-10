import React, { useState, useRef, useEffect } from "react";
import {
  VideoIcon,
  VideoOffIcon,
  MicIcon,
  MicOffIcon,
  PhoneIcon,
  Settings2Icon,
  MonitorIcon,
  ShareIcon,
  UsersIcon,
  XIcon,
  PlayIcon,
  CalendarIcon,
  ClockIcon,
} from "lucide-react";
import toast from "react-hot-toast";

const MeetingPopup = ({ isOpen, onClose, onStartMeeting }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  // const [isScreenShare, setIsScreenShare] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize camera when component mounts
  useEffect(() => {
    if (isOpen) {
      initializeCamera();
    } else {
      stopCamera();
    }
  }, [isOpen]);

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const handleStartMeeting = async () => {
    if (!meetingTitle.trim()) {
      toast.error("Please enter a meeting title");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const meetingData = {
        title: meetingTitle,
        videoEnabled: isVideoOn,
        micEnabled: isMicOn,
        createdAt: new Date().toISOString(),
      };

      console.log("Starting meeting:", meetingData);
      toast.success("Meeting started!");

      // Call the parent callback
      onStartMeeting(meetingData);

      // Close popup
      onClose();
    } catch {
      toast.error("Failed to start meeting");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Popup Content */}
      <div className="relative bg-base-100/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-5xl mx-4 max-h-[95vh] overflow-hidden border border-base-300/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300/50 bg-gradient-to-r from-base-100 to-base-200/50">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-primary to-primary/80 rounded-xl flex items-center justify-center">
                <VideoIcon className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-base-content">
                New Meeting
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="btn btn-ghost btn-sm btn-circle hover:bg-error/10 hover:text-error transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[75vh]">
          {/* Video Preview Section */}
          <div className="flex-1 bg-gradient-to-br from-base-200 to-base-300/50 p-8 flex flex-col">
            <div className="flex-1 relative bg-black rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Element */}
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Video Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-3 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live Preview</span>
                  </div>
                </div>
              </div>

              {/* Video Controls Overlay */}
              <div className="absolute bottom-6 right-6 flex gap-3">
                <button
                  onClick={toggleVideo}
                  className={`btn btn-sm btn-circle shadow-lg ${
                    isVideoOn
                      ? "btn-primary hover:scale-110"
                      : "btn-error hover:scale-110"
                  } transition-transform duration-200`}
                >
                  {isVideoOn ? (
                    <VideoIcon className="w-4 h-4" />
                  ) : (
                    <VideoOffIcon className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={toggleMic}
                  className={`btn btn-sm btn-circle shadow-lg ${
                    isMicOn
                      ? "btn-primary hover:scale-110"
                      : "btn-error hover:scale-110"
                  } transition-transform duration-200`}
                >
                  {isMicOn ? (
                    <MicIcon className="w-4 h-4" />
                  ) : (
                    <MicOffIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Meeting Title Input */}
            <div className="mt-6">
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Meeting Title
                </span>
              </label>
              <input
                type="text"
                value={meetingTitle}
                onChange={(e) => setMeetingTitle(e.target.value)}
                placeholder="Enter meeting title..."
                className="input input-bordered w-full text-lg py-3 rounded-xl focus:input-primary transition-all duration-300"
                maxLength={50}
              />
            </div>
          </div>

          {/* Controls Section */}
          <div className="w-full lg:w-80 bg-gradient-to-b from-base-100 to-base-200/50 p-8 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-tr from-secondary to-secondary/80 rounded-xl flex items-center justify-center">
                <Settings2Icon className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-base-content">
                Meeting Settings
              </h3>
            </div>

            {/* Quick Settings */}
            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isVideoOn ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-medium text-base-content">Camera</span>
                </div>
                <button
                  onClick={toggleVideo}
                  className={`btn btn-sm rounded-xl ${
                    isVideoOn ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {isVideoOn ? "On" : "Off"}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-base-200/50 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isMicOn ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-medium text-base-content">
                    Microphone
                  </span>
                </div>
                <button
                  onClick={toggleMic}
                  className={`btn btn-sm rounded-xl ${
                    isMicOn ? "btn-primary" : "btn-outline"
                  }`}
                >
                  {isMicOn ? "On" : "Off"}
                </button>
              </div>
            </div>

            {/* Meeting Info */}
            <div className="space-y-4 mb-8 p-6 bg-gradient-to-r from-base-200/80 to-base-300/50 rounded-2xl border border-base-300/30">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <UsersIcon className="w-4 h-4 text-purple-600" />
                </div>
                <span className="font-medium">1 participant (you)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4 mt-auto">
              <button
                onClick={handleStartMeeting}
                disabled={isLoading || !meetingTitle.trim()}
                className="btn btn-primary btn-lg w-full rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Starting...
                  </>
                ) : (
                  <>
                    <PlayIcon className="w-5 h-5" />
                    Start Meeting
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toast.info("Schedule feature coming soon!")}
                  className="btn btn-outline btn-sm rounded-xl hover:scale-105 transition-transform"
                >
                  <CalendarIcon className="w-4 h-4" />
                  Schedule
                </button>
                <button
                  onClick={() => toast.info("Settings feature coming soon!")}
                  className="btn btn-outline btn-sm rounded-xl hover:scale-105 transition-transform"
                >
                  <Settings2Icon className="w-4 h-4" />
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Controls Bar */}
        <div className="border-t border-base-300/50 p-6 bg-gradient-to-r from-base-200/80 to-base-300/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-base-content/70">
                Quick actions:
              </span>
              <button
                onClick={() => toast.info("Screen share coming soon!")}
                className="btn btn-ghost btn-sm rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <MonitorIcon className="w-4 h-4" />
                Share Screen
              </button>
              <button
                onClick={() => toast.info("Invite feature coming soon!")}
                className="btn btn-ghost btn-sm rounded-xl hover:bg-secondary/10 hover:text-secondary transition-colors"
              >
                <ShareIcon className="w-4 h-4" />
                Invite
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="btn btn-error btn-sm rounded-xl hover:scale-105 transition-transform shadow-lg"
              >
                <PhoneIcon className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingPopup;
