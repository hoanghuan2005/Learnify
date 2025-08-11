import React, { useState } from "react";
import { Users, User, UsersRound } from "lucide-react";

const ChatSidebar = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [selectedItem, setSelectedItem] = useState(null);

  const friends = [
    { id: 1, name: "Friend 1" },
    { id: 2, name: "Friend 2" },
    { id: 3, name: "Friend 3" },
  ];

  const groups = [
    { id: 1, name: "Group A" },
    { id: 2, name: "Group B" },
  ];

  return (
    <div className="w-[256px] h-full bg-base-100 border-base-300 flex flex-col">
      {/* Tabs */}
      <div className="flex border-b border-base-300">
        <button
          className={`flex-1 py-2 flex items-center justify-center gap-2 transition ${
            activeTab === "friends"
              ? "bg-secondary text-white"
              : "hover:bg-base-200"
          }`}
          onClick={() => {
            setActiveTab("friends");
            setSelectedItem(null);
          }}
        >
          <User size={18} /> Friends
        </button>
        <button
          className={`flex-1 py-2 flex items-center justify-center gap-2 transition ${
            activeTab === "groups"
              ? "bg-primary text-white"
              : "hover:bg-base-200"
          }`}
          onClick={() => {
            setActiveTab("groups");
            setSelectedItem(null);
          }}
        >
          <UsersRound size={18} /> Groups
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        {(activeTab === "friends" ? friends : groups).map((item) => (
          <div
            key={item.id}
            className={`p-2 rounded-lg flex items-center gap-3 cursor-pointer transition ${
              selectedItem === item.id
                ? "bg-secondary text-white"
                : "hover:bg-base-200"
            }`}
            onClick={() => setSelectedItem(item.id)}
          >
            <Users size={20} className="opacity-70" />
            <span className="truncate">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
