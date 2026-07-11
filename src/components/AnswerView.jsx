import { useState } from "react";

function SourceCard({ source }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="source-card">
      <button
        type="button"
        className="source-toggle"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className={`badge badge-${source.source_type}`}>{source.source_type}</span>
        <span className="source-title">{source.title}</span>
        <span className="source-score">{source.score.toFixed(2)}</span>
        <span className="source-expand">
          {expanded ? "Collapse" : "Expand"}
          <span className="source-chevron" aria-hidden="true">{expanded ? "▾" : "▸"}</span>
        </span>
      </button>
      {!expanded && <p className="source-snippet">{source.snippet}</p>}
      {expanded && (
        <p className="source-snippet source-snippet-full">{source.text ?? source.snippet}</p>
      )}
    </li>
  );
}

export function AnswerView({ answer, loading, error }) {
  if (loading) return <p>Thinking...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!answer) return null;

  return (
    <div className="answer-view">
      <p className="answer-text">{answer.answer}</p>
      {answer.sources.length > 0 && (
        <p className="source-list-header">
          Top {answer.sources.length} retrieved chunk{answer.sources.length === 1 ? "" : "s"}
        </p>
      )}
      {answer.sources.length > 0 && (
        <ul className="source-list">
          {answer.sources.map((source) => (
            <SourceCard key={source.chunk_id} source={source} />
          ))}
        </ul>
      )}
    </div>
  );
}
