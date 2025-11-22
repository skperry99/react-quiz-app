// Array of quiz questions
let questionArray = [
  "What is the capital of France?",
  'Which planet is known as the "Red Planet"? ',
  "What is the chemical symbol for water?",
  "In what year did World War II begin?",
  'Who wrote "Hamlet"?',
  "What is the largest ocean on Earth?",
  "What is the name of the first person to step on the moon?",
  "Which gas is necessary for life and is released during photosynthesis?",
  "What is the name of the longest river in the world?",
  "What is the currency of Japan?",
  "What is the chemical symbol for gold?",
  "Who painted the Mona Lisa?",
  'Which country is known as the "Land of the Rising Sun"?',
  "What is the name of the smallest country in the world?",
  "What is the largest planet in our solar system?",
  "Which of these is NOT a primary color?",
];

// Array of answers for quiz questions
let answerArray = [
  "Paris",
  "Mars",
  "H2O",
  "1939",
  "William Shakespeare",
  "Pacific Ocean",
  "Neil Armstrong",
  "Oxygen",
  "Nile",
  "Yen",
  "Au",
  "Leonardo da Vinci",
  "Japan",
  "Vatican City",
  "Jupiter",
  "Green",
];

// Array of indexes for the correct answers
let indexArray = [1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 2, 2, 1, 1, 2];

// Array of multiple choice options for quiz questions
let optionArray = [
  "London",
  "Paris",
  "Rome",
  "Berlin",
  "Earth",
  "Mars",
  "Venus",
  "Jupiter",
  "H2O",
  "CO2",
  "NaCl",
  "O2",
  "1914",
  "1939",
  "1941",
  "1945",
  "William Shakespeare",
  "Charles Dickens",
  "Jane Austen",
  "Leo Tolstoy",
  "Atlantic Ocean",
  "Pacific Ocean",
  "Indian Ocean",
  "Arctic Ocean",
  "Neil Armstrong",
  "Buzz Aldrin",
  "Yuri Gagarin",
  "Alan Shepard",
  "Carbon Dioxide",
  "Oxygen",
  "Nitrogen",
  "Hydrogen",
  "Amazon",
  "Nile",
  "Mississippi",
  "Yangtze",
  "Euro",
  "Yen",
  "Dollar",
  "Pound",
  "Ag",
  "Au",
  "Fe",
  "Cu",
  "Vincent van Gogh",
  "Pablo Picasso",
  "Leonardo da Vinci",
  "Claude Monet",
  "China",
  "South Korea",
  "Japan",
  "Vietnam ",
  "Monaco",
  "Vatican City",
  "San Marino",
  "Nauru",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Red",
  "Blue",
  "Green",
  "Yellow",
];

// Create question objects using questionArray, answerArray, indexArray, and optionArray
class QuizInfo {
  constructor(id, text, correctAnswer, answerIdx) {
    this.id = id;
    this.text = text;
    this.options = [];
    this.correctAnswer = correctAnswer;
    this.answerIdx = answerIdx;
  }

  // Build array of answers for each question object
  addAnswer(choice) {
    this.options.push(choice);
  }
}

let quizArray = []; // Declare an empty array to hold the QuizInfo objects
for (let i = 0; i < questionArray.length; i++) {
  quizArray.push(
    new QuizInfo(i + 1, questionArray[i], answerArray[i], indexArray[i])
  );
}
// Access quiz items like this:
// quizObjects.q1 or quizObjects["q1"]
// quizObjects.q2 or quizObjects["q2"]
// ... and so on

// let q1 = new QuizInfo(1, questionArray[0], answerArray[0], indexArray[0]);
// let q2 = new QuizInfo(2, questionArray[1], answerArray[1], indexArray[1]);
// let q3 = new QuizInfo(3, questionArray[2], answerArray[2], indexArray[2]);
// let q4 = new QuizInfo(4, questionArray[3], answerArray[3], indexArray[3]);
// let q5 = new QuizInfo(5, questionArray[4], answerArray[4], indexArray[4]);
// let q6 = new QuizInfo(6, questionArray[5], answerArray[5], indexArray[5]);
// let q7 = new QuizInfo(7, questionArray[6], answerArray[6], indexArray[6]);
// let q8 = new QuizInfo(8, questionArray[7], answerArray[7], indexArray[7]);
// let q9 = new QuizInfo(9, questionArray[8], answerArray[8], indexArray[8]);
// let q10 = new QuizInfo(10, questionArray[9], answerArray[9], indexArray[9]);
// let q11 = new QuizInfo(11, questionArray[10], answerArray[10], indexArray[10]);
// let q12 = new QuizInfo(12, questionArray[11], answerArray[11], indexArray[11]);
// let q13 = new QuizInfo(13, questionArray[12], answerArray[12], indexArray[12]);
// let q14 = new QuizInfo(14, questionArray[13], answerArray[13], indexArray[13]);
// let q15 = new QuizInfo(15, questionArray[14], answerArray[14], indexArray[14]);
// let q16 = new QuizInfo(16, questionArray[15], answerArray[15], indexArray[15]);

// Array of question objects
// const quizArray = [
//   q1,
//   q2,
//   q3,
//   q4,
//   q5,
//   q6,
//   q7,
//   q8,
//   q9,
//   q10,
//   q11,
//   q12,
//   q13,
//   q14,
//   q15,
//   q16,
// ];

// Populating answerArray for each question object in quizArray
for (let i = 0; i < quizArray.length; i++) {
  for (let j = 0; j < 4; j++) {
    let num = j + i * 4;
    quizArray[i].options.push(optionArray[num]);
  }
}
console.log(quizArray[0]);
export { quizArray };
