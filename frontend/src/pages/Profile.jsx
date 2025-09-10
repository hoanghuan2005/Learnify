import React, { useState, useEffect } from "react";
import useAuthUser from "../hooks/useAuthUser";
import toast from "react-hot-toast";
// import { completeOnboarding } from '../lib/api';
import {
  CameraIcon,
  ShuffleIcon,
  MapPinIcon,
  LoaderIcon,
  ShipWheelIcon,
  EditIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants/language.js";

const Profile = () => {
  const { isLoading, error, data: authUser } = useAuthUser();

  // Debug logging
  console.log("Profile component state:", { isLoading, error, authUser });

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token);
    console.log("Is user logged in:", !!token);
  }, []);

  const [formState, setFormState] = useState({
    fullName: "",
    bio: "",
    language: "",
    location: "",
    profilePicture: "",
  });

  const [isPending, setIsPending] = useState(false);

  const LANGUAGES = ["Vietnamese", "English", "Japanese", "French", "German"];

  // Update form state when authUser loads
  useEffect(() => {
    if (authUser) {
      console.log("AuthUser data received:", authUser);
      setFormState({
        fullName: authUser.username || "",
        bio: authUser.bio || "",
        language: authUser.nativeLanguage || authUser.language || "",
        location: authUser.location || "",
        profilePicture:
          authUser.profilePicture ||
          authUser.profilePic ||
          authUser.avatarUrl ||
          `https://api.dicebear.com/9.x/identicon/svg?seed=${
            authUser.username || "user"
          }`,
      });
    }
  }, [authUser]);

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePicture: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);

    // Giả lập xử lý
    setTimeout(() => {
      toast.success("Onboarding simulated successfully!");
      setIsPending(false);
    }, 1000);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
        <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
          <div className="card-body p-6 sm:p-8 text-center">
            <h1 className="text-2xl font-bold text-error mb-4">
              Error Loading Profile
            </h1>
            <p className="text-base-content opacity-70 mb-4">
              {error.message || "Failed to load your profile data"}
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PROFILE PIC */}
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="size-32 rounded-full bg-base-300 overflow-hidden mt-2">
                {formState.profilePicture ? (
                  <img
                    src={formState.profilePicture}
                    alt="Profile avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={handleRandomAvatar}
                className="btn btn-accent"
              >
                <ShuffleIcon className="size-4 mr-2" />
                Generate Random Avatar
              </button>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself"
              />
            </div>

            {/* LANGUAGE */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Native Language</span>
              </label>
              <select
                value={formState.language}
                onChange={(e) =>
                  setFormState({ ...formState, language: e.target.value })
                }
                className="select select-bordered w-full"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              className="btn btn-primary w-full"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <EditIcon className="size-5 mr-2" />
                  Edit Profile
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
