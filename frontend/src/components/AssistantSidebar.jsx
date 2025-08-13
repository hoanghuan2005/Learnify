import React from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Lightbulb, 
  MessageSquare, 
  Brain, 
  Languages, 
  Target 
} from 'lucide-react';

const AssistantSidebar = ({ 
  selectedContext, 
  setSelectedContext, 
  quickActions, 
  handleQuickAction, 
  messages 
}) => {
  const learningContexts = [
    { id: 'general', label: 'General Learning', icon: <Brain className="size-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <BookOpen className="size-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <Target className="size-4" /> },
    { id: 'conversation', label: 'Conversation', icon: <MessageSquare className="size-4" /> }
  ];

  return (
    <div className="w-80 bg-base-100 border-r border-base-300 p-4 space-y-6">
      {/* Context Selector */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          Learning Context
        </h3>
        <div className="space-y-2">
          {learningContexts.map((context) => (
            <button
              key={context.id}
              onClick={() => setSelectedContext(context.id)}
              className={`w-full p-3 rounded-lg flex items-center gap-3 transition-colors ${
                selectedContext === context.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'hover:bg-base-content/5'
              }`}
            >
              {context.icon}
              <span className="text-sm font-medium">{context.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Lightbulb className="size-5 text-secondary" />
          Quick Actions
        </h3>
        <div className="space-y-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action)}
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
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssistantSidebar;