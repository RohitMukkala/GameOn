const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        score INTEGER
      )
    `);
  }
});

// Routes
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.run(
    `INSERT INTO users (username, password) VALUES (?, ?)`,
    [username, password],
    (err) => {
      if (err) {
        res.status(400).json({ error: "Username already exists." });
      } else {
        res.json({ message: "User registered successfully." });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    `SELECT * FROM users WHERE username = ? AND password = ?`,
    [username, password],
    (err, row) => {
      if (err || !row) {
        res.status(401).json({ error: "Invalid credentials." });
      } else {
        res.json({ message: "Login successful." });
      }
    }
  );
});

app.get("/leaderboard", (req, res) => {
  db.all(
    `SELECT username, score FROM leaderboard ORDER BY score DESC`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows);
      }
    }
  );
});

app.post("/submit-score", (req, res) => {
  const { username, score } = req.body;
  db.run(
    `INSERT INTO leaderboard (username, score) VALUES (?, ?)`,
    [username, score],
    (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "Score submitted successfully." });
      }
    }
  );
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
