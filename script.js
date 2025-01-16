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

// Modal Handling
const loginIcon = document.getElementById("loginIcon");
const authModal = document.getElementById("authModal");
const closeModal = document.getElementById("closeModal");

loginIcon.addEventListener("click", () => {
  authModal.style.display = "flex"; // Show modal
});

closeModal.addEventListener("click", () => {
  authModal.style.display = "none"; // Hide modal
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
  if (e.target === authModal) {
    authModal.style.display = "none";
  }
});
