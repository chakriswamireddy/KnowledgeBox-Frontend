import { useState } from "react";
import { ingest } from "../api/client";
import { useToast } from "./Toast";

// A single whitespace-free http(s) token is treated as a URL; everything else
// is a note. Pure — never throws, empty string returns "note".
export function detectType(text) {
  return /^https?:\/\/\S+$/.test(text.trim()) ? "url" : "note";
}

export function AddItemForm({ onAdded }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const trimmed = text.trim();
  const type = detectType(trimmed);
  const isValid = trimmed.length > 0;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    try {
      const payload =
        type === "url" ? { type, url: trimmed } : { type, content: trimmed };
      await ingest(payload);
      setText("");
      toast({ message: `Saved as ${type.toUpperCase()} ✓`, variant: "success" });
      onAdded();
    } catch (err) {
      toast({ message: err.message, variant: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-item-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a link or write a note — we'll figure out which."
        rows={4}
      />

      <div className="add-item-footer">
        {isValid && (
          <span className={`detect-hint detect-${type}`}>
            Detected: {type === "url" ? "URL" : "Note"}
          </span>
        )}
        <button type="submit" disabled={!isValid || loading}>
          {loading ? "Adding…" : "Add"}
        </button>
      </div>
    </form>
  );
}
