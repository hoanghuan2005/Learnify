import React from 'react';
import { useParams } from 'react-router-dom';

const DetailFlashcardsPage = () => {
  const { id } = useParams();

  // Giả lập dữ liệu câu hỏi
  const questions = [
    { id: 1, question: "What is the capital of France?", answer: "Paris" },
    { id: 2, question: "What does HTML stand for?", answer: "HyperText Markup Language" }
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Flashcard Pack #{id}</h1>
      <button style={{ marginBottom: "20px" }}>+ Add Question</button>

      {questions.map(q => (
        <div key={q.id} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ddd" }}>
          <p><strong>Q:</strong> {q.question}</p>
          <p><strong>A:</strong> {q.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default DetailFlashcardsPage;
