import { useState } from "react";
import { AddItemForm } from "./components/AddItemForm";
import { ItemList } from "./components/ItemList";
import { AskPanel } from "./components/AskPanel";
import { AnswerView } from "./components/AnswerView";
import { useItems } from "./hooks/useItems";
import { useAskQuery } from "./hooks/useAskQuery";
import "./App.css";

function App() {
  const { items, loading: itemsLoading, error: itemsError, refresh } = useItems();
  const { answer, loading: askLoading, error: askError, ask } = useAskQuery();
  const [tab, setTab] = useState("add");

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Knowledge Inbox</h1>
        <p className="app-tagline">Save notes and links, then ask across everything.</p>
      </header>

      <section className="panel">
        <div className="tab-bar" role="tablist">
          <button
            role="tab"
            aria-selected={tab === "add"}
            className={tab === "add" ? "active" : ""}
            onClick={() => setTab("add")}
          >
            Add
          </button>
          <button
            role="tab"
            aria-selected={tab === "ask"}
            className={tab === "ask" ? "active" : ""}
            onClick={() => setTab("ask")}
          >
            Ask
          </button>
        </div>

        <div className="panel-body">
          {tab === "add" ? (
            <AddItemForm onAdded={refresh} />
          ) : (
            <>
              <AskPanel onAsk={ask} loading={askLoading} />
              <AnswerView answer={answer} loading={askLoading} error={askError} />
            </>
          )}
        </div>
      </section>

      <section className="items-section">
        <div className="items-head">
          <h2>Saved items</h2>
          <span className="items-count">{items.length}</span>
        </div>
        <ItemList items={items} loading={itemsLoading} error={itemsError} />
      </section>
    </div>
  );
}

export default App;
