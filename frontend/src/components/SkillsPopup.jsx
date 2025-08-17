import React from "react";
import { ChevronRight } from "lucide-react";

const SkillsPopup = ({ skills, onSkillSelect, action }) => {
  return (
    <div className="absolute left-full -top-40 ml-2 w-64 bg-base-200 border border-base-300 rounded-lg shadow-lg z-50 p-3">
      <h5 className="font-medium text-sm mb-3 text-primary">
        Choose a skill to focus on:
      </h5>
      <div className="space-y-2">
        {skills.map((skill, skillIndex) => (
          <button
            key={skillIndex}
            onClick={() => onSkillSelect({ ...action, prompt: skill.prompt })}
            className="w-full p-3 rounded-lg bg-base-100 hover:bg-primary/10 hover:border-primary/30 border border-transparent transition-all duration-200 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <h6 className="font-medium text-sm">{skill.name}</h6>
                <p className="text-xs opacity-70">{skill.description}</p>
              </div>
              <ChevronRight className="size-3 opacity-50" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillsPopup;
