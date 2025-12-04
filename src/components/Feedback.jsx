const Feedback = ({ isRight, message }) => {
  if (!message) return null;

  return (
    <p
      className={`feedback ${isRight ? "feedback--right" : "feedback--wrong"}`}
    >
      {message}
    </p>
  );
};

export default Feedback;
