// Handle Registration Form Submission
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Registration successful! You can now log in.");
        e.target.reset();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again later.");
    }
  });

// Handle Login Form Submission
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");
    } else {
      alert(`Error: ${result.error}`);
    }
  } catch (error) {
    console.error("Login failed:", error);
    alert("Login failed. Please try again later.");
  }
});

// JavaScript to handle modal and forms
const addUserIcon = document.getElementById("addUserIcon");
const authModal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");
const registerTab = document.getElementById("registerTab");
const loginTab = document.getElementById("loginTab");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

// Open Modal
addUserIcon.addEventListener("click", () => {
  authModal.classList.remove("hidden");
  registerForm.classList.add("hidden");
  loginForm.classList.add("hidden");
});

// Close Modal
closeModal.addEventListener("click", () => {
  authModal.classList.add("hidden");
});

// Toggle between Register and Login forms
registerTab.addEventListener("click", () => {
  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
});

loginTab.addEventListener("click", () => {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
});
