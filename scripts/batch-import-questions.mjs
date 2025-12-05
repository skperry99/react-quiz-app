// scripts/batch-import-questions.mjs

// --- Config --------------------------------------------------

const BASE_URL = process.env.QUIZ_API_BASE_URL ?? "http://localhost:8080";

// Must match admin.api.token in Spring Boot application.properties
const ADMIN_TOKEN =
  process.env.QUIZ_ADMIN_API_TOKEN ?? "snsdgs";

// --- Questions to import -------------------------------------

/**
 * Each object matches your QuestionRequest:
 * {
 *   text: string,
 *   category: string | null,
 *   difficulty: "EASY" | "MEDIUM" | "HARD",
 *   options: string[],
 *   correctAnswer: string
 * }
 */
const questions = [
  {
    text: "What is the largest continent on Earth?",
    category: "Geography",
    difficulty: "EASY",
    options: ["Africa", "Asia", "Europe", "South America"],
    correctAnswer: "Asia",
  },
  {
    text: "Which instrument has keys, pedals, and strings?",
    category: "Arts & Music",
    difficulty: "EASY",
    options: ["Violin", "Flute", "Piano", "Trumpet"],
    correctAnswer: "Piano",
  },
  {
    text: "What process do plants use to convert sunlight into energy?",
    category: "Science",
    difficulty: "EASY",
    options: ["Fermentation", "Respiration", "Photosynthesis", "Evaporation"],
    correctAnswer: "Photosynthesis",
  },
  {
    text: 'Who wrote the novel "Pride and Prejudice"?',
    category: "Literature",
    difficulty: "EASY",
    options: [
      "Charlotte Brontë",
      "Jane Austen",
      "Mary Shelley",
      "Emily Dickinson",
    ],
    correctAnswer: "Jane Austen",
  },
  {
    text: "Which planet in our solar system is the hottest on average?",
    category: "Science",
    difficulty: "MEDIUM",
    options: ["Mercury", "Venus", "Mars", "Jupiter"],
    correctAnswer: "Venus",
  },
  {
    text: "What is the first element on the periodic table?",
    category: "Science",
    difficulty: "EASY",
    options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    correctAnswer: "Hydrogen",
  },
  {
    text: "Which language has the most native speakers worldwide?",
    category: "Geography",
    difficulty: "MEDIUM",
    options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
    correctAnswer: "Mandarin Chinese",
  },
  {
    text: "Which desert is the largest hot desert in the world?",
    category: "Geography",
    difficulty: "MEDIUM",
    options: ["Gobi Desert", "Kalahari Desert", "Sahara Desert", "Mojave Desert"],
    correctAnswer: "Sahara Desert",
  },
  {
    text: "Which organ in the human body is primarily responsible for pumping blood?",
    category: "Science",
    difficulty: "EASY",
    options: ["Lungs", "Liver", "Heart", "Kidneys"],
    correctAnswer: "Heart",
  },
  {
    text: "What is the SI unit of force?",
    category: "Science",
    difficulty: "MEDIUM",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: "Newton",
  },
  {
    text: "In which city would you find the ancient Colosseum?",
    category: "History",
    difficulty: "EASY",
    options: ["Athens", "Rome", "Istanbul", "Cairo"],
    correctAnswer: "Rome",
  },
  {
    text: "What is the longest bone in the human body?",
    category: "Science",
    difficulty: "MEDIUM",
    options: ["Humerus", "Femur", "Tibia", "Spine"],
    correctAnswer: "Femur",
  },
  {
    text: "What is the smallest prime number?",
    category: "Math",
    difficulty: "EASY",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2",
  },
  {
    text: "What is the study of weather and the atmosphere called?",
    category: "Science",
    difficulty: "EASY",
    options: ["Geology", "Meteorology", "Ecology", "Astronomy"],
    correctAnswer: "Meteorology",
  },
  {
    text: "Which programming language was created by Guido van Rossum?",
    category: "Technology",
    difficulty: "EASY",
    options: ["Java", "C++", "Python", "Ruby"],
    correctAnswer: "Python",
  },
  {
    text: "What is the chemical formula for carbon dioxide?",
    category: "Science",
    difficulty: "EASY",
    options: ["CO", "CO2", "C2O", "O2C"],
    correctAnswer: "CO2",
  },
  {
    text: "Who was the first woman to fly solo across the Atlantic Ocean?",
    category: "History",
    difficulty: "MEDIUM",
    options: [
      "Amelia Earhart",
      "Sally Ride",
      "Valentina Tereshkova",
      "Bessie Coleman",
    ],
    correctAnswer: "Amelia Earhart",
  },
  {
    text: "In which country is the Great Barrier Reef located?",
    category: "Geography",
    difficulty: "EASY",
    options: ["Australia", "Brazil", "South Africa", "United States"],
    correctAnswer: "Australia",
  },
  {
    text: 'What does the abbreviation "HTTP" stand for?',
    category: "Technology",
    difficulty: "MEDIUM",
    options: [
      "Hyper Transfer Text Program",
      "Hypertext Transfer Protocol",
      "High Tech Transmission Process",
      "Host Transfer Text Protocol",
    ],
    correctAnswer: "Hypertext Transfer Protocol",
  },
  {
    text: "What is the hardest naturally occurring substance on Earth?",
    category: "Science",
    difficulty: "EASY",
    options: ["Diamond", "Steel", "Quartz", "Granite"],
    correctAnswer: "Diamond",
  },
];

// --- Import logic --------------------------------------------

// Node 18+ has global fetch; if you were on an older Node, you'd need node-fetch.
async function importQuestions() {
  console.log(`POSTing ${questions.length} questions to ${BASE_URL}/api/questions`);

  let successCount = 0;
  let failureCount = 0;

  for (const q of questions) {
    try {
      const res = await fetch(`${BASE_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Token": ADMIN_TOKEN,
        },
        body: JSON.stringify(q),
      });

      if (!res.ok) {
        const bodyText = await res.text();
        console.error(
          `❌ Failed to create question: "${q.text.slice(0, 60)}..."`,
        );
        console.error(`   HTTP ${res.status} – ${bodyText}`);
        failureCount += 1;
        continue;
      }

      const created = await res.json();
      console.log(
        `✅ Created question [id=${created.id}] "${created.text.slice(0, 60)}..."`,
      );
      successCount += 1;
    } catch (err) {
      console.error(
        `❌ Error while creating question: "${q.text.slice(0, 60)}..."`,
      );
      console.error("   ", err);
      failureCount += 1;
    }
  }

  console.log(
    `\nDone. Success: ${successCount}, Failed: ${failureCount}, Total: ${questions.length}`,
  );
}

importQuestions().catch((err) => {
  console.error("Fatal error in importQuestions:", err);
  process.exitCode = 1;
});
