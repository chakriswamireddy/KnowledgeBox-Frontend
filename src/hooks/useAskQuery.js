import { useCallback, useState } from "react";
import { query } from "../api/client";

export function useAskQuery() {
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ask = useCallback(async (question) => {
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const result = await query({ question });
      setAnswer(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { answer, loading, error, ask };
}
