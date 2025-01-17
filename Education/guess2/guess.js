// DOM Elements
const hintsList = document.getElementById("hints-list");
const guessInput = document.getElementById("guess-input");
const feedback = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");
const newGameBtn = document.getElementById("new-game-btn");

// Game State
let hiddenNumber = generateNumber(1, 100);
let hints = generateHints(hiddenNumber);

// Generate a random number within a range
function generateNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate hints for the hidden number
function generateHints(number) {
  const factors = getFactors(number);
  return [
    `The number is ${number % 2 === 0 ? "even" : "odd"}.`,
    `It is divisible by ${
      factors.filter((f) => f !== 1 && f !== number).join(", ") ||
      "no other numbers"
    }.`,
    `The square of the number is ${number ** 2}.`,
    `The sum of its digits is ${sumOfDigits(number)}.`,
  ];
}

// Get factors of a number
function getFactors(num) {
  const factors = [];
  for (let i = 1; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      factors.push(i);
      if (i !== num / i) factors.push(num / i);
    }
  }
  return factors.sort((a, b) => a - b);
}

// Calculate the sum of digits of a number
function sumOfDigits(num) {
  return num
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}

// Update hints on the page
function updateHints() {
  hintsList.innerHTML = "";
  hints.forEach((hint) => {
    const li = document.createElement("li");
    li.textContent = hint;
    hintsList.appendChild(li);
  });
}

// Handle guess submission
function handleGuess() {
  const guess = parseInt(guessInput.value, 10);
  if (isNaN(guess)) {
    feedback.textContent = "Please enter a valid number.";
    return;
  }
  if (guess === hiddenNumber) {
    feedback.textContent = "Correct! You guessed the number!";
  } else if (guess > hiddenNumber) {
    feedback.textContent = "Too high! Try again.";
  } else {
    feedback.textContent = "Too low! Try again.";
  }
  guessInput.value = "";
}

// Start a new game
function startNewGame() {
  hiddenNumber = generateNumber(1, 100);
  hints = generateHints(hiddenNumber);
  updateHints();
  feedback.textContent = "";
  guessInput.value = "";
}

// Event Listeners
submitBtn.addEventListener("click", handleGuess);
newGameBtn.addEventListener("click", startNewGame);

// Initialize the game
updateHints();
