// server.js - JWT Authentication Server
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Secret key for JWT signing (In production, use environment variable!)
const JWT_SECRET = "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "30m"; // Token expires in 30 minutes

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());


// Mock user database
const users = [
  { id: 1, username: "student", password: "demo123", role: "student" },
  { id: 2, username: "teacher", password: "teach123", role: "teacher" },
];


// Routes

// Login endpoint
app.post("/api/login", (req, res) => {
  
});

// Protected route - Get user profile



// Logout endpoint (client-side handles token deletion)
app.post("/api/logout", (req, res) => {

});

// Start server
app.listen(PORT, () => {
  console.log(`\n====================================`);
  console.log(`🚀 JWT Auth Server Running`);
  console.log(`====================================`);
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`JWT Secret: ${JWT_SECRET}`);
  console.log(`Token Expiry: ${JWT_EXPIRES_IN}`);
  console.log(`====================================\n`);
  console.log("Demo credentials:");
  console.log("  👤 student / demo123 (student role)");
  console.log("💡 JWT tokens are stateless - no server storage needed!");
  console.log("💡 Tokens stored in client localStorage\n");
});
