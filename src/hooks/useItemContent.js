import { useCallback, useState } from "react";
import { getItem } from "../api/client";

// Lazily fetches an item's full body the first time a card is expanded and
// caches it, so toggling collapse/expand again is instant.
export function useItemContent(id) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (content !== null || loading) return;
    setLoading(true);
    setError(null);
    try {
      const item = await getItem(id);
      setContent(item.raw_content ?? "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id, content, loading]);

  return { content, loading, error, load };
}
