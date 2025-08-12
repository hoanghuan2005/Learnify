import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlusIcon, ArrowLeftIcon, EditIcon, TrashIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const DetailFlashcardsPage = () => {
  const { id } = useParams();
  const [showAnswers, setShowAnswers] = useState(false);

  // Giả lập dữ liệu câu hỏi
  const questions = [
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What does HTML stand for?", answer: "HyperText Markup Language" },
    { id: 3, question: "Who wrote Romeo and Juliet?", answer: "William Shakespeare" },
    { id: 4, question: "What is the chemical symbol for gold?", answer: "Au" }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/flashcards" className="btn btn-ghost btn-sm">
              <ArrowLeftIcon className="size-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Flashcard Pack #{id}</h1>
              <p className="opacity-70 mt-1">{questions.length} questions in this pack</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className="btn btn-outline btn-sm"
              onClick={() => setShowAnswers(!showAnswers)}
            >
              {showAnswers ? (
                <>
                  <EyeOffIcon className="size-4" />
                  Hide Answers
                </>
              ) : (
                <>
                  <EyeIcon className="size-4" />
                  Show Answers
                </>
              )}
            </button>
            <button className="btn btn-primary btn-sm">
              <PlusIcon className="size-4" />
              Add Question
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div key={q.id} className="card bg-base-200 hover:shadow-md transition-all duration-300">
              <div className="card-body p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="badge badge-primary badge-sm p-2">#{index + 1}</span>
                      <h3 className="font-semibold text-lg -mt-0.5">Question</h3>
                    </div>
                    <p className="text-base-content">{q.question}</p>
                    
                    {showAnswers && (
                      <>
                        <div className="divider my-2"></div>
                        <div className="flex items-center gap-2">
                          <span className="badge badge-secondary badge-sm">Answer</span>
                          <h4 className="font-semibold text-lg -mt-0.5">Answer</h4>
                        </div>
                        <p className="text-base-content">{q.answer}</p>
                      </>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn btn-ghost btn-sm">
                      <EditIcon className="size-4" />
                    </button>
                    <button className="btn btn-ghost btn-sm text-error">
                      <TrashIcon className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (when no questions exist) */}
        {questions.length === 0 && (
          <div className="card bg-base-200 p-8 text-center">
            <div className="size-16 mx-auto mb-4 opacity-50">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2">No questions yet</h3>
            <p className="text-base-content opacity-70 mb-4">
              Add your first question to start building this flashcard pack
            </p>
            <button className="btn btn-primary">
              <PlusIcon className="size-4" />
              Add Your First Question
            </button>
          </div>
        )}

        {/* Study Actions */}
        {questions.length > 0 && (
          <div className="card bg-primary/10 border border-primary/20 p-6">
            <div className="text-center">
              <h3 className="font-semibold text-[18px]">Ready to study?</h3>
              <p className="opacity-70 mt-2 mb-4">Test your knowledge with these flashcards</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="btn btn-primary">
                  Start Study Session
                </button>
                <button className="btn btn-outline">
                  Practice Mode
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailFlashcardsPage;
