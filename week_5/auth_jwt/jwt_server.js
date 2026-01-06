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
app.use(express.static('public'));


// Mock user database
const users = [
  { id: 1, username: "student", password: "demo123", role: "student" },
  { id: 2, username: "teacher", password: "teach123", role: "teacher" },
];


// Routes

// Login endpoint
app.post("/api/login", (req, res) => {
  const _body = req.body 
  console.log(_body);

  const user = users.find( _user => _user.username == _body.username && _user.password == _body.password)

  if (!user){
    console.log("User not found: " + _body.username);
    return res.status(401).json({error: "User not found: "  + _body.username})
  }
  
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role
  }

  // jwt 
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN})

  return res.json({
    success: true, 
    token: token,
    user: payload
  })  
});


const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  //console.log(authHeader);
  console.log('token: ', token);

  if (!token) {
    console.log('No token found');
    return res.status(401).json({error: 'Access token required'}) 
  }

  jwt.verify(token, JWT_SECRET, (err, _user) => {
    if (err) {
      console.log('Invalid or expired token');
      return res.status(403).json({error: 'Invalid or expired token'}) 
    }

    console.log('User successfully ferified: ' + _user.username);
    req.user = _user
    next()
  })
  
  
}

// Protected route - Get user profile
app.get("/api/profile", authenticateToken, (req, res) => {
  return res.json({
    user: req.user,
    tokenInfo: {
      issuedAt: new Date(),
      expiresAt: new Date() 
    }
  })
});



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
