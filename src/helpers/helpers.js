// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  // Create a shallow copy to avoid modifying the original array directly
  const shuffledArray = [...array];

  let currentIndex = shuffledArray.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}

// Function to get a random array element
function getRandom(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function selectRandomElements(arr, numElements) {
  // Create a shallow copy of the array to avoid modifying the original
  const shuffledArray = [...arr];

  // Call Fisher-Yates shuffle algorithm
  shuffleArray(shuffledArray);

  // Return the first 'numElements' from the shuffled array
  return shuffledArray.slice(0, numElements);
}

export { shuffleArray, getRandom, selectRandomElements };
