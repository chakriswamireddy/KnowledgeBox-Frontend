# Knowledge Inbox — Frontend

React UI for the AI Knowledge Inbox. Save notes and URLs, view saved items, ask
questions, and read the generated answer with its cited source snippets.

Talks to the FastAPI backend (see `Knowledge-Backend`).

## Stack

- **React 19** + **Vite 8**
- Plain React hooks for state — no state library
- **Oxlint** for linting
- Hand-written CSS, no UI framework — clarity over visual polish (per the brief)

## Setup

**Prerequisites:** Node 18+, and the **backend running** (default `http://127.0.0.1:8000`).

```bash
cd frontend

# 1. install
npm install

# 2. configure (only if backend isn't on the default port)
cp .env.example .env
# set VITE_API_BASE_URL=... in .env

# 3. run
npm run dev
```

Dev server: **http://localhost:5173** (HMR enabled). Open it with the backend up.

### Environment

| Var | Default | Purpose |
|-----|---------|---------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | backend API base URL |

`.env` is optional — the client falls back to the default if unset.

## What it does

- **Add** a note or URL (`AddItemForm`) → `POST /ingest`
- **List** saved items (`ItemList` + `useItems`) → `GET /items`
- **Ask** a question (`AskPanel` + `useAskQuery`) → `POST /query`
- **Answer** (`AnswerView`) shows the answer plus source snippets with scores
- **Toast** for success/error feedback

## Layout

```
src/
  api/client.js       one thin fetch wrapper around the backend
  hooks/              useItems, useItemContent, useAskQuery — one hook per concern
  components/         AddItemForm, ItemList, AskPanel, AnswerView, Toast
  App.jsx             composes the panels + wires shared state
  main.jsx            entry
```

## Design notes

- **One hook per data concern** (`useItems`, `useAskQuery`, `useItemContent`)
  keeps fetch state, loading, and errors out of the components — components render,
  hooks talk to the API.
- **Single API client** — every request goes through `api/client.js`, so the base
  URL, headers, and error handling live in one place.
- **No state library** — the app is small; `useState` + hooks are enough. Adding
  Redux/Zustand here would be over-engineering (the brief warns against it).
- **Sources always shown** with each answer so results stay verifiable, not just
  a bare LLM response.

## Scripts

```bash
npm run dev       # dev server + HMR
npm run build     # production build → dist/
npm run preview   # preview the build
npm run lint      # oxlint
```
