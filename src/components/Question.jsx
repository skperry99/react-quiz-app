const Question = ({
  questionData,
  handleAnswer,
  handleClick,
  questionNum,
  buttonClassName,
}) => {
  return (
    <>
      <p id="question">
        {questionNum}
        {" - "}
        {questionData.text}
      </p>
      <div className="options">
        <ul className="options-list">
          {questionData.options.map((option, index) => (
            <li key={index}>
              <button
                name={"optionBtn" + index}
                className={buttonClassName}
                key={index}
                onClick={() => {
                  handleAnswer(index);
                  handleClick(index);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Question;
