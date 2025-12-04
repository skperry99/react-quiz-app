import Header from "./components/Header";
import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="App">
      <Header />
      <main aria-label="Quiz content">
        <Quiz />
      </main>
    </div>
  );
}

export default App;
