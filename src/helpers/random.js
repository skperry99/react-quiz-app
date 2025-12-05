export function pickRandomQuestions(allQuestions, count = 10) {
  if (!Array.isArray(allQuestions)) return [];

  // Clone so we don't mutate original
  const copy = [...allQuestions];

  // Shuffle (Fisher-Yates)
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  // Return only first N
  return copy.slice(0, count);
}
