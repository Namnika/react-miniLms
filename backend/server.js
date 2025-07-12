require("dotenv").config({ quiet: true });
const cors = require("cors");
const express = require('express');
const userRoutes = require('./routes/userRoutes')
const credentials = require("./middleware/authMiddleware");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencode form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());


// logout user and clear its token
app.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout failed');
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: "Logged out successfully." });
    res.redirect('/users');
  });
});

// routes
app.use("/", userRoutes);


// connecting node with mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('Connected to MongoDB'), app.listen(PORT, () => console.log(`Server is running on port: ${PORT}!`)); })
  .catch(err => console.error('MongoDB connection error:', err));
