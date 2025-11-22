const Result = ({ score, totalQuestions }) => {
  return (
    <div className="result">
      <h2>Quiz Completed!</h2>
      <p>
        You scored {score} out of {totalQuestions}.
      </p>
    </div>
  );
};

export default Result;
