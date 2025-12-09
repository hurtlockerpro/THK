// server.js
const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors")

const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors({
  origin: 'http://localhost:3000', // <-- IMPORTANT: Use your actual client origin
  credentials: true
}))
app.use(express.static("public"))

/*
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "http://localhost:3000")
  req.header("Access-Control-Allow-Method", "GET, POST, PUT, DELETE, OPTIONS")
  req.header("Access-Control-Allow-Headers", "Content-Type")
  req.header("Access-Control-Allow-Credential", "true")
  next()
})*/


// Mock user database
const users = [
  { id: 1, username: "student", password: "demo123" },
  { id: 2, username: "teacher", password: "teach123" },
];


app.use(
  session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // no https
      maxAge: 1000 * 60 * 15,
      httpOnly: false // <-- IMPORTANT temporary
    }
  })
)

// Routes
app.post("/api/login", (req, res) => {
    const { username, password } = req.body

    console.log('username', username);
    console.log('password', password);

    const user = users.find(
        (u) => u.username === username && u.password === password
    ) 

    if (user){
        // user - found
        req.session.userId = user.id
        req.session.username = user.username
        console.log('user ' + user.username + ' logged in');
        res.json({
            success: true,
            username: user.username,
            sessionID: req.sessionID
        })
    } else {
        // user not found
        console.log('user not logged in');
        res.status(401).json({ error: 'Invalid credentials' })
    }
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