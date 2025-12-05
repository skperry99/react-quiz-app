// src/App.jsx
import { useState } from "react";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Admin from "./components/Admin";
import AdminGate from "./components/AdminGate";

function App() {
  const [view, setView] = useState("quiz"); // 'quiz' | 'admin'
  const [adminUnlocked, setAdminUnlocked] = useState(false);

  const goToQuiz = () => setView("quiz");
  const goToAdmin = () => setView("admin");

  return (
    <div className="App">
      <Header />

      <nav className="app-nav">
        <button
          type="button"
          className={view === "quiz" ? "nav-btn nav-btn--active" : "nav-btn"}
          onClick={goToQuiz}
        >
          Quiz
        </button>
        <button
          type="button"
          className={view === "admin" ? "nav-btn nav-btn--active" : "nav-btn"}
          onClick={goToAdmin}
        >
          Admin
        </button>
      </nav>

      <main>
        {view === "quiz" && <Quiz />}

        {view === "admin" &&
          (adminUnlocked ? (
            <Admin />
          ) : (
            <AdminGate onUnlock={() => setAdminUnlocked(true)} />
          ))}
      </main>
    </div>
  );
}

export default App;
