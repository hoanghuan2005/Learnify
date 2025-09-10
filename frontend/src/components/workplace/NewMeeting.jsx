import React, { useState } from "react";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  VideoIcon,
  GlobeIcon,
  LockIcon,
  PlusIcon,
  XIcon,
  BookOpenIcon,
  MessageCircleIcon,
  SettingsIcon,
  PlayIcon,
  VideoOffIcon,
} from "lucide-react";
import toast from "react-hot-toast";
import MeetingPopup from "./MeetingPopup";

const NewMeeting = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    meetingType: "study",
    date: "",
    time: "",
    duration: "60",
    maxParticipants: "10",
    isPrivate: false,
    allowRecording: false,
    requireApproval: false,
    language: "english",
  });

  const [participants, setParticipants] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const meetingTypes = [
    {
      value: "study",
      label: "Study Session",
      icon: BookOpenIcon,
      color: "text-blue-500",
    },
    {
      value: "language",
      label: "Language Practice",
      icon: MessageCircleIcon,
      color: "text-green-500",
    },
    {
      value: "presentation",
      label: "Presentation",
      icon: VideoIcon,
      color: "text-purple-500",
    },
    {
      value: "discussion",
      label: "Group Discussion",
      icon: UsersIcon,
      color: "text-orange-500",
    },
  ];

  const languages = [
    { value: "english", label: "English" },
    { value: "vietnamese", label: "Vietnamese" },
    { value: "japanese", label: "Japanese" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddParticipant = () => {
    if (
      newParticipant.trim() &&
      !participants.includes(newParticipant.trim())
    ) {
      setParticipants((prev) => [...prev, newParticipant.trim()]);
      setNewParticipant("");
      toast.success("Participant added");
    }
  };

  const handleRemoveParticipant = (participant) => {
    setParticipants((prev) => prev.filter((p) => p !== participant));
    toast.success("Participant removed");
  };

  const handleStartMeeting = (meetingData) => {
    console.log("Starting meeting with data:", meetingData);
    // Here you would typically navigate to the meeting room
    toast.success("Redirecting to meeting room...");
  };

  const handleShowForm = () => {
    setShowForm(true);
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(true);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const meetingData = {
        ...formData,
        participants,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      console.log("Meeting created:", meetingData);
      toast.success("Meeting created successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        meetingType: "study",
        date: "",
        time: "",
        duration: "60",
        maxParticipants: "10",
        isPrivate: false,
        allowRecording: false,
        requireApproval: false,
        language: "english",
      });
      setParticipants([]);
    } catch {
      toast.error("Failed to create meeting");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show popup for quick meeting start
  if (showPopup) {
    return (
      <MeetingPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onStartMeeting={handleStartMeeting}
      />
    );
  }

  // Show form for scheduled meetings
  if (showForm) {
    return (
      <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-base-content mb-2">
                  Schedule Meeting
                </h1>
                <p className="text-base-content/70">
                  Create a scheduled meeting with your study group
                </p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="btn btn-outline"
              >
                <VideoIcon className="w-4 h-4 mr-2" />
                Quick Start
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">
                  <CalendarIcon className="w-6 h-6" />
                  Basic Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Meeting Title */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Meeting Title *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter meeting title"
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {/* Meeting Type */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Meeting Type *
                      </span>
                    </label>
                    <select
                      name="meetingType"
                      value={formData.meetingType}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                      required
                    >
                      {meetingTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Language */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Primary Language
                      </span>
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                    >
                      {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>
                          {lang.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="form-control md:col-span-2">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Description
                      </span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Describe what this meeting is about..."
                      className="textarea textarea-bordered h-24"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">
                  <ClockIcon className="w-6 h-6" />
                  Schedule
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Date */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Date *</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {/* Time */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">Time *</span>
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                      required
                    />
                  </div>

                  {/* Duration */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Duration (minutes)
                      </span>
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                    >
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                      <option value="180">3 hours</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">
                  <UsersIcon className="w-6 h-6" />
                  Participants
                </h2>

                <div className="space-y-4">
                  {/* Add Participant */}
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={newParticipant}
                      onChange={(e) => setNewParticipant(e.target.value)}
                      placeholder="Enter participant email"
                      className="input input-bordered flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAddParticipant}
                      className="btn btn-primary"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add
                    </button>
                  </div>

                  {/* Participants List */}
                  {participants.length > 0 && (
                    <div className="space-y-2">
                      <label className="label">
                        <span className="label-text font-semibold">
                          Invited Participants
                        </span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {participants.map((participant, index) => (
                          <div
                            key={index}
                            className="badge badge-primary badge-lg gap-2"
                          >
                            {participant}
                            <button
                              type="button"
                              onClick={() =>
                                handleRemoveParticipant(participant)
                              }
                              className="btn btn-ghost btn-xs"
                            >
                              <XIcon className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Max Participants */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Maximum Participants
                      </span>
                    </label>
                    <select
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleInputChange}
                      className="select select-bordered w-full max-w-xs"
                    >
                      <option value="5">5 participants</option>
                      <option value="10">10 participants</option>
                      <option value="20">20 participants</option>
                      <option value="50">50 participants</option>
                      <option value="100">100 participants</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-xl mb-6">
                  <SettingsIcon className="w-6 h-6" />
                  Meeting Settings
                </h2>

                <div className="space-y-4">
                  {/* Privacy Settings */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="isPrivate"
                        checked={formData.isPrivate}
                        onChange={handleInputChange}
                        className="checkbox checkbox-primary"
                      />
                      <div className="flex items-center gap-2">
                        {formData.isPrivate ? (
                          <LockIcon className="w-4 h-4" />
                        ) : (
                          <GlobeIcon className="w-4 h-4" />
                        )}
                        <span className="label-text">
                          Private meeting (invite only)
                        </span>
                      </div>
                    </label>
                  </div>

                  {/* Recording Settings */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="allowRecording"
                        checked={formData.allowRecording}
                        onChange={handleInputChange}
                        className="checkbox checkbox-primary"
                      />
                      <div className="flex items-center gap-2">
                        <VideoIcon className="w-4 h-4" />
                        <span className="label-text">Allow recording</span>
                      </div>
                    </label>
                  </div>

                  {/* Approval Settings */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-3">
                      <input
                        type="checkbox"
                        name="requireApproval"
                        checked={formData.requireApproval}
                        onChange={handleInputChange}
                        className="checkbox checkbox-primary"
                      />
                      <div className="flex items-center gap-2">
                        <UsersIcon className="w-4 h-4" />
                        <span className="label-text">
                          Require approval to join
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => window.history.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Creating Meeting...
                  </>
                ) : (
                  <>
                    <VideoIcon className="w-4 h-4" />
                    Create Meeting
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Main interface - show meeting options
  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Start a Meeting
          </h1>
          <p className="text-lg text-base-content/70 mb-8">
            Choose how you'd like to start your meeting
          </p>
        </div>

        {/* Meeting Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Quick Start Meeting */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayIcon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Start Now</h2>
              <p className="text-base-content/70 mb-6">
                Start an instant meeting
              </p>
              <button
                onClick={handleShowPopup}
                className="btn btn-primary btn-lg w-full"
              >
                <VideoIcon className="w-5 h-5 mr-2" />
                Start Meeting
              </button>
            </div>
          </div>

          {/* Schedule Meeting */}
          <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="card-body text-center p-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIcon className="w-8 h-8 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Schedule Meeting</h2>
              <p className="text-base-content/70 mb-6">
                Create a scheduled meeting with participants and settings
              </p>
              <button
                onClick={handleShowForm}
                className="btn btn-secondary btn-lg w-full"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMeeting;
