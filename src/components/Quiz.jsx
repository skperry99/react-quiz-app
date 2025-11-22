import { useState } from "react";
import Question from "./Question.jsx";
import Result from "./Results.jsx";
import { quizArray } from "../helpers/quiz.js";
import Feedback from "./Feedback.jsx";
// import { shuffleArray } from "../helpers/helpers.js";

const Quiz = () => {
  // const quizArray = shuffleArray(quizArray);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerStatus, setAnswerStatus] = useState(null); // 'correct', 'incorrect', or null
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [showAnsMessage, setShowAnsMessage] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // const [isButtonClicked, setIsButtonClicked] = useState(false);

  const nextQuestionIndex = currentQuestionIndex + 1;
  const correctAnswer = quizArray[currentQuestionIndex].text;

  const handleAnswer = (selectedOption) => {
    if (selectedOption === quizArray[currentQuestionIndex].answerIdx) {
      setScore(score + 1);
      setAnswerStatus(true);
      setShowFeedbackMessage(true);
    } else {
      setAnswerStatus(false);
      setShowAnsMessage(true);
      setShowFeedbackMessage(true);
    }
  };

  const getButtonClassName = () => {
    if (answerStatus === true) {
      return "correct-answer-style";
    } else if (answerStatus === false) {
      return "incorrect-answer-style";
    }
    return ""; // No specific style initially
  };

  // const handleButton = () => {};

  const handleNewQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setShowAnsMessage(false);
    setShowFeedbackMessage(false);
  };

  const handleNextQuestion = () => {
    if (nextQuestionIndex < quizArray.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setShowFeedbackMessage(false);
      setAnswerStatus(null);
    } else {
      setShowResult(true);
      setShowFeedbackMessage(false);
    }
  };

  return (
    <div className="quiz">
      {showResult ? (
        <div>
          <Result score={score} totalQuestions={quizArray.length} />
          <button className="new-btn" onClick={handleNewQuiz}>
            New Quiz
          </button>
        </div>
      ) : (
        <>
          <Question
            questionData={quizArray[currentQuestionIndex]}
            questionNum={nextQuestionIndex}
            handleAnswer={handleAnswer}
            buttonClassName={getButtonClassName()}
            // handleClick={handleButton}
          />
          {showFeedbackMessage && <Feedback isRight={answerStatus} />}
          {showAnsMessage && <p>{correctAnswer}</p>}
          <button className="next-btn" onClick={handleNextQuestion}>
            Next Question
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;
