import { useState } from "react";

export function AskPanel({ onAsk, loading }) {
  const [question, setQuestion] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!question.trim() || loading) return;
    onAsk(question.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="ask-panel">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask a question about your saved content..."
        disabled={loading}
      />
      <button type="submit" disabled={loading || !question.trim()}>
        {loading ? "Asking..." : "Ask"}
      </button>
    </form>
  );
}
