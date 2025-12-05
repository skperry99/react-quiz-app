import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Admin from "./components/Admin";

function App() {
  const [view, setView] = useState("quiz"); // 'quiz' | 'admin'

  return (
    <div className="App">
      <Header />

      <nav className="app-nav">
        <button
          type="button"
          className={view === "quiz" ? "nav-btn nav-btn--active" : "nav-btn"}
          onClick={() => setView("quiz")}
        >
          Quiz
        </button>
        <button
          type="button"
          className={view === "admin" ? "nav-btn nav-btn--active" : "nav-btn"}
          onClick={() => setView("admin")}
        >
          Admin
        </button>
      </nav>

      <main>{view === "quiz" ? <Quiz /> : <Admin />}</main>
    </div>
  );
}

export default App;
