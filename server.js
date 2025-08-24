// ---------------------- Load Environment Variables ----------------------
require('dotenv').config(); // Loads variables from .env file

// ---------------------- Import Core Dependencies ----------------------
const express = require('express');             // Express framework
const bodyParser = require('body-parser');      // Middleware to parse JSON data
const passport = require('passport');           // Passport for authentication
const LocalStrategy = require('passport-local').Strategy; // Local strategy for username/password login

// ---------------------- Import Database Connection ----------------------
const db = require('./db'); // Connects to MongoDB (configured in db.js)

// ---------------------- Import Models ----------------------
const Person = require('./module/Person'); // Mongoose model for "Person" collection

// ---------------------- Import Routes ----------------------
const personRoutes = require('./Routes/personRoutes'); // Routes for person CRUD operations
const menuRoutes = require('./Routes/menuRouter');     // Routes for menu CRUD operations

// ---------------------- Initialize Express ----------------------
const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------- Middleware ----------------------
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

// ---------------------- Configure Passport Authentication ----------------------
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received username & password:", username, password);

      // Find user in DB by username
      const user = await Person.findOne({ username });

      // If user not found
      if (!user) {
        return done(null, false, { message: "User not found!" });
      }

      // Check if password matches (plain-text for now, no hashing)
      const isPasswordMatch = (user.password === password? true: false);

      if (!isPasswordMatch) {
        return done(null, false, { message: "Incorrect password!" });
      }

      // If user exists and password is correct
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

// Initialize passport middleware
app.use(passport.initialize());

// ---------------------- Routes ----------------------

// Protected home route (requires authentication)
app.get('/', passport.authenticate('local', { session: false }), (req, res) => {
  res.send("Welcome to the home page!");
});

// Person routes → Handles /person requests
app.use('/person', personRoutes);

// Menu routes → Handles /menu requests
app.use('/menu', menuRoutes);

// ---------------------- Start the Server ----------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
