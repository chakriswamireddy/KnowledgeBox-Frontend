import { useState } from "react";
import { useItemContent } from "../hooks/useItemContent";

function ItemCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const { content, loading, error, load } = useItemContent(item.id);

  function toggle() {
    const next = !expanded;
    setExpanded(next);
    if (next) load();
  }

  return (
    <li className={`item-card${expanded ? " expanded" : ""}`}>
      <div className="item-card-head">
        <span className={`badge badge-${item.source_type}`}>{item.source_type}</span>
        <span className="item-time">{new Date(item.created_at).toLocaleString()}</span>
      </div>

      <p className="item-title">{item.title}</p>

      {item.source_url && (
        <a className="item-url" href={item.source_url} target="_blank" rel="noreferrer">
          {item.source_url}
        </a>
      )}

      <button
        type="button"
        className="expand-toggle"
        onClick={toggle}
        aria-expanded={expanded}
      >
        {expanded ? "▼ Collapse" : "▶ Expand"}
      </button>

      {expanded && (
        <div className="item-body">
          {loading && <p className="item-body-status">Loading…</p>}
          {error && <p className="error-text">{error}</p>}
          {content !== null && !loading && !error && (
            <pre className="item-content">{content}</pre>
          )}
        </div>
      )}
    </li>
  );
}

export function ItemList({ items, loading, error }) {
  if (loading) return <p>Loading items…</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (items.length === 0) return <p className="empty-hint">No items yet. Add a note or URL above.</p>;

  return (
    <ul className="item-grid">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ul>
  );
}
