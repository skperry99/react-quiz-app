import { useEffect, useState } from "react";
import Question from "./Question.jsx";
import Result from "./Results.jsx";
import Feedback from "./Feedback.jsx";
import { API_BASE_URL } from "../config/api.js";
import { quizArray } from "../helpers/quiz.js";
import { getRandomFeedback } from "../helpers/feedback.js";

const QUESTION_COUNT = 10;

// Fisher–Yates shuffle
const shuffleArray = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

// Normalize questions + shuffle options inside each question
const prepareQuestions = (rawQuestions) =>
  rawQuestions.map((q) => ({
    ...q,
    options: q.options ? shuffleArray(q.options) : [],
  }));

// Pick a random subset of size <= QUESTION_COUNT
const pickQuestionSet = (pool) => {
  const shuffled = shuffleArray(pool);
  return shuffled.slice(0, Math.min(QUESTION_COUNT, shuffled.length));
};

const Quiz = () => {
  const [allQuestions, setAllQuestions] = useState([]);
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

        let prepared;
        if (Array.isArray(data) && data.length > 0) {
          prepared = prepareQuestions(data);
        } else {
          prepared = prepareQuestions(quizArray);
        }

        setAllQuestions(prepared);
        setQuestions(pickQuestionSet(prepared));
      } catch (err) {
        console.error(
          "Failed to load questions from API, using local data:",
          err
        );
        setLoadError(err.message);

        const preparedFallback = prepareQuestions(quizArray);
        setAllQuestions(preparedFallback);
        setQuestions(pickQuestionSet(preparedFallback));
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
    if (!allQuestions.length) return;

    // Pick a fresh random 10 from the full pool
    const nextSet = pickQuestionSet(allQuestions);

    setQuestions(nextSet);
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
