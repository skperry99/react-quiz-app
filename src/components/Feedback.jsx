const Feedback = ({ isRight }) => {
  return (
    <p
      className={`feedback ${isRight ? "feedback--right" : "feedback--wrong"}`}
    >
      {isRight ? "Nice work! ✅" : "Not quite — but keep going! ✏️"}
    </p>
  );
};

export default Feedback;
