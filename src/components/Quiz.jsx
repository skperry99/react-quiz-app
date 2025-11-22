import { useState } from "react";
import Question from "./Question.jsx";
import Result from "./Results.jsx";
import Feedback from "./Feedback.jsx";
import { quizArray } from "../helpers/quiz.js";
import { rightResponse, wrongResponse } from "../helpers/feedback.js";

const shuffleArray = (arr) => {
  const copy = [...arr]; // don’t mutate original quizArray
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const Quiz = () => {
  const [questions, setQuestions] = useState(() => shuffleArray(quizArray));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [answerStatus, setAnswerStatus] = useState(null); // 'correct' | 'incorrect' | null
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState(""); // 👈 NEW

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer;

  const handleAnswer = (option) => {
    if (isLocked) return;

    setSelectedOption(option);

    const isCorrect = option === correctAnswer;
    const pool = isCorrect ? rightResponse : wrongResponse;
    const randomIdx = Math.floor(Math.random() * pool.length);
    const message = pool[randomIdx];

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }

    setFeedbackMessage(message); // 👈 store chosen message
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
    setFeedbackMessage(""); // 👈 reset
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(quizArray)); // 👈 new
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
