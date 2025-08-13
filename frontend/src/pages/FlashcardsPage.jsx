import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, BookOpenIcon } from 'lucide-react';

const FlashcardsPage = () => {
  const flashcardPacks = [
    { id: 1, title: "English Vocabulary", totalQuestions: 20, description: "Essential words for everyday conversation" },
    { id: 2, title: "JavaScript Basics", totalQuestions: 15, description: "Core concepts and syntax fundamentals" },
    { id: 3, title: "History Facts", totalQuestions: 10, description: "Important historical events and dates" }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Flashcard Packs</h1>
            <p className="opacity-70 mt-2">Create and manage your study materials</p>
          </div>
          <button className="btn btn-primary btn-sm">
            <PlusIcon className="size-4" />
            Create New Pack
          </button>
        </div>

        {/* Flashcard Packs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardPacks.map(pack => (
            <div key={pack.id} className="card bg-base-200 hover:shadow-lg transition-all duration-300">
              <div className="card-body p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="avatar size-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BookOpenIcon className="size-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{pack.title}</h3>
                    <p className="text-sm opacity-70">{pack.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="badge badge-secondary">
                    {pack.totalQuestions} Questions
                  </span>
                  <Link to={`/flashcards/${pack.id}`}>
                    <button className="btn btn-outline btn-sm">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (when no packs exist) */}
        {flashcardPacks.length === 0 && (
          <div className="card bg-base-200 p-8 text-center">
            <BookOpenIcon className="size-16 mx-auto mb-4 opacity-50" />
            <h3 className="font-semibold text-lg mb-2">No flashcard packs yet</h3>
            <p className="text-base-content opacity-70 mb-4">
              Create your first flashcard pack to start studying
            </p>
            <button className="btn btn-primary">
              <PlusIcon className="mr-2 size-4" />
              Create Your First Pack
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsPage;
