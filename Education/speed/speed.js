// Sample text pool
const texts = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice and patience.",
  "Speed typing tests measure accuracy and speed simultaneously.",
  "JavaScript is a versatile programming language for web development.",
  "Consistency and focus are key to mastering any skill.",
];

let currentText = "";
let timer;
let timeLeft = 30;
let isTestRunning = false;

// DOM Elements
const displayTextEl = document.getElementById("display-text");
const userInputEl = document.getElementById("user-input");
const timerEl = document.getElementById("time-left");
const startBtn = document.getElementById("start-btn");
const accuracyEl = document.getElementById("accuracy");
const wpmEl = document.getElementById("wpm");

// Start the typing test
function startTest() {
  // Reset the state
  resetTest();

  // Select random text
  currentText = texts[Math.floor(Math.random() * texts.length)];
  displayTextEl.textContent = currentText;

  // Enable input and focus
  userInputEl.disabled = false;
  userInputEl.focus();

  // Start timer
  isTestRunning = true;
  timer = setInterval(updateTimer, 1000);
}

// Update the timer
function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timerEl.textContent = timeLeft;
  } else {
    endTest();
  }
}

// End the typing test
function endTest() {
  clearInterval(timer);
  isTestRunning = false;
  userInputEl.disabled = true;

  // Calculate results
  const inputText = userInputEl.value.trim();
  const { accuracy, wpm } = calculateResults(inputText);
  accuracyEl.textContent = `Accuracy: ${accuracy}%`;
  wpmEl.textContent = `Words Per Minute (WPM): ${wpm}`;
}

// Calculate accuracy and WPM
function calculateResults(inputText) {
  const wordsTyped = inputText.split(" ").filter((word) => word).length;
  const totalWords = currentText.split(" ").length;

  let correctChars = 0;
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] === currentText[i]) {
      correctChars++;
    }
  }

  const accuracy = Math.round((correctChars / currentText.length) * 100);
  const wpm = Math.round(wordsTyped / (30 / 60));

  return { accuracy, wpm };
}

// Reset the test
function resetTest() {
  timeLeft = 30;
  timerEl.textContent = timeLeft;
  accuracyEl.textContent = "";
  wpmEl.textContent = "";
  userInputEl.value = "";
  isTestRunning = false;
}

// Event Listeners
startBtn.addEventListener("click", startTest);
