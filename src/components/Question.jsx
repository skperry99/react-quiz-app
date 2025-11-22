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
                // highlight the correct one
                extraClass = " option-btn--correct";
              } else if (option === selectedOption) {
                // user's wrong choice
                extraClass = " option-btn--incorrect";
              }
            }

            return (
              <li key={index} className="option-item">
                <button
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
