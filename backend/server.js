require("dotenv").config({ quiet: true });
const cors = require("cors");
const express = require('express');
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const progressRoutes = require('./routes/progressRoutes')
const credentials = require("./middleware/authMiddleware");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// built-in middleware to handle urlencode form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// routes
app.use("/", userRoutes);
app.use("/courses", courseRoutes)
app.use('/progress', progressRoutes);
// logout user and clear its token
app.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: "Logout failed." });
      } else {
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Logged out successfully." });
      }
    });
  } else {
    return res.status(200).json({ message: "No active session." });
  }
});


// connecting node with mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => { console.log('Connected to MongoDB'), app.listen(process.env.PORT, () => console.log(`Server is running on port: ${PORT}!`)); })
  .catch(err => console.error('MongoDB connection error:', err));
