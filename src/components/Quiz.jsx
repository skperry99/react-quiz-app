// src/components/Quiz.jsx
import { useEffect, useState } from "react";
import Question from "./Question.jsx";
import Result from "./Results.jsx";
import Feedback from "./Feedback.jsx";
import { quizArray } from "../helpers/quiz.js";
import { getRandomFeedback } from "../helpers/feedback.js"; // ✅ new import

// For now, default to localhost:8080.
// TODO: set VITE_API_BASE_URL in .env for different environments.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

// Fisher–Yates shuffle
const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [answerStatus, setAnswerStatus] = useState(null); // 'correct' | 'incorrect' | null
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // ---- Load questions from backend (with fallback to local quizArray) ----
  useEffect(() => {
    async function loadQuestions() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/questions`);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setQuestions(shuffleArray(data));
        } else {
          // Backend returned empty array; fallback to local seed
          setQuestions(shuffleArray(quizArray));
        }
      } catch (err) {
        console.error(
          "Failed to load questions from API, using local data:",
          err
        );
        setLoadError(err.message);
        setQuestions(shuffleArray(quizArray));
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  // ---- Early states: loading / empty ----
  if (loading) {
    return <div className="quiz">Loading questions…</div>;
  }

  if (!questions.length) {
    return (
      <div className="quiz">
        <p>No questions available.</p>
        {loadError && (
          <p className="feedback feedback--wrong">Error: {loadError}</p>
        )}
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  const handleAnswer = (option) => {
    if (isLocked) return;

    setSelectedOption(option);

    const isCorrect = option === correctAnswer;

    // ✅ use weighted feedback helper
    const message = getRandomFeedback(isCorrect);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }

    setFeedbackMessage(message);
    setShowFeedbackMessage(true);
    setShowCorrectAnswer(true);
    setIsLocked(true);
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      setShowResult(true);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);

    // reset per-question state
    setAnswerStatus(null);
    setShowFeedbackMessage(false);
    setShowCorrectAnswer(false);
    setIsLocked(false);
    setSelectedOption(null);
    setFeedbackMessage("");
  };

  const handleRestart = () => {
    // reshuffle whatever question set we currently have (API or fallback)
    setQuestions((prev) => shuffleArray(prev));
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswerStatus(null);
    setShowFeedbackMessage(false);
    setShowCorrectAnswer(false);
    setIsLocked(false);
    setSelectedOption(null);
    setFeedbackMessage("");
  };

  return (
    <div className="quiz">
      {!showResult ? (
        <>
          <div className="quiz-status">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>Score: {score}</span>
          </div>

          <Question
            questionData={currentQuestion}
            questionNum={currentQuestionIndex + 1}
            onAnswer={handleAnswer}
            isLocked={isLocked}
            selectedOption={selectedOption}
            correctAnswer={correctAnswer}
            showCorrectAnswer={showCorrectAnswer}
          />

          {showFeedbackMessage && feedbackMessage && (
            <Feedback
              isRight={answerStatus === "correct"}
              message={feedbackMessage}
            />
          )}

          {showCorrectAnswer && (
            <p className="correct-answer">
              Correct answer: <strong>{correctAnswer}</strong>
            </p>
          )}

          <button className="next-btn" onClick={handleNextQuestion}>
            {currentQuestionIndex === questions.length - 1
              ? "See Results"
              : "Next Question"}
          </button>

          {loadError && (
            <p className="feedback feedback--wrong">
              (Using local questions. API error: {loadError})
            </p>
          )}
        </>
      ) : (
        <Result
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Quiz;
