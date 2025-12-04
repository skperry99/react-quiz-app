const Result = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100) || 0;

  return (
    <section className="results" aria-labelledby="results-heading">
      <h2 id="results-heading" className="results-title">
        Quiz Completed!
      </h2>

      <p className="results-score">
        You scored <strong>{score}</strong> out of <strong>{total}</strong> (
        {percentage}%).
      </p>

      {onRestart && (
        <button
          type="button"
          className="next-btn results-restart-btn"
          onClick={onRestart}
        >
          Try again
        </button>
      )}
    </section>
  );
};

export default Result;
