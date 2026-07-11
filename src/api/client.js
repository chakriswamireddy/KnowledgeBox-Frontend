const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch {
    throw new ApiError(0, "network_error", "Could not reach the server");
  }

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    const error = body?.error ?? {};
    throw new ApiError(
      response.status,
      error.code ?? "unknown_error",
      error.message ?? "Request failed"
    );
  }

  return body;
}

export function ingest({ type, content, url }) {
  return request("/ingest", {
    method: "POST",
    body: JSON.stringify({ type, content, url }),
  });
}

export function listItems() {
  return request("/items");
}

export function getItem(id) {
  return request(`/items/${id}`);
}

export function query({ question, topK }) {
  return request("/query", {
    method: "POST",
    body: JSON.stringify({ question, top_k: topK }),
  });
}
