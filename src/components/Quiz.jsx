import { useState } from "react";
import Question from "./Question.jsx";
import Result from "./Results.jsx";
import Feedback from "./Feedback.jsx";
import { quizArray } from "../helpers/quiz.js";

const Quiz = () => {
  const questions = quizArray; // use the array from helpers

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [answerStatus, setAnswerStatus] = useState(null); // 'correct' | 'incorrect' | null
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.correctAnswer; // ✅ use the real property

  const handleAnswer = (option) => {
    if (isLocked) return;

    setSelectedOption(option);

    const isCorrect = option === correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAnswerStatus("correct");
    } else {
      setAnswerStatus("incorrect");
    }

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
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswerStatus(null);
    setShowFeedbackMessage(false);
    setShowCorrectAnswer(false);
    setIsLocked(false);
    setSelectedOption(null);
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

          {showFeedbackMessage && (
            <Feedback isRight={answerStatus === "correct"} />
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
