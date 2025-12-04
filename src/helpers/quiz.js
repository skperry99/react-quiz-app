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

// Populating answerArray for each question object in quizArray
for (let i = 0; i < quizArray.length; i++) {
  for (let j = 0; j < 4; j++) {
    let num = j + i * 4;
    quizArray[i].options.push(optionArray[num]);
  }
}
// console.log(quizArray[0]);
export { quizArray };
