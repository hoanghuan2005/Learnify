import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  BookOpen, 
  MessageSquare, 
  Clock, 
  Trash2,
  Download,
  Brain,
  Languages,
  Target,
  Bookmark
} from 'lucide-react';
import AssistantSidebar from '../components/AssistantSidebar';

const AssistantPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI learning assistant. I can help you with language learning, explain concepts, create flashcards, and much more. How can I assist you today?',
      timestamp: new Date(),
      isSaved: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContext, setSelectedContext] = useState('general');
  const messagesEndRef = useRef(null);

  const quickActions = [
    {
      icon: <Languages className="size-5" />,
      title: 'Grammar Help',
      description: 'Get help with grammar rules and explanations',
      prompt: 'Can you explain the grammar rules for...'
    },
    {
      icon: <Target className="size-5" />,
      title: 'Vocabulary Practice',
      description: 'Learn new words and their usage',
      prompt: 'Teach me vocabulary related to...'
    },
    {
      icon: <BookOpen className="size-5" />,
      title: 'Reading Comprehension',
      description: 'Get help understanding texts',
      prompt: 'Help me understand this text...'
    },
    {
      icon: <Brain className="size-5" />,
      title: 'Study Tips',
      description: 'Get personalized study advice',
      prompt: 'Give me study tips for...'
    }
  ];

  const learningContexts = [
    { id: 'general', label: 'General Learning', icon: <Brain className="size-4" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <BookOpen className="size-4" /> },
    { id: 'assignments', label: 'Assignments', icon: <Target className="size-4" /> },
    { id: 'conversation', label: 'Conversation', icon: <MessageSquare className="size-4" /> }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      isSaved: false
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: `I understand you're asking about "${inputValue}". Let me help you with that. This is a simulated response - in the real implementation, this would be an AI-generated answer based on your question and learning context.`,
        timestamp: new Date(),
        isSaved: false
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    setInputValue(action.prompt);
  };

  const toggleSaveMessage = (messageId) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, isSaved: !msg.isSaved }
          : msg
      )
    );
  };

  const deleteMessage = (messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[93vh] flex">
      <AssistantSidebar 
        selectedContext={selectedContext}
        setSelectedContext={setSelectedContext}
        quickActions={quickActions}
        handleQuickAction={handleQuickAction}
        messages={messages}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-base-100">
        {/* Chat Header */}
        <div className="p-4 border-b border-base-300 bg-base-100">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/20">
              <Bot className="size-6 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">AI Learning Assistant</h2>
              <p className="text-sm opacity-70">
                Context: {learningContexts.find(c => c.id === selectedContext)?.label}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="p-2 rounded-lg bg-primary/20 w-10 h-10 flex items-center justify-center flex-shrink-0">
                  <Bot className="size-5 text-primary flex-shrink-0" />
                </div>
              )}
              
              <div
                className={`max-w-[70%] p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-200 shadow-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Message Actions */}
                <div className="flex items-center gap-2 mt-3 pt-2 border-t border-base-content/10">
                  <span className="text-xs opacity-70 flex items-center gap-1">
                    <Clock className="size-3" />
                    {formatTime(message.timestamp)}
                  </span>
                  
                  {message.type === 'assistant' && (
                    <>
                      <button
                        onClick={() => toggleSaveMessage(message.id)}
                        className={`p-1 rounded hover:bg-base-content/10 transition-colors ${
                          message.isSaved ? 'text-secondary' : 'opacity-70'
                        }`}
                        title={message.isSaved ? 'Remove from saved' : 'Save message'}
                      >
                        <Bookmark className="size-3" />
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(message.content)}
                        className="p-1 rounded hover:bg-base-content/10 transition-colors opacity-70"
                        title="Copy message"
                      >
                        <Download className="size-3" />
                      </button>
                      <button
                        onClick={() => deleteMessage(message.id)}
                        className="p-1 rounded hover:bg-base-content/10 transition-colors opacity-70 hover:text-error"
                        title="Delete message"
                      >
                        <Trash2 className="size-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="p-2 rounded-lg bg-primary/10">
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-xs text-primary-content font-medium">U</span>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="p-2 rounded-lg bg-primary/10 w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Bot className="size-5 text-primary flex-shrink-0" />
              </div>
              <div className="bg-base-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="loading loading-dots loading-sm"></span>
                  <span className="text-sm opacity-70">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-16 pb-7 border-base-200 bg-base-100">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your learning..."
              className="w-full input input-bordered focus:input-primary bg-base-100 px-6 pr-16 h-[57px] rounded-lg"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 min-h-0 flex items-center justify-center rounded-lg bg-base-200 hover:bg-base-300 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Send className="size-5 flex-shrink-0 text-base-content" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;