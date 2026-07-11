# Knowledge Inbox — Frontend

React UI for the AI Knowledge Inbox. Save notes and URLs, view saved items, ask
questions, and read the generated answer with its cited source snippets.

Pairs with the FastAPI backend (see `Knowledge-Backend`).

## Stack

- **React 19** + **Vite 8**
- Plain React hooks for state (no state library)
- **Oxlint** for linting
- CSS (no UI framework) — clarity over visual polish

## Setup

```bash
cd frontend
npm install

cp .env.example .env            # set VITE_API_BASE_URL if backend isn't on :8000
npm run dev
```

Dev server: `http://localhost:5173`. Backend must be running.

### Environment

| Var | Default | Purpose |
|-----|---------|---------|
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000` | backend API base URL |

## What it does

- **Add** a note or a URL (`AddItemForm`) → `POST /ingest`
- **List** saved items (`ItemList`, `useItems`) → `GET /items`
- **Ask** a question (`AskPanel`, `useAskQuery`) → `POST /query`
- **Answer** view (`AnswerView`) shows the answer plus source snippets with scores
- **Toast** for success/error feedback

## Layout

```
src/
  api/client.js       thin fetch wrapper around the backend
  hooks/              useItems, useItemContent, useAskQuery
  components/         AddItemForm, ItemList, AskPanel, AnswerView, Toast
  App.jsx             composes the panels
  main.jsx            entry
```

## Scripts

```bash
npm run dev       # dev server + HMR
npm run build     # production build → dist/
npm run preview   # preview the build
npm run lint      # oxlint
```
