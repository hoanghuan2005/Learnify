import React from 'react';
import { Link } from 'react-router-dom';

const FlashcardsPage = () => {
  const flashcardPacks = [
    { id: 1, title: "English Vocabulary", totalQuestions: 20 },
    { id: 2, title: "JavaScript Basics", totalQuestions: 15 },
    { id: 3, title: "History Facts", totalQuestions: 10 }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Flashcard Packs</h1>
      <button style={{ marginBottom: "20px" }}>+ Create New Pack</button>

      <div style={{ display: "grid", gap: "10px" }}>
        {flashcardPacks.map(pack => (
          <div key={pack.id} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
            <h3>{pack.title}</h3>
            <p>Total Questions: {pack.totalQuestions}</p>
            <Link to={`/flashcards/${pack.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardsPage;
