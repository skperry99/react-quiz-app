// scripts/quiz-to-sql.mjs

// Simple ESM import; Node will resolve this relative to this file
import { quizArray } from "../src/helpers/quiz.js";

// Make sure we got something sensible
if (!Array.isArray(quizArray)) {
  throw new Error("quizArray is not an array in src/helpers/quiz.js");
}

// Basic SQL string escaper for single quotes
function escapeSql(str) {
  return String(str).replace(/'/g, "''");
}

let questionCounter = 0;

for (const q of quizArray) {
  questionCounter += 1;

  const questionText = q.text;
  const options = q.options;
  const correct = q.correctAnswer;

  if (!questionText || !Array.isArray(options) || options.length !== 4) {
    console.warn(
      `Skipping question #${questionCounter}: unexpected structure`,
      q
    );
    continue;
  }
  if (!correct) {
    console.warn(
      `Skipping question #${questionCounter}: missing correctAnswer`,
      q
    );
    continue;
  }

  const escapedQuestion = escapeSql(questionText);

  console.log(`-- Question ${questionCounter}`);
  console.log(
    `INSERT INTO question (text, category, difficulty) VALUES ('${escapedQuestion}', NULL, 'EASY');`
  );
  console.log("SET @question_id = LAST_INSERT_ID();");

  options.forEach((optText, index) => {
    const escapedOpt = escapeSql(optText);
    const isCorrect = optText === correct ? 1 : 0;

    console.log(
      `INSERT INTO answer_option (option_index, text, is_correct, question_id) VALUES (${index}, '${escapedOpt}', ${isCorrect}, @question_id);`
    );
  });

  console.log(""); // blank line between questions
}
