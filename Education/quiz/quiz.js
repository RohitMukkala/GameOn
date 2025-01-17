// Country-Capital Data
const quizData = [
  { country: "France", capital: "Paris" },
  { country: "Germany", capital: "Berlin" },
  { country: "Japan", capital: "Tokyo" },
  { country: "Australia", capital: "Canberra" },
  { country: "India", capital: "New Delhi" },
  { country: "Brazil", capital: "Brasilia" },
  { country: "Canada", capital: "Ottawa" },
  { country: "Russia", capital: "Moscow" },
  { country: "South Korea", capital: "Seoul" },
  { country: "United States", capital: "Washington, D.C." },
];

// DOM Elements
const countryNameEl = document.getElementById("country-name");
const optionsListEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");

// Game State
let currentQuestionIndex = 0;
let score = 0;

// Shuffle an array
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load a question
function loadQuestion() {
  // Clear feedback
  feedbackEl.textContent = "";

  // Get current question
  const { country, capital } = quizData[currentQuestionIndex];

  // Set country name
  countryNameEl.textContent = country;

  // Create options
  const options = [capital, ...getRandomCapitals(capital)];
  shuffle(options);

  // Render options
  optionsListEl.innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(option);
    li.appendChild(button);
    optionsListEl.appendChild(li);
  });

  // Disable next button
  nextBtn.disabled = true;
}

// Check the answer
function checkAnswer(selectedCapital) {
  const { capital } = quizData[currentQuestionIndex];

  if (selectedCapital === capital) {
    feedbackEl.textContent = "Correct! 🎉";
    feedbackEl.style.color = "green";
    score++;
  } else {
    feedbackEl.textContent = `Wrong! The correct answer is ${capital}.`;
    feedbackEl.style.color = "red";
  }

  // Enable next button
  nextBtn.disabled = false;
}

// Get random incorrect options
function getRandomCapitals(correctCapital) {
  const capitals = quizData
    .map((item) => item.capital)
    .filter((c) => c !== correctCapital);
  shuffle(capitals);
  return capitals.slice(0, 3); // Return 3 random options
}

// Go to the next question
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= quizData.length) {
    showFinalScore();
  } else {
    loadQuestion();
  }
}

// Show final score
function showFinalScore() {
  countryNameEl.textContent = "Game Over!";
  optionsListEl.innerHTML = "";
  feedbackEl.textContent = `Your score: ${score} / ${quizData.length}`;
  feedbackEl.style.color = "black";
  nextBtn.disabled = true;
}

// Initialize the game
nextBtn.addEventListener("click", nextQuestion);
loadQuestion();
