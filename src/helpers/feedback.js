// Array of responses for incorrect answer
const wrongFeedback = [
  { text: "Close, but no cigar!", weight: 3 },
  {
    text: "That's one way to look at it... not the correct way, but a way!",
    weight: 1,
  },
  { text: "You're in the right ballpark... just a different city.", weight: 2 },
  { text: "Well, that was certainly creative!", weight: 1 },
  { text: "Interesting approach.", weight: 1 },
  { text: "I admire your confidence.", weight: 1 },
  { text: "That's... not it.", weight: 1 },
  { text: "Bless your heart...but that's not it.", weight: 1 },
  { text: "Not quite, but nice try!", weight: 2 },
];

// Array of responses for correct answer
const rightFeedback = [
  { text: "Bingo!", weight: 2 },
  { text: "Nailed it!", weight: 2 },
  { text: "You got it, dude!", weight: 1 },
  { text: "That's the answer, and you know it!", weight: 1 },
  { text: "You're on fire!", weight: 2 },
  { text: "Ding ding ding!", weight: 2 },
  { text: "Brilliant!", weight: 1 },
  { text: "Fantastic!", weight: 1 },
  { text: "Right!", weight: 1 },
  { text: "Correct!", weight: 1 },
];

// Generic weighted random picker
function pickWeightedRandom(list) {
  const totalWeight = list.reduce((sum, item) => sum + item.weight, 0);
  let r = Math.random() * totalWeight;

  for (const item of list) {
    if (r < item.weight) return item.text;
    r -= item.weight;
  }

  // Fallback (shouldn't happen)
  return list[0]?.text ?? "";
}

export function getRandomFeedback(isCorrect) {
  const pool = isCorrect ? rightFeedback : wrongFeedback;
  return pickWeightedRandom(pool);
}
