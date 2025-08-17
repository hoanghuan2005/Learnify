import React, { useState } from "react";
import {
  Sparkles,
  BookOpen,
  Lightbulb,
  MessageSquare,
  Brain,
  Languages,
  Target,
  ChevronRight,
} from "lucide-react";
import SkillsPopup from "./SkillsPopup";

const AssistantSidebar = ({
  selectedContext,
  setSelectedContext,
  quickActions,
  handleQuickAction,
}) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const learningContexts = [
    {
      id: "general",
      label: "General Learning",
      icon: <Brain className="size-4" />,
    },
    {
      id: "flashcards",
      label: "Flashcards",
      icon: <BookOpen className="size-4" />,
    },
    {
      id: "assignments",
      label: "Assignments",
      icon: <Target className="size-4" />,
    },
    {
      id: "conversation",
      label: "Conversation",
      icon: <MessageSquare className="size-4" />,
    },
  ];

  return (
    <div className="w-80 bg-base-100 border-r border-base-300 p-4 space-y-4">
      {/* Context Selector */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Learning Context
        </h3>
        <div className="space-y-1">
          {learningContexts.map((context) => (
            <button
              key={context.id}
              onClick={() => setSelectedContext(context.id)}
              className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                selectedContext === context.id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "hover:bg-base-content/5"
              }`}
            >
              {context.icon}
              <span className="text-sm font-medium">{context.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Lightbulb className="size-5 text-secondary" />
          Quick Actions
        </h3>
        <div className="space-y-4">
          {quickActions.map((action, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => handleQuickAction(action)}
                onMouseEnter={() => action.skills && setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="w-full p-4 rounded-lg bg-base-100 hover:bg-base-content/5 transition-all duration-200 border border-base-300 hover:border-primary/30 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {action.icon}
                  </div>
                  <div className="text-left flex-1">
                    <h4 className="font-medium text-sm mb-1">{action.title}</h4>
                    <p className="text-xs opacity-70">{action.description}</p>
                  </div>
                  {action.skills && (
                    <ChevronRight className="size-4 opacity-50" />
                  )}
                </div>
              </button>

              {/* Skills Popup */}
              {action.skills && hoveredSkill === index && (
                <SkillsPopup
                  skills={action.skills}
                  onSkillSelect={handleQuickAction}
                  action={action}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssistantSidebar;
