// server.js
const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Mock user database
const users = [
  { id: 1, username: "student", password: "demo123" },
  { id: 2, username: "teacher", password: "teach123" },
];

// Routes
app.post("/api/login", (req, res) => {
  
});


app.post("/api/logout", (req, res) => {

});

app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`=================================\n`);
  console.log("Demo credentials:");
  console.log("  Username: student | Password: demo123")
});
