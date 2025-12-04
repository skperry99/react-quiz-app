const Question = ({
  questionData,
  questionNum,
  onAnswer,
  isLocked,
  selectedOption,
  correctAnswer,
  showCorrectAnswer,
}) => {
  const { text, options } = questionData;

  return (
    <>
      <p id="question">
        {questionNum} - {text}
      </p>
      <div className="options">
        <ul className="options-list">
          {options.map((option, index) => {
            let extraClass = "";

            if (showCorrectAnswer) {
              if (option === correctAnswer) {
                extraClass = " option-btn--correct";
              } else if (option === selectedOption) {
                extraClass = " option-btn--incorrect";
              }
            }

            return (
              <li key={index} className="option-item">
                <button
                  type="button"
                  className={`option-btn${extraClass}`}
                  disabled={isLocked}
                  onClick={() => onAnswer(option)}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Question;
